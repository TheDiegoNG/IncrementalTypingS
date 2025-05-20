import { ExponentialNumberPipe } from './exponential-number.pipe'
describe('ExponentialNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ExponentialNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
