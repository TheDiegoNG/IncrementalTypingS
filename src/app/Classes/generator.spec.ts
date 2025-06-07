import { Generator } from './generator';

describe('Generator', () => {
  it('should create an instance', () => {
    const gen = new Generator('Gen', 10, 1);
    expect(gen).toBeTruthy();
  });
});
