package com.myawesome

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.myawesome.specs.NativeVersionInfoSpec

class VersionInfoModule(reactContext: ReactApplicationContext) :
    NativeVersionInfoSpec(reactContext) {

    companion object {
        const val NAME = "VersionInfo"
    }

    override fun getName(): String = NAME

    override fun getVersionName(promise: Promise) {
        try {
            promise.resolve(getPackageInfo().versionName ?: "")
        } catch (e: Exception) {
            promise.reject("VERSION_NAME_ERROR", "Failed to get app version name", e)
        }
    }

    @Suppress("DEPRECATION")
    override fun getBuildNumber(promise: Promise) {
        try {
            promise.resolve(getPackageInfo().versionCode.toString())
        } catch (e: Exception) {
            promise.reject("BUILD_NUMBER_ERROR", "Failed to get app build number", e)
        }
    }

    @Suppress("DEPRECATION")
    private fun getPackageInfo() =
        reactApplicationContext.packageManager.getPackageInfo(
            reactApplicationContext.packageName,
            0
        )
}
