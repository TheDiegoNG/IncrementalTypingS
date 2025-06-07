import { Achievement } from './achievement';

describe('Achievement', () => {
  it('should create an instance', () => {
    const ach = new Achievement('Ach', 'desc', 1, 10, 'Other');
    expect(ach).toBeTruthy();
  });
});
