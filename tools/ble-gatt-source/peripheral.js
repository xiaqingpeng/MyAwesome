const bleno = require('@abandonware/bleno');

const PROFILE_ALIASES = {
  uart: 'uart',
  scale: 'scale',
  weight: 'scale',
  'weight-scale': 'scale',
  bp: 'blood-pressure',
  blood: 'blood-pressure',
  'blood-pressure': 'blood-pressure',
  ebike: 'ebike',
  'e-bike': 'ebike',
  bike: 'ebike',
};

const PROFILE_NAMES = {
  uart: 'Mac BLE UART',
  scale: 'Mac Weight Scale',
  'blood-pressure': 'Mac Blood Pressure',
  ebike: 'Mac E-Bike',
};

const UUIDS = {
  uartService: '6e400001b5a3f393e0a9e50e24dcca9e',
  uartTxWrite: '6e400002b5a3f393e0a9e50e24dcca9e',
  uartRxRead: '6e400003b5a3f393e0a9e50e24dcca9e',
  weightScaleService: '181d',
  weightMeasurement: '2a9d',
  bloodPressureService: '1810',
  bloodPressureMeasurement: '2a35',
  bloodPressureFeature: '2a49',
  // E-Bike custom service (vendor-defined 128-bit UUIDs)
  ebikeService:      'e7000001-a0c0-4e8b-b3d0-1a2b3c4d5e6f',
  ebikeControl:      'e7000002-a0c0-4e8b-b3d0-1a2b3c4d5e6f', // write: commands
  ebikeStatus:       'e7000003-a0c0-4e8b-b3d0-1a2b3c4d5e6f', // read/notify: status
};

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const profile = PROFILE_ALIASES[args.get('--profile') || 'uart'];
if (!profile) {
  console.error('Usage: sudo node peripheral.js --profile uart|scale|blood-pressure|ebike');
  process.exit(1);
}

function numberArg(name, fallback) {
  const value = Number(args.get(name));
  return Number.isFinite(value) ? value : fallback;
}

const weightKg = numberArg('--weight-kg', 72.4);
const systolic = numberArg('--sys', 120);
const diastolic = numberArg('--dia', 80);
const meanArterialPressure = numberArg('--map', 93);

// E-Bike simulated state
const ebikeState = {
  power: true,       // 开机
  locked: false,     // 未锁车
  battery: 78,       // 电量 %
  speed: 0,          // km/h
  odometer: 1234,    // km
};

let activeServiceConfig = null;

function encodeWeightMeasurement(kg) {
  const flags = 0x00;
  const rawWeight = Math.round(kg / 0.005);
  return Buffer.from([flags, rawWeight & 0xff, (rawWeight >> 8) & 0xff]);
}

function encodeSFloat(value) {
  const exponent = -1;
  const mantissa = Math.round(value * 10);
  const raw = ((exponent & 0x0f) << 12) | (mantissa & 0x0fff);
  return Buffer.from([raw & 0xff, (raw >> 8) & 0xff]);
}

function encodeBloodPressureMeasurement(sys, dia, map) {
  const flags = Buffer.from([0x00]);
  return Buffer.concat([flags, encodeSFloat(sys), encodeSFloat(dia), encodeSFloat(map)]);
}

function notifySubscribers(subscribers, payload) {
  subscribers.forEach(updateValueCallback => updateValueCallback(payload));
}

function createUartService() {
  const subscribers = new Set();

  const txWrite = new bleno.Characteristic({
    uuid: UUIDS.uartTxWrite,
    properties: ['write', 'writeWithoutResponse'],
    onWriteRequest(data, offset, withoutResponse, callback) {
      const text = data.toString('utf8');
      console.log(`phone -> mac: ${text}`);
      notifySubscribers(subscribers, Buffer.from(`echo: ${text}`));
      callback(this.RESULT_SUCCESS);
    },
  });

  const rxRead = new bleno.Characteristic({
    uuid: UUIDS.uartRxRead,
    properties: ['read', 'notify'],
    onReadRequest(offset, callback) {
      const data = Buffer.from('hello from mac');
      callback(this.RESULT_SUCCESS, data.slice(offset));
    },
    onSubscribe(maxValueSize, updateValueCallback) {
      subscribers.add(updateValueCallback);
      updateValueCallback(Buffer.from('uart notify: ready'));
    },
    onUnsubscribe() {
      subscribers.clear();
    },
  });

  return new bleno.PrimaryService({
    uuid: UUIDS.uartService,
    characteristics: [txWrite, rxRead],
  });
}

