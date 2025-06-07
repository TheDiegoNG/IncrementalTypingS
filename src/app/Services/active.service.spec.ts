import { TestBed } from '@angular/core/testing';

import { ActiveService } from './active.service';
import { GameService } from './game.service';
import { Game } from '../Classes/game';

describe('ActiveService', () => {
  let service: ActiveService;
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveService);
    gameService = TestBed.inject(GameService);
    gameService.loadGame(new Game(0, 'Current'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('counts repeated letters correctly', () => {
    expect(service.getRepeatedLetters('letter')).toBe(2);
    expect(service.getRepeatedLetters('abc')).toBe(0);
    expect(service.getRepeatedLetters('Mississippi')).toBe(3);
  });

  it('counts different letters ignoring case', () => {
    expect(service.getDifferentLetters('abc')).toBe(3);
    expect(service.getDifferentLetters('Letter')).toBe(4);
    expect(service.getDifferentLetters('AaAa')).toBe(1);
  });

  it('buys a letter tier when affordable', () => {
    gameService.game.update((g) => ({ ...g, prestigePoints: 5 }));
    const cost = gameService.game().lettersBonus[0];
    service.buyLetterTier(0);
    expect(gameService.game().lettersBonus[0]).toBe(cost + 1);
    expect(gameService.game().prestigePoints).toBe(5 - cost);
  });

  it('does not buy a letter tier if prestige points are insufficient', () => {
    gameService.game.update((g) => ({ ...g, prestigePoints: 1 }));
    const initial = gameService.game().lettersBonus[1];
    service.buyLetterTier(1);
    expect(gameService.game().lettersBonus[1]).toBe(initial);
    expect(gameService.game().prestigePoints).toBe(1);
  });
});
