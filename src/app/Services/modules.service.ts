import { computed, effect, inject, Injectable } from '@angular/core';
import { AchievementService } from './achievement.service';
import { ActiveService } from './active.service';
import { CardService } from './card.service';
import { GameService } from './game.service';
import { Card } from '../Classes/card';
import { Generator } from '../Classes/generator';
import { GameUtils } from '../Utils/gameUtils';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  gameService = inject(GameService);
  cardService = inject(CardService);
  activeService = inject(ActiveService);
  achievementService = inject(AchievementService);

  cards: Card[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  totalCards: number = 0;
  lettersBonus: number[] = [];
  generators: Generator[] = [];
  scrabbleModuleBought: boolean = false;
  synergyModuleBought: boolean = false;
  mergeModuleBought: boolean = false;
  scrabbleModuleAvailable: boolean = false;
  synergyModuleAvailable: boolean = false;
  mergeModuleAvailable: boolean = false;

  constructor() {
    effect(() => {
      const game = this.gameService.game();
      const seenIds: { [id: string]: boolean } = {};

      const distinctCards = game.cards.reduce((acc: Card[], card) => {
        if (!seenIds[card.id]) {
          seenIds[card.id] = true; // mark ID as seen
          acc.push(card); // add card to the accumulator array
        }
        return acc;
      }, []);

      this.cards = distinctCards;
      this.mergeAmount = game.mergeAmount;
      this.mergeCardsCost = game.mergeCardsCost;
      this.totalCards = game.cards.length;
      this.lettersBonus = game.lettersBonus;
      this.generators = game.passiveGenerators;
      this.scrabbleModuleBought = game.modulesUnlocked[0];
      this.synergyModuleBought = game.modulesUnlocked[1];
      this.mergeModuleBought = game.modulesUnlocked[2];
      this.scrabbleModuleAvailable = game.upgrades.some(
        (x) => x.id === 'ScrM'
      );
      this.synergyModuleAvailable = game.upgrades.some(
        (x) => x.id === 'PassiveMoreModules'
      );
      this.mergeModuleAvailable = game.upgrades.some(
        (x) => x.id === 'MergM'
      );
    });
  }

  mergeCard(card: Card) {
    if (
      card.type === 'Omnipotent' &&
      !GameUtils.IsUnlockedAchievement(
        this.gameService.game(),
        'The Cycle Continues'
      )
    )
      this.achievementService.completeAchievement('The Cycle Continues');
    this.cardService.mergeCards(card);
  }

  isScrabbleModulePurchased() {
    return this.scrabbleModuleBought;
  }

  isSynergyModulePurchased() {
    return this.synergyModuleBought;
  }

  isMergeModulePurchased() {
    return this.mergeModuleBought;
  }

  buyMergeModule() {
    if (
      this.gameService.game().points >= 1_000_000_000_000_000 &&
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'MergM')
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - 1_000_000_000_000_000,
      }));
      this.gameService.unlockModule(2);
    }
  }

  buySynergyModule() {
    if (
      this.gameService.game().points >= 1_000_000_000_000 &&
      GameUtils.IsPurchasedPassiveUpgrade(
        this.gameService.game(),
        'PassiveMoreModules'
      )
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - 1_000_000_000_000,
      }));
      this.gameService.unlockModule(1);
    }
  }

  buyScrabbleModule() {
    if (
      this.gameService.game().points >= 1_000_000_000 &&
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'ScrM')
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - 1_000_000_000,
      }));
      this.gameService.unlockModule(0);
    }
  }

  buySynergyValue(generator: Generator) {
    if (this.gameService.game().passivePoints >= generator.synergyCost) {
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints - generator.synergyCost,
      }));
      this.gameService.addSynergyValue(generator.id);
    }
  }
}
