import { Pack } from './pack';

describe('Pack', () => {
  it('should create an instance', () => {
    const pack = new Pack('Starter', 10);
    expect(pack).toBeTruthy();
  });
});
