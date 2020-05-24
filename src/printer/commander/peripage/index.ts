const CMD = '\x10';

const handshake = async (): Promise<Buffer[]> => {
  return [
    // 16, -1, -2, 1
    Buffer.from(`${CMD}\xff\xfe\x01`, 'ascii'),
  ];
};

const wakeup = async (): Promise<Buffer[]> => {
  return [
    // Apparently 12 bytes of 0s wakes up a sleepy printer :\
    Buffer.from(`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`, 'ascii'),
  ];
};

const setPowerOffTime = async (time: number): Promise<Buffer[]> => {
  const timeLow = time % 256;
  const timeHigh = time / 256;
  return [
    // 16, -1, 18, (byte) (i2 / 256), (byte) (i2 % 256)
    Buffer.from(
      `${CMD}\xff\x12` + timeHigh.toString() + timeLow.toString(),
      'ascii'
    ),
  ];
};

const queryBatteryLevel = async (): Promise<Buffer[]> => {
  return [
    //16, -1, 80, -15
    Buffer.from(`${CMD}\xff\x50\xf0`, 'ascii'),
  ];
};

const setThickness = async (thickness: number): Promise<Buffer[]> => {
  return [
    // 16, -1, 16, 0, thickness
    Buffer.from(`${CMD}\xff\x10\x00` + thickness.toString(), 'ascii'),
  ];
};

const queryModel = async (): Promise<Buffer[]> => {
  return [Buffer.from(`${CMD}\xff\x20\xf0`, 'ascii')];
};

const queryVersion = async (): Promise<Buffer[]> => {
  return [Buffer.from(`${CMD}\xff\x20\xf1`, 'ascii')];
};

const querySerialNumber = async (): Promise<Buffer[]> => {
  return [Buffer.from(`${CMD}\xff\x20\xf2`, 'ascii')];
};

export {
  handshake,
  wakeup,
  setPowerOffTime,
  setThickness,
  queryBatteryLevel,
  queryModel,
  querySerialNumber,
  queryVersion,
};

export { feed, raster as image } from '../escpos';
