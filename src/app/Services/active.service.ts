import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
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

  CalculateMultiUpgradesPoints(): [string, string, number, number] {
    let sumBonus = '';
    let multiBonus = '';
    let bonusesValues: number = 1;
    let bonusesSumsValues: number = 0;
    const muPoints = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id === 'MultiUpgradePoints')!;
    const muMulti = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id == 'MultiUpgradePointsMult')!;

    if (muPoints.count > 0) {
      sumBonus = ' + [MultiUpgrade1]';
      bonusesSumsValues = muPoints.count;
    }

    if (muMulti.count > 0) {
      multiBonus = ' x [MultiUpgrade 2] * 1.25';
      bonusesValues = muMulti.count * 1.25;
    }

    return [sumBonus, multiBonus, bonusesSumsValues, bonusesValues];
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
      const lettersBonus = this.gameService.game().lettersBonus;
      lettersBonus[index]++;
      this.gameService.game.update((game) => ({
        ...game,
        prestigePoints: game.prestigePoints - letterBonus,
        lettersBonus: lettersBonus,
      }));
    }
  }
}
