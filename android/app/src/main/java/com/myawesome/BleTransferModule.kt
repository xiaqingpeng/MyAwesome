package com.myawesome

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCallback
import android.bluetooth.BluetoothGattCharacteristic
import android.bluetooth.BluetoothGattService
import android.bluetooth.BluetoothManager
import android.bluetooth.BluetoothProfile
import android.bluetooth.le.BluetoothLeScanner
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.util.Base64
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.myawesome.specs.NativeBleTransferSpec
import java.util.UUID

class BleTransferModule(reactContext: ReactApplicationContext) :
    NativeBleTransferSpec(reactContext) {

    companion object {
        const val NAME = "BleTransfer"
        private const val TAG = "BleTransfer"
        private const val UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
        private const val WEIGHT_SCALE_SERVICE_UUID = "0000181d-0000-1000-8000-00805f9b34fb"
        private const val BLOOD_PRESSURE_SERVICE_UUID = "00001810-0000-1000-8000-00805f9b34fb"
        private const val EBIKE_SERVICE_UUID = "e7000001-a0c0-4e8b-b3d0-1a2b3c4d5e6f"
    }

    private data class ScanCandidate(
        val device: BluetoothDevice,
        var name: String?,
        var rssi: Int,
        var serviceUuids: Set<UUID>,
        var lastSeenAtMs: Long,
    )

    private val mainHandler = Handler(Looper.getMainLooper())
    private val bluetoothManager: BluetoothManager? =
        reactContext.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter?
        get() = bluetoothManager?.adapter
    private val scanner: BluetoothLeScanner?
        get() = bluetoothAdapter?.bluetoothLeScanner

    private val devices = mutableMapOf<String, BluetoothDevice>()
    private val gatts = mutableMapOf<String, BluetoothGatt>()
    private val scanCandidates = linkedMapOf<String, ScanCandidate>()
    private var scanPromise: Promise? = null
    private var scanCallback: ScanCallback? = null
    private var pendingConnectPromise: Promise? = null
    private val pendingReadPromises = mutableMapOf<String, Promise>()
    private var scanTimeoutToken: Any? = null

    override fun getName(): String = NAME

    override fun isBluetoothReady(promise: Promise) {
        val adapter = bluetoothAdapter
        promise.resolve(adapter != null && adapter.isEnabled && hasBluetoothPermissions())
    }

    override fun startScan(serviceUuid: String, promise: Promise) {
        val adapter = bluetoothAdapter
        if (adapter == null || !adapter.isEnabled) {
            promise.reject("BLE_POWERED_OFF", "Bluetooth is not enabled")
            return
        }

        if (!hasBluetoothPermissions()) {
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth scan/connect permissions are missing")
            return
        }

        val parsedServiceUuid = parseUuid(serviceUuid, promise) ?: return
        val bleScanner = scanner
        if (bleScanner == null) {
            promise.reject("BLE_SCANNER_UNAVAILABLE", "BLE scanner is unavailable")
            return
        }

        scanPromise?.reject("BLE_SCAN_CANCELLED", "A newer BLE scan replaced this one")
        stopActiveScan()
        scanCandidates.clear()
        scanPromise = promise
        val timeoutToken = Any()
        scanTimeoutToken = timeoutToken
        scanCallback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val device = result.device ?: return
                val scannedName = scanDeviceName(result)
                val scannedServiceUuids = result.scanRecord?.serviceUuids?.map { it.uuid }.orEmpty()
                val scannedServices = scannedServiceUuids.map { it.toString().lowercase() }
                val deviceId = device.address
                devices[deviceId] = device
                scannedName?.let { name -> devices[name] = device }
                val previousCandidate = scanCandidates[deviceId]
                scanCandidates[deviceId] = ScanCandidate(
                    device = device,
                    name = scannedName ?: previousCandidate?.name,
                    rssi = result.rssi,
                    serviceUuids = if (scannedServiceUuids.isNotEmpty()) {
                        scannedServiceUuids.toSet()
                    } else {
                        previousCandidate?.serviceUuids.orEmpty()
                    },
                    lastSeenAtMs = System.currentTimeMillis(),
                )
                Log.i(
                    TAG,
                    "BLE scan result: address=${device.address} name=${scannedName.orEmpty()} rssi=${result.rssi} services=$scannedServices",
                )

                if (!matchesRequestedDevice(result, parsedServiceUuid)) {
                    return
                }

                Log.i(TAG, "Matched BLE device id=$deviceId name=${scanDeviceName(result).orEmpty()} service=$serviceUuid")
                stopActiveScan()
                scanPromise?.resolve(deviceId)
                scanPromise = null
            }

            override fun onScanFailed(errorCode: Int) {
                Log.w(TAG, "BLE scan failed with code $errorCode")
                scanPromise?.reject("BLE_SCAN_FAILED", "BLE scan failed with code $errorCode")
                scanPromise = null
            }
        }

        val settings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()

        try {
            Log.i(TAG, "Starting BLE scan for service=$serviceUuid")
            bleScanner.startScan(emptyList<ScanFilter>(), settings, scanCallback)
            val timeoutRunnable = Runnable {
                if (scanTimeoutToken !== timeoutToken) {
                    return@Runnable
                }
                val pendingPromise = scanPromise ?: return@Runnable
                scanPromise = null
                stopActiveScan()
                probeScanCandidatesForService(parsedServiceUuid, serviceUuid, pendingPromise)
            }
            mainHandler.postAtTime(timeoutRunnable, timeoutToken, SystemClock.uptimeMillis() + 10000)
        } catch (securityException: SecurityException) {
            scanPromise = null
            scanTimeoutToken = null
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth scan permission denied", securityException)
        }
    }

    override fun stopScan(promise: Promise) {
        stopActiveScan()
        scanPromise = null
        promise.resolve(null)
    }

    @SuppressLint("MissingPermission")
    override fun connect(deviceId: String, promise: Promise) {
        if (!hasBluetoothPermissions()) {
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth connect permission is missing")
            return
        }

        val existingGatt = findGatt(deviceId)
        if (existingGatt != null && existingGatt.services.orEmpty().isNotEmpty()) {
            promise.resolve(true)
            return
        }

        val device = findDevice(deviceId)
        if (device == null) {
            promise.reject("BLE_DEVICE_NOT_FOUND", "Scan before connecting, or pass a BLE device address")
            return
        }

        pendingConnectPromise?.reject("BLE_CONNECT_CANCELLED", "A newer connect request replaced this one")
        pendingConnectPromise = promise

        try {
            val gatt = existingGatt ?: if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                device.connectGatt(reactApplicationContext, false, gattCallback, BluetoothDevice.TRANSPORT_LE)
            } else {
                device.connectGatt(reactApplicationContext, false, gattCallback)
            }
            gatts[device.address] = gatt
            device.name?.let { name -> gatts[name] = gatt }

            if (existingGatt != null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    gatt.requestMtu(512)
                } else {
                    gatt.discoverServices()
                }
            }
        } catch (securityException: SecurityException) {
            pendingConnectPromise = null
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth connect permission denied", securityException)
        }
    }

    override fun disconnect(deviceId: String, promise: Promise) {
        val gatt = gatts.remove(deviceId)
        try {
            gatt?.disconnect()
            gatt?.close()
            promise.resolve(null)
        } catch (securityException: SecurityException) {
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth disconnect permission denied", securityException)
        }
    }

    override fun write(
        deviceId: String,
        serviceUuid: String,
        characteristicUuid: String,
        base64Payload: String,
        promise: Promise
    ) {
        val gatt = findGatt(deviceId)
        if (gatt == null) {
            promise.reject("BLE_NOT_CONNECTED", "Connect to the BLE device before writing")
            return
        }

        val characteristic = findCharacteristic(gatt, serviceUuid, characteristicUuid, promise) ?: return
        val payload = try {
            Base64.decode(base64Payload, Base64.DEFAULT)
        } catch (error: IllegalArgumentException) {
            promise.reject("BLE_INVALID_PAYLOAD", "Payload must be Base64 encoded", error)
            return
        }

        try {
            val writeType = if (characteristic.properties and BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE != 0) {
                BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE
            } else {
                BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT
            }
            characteristic.writeType = writeType

            val started = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                gatt.writeCharacteristic(characteristic, payload, writeType) == BluetoothGatt.GATT_SUCCESS
            } else {
                @Suppress("DEPRECATION")
                run {
                    characteristic.value = payload
                    gatt.writeCharacteristic(characteristic)
                }
            }

            if (started) {
                promise.resolve(true)
            } else {
                promise.reject("BLE_WRITE_FAILED", "Failed to start BLE characteristic write")
            }
        } catch (securityException: SecurityException) {
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth write permission denied", securityException)
        }
    }

    override fun read(deviceId: String, serviceUuid: String, characteristicUuid: String, promise: Promise) {
        val gatt = findGatt(deviceId)
        if (gatt == null) {
            promise.reject("BLE_NOT_CONNECTED", "Connect to the BLE device before reading")
            return
        }

        val characteristic = findCharacteristic(gatt, serviceUuid, characteristicUuid, promise) ?: return
        pendingReadPromises[characteristic.uuid.toString().lowercase()] = promise

        try {
            if (!gatt.readCharacteristic(characteristic)) {
                pendingReadPromises.remove(characteristic.uuid.toString().lowercase())
                promise.reject("BLE_READ_FAILED", "Failed to start BLE characteristic read")
            }
        } catch (securityException: SecurityException) {
            pendingReadPromises.remove(characteristic.uuid.toString().lowercase())
            promise.reject("BLE_PERMISSION_MISSING", "Bluetooth read permission denied", securityException)
        }
    }

    private val gattCallback = object : BluetoothGattCallback() {
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            if (status != BluetoothGatt.GATT_SUCCESS) {
                pendingConnectPromise?.reject("BLE_CONNECT_FAILED", "BLE connection failed with status $status")
                pendingConnectPromise = null
                closeGatt(gatt)
                return
            }

            if (newState == BluetoothProfile.STATE_CONNECTED) {
                gatts[gatt.device.address] = gatt
                gatt.device.name?.let { name -> gatts[name] = gatt }
                try {
                    // Request a larger MTU so short reads fit in a single ATT packet,
                    // avoiding the Long Read procedure that causes partial data on older APIs.
                    gatt.requestMtu(512)
                } catch (securityException: SecurityException) {
                    pendingConnectPromise?.reject("BLE_PERMISSION_MISSING", "Bluetooth service discovery permission denied", securityException)
                    pendingConnectPromise = null
                }
            } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                closeGatt(gatt)
            }
        }

        override fun onMtuChanged(gatt: BluetoothGatt, mtu: Int, status: Int) {
            Log.i(TAG, "MTU changed to $mtu, status=$status")
            try {
                gatt.discoverServices()
            } catch (securityException: SecurityException) {
                pendingConnectPromise?.reject("BLE_PERMISSION_MISSING", "Bluetooth service discovery permission denied", securityException)
                pendingConnectPromise = null
            }
        }

        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                pendingConnectPromise?.resolve(true)
            } else {
                pendingConnectPromise?.reject("BLE_SERVICE_DISCOVERY_FAILED", "Service discovery failed with status $status")
            }
            pendingConnectPromise = null
        }

        override fun onCharacteristicRead(
            gatt: BluetoothGatt,
            characteristic: BluetoothGattCharacteristic,
            value: ByteArray,
            status: Int
        ) {
            Log.i(TAG, "onCharacteristicRead (new API) uuid=${characteristic.uuid} valueLen=${value.size} value=${String(value)}")
            resolveRead(characteristic, value, status)
        }

        @Deprecated("Deprecated in Android 13")
        override fun onCharacteristicRead(
            gatt: BluetoothGatt,
            characteristic: BluetoothGattCharacteristic,
            status: Int
        ) {
            @Suppress("DEPRECATION")
            val value = characteristic.value ?: ByteArray(0)
            Log.i(TAG, "onCharacteristicRead (deprecated) uuid=${characteristic.uuid} valueLen=${value.size} value=${String(value)}")
            resolveRead(characteristic, value, status)
        }
    }

    private fun resolveRead(characteristic: BluetoothGattCharacteristic, value: ByteArray, status: Int) {
        val key = characteristic.uuid.toString().lowercase()
        val promise = pendingReadPromises.remove(key) ?: return
        if (status == BluetoothGatt.GATT_SUCCESS) {
            promise.resolve(Base64.encodeToString(value, Base64.NO_WRAP))
        } else {
            promise.reject("BLE_READ_FAILED", "BLE read failed with status $status")
        }
    }

    private fun stopActiveScan() {
        scanTimeoutToken?.let { token -> mainHandler.removeCallbacksAndMessages(token) }
        scanTimeoutToken = null
        val callback = scanCallback ?: return
        try {
            scanner?.stopScan(callback)
        } catch (_: SecurityException) {
        } finally {
            scanCallback = null
        }
    }

    @SuppressLint("MissingPermission")
    private fun probeScanCandidatesForService(serviceUuid: UUID, serviceUuidText: String, promise: Promise) {
        val candidates = scanCandidates.values
            .filter { shouldProbeCandidate(it, serviceUuid) }
            .sortedWith(
                compareByDescending<ScanCandidate> { probePriority(it, serviceUuid) }
                    .thenByDescending { it.rssi }
                    .thenByDescending { it.lastSeenAtMs },
            )
            .take(4)

        if (candidates.isEmpty()) {
            promise.reject(
                "BLE_SCAN_TIMEOUT",
                "No BLE advertisement matched $serviceUuidText. Keep the Mac awake, restart the matching pnpm data source, and keep the phone close to the Mac.",
            )
            return
        }

        Log.i(
            TAG,
            "No direct advertisement match for service=$serviceUuidText. Probing ${candidates.size} nearby devices by GATT discovery.",
        )
        probeScanCandidateAtIndex(candidates, 0, serviceUuid, serviceUuidText, promise)
    }

    private fun probePriority(candidate: ScanCandidate, serviceUuid: UUID): Int {
        var score = 0
        if (!candidate.name.isNullOrBlank()) {
            score += 100
        }
        if (candidate.serviceUuids.isNotEmpty()) {
            score += 50
        }

        val name = candidate.name.orEmpty()
        if (name.contains("mac", ignoreCase = true)) {
            score += 200
        }

        if (serviceUuid.toString().lowercase() == EBIKE_SERVICE_UUID && name.contains("bike", ignoreCase = true)) {
            score += 400
        }

        return score
    }

    private fun probeScanCandidateAtIndex(
        candidates: List<ScanCandidate>,
        index: Int,
        serviceUuid: UUID,
        serviceUuidText: String,
        promise: Promise,
    ) {
        if (index >= candidates.size) {
            promise.reject(
                "BLE_SCAN_TIMEOUT",
                "Scanned likely nearby devices, but none exposed service $serviceUuidText after GATT discovery",
            )
            return
        }

        val candidate = candidates[index]
        val advertisedServices = candidate.serviceUuids.map { it.toString().lowercase() }
        Log.i(
            TAG,
            "Probing candidate address=${candidate.device.address} name=${candidate.name.orEmpty()} rssi=${candidate.rssi} advertisedServices=$advertisedServices",
        )

        probeCandidateServices(candidate, serviceUuid) { matchedGatt ->
            if (matchedGatt != null) {
                val address = matchedGatt.device.address
                devices[address] = matchedGatt.device
                candidate.name?.let { name ->
                    devices[name] = matchedGatt.device
                    gatts[name] = matchedGatt
                }
                gatts[address] = matchedGatt
                Log.i(TAG, "Matched BLE device by GATT probe id=$address name=${candidate.name.orEmpty()} service=$serviceUuidText")
                promise.resolve(address)
            } else {
                probeScanCandidateAtIndex(candidates, index + 1, serviceUuid, serviceUuidText, promise)
            }
        }
    }

    @SuppressLint("MissingPermission")
    private fun probeCandidateServices(
        candidate: ScanCandidate,
        serviceUuid: UUID,
        onComplete: (BluetoothGatt?) -> Unit,
    ) {
        var finished = false
        var gattRef: BluetoothGatt? = null

        fun finish(foundGatt: BluetoothGatt?) {
            if (finished) {
                return
            }
            finished = true
            mainHandler.removeCallbacksAndMessages(candidate.device.address)

            val activeGatt = gattRef
            if (foundGatt == null) {
                try {
                    activeGatt?.disconnect()
                } catch (_: SecurityException) {
                }
                try {
                    activeGatt?.close()
                } catch (_: SecurityException) {
                }
            }

            onComplete(foundGatt)
        }

        val timeoutRunnable = Runnable {
            Log.w(TAG, "Timed out while probing ${candidate.device.address} for service $serviceUuid")
            finish(null)
        }
        mainHandler.postAtTime(timeoutRunnable, candidate.device.address, SystemClock.uptimeMillis() + 6000)

        val callback = object : BluetoothGattCallback() {
            override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
                if (status != BluetoothGatt.GATT_SUCCESS) {
                    Log.w(TAG, "Probe connect failed for ${gatt.device.address} status=$status")
                    finish(null)
                    return
                }

                if (newState == BluetoothProfile.STATE_CONNECTED) {
                    try {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                            gatt.requestMtu(512)
                        } else {
                            gatt.discoverServices()
                        }
                    } catch (_: SecurityException) {
                        finish(null)
                    }
                } else if (newState == BluetoothProfile.STATE_DISCONNECTED && !finished) {
                    finish(null)
                }
            }

            override fun onMtuChanged(gatt: BluetoothGatt, mtu: Int, status: Int) {
                try {
                    gatt.discoverServices()
                } catch (_: SecurityException) {
                    finish(null)
                }
            }

            override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
                if (status != BluetoothGatt.GATT_SUCCESS) {
                    Log.w(TAG, "Probe service discovery failed for ${gatt.device.address} status=$status")
                    finish(null)
                    return
                }

                val discoveredServices = gatt.services.orEmpty().map { it.uuid.toString().lowercase() }
                Log.i(TAG, "Probed services for ${gatt.device.address}: $discoveredServices")
                val matched = gatt.services.orEmpty().any { it.uuid == serviceUuid }
                finish(if (matched) gatt else null)
            }
        }

        try {
            gattRef = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                candidate.device.connectGatt(reactApplicationContext, false, callback, BluetoothDevice.TRANSPORT_LE)
            } else {
                candidate.device.connectGatt(reactApplicationContext, false, callback)
            }
        } catch (_: SecurityException) {
            mainHandler.removeCallbacksAndMessages(candidate.device.address)
            onComplete(null)
        }
    }

    private fun shouldProbeCandidate(candidate: ScanCandidate, serviceUuid: UUID): Boolean {
        if (candidate.serviceUuids.any { it == serviceUuid }) {
            return true
        }

        val requestedService = serviceUuid.toString().lowercase()
        val name = candidate.name.orEmpty()
        return when (requestedService) {
            UART_SERVICE_UUID -> name.equals("Mac BLE UART", ignoreCase = true)
            WEIGHT_SCALE_SERVICE_UUID -> name.equals("Mac Weight Scale", ignoreCase = true)
            BLOOD_PRESSURE_SERVICE_UUID -> name.equals("Mac Blood Pressure", ignoreCase = true)
            EBIKE_SERVICE_UUID -> name.equals("Mac E-Bike", ignoreCase = true) ||
                name.contains("e-bike", ignoreCase = true)
            else -> false
        }
    }

    private fun findDevice(deviceId: String): BluetoothDevice? {
        val cached = devices[deviceId]
        if (cached != null) {
            return cached
        }

        return if (BluetoothAdapter.checkBluetoothAddress(deviceId)) {
            bluetoothAdapter?.getRemoteDevice(deviceId)
        } else {
            null
        }
    }

    private fun findGatt(deviceId: String): BluetoothGatt? {
        return gatts[deviceId] ?: devices[deviceId]?.address?.let { address -> gatts[address] }
    }

    private fun matchesRequestedDevice(result: ScanResult, serviceUuid: UUID): Boolean {
        val advertisedServiceUuids = result.scanRecord
            ?.serviceUuids
            ?.map { parcelUuid -> parcelUuid.uuid }
            .orEmpty()
        val name = scanDeviceName(result).orEmpty()
        val hasRequestedService = advertisedServiceUuids.any { advertisedUuid ->
            advertisedUuid == serviceUuid
        }

        if (hasRequestedService) {
            return true
        }

        val requestedService = serviceUuid.toString().lowercase()
        return when (requestedService) {
            UART_SERVICE_UUID -> name.equals("Mac BLE UART", ignoreCase = true)
            WEIGHT_SCALE_SERVICE_UUID -> name.equals("Mac Weight Scale", ignoreCase = true)
            BLOOD_PRESSURE_SERVICE_UUID -> name.equals("Mac Blood Pressure", ignoreCase = true)
            EBIKE_SERVICE_UUID -> name.equals("Mac E-Bike", ignoreCase = true)
            else -> false
        }
    }

    private fun scanDeviceName(result: ScanResult): String? {
        return result.scanRecord?.deviceName ?: try {
            result.device.name
        } catch (_: SecurityException) {
            null
        }
    }

    private fun findCharacteristic(
        gatt: BluetoothGatt,
        serviceUuid: String,
        characteristicUuid: String,
        promise: Promise
    ): BluetoothGattCharacteristic? {
        val serviceId = parseUuid(serviceUuid, promise) ?: return null
        val characteristicId = parseUuid(characteristicUuid, promise) ?: return null
        val service: BluetoothGattService? = gatt.getService(serviceId)
        if (service == null) {
            promise.reject("BLE_SERVICE_NOT_FOUND", "Service $serviceUuid was not discovered")
            return null
        }

        val characteristic = service.getCharacteristic(characteristicId)
        if (characteristic == null) {
            promise.reject("BLE_CHARACTERISTIC_NOT_FOUND", "Characteristic $characteristicUuid was not discovered")
            return null
        }

        return characteristic
    }

    private fun parseUuid(value: String, promise: Promise): UUID? {
        return try {
            UUID.fromString(value)
        } catch (error: IllegalArgumentException) {
            promise.reject("BLE_INVALID_UUID", "Invalid UUID: $value", error)
            null
        }
    }

    private fun hasBluetoothPermissions(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            hasPermission(Manifest.permission.BLUETOOTH_SCAN) &&
                hasPermission(Manifest.permission.BLUETOOTH_CONNECT)
        } else {
            hasPermission(Manifest.permission.ACCESS_FINE_LOCATION)
        }
    }

    private fun hasPermission(permission: String): Boolean {
        return reactApplicationContext.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED
    }

    private fun closeGatt(gatt: BluetoothGatt) {
        gatts.entries.removeAll { it.value == gatt }
        try {
            gatt.close()
        } catch (_: SecurityException) {
        }
    }
}
