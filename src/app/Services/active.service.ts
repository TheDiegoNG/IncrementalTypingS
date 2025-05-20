import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { WordsService } from './words.service';
import { MarketService } from './market.service';
import { GameUtils } from '../Utils/gameUtils';
import { MasteryService } from './mastery.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  gameService = inject(GameService);
  marketService = inject(MarketService);
  masteryService = inject(MasteryService);
  private critical: boolean = false;

  constructor() {}

  CalculateMultiUpgradesPoints(): [number, string, number[], number[]] {
    let bonus = '';
    let totalPoints = 0;
    let bonusesValues: number[] = [];
    let bonusesSumsValues: number[] = [];
    const muPoints = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id === 'MultiUpgradePoints')!;
    const muMulti = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id == 'MultiUpgradePointsMult')!;

    if (muPoints.count > 0) {
      totalPoints += muPoints.count;
      bonus += ' + [MultiUpgrade1]';
      bonusesValues.push(muPoints.count);
      bonusesSumsValues.push(muPoints.count);
    }

    if (muMulti.count > 0) {
      totalPoints *= muMulti.count * 1.25;
      bonus += ' x [MultiUpgrade 2] * 1.25';
      bonusesValues.push(muMulti.count * 1.25);
    }

    return [totalPoints, bonus, bonusesValues, bonusesSumsValues];
  }

  getRepeatedLetters(word: string): number {
    const repeatedLetters = new Set<string>();

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (word.lastIndexOf(char) > i) {
        repeatedLetters.add(char);
      }
    }

    return repeatedLetters.size;
  }

  getDifferentLetters(word: string): number {
    const differentLetters = new Set<string>();

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (!differentLetters.has(char)) {
        differentLetters.add(char);
      }
    }

    return differentLetters.size;
  }

  buyLetterTier(index: number) {
    const letterBonus = this.gameService.game().lettersBonus[index];
    if (letterBonus <= this.gameService.game().prestigePoints) {
      this.gameService.game.update((game) => ({
        ...game,
        prestigePoints: game.prestigePoints - letterBonus,
      }));
      const lettersBonus = this.gameService.game().lettersBonus;
      lettersBonus[index]++;
      this.gameService.game.update((game) => ({...game, lettersBonus: lettersBonus}));
    }
  }
}
