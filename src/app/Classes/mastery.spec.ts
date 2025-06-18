import { Mastery } from './mastery';

describe('Mastery', () => {
  it('should create an instance', () => {
    const mas = new Mastery('Alpha', ['a'], 1);
    expect(mas).toBeTruthy();
  });
});
