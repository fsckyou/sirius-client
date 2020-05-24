const handshake = async (): Promise<Buffer[]> => {
  return [
    // 16, -1, -2, 1
    Buffer.from(`\x10\xff\xfe\x01`, 'ascii'),
  ];
};

const wakeup = async (): Promise<Buffer[]> => {
  return [
    // Apparently 12 bytes of 0s wakes up a sleepy printer :\
    Buffer.from(`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`, 'ascii'),
  ];
};

const setShutoffTime = async (time: number): Promise<Buffer[]> => {
  const timeLow = time % 256;
  const timeHigh = time / 256;
  return [
    // 16, -1, 18, (byte) (i2 / 256), (byte) (i2 % 256)
    Buffer.from(
      `\x10\xff\x12` + timeHigh.toString() + timeLow.toString(),
      'ascii'
    ),
  ];
};

const setThickness = async (thickness: number): Promise<Buffer[]> => {
  return [
    // 16, -1, 16, 0, thickness
    Buffer.from(`\x10\xff\x10\x00` + thickness.toString(), 'ascii'),
  ];
};

export { handshake, wakeup, setThickness, setShutoffTime };

export { feed, raster as image } from '../escpos';
