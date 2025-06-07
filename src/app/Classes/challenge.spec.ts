import { Challenge, ChallengeType } from './challenge';

describe('Challenge', () => {
  it('should create an instance', () => {
    const chal = new Challenge(
      'Accuracy' as ChallengeType,
      'Test challenge',
      'Reward',
      60,
      10,
      5
    );
    expect(chal).toBeTruthy();
  });
});
