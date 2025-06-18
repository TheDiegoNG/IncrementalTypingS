import { Era } from './era';

describe('Era', () => {
  it('should create an instance', () => {
    const era = new Era('Test Era', 1, 'desc', 1);
    expect(era).toBeTruthy();
  });
});
