const CMD = '\x10';

const handshake = async (): Promise<Buffer[]> => {
  return [
    // 16, -1, -2, 1
    Buffer.from(`${CMD}\xff\xfe\x01`, 'ascii'),
  ];
};

const setPowerOffTime = async (minutes: number): Promise<Buffer[]> => {
  const timeLow = minutes % 256;
  const timeHigh = minutes / 256;
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
  setPowerOffTime,
  queryModel,
  querySerialNumber,
  queryVersion,
  queryBatteryLevel,
};

export { feed, raster as image } from '../escpos';
