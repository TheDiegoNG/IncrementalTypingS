import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { MasteryTier } from '../Classes/mastery';
import { GameUtils } from '../Utils/gameUtils';

@Injectable({
  providedIn: 'root',
})
export class MasteryService {
  gameService = inject(GameService);

  updateMasteryValue(masteryTier: MasteryTier) {
    this.gameService.updateMasteryValue(masteryTier);
  }

  calculateMasteryPoints(letters: string[]) {
    letters.forEach((letter) => {
      let multi = 1;
      if ('aeioulnstr'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhAlpha')) {
          multi *= 1 + this.gameService.game().points ** 0.2;
        }
        this.gameService.updateMasteryValue('Alpha', 0.1 * multi);
      } else if ('dg'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhBeta')) {
          multi *= 1 + this.gameService.game().cardsAmount / 10;
        }
        this.gameService.updateMasteryValue('Beta', 0.1 * multi);
      } else if ('bcmp'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhGamma')) {
          multi *= 1 + Math.sqrt(this.gameService.game().wordsAmount);
        }
        this.gameService.updateMasteryValue('Gamma', 0.1 * multi);
      } else if ('fhvwy'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhDelta')) {
          multi *= 1 + this.gameService
            .game()
            .multiUpgrades.reduce((sum, upgrade) => sum + upgrade.count, 0);
        }
        this.gameService.updateMasteryValue('Delta', 0.1 * multi);
      } else if (letter === 'k') {
        if (
          GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhEpsilon')
        ) {
          multi *= 1 + this.gameService.game().achievements.length;
        }
        this.gameService.updateMasteryValue('Epsilon', 0.1 * multi);
      } else if ('jx'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhDseta')) {
          multi *= 1 + Math.log10(this.gameService.game().passivePoints + 1) ** 1.5;
        }
        this.gameService.updateMasteryValue('Dseta', 0.1 * multi);
      } else if ('qz'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhEta')) {
          multi *= 1 + Math.sqrt(this.gameService.game().prestigePoints);
        }
        this.gameService.updateMasteryValue('Eta', 0.1 * multi);
      } else {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhZeta')) {
          multi *= 1 + this.gameService
            .game()
            .masteryLevels.reduce((sum, mast) => sum + mast.level, 0);
        }
        this.gameService.updateMasteryValue('Zeta', 0.1 * multi);
      }
    });
  }
}
