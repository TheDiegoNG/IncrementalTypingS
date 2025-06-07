import { ExponentialNumberPipe } from './exponential-number.pipe'
describe('ExponentialNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ExponentialNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns fixed string for small numbers', () => {
    const pipe = new ExponentialNumberPipe();
    expect(pipe.transform(12345)).toBe('12345');
  });

  it('returns exponential string for large numbers', () => {
    const pipe = new ExponentialNumberPipe();
    expect(pipe.transform(1234567)).toBe('1.23e+6');
  });
});
