import { HOST_TAG_NAME, inject, Injectable, signal } from '@angular/core';
import { Achievement } from '../Classes/achievement';
import { Game } from '../Classes/game';
import { GameUtils } from '../Utils/gameUtils';
import { MasteryTier } from '../Classes/mastery';
import { eIdUpgrade, MultiUpgrade, Upgrade } from '../Classes/upgrade';
import { Generator } from '../Classes/generator';
import { ChallengeType } from '../Classes/challenge';
import { UpgradesMenuComponent } from '../Menus/upgrades-menu/upgrades-menu.component';
import { UpgradeService } from './upgrade.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = signal(new Game(1e35, 'Current'));
  challengeGame = signal(new Game(0, 'Challenge'));
  activeGame = signal(new Game(0, 'Active'));

  constructor() {}

  loadGame(game: Game) {
    this.game.set(game);
  }

  loadChallengeGame() {
    this.game.set(GameUtils.deepCopy(this.challengeGame()));
  }

  loadActiveGame() {
    this.game.set(GameUtils.deepCopy(this.activeGame()));
  }

  saveToActiveGame() {
    this.activeGame.set(GameUtils.deepCopy(this.game()));
  }

  //Game

  // updatePoints(points: number) {
  //   const game = this.game.value;
  //   game.points += points;
  //   this.game.next(game);
  // }

  // updateAllTimePoints(points: number) {
  //   const game = this.game.value;
  //   game.allTimePoints += points;
  //   this.game.next(game);
  // }

  // updateWordsAmount() {
  //   const game = this.game.value;
  //   game.wordsAmount++;
  //   this.game.next(game);
  // }

  // updateMaxLength() {
  //   const game = this.game.value;
  //   game.maxLength++;
  //   this.game.next(game);
  // }

  // setBestWord(word: string) {
  //   const game = this.game.value;
  //   game.bestWord = word;
  //   this.game.next(game);
  // }

  // updateLetterCounter(add: number = 1) {
  //   const game = this.game.value;
  //   game.letterCounter += add;
  //   this.game.next(game);
  // }

  // setLetterCounterPerfection(value: number) {
  //   const game = this.game.value;
  //   game.letterCounterPerfection = value;
  //   this.game.next(game);
  // }

  // updateLetterCounterPerfection(add: number = 1) {
  //   const game = this.game.value;
  //   game.letterCounterPerfection += add;
  //   this.game.next(game);
  // }

  // updateWordCounterPerfection(add: number = 1) {
  //   const game = this.game.value;
  //   game.wordCounterPerfection += add;
  //   this.game.next(game);
  // }

  // setWordCounterPerfection(value: number) {
  //   const game = this.game.value;
  //   game.wordCounterPerfection = value;
  //   this.game.next(game);
  // }

  // updateBonusValues(values: number[]) {
  //   const game = this.game.value;
  //   game.bonusValues = values;
  //   this.game.next(game);
  // }

  // updateBonusSumsValues(values: number[]) {
  //   const game = this.game.value;
  //   game.bonusSumsValues = values;
  //   this.game.next(game);
  // }
  // //Passive

  // updatePassivePoints(points: number) {
  //   const game = this.game.value;
  //   game.passivePoints += points;
  //   this.game.next(game);
  // }

  // updatePassiveLength(number: number) {
  //   const game = this.game.value;
  //   game.passiveLength += number;
  //   this.game.next(game);
  // }

  // updatePassiveRate(passiveRatePercentage: number) {
  //   const game = this.game.value;
  //   game.passiveRate -= (game.passiveRate * passiveRatePercentage) / 100;
  //   this.game.next(game);
  // }

  addGenerator(generator: Generator) {
    const game = this.game();
    game.passiveGenerators.push(({...generator}));
    this.game.set({ ...game });
  }

  buyGenerator(id: number) {
    const game = this.game();
    const generator = game.passiveGenerators.find((x) => x.id == id);
    generator!.amountBought++;
    generator!.amountGained++;
    generator!.cost =
      generator!.cost *
      (generator!.amountBought + 1) ** Math.log10(generator!.amountBought + 1);
    this.game.set({ ...game });
  }

  removeGenerators(id: number, cost: number) {
    const game = this.game();
    const generator = game.passiveGenerators.find((x) => x.id == id)!;
    generator.amountGained -= cost;
    this.game.set({ ...game });
  }

  addGainedGenerators(id: number) {
    const game = this.game();
    const generatorGained = game.passiveGenerators.find((x) => x.id == id - 1);
    const generatorGainer = game.passiveGenerators.find((x) => x.id == id);
    generatorGained!.amountGained += generatorGainer!.amountGained;
    this.game.set({ ...game });
  }

  addGainedGeneratorsBoosted(id: number) {
    const game = this.game();
    const generatorGained = game.passiveGenerators.find((x) => x.id == id - 1);
    const generatorGainer = game.passiveGenerators.find((x) => x.id == id);
    generatorGained!.amountGained +=
      generatorGainer!.amountGained *
      game.passiveGenerators.reduce(
        (acc, val) => acc + val.amountBought * val.synergyValue,
        0
      );
    this.game.set({ ...game });
  }

  // //Prestige

  // updatePrestigePoints(points: number) {
  //   const game = this.game.value;
  //   game.prestigePoints += points;
  //   this.game.next(game);
  // }

  updatePrestige(upgradeService: UpgradeService) {
    const game = this.game();
    //Prestige
    const mastShopPres = game.mastShopItems.find(
      (x) => x.name === 'Ascendant Core'
    )!;
    const exp = 1 / 3 + 0.57 * (1 - Math.exp(-0.00005 * mastShopPres.level));
    game.prestigePoints = Math.round(Math.pow(game.points, exp));
    game.prestigeCount++;

    //Points
    game.points = 0;
    game.bonusValues = {};
    game.bonusSumsValues = {};

    //WordBasics
    game.maxLength = 4;

    //Passive
    const generatorCosts = [5, 6, 9, 12, 15, 18, 21, 24, 27, 30];
    if (GameUtils.IsPurchasedUpgrade(game, 'PaE')) {
      const generator = game.passiveGenerators.find((x) => x.name === "Portable Generator")!;
      console.log('Generators:', game.passiveGenerators, "Gen chosen: ", generator);
      generator.amountGained = 0;
      generator.amountBought = 0;
      generator.cost = generatorCosts[0];
      console.log("Generator after modification: ", generator)
      game.passiveGenerators = [generator];
      console.log("Final PassGen in Game: ", game.passiveGenerators)
    }
    // game.passiveGenerators.forEach((passiveGenerator, index) => {
    //   passiveGenerator.amountBought = 0;
    //   passiveGenerator.amountGained = 0;
    //   passiveGenerator.cost = generatorCosts[index];
    // });
    game.passiveUpgrades = [];
    game.passiveLength = 4;
    game.passivePoints = 0;
    game.passiveRate = 1000;
    game.passiveCharges = 0;

    //Upgrades
    game.upgrades = [];
    let maintainsPassive = GameUtils.IsPurchasedPrestigeUpgrade(
      this.game(),
      'KeepPas'
    );
    if (maintainsPassive) {
      this.addUpgrade(
        upgradeService.starterUpgrades.find((x) => x.id === 'PaE')!
      );
      this.buyGenerator(1);
    }
    const MUcosts = [50, 500, 1000, 1000];
    game.multiUpgrades.forEach((multiUpgrade, index) => {
      multiUpgrade.count = 0;
      multiUpgrade.amountBought = 0;
      multiUpgrade.cost = MUcosts[index];
    });

    //Cards
    game.cards = [];
    game.cardsAmount = 0;
    game.cardCost = 0;
    game.packs = [];

    //Challenges
    game.challenges = [];
    game.challengesAmount = 0;

    //Modules
    game.modulesUnlocked = [];
    game.mergeAmount = 10;
    game.mergeCardsCost = 200;
    game.mergeCount = 0;
    game.lettersBonus = [1, 2, 3, 4, 5, 8, 10, 20];

    //Market
    game.marketBonus = [];

    this.game.set({ ...game });
  }

  // //Achievement

  // addAchievement(achievement: Achievement) {
  //   const game = this.game.value;
  //   game.achievements.push(achievement);
  //   this.game.next(game);
  // }

  updateAchievements() {
    const game = this.challengeGame();
    game.achievements = GameUtils.deepCopy(this.game().achievements);
    this.challengeGame.set({ ...game });
  }

  // //Upgrades

  addUpgrade(upgrade: Upgrade) {
    const game = this.game();
    game.upgrades.push(upgrade);
    this.game.set({ ...game });
  }

  addPassiveUpgrade(upgrade: Upgrade) {
    const game = this.game();
    game.passiveUpgrades.push(upgrade);
    this.game.set({ ...game });
  }

  addPrestigeUpgrade(upgrade: Upgrade) {
    const game = this.game();
    game.prestigeUpgrades.push(upgrade);
    this.game.set({ ...game });
  }

  addMultiUpgrade(upgrade: MultiUpgrade) {
    const game = this.game();
    game.multiUpgrades.push(upgrade);
    this.game.set({ ...game });
  }

  buyMultiUpgrade(id: eIdUpgrade) {
    const game = this.game();
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.amountBought++;
    upgrade!.count++;
    this.game.set({ ...game });
  }

  setMultiUpgradeCost(id: eIdUpgrade, bonus: number) {
    const game = this.game();
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.cost *=
      ((upgrade!.amountBought + 1) / bonus) **
      Math.log10((upgrade!.amountBought + 1) / bonus + 1);
    this.game.set({ ...game });
  }

  updateTaxEvasion() {
    const game = this.game();
    const brokenCards = game.cards.filter(
      (x) => x.type === 'Broken' && !x.description.includes('Halved')
    );
    brokenCards.forEach((card) => {
      let savedCard = game.cards.find((x) => x === card)!;
      savedCard.bonusAmount = Math.floor(savedCard.bonusAmount / 2);
      switch (savedCard.bonusType) {
        case 'PointsPercentage':
          savedCard.description = `${savedCard.bonusAmount}% Points Per Word (Halved)`;
          break;
        case 'PassivePointsPercentage':
          savedCard.description = `${savedCard.bonusAmount}% Passive Points Per Word (Halved)`;
          break;
        case 'PointsAmount':
          savedCard.description = `${savedCard.bonusAmount} Points Per Word (Halved)`;
          break;
        case 'PassivePointsAmount':
          savedCard.description = `${savedCard.bonusAmount} Passive Points Per Word (Halved)`;
          break;
        case 'PassivePointsSpeed':
          savedCard.description = `Generate Passive Words ${savedCard.bonusAmount}% Faster (Halved)`;
          break;
        case 'PassivePointsLength':
          savedCard.description = `${savedCard.bonusAmount} Passive Word Length (Halved)`;
          break;
        default:
          break;
      }
    });
    this.game.set({ ...game });
  }

  // //Cards

  // updateRollsAmount(amount: number) {
  //   const game = this.game.value;
  //   game.rollsAmount += amount;
  //   this.game.next(game);
  // }

  // updateRollsAmountActive(amount: number) {
  //   const game = this.activeGame.value;
  //   game.rollsAmount += amount;
  //   this.activeGame.next(game);
  // }

  updateCardsCost() {
    const game = this.game();
    game.cardCost =
      100000 * 2 ** game.packs.filter((pack) => pack.type === 'Starter').length;
    this.game.set({ ...game });
  }

  // addCard(card: Card) {
  //   const game = this.game.value;
  //   game.cards.push(card);
  //   this.game.next(game);
  //   this.updateTaxEvasion();
  // }

  // addPack(pack: Pack) {
  //   const game = this.game.value;
  //   game.packs.push(pack);
  //   this.game.next(game);
  // }

  // addCardsAmount() {
  //   const game = this.game.value;
  //   game.cardsAmount++;
  //   this.game.next(game);
  // }

  // addMergeCount() {
  //   const game = this.game.value;
  //   game.mergeCount++;
  //   this.game.next(game);
  // }

  // resetCards() {
  //   const game = this.game.value;
  //   game.cards = [];
  //   game.cardsAmount = 0;
  //   this.game.next(game);
  // }

  // //Challenges

  updateChallengeState(state: boolean, challengeType: ChallengeType) {
    const game = this.game();
    game.challenges.find((x) => x.type == challengeType)!.onChallenge = state;
    this.game.set({ ...game });
  }

  // resetLetterCounter() {
  //   const game = this.game.value;
  //   game.letterCounter = 0;
  //   this.game.next(game);
  // }

  completeChallenge(challengeType: ChallengeType) {
    const game = this.activeGame();
    game.challenges.find((x) => x.type == challengeType)!.amount++;
    game.challengesAmount++;
    this.activeGame.set({ ...game });
  }

  updateChallenges() {
    const game = this.challengeGame();
    game.challenges = GameUtils.deepCopy(this.game().challenges);
    this.challengeGame.set({ ...game });
  }

  // //Modules

  // updateMergeCardCost(amount: number) {
  //   const game = this.game.value;
  //   game.mergeCardsCost += amount;
  //   this.game.next(game);
  // }

  // updateMergeCardAmount() {
  //   const game = this.game.value;
  //   game.mergeAmount--;
  //   this.game.next(game);
  // }

  // addLettersValue(index: number) {
  //   const game = this.game.value;
  //   game.lettersBonus[index]++;
  //   this.game.next(game);
  // }

  unlockModule(index: number) {
    const game = this.game();
    game.modulesUnlocked[index] = true;
    this.game.set({ ...game });
  }

  addSynergyValue(generatorNumber: number) {
    const game = this.game();
    const generator = game.passiveGenerators.find(
      (x) => x.id === generatorNumber
    )!;
    generator.synergyValue++;
    generator.synergyCost = generator.synergyCost * 2 ** generator.synergyValue;
    this.game.set({ ...game });
  }

  // //Mastery

  updateMasteryValue(masteryTier: MasteryTier, amount: number = 1) {
    this.game.update((game) => {
      const mastery = game.masteryLevels.find((x) => x.tier === masteryTier)!;
      const baseCost = mastery.costToLevelUp;
      mastery.amount = Number((mastery.amount + amount).toFixed(2));
      console.log('Updating mastery: ', mastery, baseCost, amount);
      const levelsGained = Math.floor(Math.log2(mastery.amount / baseCost + 1));
      if (levelsGained > 0) {
        // Nueva cantidad consumida en total
        const totalCost = baseCost * (Math.pow(2, levelsGained) - 1);

        mastery.amount -= totalCost;
        mastery.level += levelsGained;
        mastery.costToLevelUp = baseCost * Math.pow(2, levelsGained);
        game.mastLevelAmount += levelsGained;
      }
      return { ...game };
    });
  }
}