function createWeightScaleService() {
  const subscribers = new Set();

  const measurement = new bleno.Characteristic({
    uuid: UUIDS.weightMeasurement,
    properties: ['read', 'notify', 'indicate'],
    onReadRequest(offset, callback) {
      const payload = encodeWeightMeasurement(weightKg);
      console.log(`weight read: ${weightKg.toFixed(2)} kg -> ${payload.toString('hex')}`);
      callback(this.RESULT_SUCCESS, payload.slice(offset));
    },
    onSubscribe(maxValueSize, updateValueCallback) {
      subscribers.add(updateValueCallback);
      updateValueCallback(encodeWeightMeasurement(weightKg));
    },
    onUnsubscribe() {
      subscribers.clear();
    },
  });

  setInterval(() => {
    notifySubscribers(subscribers, encodeWeightMeasurement(weightKg));
  }, 3000);

  return new bleno.PrimaryService({
    uuid: UUIDS.weightScaleService,
    characteristics: [measurement],
  });
}

function createBloodPressureService() {
  const subscribers = new Set();

  const measurement = new bleno.Characteristic({
    uuid: UUIDS.bloodPressureMeasurement,
    properties: ['read', 'notify', 'indicate'],
    onReadRequest(offset, callback) {
      const payload = encodeBloodPressureMeasurement(systolic, diastolic, meanArterialPressure);
      console.log(`bp read: ${systolic}/${diastolic} map ${meanArterialPressure} -> ${payload.toString('hex')}`);
      callback(this.RESULT_SUCCESS, payload.slice(offset));
    },
    onSubscribe(maxValueSize, updateValueCallback) {
      subscribers.add(updateValueCallback);
      updateValueCallback(encodeBloodPressureMeasurement(systolic, diastolic, meanArterialPressure));
    },
    onUnsubscribe() {
      subscribers.clear();
    },
  });

  const feature = new bleno.Characteristic({
    uuid: UUIDS.bloodPressureFeature,
    properties: ['read'],
    onReadRequest(offset, callback) {
      callback(this.RESULT_SUCCESS, Buffer.from([0x00, 0x00]).slice(offset));
    },
  });

  setInterval(() => {
    notifySubscribers(
      subscribers,
      encodeBloodPressureMeasurement(systolic, diastolic, meanArterialPressure),
    );
  }, 3000);

  return new bleno.PrimaryService({
    uuid: UUIDS.bloodPressureService,
    characteristics: [measurement, feature],
  });
}

// E-Bike status packet: [power(1), locked(1), battery(1), speed(1), odometer_lo(1), odometer_hi(1)]
function encodeEbikeStatus() {
  return Buffer.from([
    ebikeState.power ? 0x01 : 0x00,
    ebikeState.locked ? 0x01 : 0x00,
    ebikeState.battery & 0xff,
    Math.round(ebikeState.speed) & 0xff,
    ebikeState.odometer & 0xff,
    (ebikeState.odometer >> 8) & 0xff,
  ]);
}

// Command byte definitions (phone -> bike)
const CMD_POWER_ON   = 0x01;
const CMD_POWER_OFF  = 0x02;
const CMD_LOCK       = 0x03;
const CMD_UNLOCK     = 0x04;
const CMD_FIND       = 0x05; // beep/flash to locate bike

function parseEbikeCommand(data) {
  if (!data || data.length === 0) {
    return undefined;
  }

  const textCommand = data.toString('utf8').trim().toLowerCase();
  switch (textCommand) {
    case 'on':
    case 'power on':
    case 'power_on':
      return CMD_POWER_ON;
    case 'off':
    case 'power off':
    case 'power_off':
      return CMD_POWER_OFF;
    case 'lock':
      return CMD_LOCK;
    case 'unlock':
      return CMD_UNLOCK;
    case 'find':
    case 'locate':
      return CMD_FIND;
    default:
      return data[0];
  }
}

