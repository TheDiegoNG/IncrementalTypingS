import { Card, CardType, BonusType } from './card';

describe('Card', () => {
  it('should create an instance', () => {
    const card = new Card('Test Card', 'Common' as CardType, 'PointsAmount' as BonusType, 1);
    expect(card).toBeTruthy();
  });
});
