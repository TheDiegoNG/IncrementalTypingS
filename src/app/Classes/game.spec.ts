import { Game } from './game';

describe('Game', () => {
  it('should create an instance', () => {
    const game = new Game(0, 'Active');
    expect(game).toBeTruthy();
  });
});
