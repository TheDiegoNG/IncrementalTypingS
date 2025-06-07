import { Mastery } from './mastery';

describe('Mastery', () => {
  it('should create an instance', () => {
    const mas = new Mastery('Alpha', ['a']);
    expect(mas).toBeTruthy();
  });
});
