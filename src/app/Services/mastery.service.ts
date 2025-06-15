import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { MasteryTier, MastShopItem } from '../Classes/mastery';
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
          multi *=
            1 +
            this.gameService
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
          multi *=
            1 + Math.log10(this.gameService.game().passivePoints + 1) ** 1.5;
        }
        this.gameService.updateMasteryValue('Dseta', 0.1 * multi);
      } else if ('qz'.includes(letter)) {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhEta')) {
          multi *= 1 + Math.sqrt(this.gameService.game().prestigePoints);
        }
        this.gameService.updateMasteryValue('Eta', 0.1 * multi);
      } else {
        if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'EnhZeta')) {
          multi *=
            1 +
            this.gameService
              .game()
              .masteryLevels.reduce((sum, mast) => sum + mast.level, 0);
        }
        this.gameService.updateMasteryValue('Zeta', 0.1 * multi);
      }
    });
  }

  getMastShopLevel(item: MastShopItem, amount: number) {
    if (this.gameService.game().mastLevelAmount < amount) return;
    this.gameService.game.update((game) => {
      const masteryItem = game.mastShopItems.find((x) => x.name === item.name)!;
      masteryItem.level += amount;
      game.mastLevelAmount -= amount;
      switch(masteryItem.name) {
        case "Lex Incrementum":
          const multiUpgrade1 = game.multiUpgrades.find(x => x.name === "Point Booster")!
          multiUpgrade1.multiBonus *= 1.1
          if(masteryItem.level % 10 === 0) {
            multiUpgrade1.count++
          }
          break;
        
        case "Compounding Glyph":
          const multiUpgrade2 = game.multiUpgrades.find(x => x.name === "Multiplier Mastery")!
          multiUpgrade2.multiBonus *= 1.01
          if(masteryItem.level % 25 === 0) {
            multiUpgrade2.count++
          }
          break;
        
        case "Stasis Mark":
          break;
        
        case "Ascendant Core":
          break;
      }
      return { ...game };
    });
  }
}
