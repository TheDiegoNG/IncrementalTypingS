import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameService } from '../Services/game.service';
import { eIdUpgrade } from '../Classes/upgrade';
import { GameUtils } from '../Utils/gameUtils';
import { MarketService } from './market.service';
import { MasteryService } from './mastery.service';
import { AchievementService } from './achievement.service';
import { ActiveService } from './active.service';
import { CardService } from './card.service';
import { Language, LanguageService } from './language.service';
import { PassiveMenuComponent } from '../Menus/passive-menu/passive-menu.component';
import { PassiveService } from './passive.service';
// import { AchievementsService } from './achievements.service';
// import { ActiveService } from './active.service';
// import { MasteryService } from './mastery.service';
// import { ChallengesService, language } from './challenges.service';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  wordList: string[] = [];
  currentWord = signal('');
  wordShifted = new Subject<void>();
  wordBonus: string = '';
  critical = signal(false);
  hiraganaWordList: string[] = [];
  russianWordList: string[] = [];
  amharicWordList: string[] = [];

  constructor() {
    this.loadWordLists();
    setInterval(() => this.updateBonuses(), 100);
  }

  private async loadWordLists() {
    const [jp, ru, am] = await Promise.all([
      fetch('/words/japanese.json').then((res) => res.json()),
      fetch('/words/russian.json').then((res) => res.json()),
      fetch('/words/amharic.json').then((res) => res.json()),
    ]);
    this.hiraganaWordList = jp;
    this.russianWordList = ru;
    this.amharicWordList = am;
  }

  updateBonuses() {
    const now = Date.now();
    const elapsedTime = (now - this.lastWordTime) / 1000;
    const scrSElapsedTime = this.lastScrSWordTime
      ? (now - this.lastScrSWordTime) / 1000
      : 0;

    const bonuses = { ...this.gameService.game().bonusValues }; // copia actual

    // Bonus dinámico: xFast
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xFast')) {
      const MIN = 1;
      const MAX = 5;
      const DECAY_FACTOR = 1;
      const t = Math.max(elapsedTime, 0.01);

      const logDecay = Math.log(DECAY_FACTOR / t) + 4;
      const normalized = Math.max(MIN, Math.min(MAX, logDecay));

      bonuses['xFast'] = normalized;
    }

    // Bonus dinámico: xSlow
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xSlow')) {
      const BASE = 1;
      const GROWTH_FACTOR = 0.01;
      const exponent = 1.5;
      const t = Math.max(elapsedTime, 0.01);
      const powerGrowth = BASE + (t * GROWTH_FACTOR) ** exponent;
      bonuses['xSlow'] = powerGrowth;
    }

    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'ScrS') &&
      this.lastScrSWordTime !== 0
    ) {
      const MAX_MULTIPLIER = 2;
      const MIN_MULTIPLIER = 1.0;
      const THRESHOLD = 30; // segundos hasta que empieza a decaer

      const t = Math.max(scrSElapsedTime, 0.01);

      if (t <= THRESHOLD) {
        bonuses['ScrS'] = MAX_MULTIPLIER;
      } else {
        // Decrecimiento suave después de los 3s
        const decayTime = t - THRESHOLD;

        // Logaritmo suavizado o exponencial inverso para bajar lentamente
        const decayFactor = 2.5; // Cuanto menor, más lenta la caída
        const falloff =
          MIN_MULTIPLIER +
          (MAX_MULTIPLIER - MIN_MULTIPLIER) *
            Math.exp(-decayFactor * decayTime);

        bonuses['ScrS'] = Math.max(MIN_MULTIPLIER, falloff);
        if (bonuses['ScrS'] === MIN_MULTIPLIER) {
          this.lastScrSWordTime = 0;
        }
      }
    }

    this.gameService.game.update((game) => ({ ...game, bonusValues: bonuses }));
  }

  gameService = inject(GameService);
  marketService = inject(MarketService);
  activeService = inject(ActiveService);
  achievementService = inject(AchievementService);
  masteryService = inject(MasteryService);
  cardService = inject(CardService);
  languageService = inject(LanguageService);

  private lastWordTime: number = Date.now();
  private lastScrSWordTime = 0;
  private scrabbleQueue: number[] = [];

  barActMultiplier = signal(1);
  barIdleMultiplier = signal(1);

  generateWord() {
    let generatedWord: string = '';
    switch (this.languageService.language()) {
      case 'English':
        var filteredWordList = this.wordList.filter(
          (x) => x.length <= this.gameService.game().maxLength
        );
        generatedWord =
          filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
        break;
      case 'Russian':
        generatedWord =
          this.russianWordList[
            Math.floor(Math.random() * this.russianWordList.length)
          ];
        break;
      case 'Japanese':
        generatedWord =
          this.hiraganaWordList[
            Math.floor(Math.random() * this.hiraganaWordList.length)
          ];
        break;
      case 'Amharic':
        generatedWord =
          this.amharicWordList[
            Math.floor(Math.random() * this.amharicWordList.length)
          ];
        break;
    }

    if (
      GameUtils.HasCard(this.gameService.game(), 12) ||
      GameUtils.IsInChallenge(this.gameService.game(), 'Accuracy')
    )
      generatedWord = generatedWord.toLowerCase();

    return generatedWord;
  }

  checkWordMatch(input: string) {
    return this.currentWord() === input;
  }

  updateBonus(upgradeId: string, value: number) {
    const current = this.gameService.game().bonusValues;
    const updatedBonus = { ...current, [upgradeId]: value };
    this.gameService.game.update((game) => ({
      ...game,
      bonusValues: updatedBonus,
    }));
  }
  updateSumBonus(upgradeId: string, value: number) {
    const current = this.gameService.game().bonusSumsValues;
    const updatedBonus = { ...current, [upgradeId]: value };
    this.gameService.game.update((game) => ({
      ...game,
      bonusSumsValues: updatedBonus,
    }));
  }

  guessedWord(word: string) {
    /*
  0 - Sums 
  1 - Flat multiplier
  2 - Word Length Multi
  3 - Achievements
  4 - Passive Points Multi
  5 - Card Amount Bonus
  6 - Points Percentage Cards Multi
  7 - Percentage MultiUpgrade 
  8 - Perfection Combo
  9 - Critical
  10 - Mastery Bonus
  */

    this.lastWordTime = Date.now();
    this.wordBonus = '';
    let totalPoints = 0;
    let bonusMainSum = 0; //For bonusesValues[0] and bonusesSumsValues[0]
    let bonusMainMulti = 1; //For bonusesValues[1]
    this.wordBonus = '[WordLength] ';
    this.updateSumBonus('WordLength', word.length);
    // bonusSumsValues.push(word.length);

    let muResult = this.activeService.CalculateMultiUpgradesPoints();
    if (muResult[0] !== '') {
      this.wordBonus += muResult[0];
      this.updateSumBonus('muSum', muResult[2]);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Scr')) {
      let lettersValue = this.GetPointsLetters(word);
      this.scrabbleQueue.push(lettersValue);
      if (this.scrabbleQueue.length > 10) {
        this.scrabbleQueue.shift();
      }
      this.wordBonus += ` + [LettersValue] (Upgrade 8)`;
      this.updateSumBonus('LettersValue', lettersValue - word.length);
      // bonusSumsValues.push(lettersValue);
      if (
        lettersValue > this.GetPointsLetters(this.gameService.game().bestWord)
      ) {
        this.gameService.game.update((game) => ({ ...game, bestWord: word }));
      }
    }

    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'WordsValueBitMore')
    ) {
      this.wordBonus += ' + 4 (Upgrade 2)';
      bonusMainSum += 4;
    }
    if (
      GameUtils.IsPurchasedUpgrade(
        this.gameService.game(),
        'WordsValueBitMoreMore'
      )
    ) {
      this.wordBonus += ' + 10 (Upgrade 7)';
      bonusMainSum += 10;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'LastBasic')) {
      this.wordBonus += ' + 20 (Upgrade 12)';
      bonusMainSum += 20;
    }
    if (
      GameUtils.IsPurchasedUpgrade(
        this.gameService.game(),
        'IntermediateBasicsTwo'
      )
    ) {
      this.wordBonus += ' + 25 (Upgrade 18)';
      bonusMainSum += 25;
    }
    this.updateSumBonus('BonusMainSum', bonusMainSum);
    // bonusSumsValues.push(bonusMainSum);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'saLW')) {
      let repeatedLettersBonus = Math.pow(3.5, this.getRepeatedLetters(word));
      this.wordBonus += ` + [DifferentRepeatedLetters] (Upgrade 14)`;
      this.updateSumBonus('saLW', repeatedLettersBonus);
      // bonusSumsValues.push(repeatedLettersBonus);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'diLW')) {
      let differentLettersBonus = Math.pow(1.8, this.getDifferentLetters(word));
      this.wordBonus += ` + [DifferentLetters] (Upgrade 17)`;
      this.updateSumBonus('diLW', differentLettersBonus);
      // bonusSumsValues.push(differentLettersBonus);
    }

    if (
      this.gameService.game().cards.find((x) => x.bonusType === 'PointsAmount')
    ) {
      let cardResultSum = this.cardService.getCardPointAmountTotal();
      this.wordBonus += cardResultSum[1];
      this.updateSumBonus('CardPointsAmount', cardResultSum[0]);
      // bonusSumsValues.push(cardResultSum[0]);
    }
    this.updateBonus(
      'Sums',
      Object.values(this.gameService.game().bonusSumsValues).reduce(
        (a, b) => a + b,
        0
      )
    );
    // bonusValues.push((bonusSumsValues ?? []).reduce((a, b) => a + b, 0));
    totalPoints = Object.values(this.gameService.game().bonusSumsValues).reduce(
      (a, b) => a + b,
      0
    );
    if (totalPoints < 1) totalPoints = 1;

    if (
      GameUtils.IsPurchasedUpgrade(
        this.gameService.game(),
        'FirstUpgradePoints'
      )
    ) {
      this.wordBonus += ' x 1.3 (Upgrade 1)';
      bonusMainMulti *= 1.3;
    }
    if (
      GameUtils.IsPurchasedUpgrade(
        this.gameService.game(),
        'SecondUpgradePoints'
      )
    ) {
      this.wordBonus += ' x 1.5 (Upgrade 5)';
      bonusMainMulti *= 1.5;
    }
    if (
      GameUtils.IsPurchasedUpgrade(
        this.gameService.game(),
        'IntermediateBasicsOne'
      )
    ) {
      this.wordBonus += ' x 3 (Upgrade 15)';
      bonusMainMulti *= 3;
    }
    totalPoints *= bonusMainMulti;
    this.updateBonus('BonusMainMulti', bonusMainMulti);
    // bonusValues.push(bonusMainMulti);

    if (muResult[1] !== '') {
      totalPoints *= muResult[3];
      this.wordBonus += muResult[1];
      this.updateBonus('muMulti', muResult[3]);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xWL')) {
      totalPoints *= word.length;
      this.wordBonus += ' x[WordLength] (Upgrade 16)';
      this.updateBonus('xWL', word.length);
      // bonusValues.push(pointsLetters);
    }

    if (
      this.gameService
        .game()
        .cards.find((x) => x.bonusType === 'PointsPercentage')
    ) {
      let cardResultMulti = this.cardService.getCardPointPercentageTotal();
      this.updateBonus('CardPointsPercentage', cardResultMulti[0]);
      // bonusValues.push(cardResultMulti[0])
      this.wordBonus += cardResultMulti[1];
    }

    // bonusValues = bonusValues.concat(muResult[2]);
    // bonusSumsValues = bonusSumsValues.concat(muResult[3]);

    // let result = this.activeService.CalculatePoints(pointsLetters);
    // totalPoints += result[0];
    // this.wordBonus += result[1];
    // bonusValues = bonusValues.concat(result[2]);
    // bonusSumsValues = bonusSumsValues.concat(result[3]);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xFast')) {
      const multi = this.gameService.game().bonusValues['xFast'];
      totalPoints *= multi;
      this.wordBonus += ' x[Speed]';
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xSlow')) {
      const multi = this.gameService.game().bonusValues['xSlow'];
      totalPoints *= multi;
      this.wordBonus += ' x[TimeElapsed]';
    }
    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Ach') &&
      this.gameService.game().achievements.length > 0
    ) {
      totalPoints *= Math.sqrt(this.gameService.game().achievements.length);
      this.wordBonus += ' x sqrt([Achievements] (Upgrade 6))';
      this.updateBonus(
        'Ach',
        Math.sqrt(this.gameService.game().achievements.length)
      );
      // bonusValues.push(Math.sqrt(this.gameService.game().achievements.length));
    }
    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'PaE') &&
      this.gameService.game().passivePoints > 0
    ) {
      totalPoints *= Math.pow(this.gameService.game().passivePoints, (1/7));
      this.wordBonus += ' x [PassivePoints] ** (1/7)';
      this.updateBonus(
        'PaE',
        Math.log10(this.gameService.game().passivePoints)
      );
      // bonusValues.push(Math.log10(this.gameService.game().passivePoints));
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xSlow/cPrep')) {
      this.wordBonus += 'x cbrt([PassiveBarIdleMulti])';
      totalPoints *= Math.cbrt(this.barIdleMultiplier());
      this.updateBonus('xSlow/c/Prop', Math.cbrt(this.barIdleMultiplier()));
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xcaAm')) {
      totalPoints *= Math.log(GameUtils.getCardBonus(this.gameService.game()));
      this.wordBonus += ' x ln([CardsBonus] (Upgrade 19 & 20))';
      this.updateBonus(
        'xcaAm',
        Math.log(GameUtils.getCardBonus(this.gameService.game()))
      );
      // bonusValues.push(Math.log(GameUtils.getCardBonus(this.gameService.game())));
    }

    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'ScrS') &&
      this.gameService.game().bonusValues['ScrS'] > 1
    ) {
      totalPoints *= this.gameService.game().bonusValues['ScrS'];
      this.wordBonus += ' x ScrSBonus';
      this.updateBonus('ScrS', this.gameService.game().bonusValues['ScrS']);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'LetPo')) {
      const sum = this.scrabbleQueue.reduce((sum, val) => sum + val, 0);
      const multi = 1 + (sum / 85.6) ** 0.75;
      totalPoints *= multi;
      this.wordBonus += 'x [LetPoBonus]';
      let currBonus = this.gameService.game().bonusValues;
      currBonus['LetPo'] = multi
      this.gameService.game.update((game) => ({
        ...game,
        bonusValues: currBonus,
      }));
      console.log('LetPo Bonus: ', multi, 'LetPo values: ', this.scrabbleQueue);
    }

    if (
      GameUtils.IsPurchasedPrestigeUpgrade(
        this.gameService.game(),
        'PrestigeFreeMultiplier'
      )
    ) {
      totalPoints *= 2;
      this.wordBonus += 'x 2 (Prestige Upgrade 1)';
      this.updateBonus('PrestigeFreeMultiplier', 2);
      // bonusValues.push(2);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xPrec')) {
      const wordCounter = this.gameService.game().wordCounterPerfection;

      if (wordCounter + 1 < 100) {
        totalPoints *= Math.sqrt(wordCounter + 1);
        this.wordBonus += 'xMath.sqrt(perfectWords)';
        this.updateBonus('xPrec', Math.sqrt(wordCounter + 1));
        // bonusValues.push(Math.sqrt(wordCounter + 1));
      } else {
        totalPoints *= 10;
        this.wordBonus += 'x10 (perfectWords > 100)';
        this.updateBonus('xPrec', 10);
        // bonusValues.push(10);
      }
    }

    if (this.critical()) {
      let critMulti =
        2 *
        1.1 **
          (this.gameService
            .game()
            .multiUpgrades.find((x) => x.id == 'MultiUpgradeCritMulti')
            ?.count ?? 0);
      totalPoints *= critMulti;
      this.wordBonus += `x${critMulti} (CRITICAL)`;
      this.updateBonus('Crit', critMulti);
      // bonusValues.push(critMulti);
    }

    this.gameService.game.update((game) => ({
      ...game,
      points: (game.points += totalPoints),
      allTimePoints: (game.allTimePoints += totalPoints),
      wordsAmount: ++game.wordsAmount,
    }));

    this.achievementService.revealAchievementGroup('Words Amount');
    this.achievementService.revealAchievementGroup('Books');
    this.achievementService.revealAchievementGroup('Points');

    this.achievementService.checkAchievementsByWord(word);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'ScrS')) {
      console.log('Checking word for ScrS bonus', word);
      if (/[^a-z]/.test(word.toLowerCase())) {
        console.log('Passed check!');
        const current = this.gameService.game().bonusValues;
        const updatedBonus = { ...current, ScrS: 1.5 };
        this.gameService.game.update((game) => ({
          ...game,
          bonusValues: updatedBonus,
        }));
        this.lastScrSWordTime = Date.now();
      }
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Mast')) {
      this.masteryService.calculateMasteryPoints(word.toLowerCase().split(''));
    }
  }

  GetPointsLetters(word: string, passive: boolean = false) {
    const lettersBonus = this.gameService.game().lettersBonus;
    var letters = word.toLowerCase().split('');
    var points = 0;
    let marketBonus: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Mark')) {
      marketBonus = this.marketService.letterBonus();
    }
    if (
      passive &&
      !GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'MarkPB')
    ) {
      marketBonus = [1, 1, 1, 1, 1, 1, 1, 1];
    }
    letters.forEach((element) => {
      if (
        element === 'a' ||
        element === 'e' ||
        element === 'i' ||
        element === 'o' ||
        element === 'u' ||
        element === 'l' ||
        element === 'n' ||
        element === 's' ||
        element === 't' ||
        element === 'r'
      ) {
        if (marketBonus[0] <= -100) return;
        if (marketBonus[0] < 0) {
          points += (lettersBonus[0] * Math.abs(marketBonus[0])) / 100;
        } else {
          points += lettersBonus[0] * (1 + Math.abs(marketBonus[0]) / 100);
        }
      } else if (element === 'd' || element === 'g') {
        if (marketBonus[1] <= -100) return;
        if (marketBonus[1] < 0) {
          points += (lettersBonus[1] * Math.abs(marketBonus[1])) / 100;
        } else {
          points += lettersBonus[1] * (1 + Math.abs(marketBonus[1]) / 100);
        }
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        if (marketBonus[2] <= -100) return;
        if (marketBonus[2] < 0) {
          points += (lettersBonus[2] * Math.abs(marketBonus[2])) / 100;
        } else {
          points += lettersBonus[2] * (1 + Math.abs(marketBonus[2]) / 100);
        }
      } else if (
        element === 'f' ||
        element === 'h' ||
        element === 'v' ||
        element === 'w' ||
        element === 'y'
      ) {
        if (marketBonus[3] <= -100) return;
        if (marketBonus[3] < 0) {
          points += (lettersBonus[3] * Math.abs(marketBonus[3])) / 100;
        } else {
          points += lettersBonus[3] * (1 + Math.abs(marketBonus[3]) / 100);
        }
      } else if (element === 'k') {
        if (marketBonus[4] <= -100) return;
        if (marketBonus[4] < 0) {
          points += (lettersBonus[4] * Math.abs(marketBonus[4])) / 100;
        } else {
          points += lettersBonus[4] * (1 + Math.abs(marketBonus[4]) / 100);
        }
      } else if (element === 'j' || element === 'x') {
        if (marketBonus[5] <= -100) return;
        if (marketBonus[5] < 0) {
          points += (lettersBonus[5] * Math.abs(marketBonus[5])) / 100;
        } else {
          points += lettersBonus[5] * (1 + Math.abs(marketBonus[5]) / 100);
        }
      } else if (element === 'q' || element === 'z') {
        if (marketBonus[6] <= -100) return;
        if (marketBonus[6] < 0) {
          points += (lettersBonus[6] * Math.abs(marketBonus[6])) / 100;
        } else {
          points += lettersBonus[6] * (1 + Math.abs(marketBonus[6]) / 100);
        }
      } else {
        if (marketBonus[7] <= -100) return;
        if (marketBonus[7] < 0) {
          points += (lettersBonus[7] * Math.abs(marketBonus[7])) / 100;
        } else {
          points += lettersBonus[7] * (1 + Math.abs(marketBonus[7]) / 100);
        }
      }
    });

    return points;
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

  getRepeatedLetters(word: string): number {
    const repeatedLetters = new Set<string>();
    const minusWord = word.toLowerCase() 
    for (let i = 0; i < word.length; i++) {
      const char = minusWord[i];
      if (minusWord.lastIndexOf(char) > i) {
        repeatedLetters.add(char);
      }
    }

    return repeatedLetters.size;
  }

  getWordBonus(): string {
    return this.wordBonus;
  }
}
