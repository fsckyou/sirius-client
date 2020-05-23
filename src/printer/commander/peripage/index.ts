const handshake = async (): Promise<Buffer[]> => {
  return [
    // 16, -1, -2, 1, 27, 64, 0
    // 16, -1, -2, 1 are the enable bytes idk what 27, 64, 0 is.
    // extracted bytes: \x1b\x40\x00
    Buffer.from(`\x10\xff\xfe\x01`, 'ascii'),
  ];
};

const wakeup = async (): Promise<Buffer[]> => {
  return [
    // Apparently 12 bytes of 0s wakes up a sleepy printer :\
    Buffer.from(`\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`, 'ascii'),
  ];
};

const setThickness = async (thickness: number): Promise<Buffer[]> => {
  return [
    // 16, -1, 16, 0, thickness
    Buffer.from(`\x10\xff\x10\x00` + thickness.toString(), 'ascii'),
  ];
};

export { handshake, wakeup, setThickness };

export { feed, raster as image } from '../escpos';