function createEbikeService() {
  const subscribers = new Set();

  const control = new bleno.Characteristic({
    uuid: UUIDS.ebikeControl,
    properties: ['write', 'writeWithoutResponse'],
    onWriteRequest(data, _offset, _withoutResponse, callback) {
      const cmd = parseEbikeCommand(data);
      switch (cmd) {
        case CMD_POWER_ON:
          ebikeState.power = true;
          console.log('e-bike: POWER ON');
          break;
        case CMD_POWER_OFF:
          ebikeState.power = false;
          ebikeState.speed = 0;
          console.log('e-bike: POWER OFF');
          break;
        case CMD_LOCK:
          ebikeState.locked = true;
          console.log('e-bike: LOCKED');
          break;
        case CMD_UNLOCK:
          ebikeState.locked = false;
          console.log('e-bike: UNLOCKED');
          break;
        case CMD_FIND:
          console.log('e-bike: FIND BIKE 🔔 (beep beep!)');
          break;
        default:
          console.log(`e-bike: unknown command ${cmd === undefined ? '<empty>' : `0x${cmd.toString(16)}`}`);
      }
      // Notify subscribers with updated status
      notifySubscribers(subscribers, encodeEbikeStatus());
      callback(this.RESULT_SUCCESS);
    },
  });

  const status = new bleno.Characteristic({
    uuid: UUIDS.ebikeStatus,
    properties: ['read', 'notify'],
    onReadRequest(offset, callback) {
      const payload = encodeEbikeStatus();
      console.log(`e-bike status read: power=${ebikeState.power} locked=${ebikeState.locked} battery=${ebikeState.battery}%`);
      callback(this.RESULT_SUCCESS, payload.slice(offset));
    },
    onSubscribe(_maxValueSize, updateValueCallback) {
      subscribers.add(updateValueCallback);
      updateValueCallback(encodeEbikeStatus());
    },
    onUnsubscribe() {
      subscribers.clear();
    },
  });

  // Simulate battery drain and speed changes every 5s
  setInterval(() => {
    if (ebikeState.power && !ebikeState.locked) {
      ebikeState.speed = Math.min(25, ebikeState.speed + Math.random() * 3);
      ebikeState.battery = Math.max(0, ebikeState.battery - 0.1);
    } else {
      ebikeState.speed = Math.max(0, ebikeState.speed - 2);
    }
    notifySubscribers(subscribers, encodeEbikeStatus());
  }, 5000);

  return new bleno.PrimaryService({
    uuid: UUIDS.ebikeService,
    characteristics: [control, status],
  });
}

function createService() {
  if (profile === 'scale') {
    return {
      advertisedServices: [UUIDS.weightScaleService],
      primaryService: createWeightScaleService(),
    };
  }

  if (profile === 'blood-pressure') {
    return {
      advertisedServices: [UUIDS.bloodPressureService],
      primaryService: createBloodPressureService(),
    };
  }

  if (profile === 'ebike') {
    return {
      advertisedServices: [UUIDS.ebikeService],
      primaryService: createEbikeService(),
    };
  }

  return {
    advertisedServices: [UUIDS.uartService],
    primaryService: createUartService(),
  };
}

bleno.on('stateChange', state => {
  console.log(`BLE state: ${state}`);
  if (state !== 'poweredOn') {
    bleno.stopAdvertising();
    return;
  }

  activeServiceConfig = createService();
  const { advertisedServices } = activeServiceConfig;
  bleno.startAdvertising(PROFILE_NAMES[profile], advertisedServices, error => {
    if (error) {
      console.error('advertising error:', error);
    }
  });
});

bleno.on('advertisingStart', error => {
  if (error) {
    console.error('advertisingStart error:', error);
    return;
  }

  const { primaryService } = activeServiceConfig || createService();
  bleno.setServices([primaryService], serviceError => {
    if (serviceError) {
      console.error('setServices error:', serviceError);
      return;
    }

    console.log(`advertising ${PROFILE_NAMES[profile]}`);
    if (profile === 'scale') {
      console.log(`weight measurement: ${weightKg.toFixed(2)} kg`);
    }
    if (profile === 'blood-pressure') {
      console.log(`blood pressure measurement: ${systolic}/${diastolic} map ${meanArterialPressure}`);
    }
    if (profile === 'ebike') {
      console.log(
        `e-bike status: power=${ebikeState.power} locked=${ebikeState.locked} battery=${ebikeState.battery}% odometer=${ebikeState.odometer}km`,
      );
    }
  });
});

process.on('SIGINT', () => {
  bleno.stopAdvertising(() => process.exit(0));
});
