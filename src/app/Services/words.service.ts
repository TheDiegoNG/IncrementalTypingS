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
  hiraganaWordList: string[] = [
    'あお',
    'いえ',
    'うみ',
    'えんぴつ',
    'おおきい',
    'かぞく',
    'きいろい',
    'くるま',
    'けさ',
    'こども',
    'さくらんぼ',
    'しんぶん',
    'すし',
    'せんせい',
    'たけ',
    'ちず',
    'つくえ',
    'てがみ',
    'とけい',
    'なつ',
    'にんぎょう',
    'ぬいぐるみ',
    'ねこ',
    'はな',
    'ひる',
    'ふく',
    'へや',
    'ほん',
    'まんが',
    'やさい',
    'ゆうびんきょく',
    'よる',
    'らいがっき',
    'りんご',
    'れんしゅう',
    'わたし',
    'あたま',
    'いし',
    'うさぎ',
    'えき',
    'おにぎり',
    'かんじ',
    'きゅうり',
    'くつ',
    'げんき',
    'さかな',
    'しごと',
    'すき',
    'たなか',
    'ちかてつ',
    'つき',
    'てがみ',
    'ともだち',
    'なつやすみ',
    'にほん',
    'ぬの',
    'はし',
    'ひがし',
    'ふゆ',
    'へいわ',
    'まち',
    'やま',
    'ゆめ',
    'よる',
    'らくだ',
    'りょうり',
    'わたし',
    'あめ',
    'いす',
    'うでわ',
    'えほん',
    'おんがく',
    'かさ',
    'きょうしつ',
    'くつした',
    'げんき',
    'さんぽ',
    'あおい',
    'いしゃ',
    'うるし',
    'えきいん',
    'おかし',
    'かんじき',
    'きかんしゃ',
    'くもり',
    'けんしゅう',
    'こっぷ',
    'さくひん',
    'しお',
    'すずしい',
    'せかい',
    'たいいく',
    'ちずる',
    'つきあう',
    'てがみや',
    'とけいりょう',
    'なか',
    'にほんご',
    'ぬのぎ',
    'ねこみみ',
    'はこ',
    'ひび',
    'ふるい',
    'へんしん',
    'ほしぞら',
    'まど',
    'やさしい',
    'ゆうめい',
    'よるび',
    'らく',
    'りんごいし',
    'れきし',
    'わんぱく',
    'あいさつ',
    'いすと',
    'うらない',
    'えり',
    'おきる',
    'かいぎ',
    'きんえん',
    'くしゃみ',
    'げんじん',
    'さくひんか',
    'しばらく',
    'すぐれもの',
    'たいがく',
    'ちょっと',
    'つきあう',
    'てがみや',
    'とけいりょう',
    'なかよく',
    'にほんご',
    'ぬのぎ',
    'ねこみみ',
    'はこ',
    'ひび',
    'ふるい',
    'へんしん',
    'ほしぞら',
    'まど',
    'やさしい',
    'ゆうめい',
    'よるび',
    'らく',
    'りんごいし',
    'れきし',
    'わんぱく',
    'あいさつ',
    'いすと',
    'うらない',
    'えり',
    'おきる',
    'かいぎ',
    'きんえん',
    'くしゃみ',
    'げんじん',
    'さくひんか',
    'しばらく',
    'すぐれもの',
    'たいがく',
    'ちょっと',
  ];
  russianWordList: string[] = [
    'абажур',
    'белка',
    'вино',
    'гитара',
    'дом',
    'ежик',
    'жираф',
    'звезда',
    'изюм',
    'йогурт',
    'кот',
    'лето',
    'медведь',
    'ночь',
    'опера',
    'пальто',
    'роза',
    'солнце',
    'танец',
    'улица',
    'флаг',
    'хлеб',
    'цветок',
    'чай',
    'шапка',
    'щука',
    'ъявь',
    'ыгнать',
    'ьямка',
    'экран',
    'юмор',
    'ягода',
    'акция',
    'бюро',
    'возраст',
    'гимназия',
    'двор',
    'европа',
    'ёж',
    'журнал',
    'звук',
    'издание',
    'йод',
    'краска',
    'лужайка',
    'магия',
    'нога',
    'образ',
    'пятно',
    'работа',
    'смех',
    'трюк',
    'узор',
    'факт',
    'характер',
    'цепь',
    'чашка',
    'шум',
    'щит',
    'ъявь',
    'ыпуклость',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'детство',
    'ежедневно',
    'желание',
    'золото',
    'изучение',
    'йога',
    'крюк',
    'лидер',
    'музей',
    'неделя',
    'образец',
    'авокадо',
    'багаж',
    'вечер',
    'город',
    'дочь',
    'ежевика',
    'жара',
    'зонт',
    'ирис',
    'йогурт',
    'красный',
    'летучая мышь',
    'мандарин',
    'ночь',
    'орех',
    'печь',
    'роза',
    'салат',
    'танец',
    'узор',
    'фонтан',
    'хлеб',
    'цветок',
    'чай',
    'шоколад',
    'щенок',
    'ъявь',
    'ыгнать',
    'ьямка',
    'экран',
    'юмор',
    'ягода',
    'акция',
    'буря',
    'возраст',
    'гимназия',
    'двор',
    'европа',
    'ёж',
    'журнал',
    'звук',
    'издание',
    'йод',
    'краска',
    'лужайка',
    'магия',
    'нога',
    'образ',
    'пятно',
    'работа',
    'смех',
    'трюк',
    'узор',
    'факт',
    'характер',
    'цвет',
    'чашка',
    'шум',
    'щит',
    'ъявь',
    'ыпуклость',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'детство',
    'ежедневно',
    'желание',
    'золото',
    'изучение',
    'йога',
    'крюк',
    'лидер',
    'музей',
    'неделя',
    'образец',
    'печать',
    'рождество',
    'свеча',
    'тюльпан',
    'ухо',
    'фильм',
    'царь',
    'человек',
    'шарф',
    'щенок',
    'ъесть',
    'ыть',
    'ьямка',
    'энергия',
    'юность',
    'ящик',
    'агент',
    'брюки',
    'возникнуть',
    'герой',
    'медведь',
    'лес',
    'птица',
    'гора',
    'река',
    'озеро',
    'поле',
    'цветение',
    'весна',
    'лето',
    'осень',
    'зима',
    'снег',
    'солнце',
    'луна',
    'звезда',
    'воздух',
    'вода',
    'огонь',
    'земля',
  ];
  amharicWordList: string[] = [
    'አቀፍ',
    'ተመላ',
    'አዋጅ',
    'አሸባሪ',
    'ተመዝግቦ',
    'አይተገኝም',
    'መተየት',
    'መጠቀም',
    'አጠቃላይ',
    'እትዬ',
    'መጠበቅ',
    'አያዝ',
    'እንዲህ',
    'ወደታች',
    'አላነበበም',
    'አስቀድመኝ',
    'አበሳሽ',
    'ታምራት',
    'ሀብታች',
    'በደንበር',
    'እናት',
    'አዋሽ',
    'ከአባይ',
    'እናሠንቆ',
    'መክበብ',
    'አሁንም',
    'ከብት',
    'ወደደለት',
    'አካይደኛ',
    'አካይደኛ',
    'እንደአንደኛ',
    'የእኔን',
    'ሁኔታ',
    'ያስተምረኝ',
    'እንደገና',
    'እንደሚሆን',
    'የተመነ',
    'አደጋ',
    'መከላከል',
    'ሌባ',
    'ተለዋወጥ',
    'እንደአንደኛ',
    'አካይደኛ',
    'ስነስርዓት',
    'ያጠፋኛል',
    'ከታች',
    'ማዕዘን',
    'ያንዳንዱ',
    'እንደዚህ',
    'ሲል',
    'ለኔ',
    'አንደኛው',
    'በደንብ',
    'እንደአንደኛው',
    'ተጣምራት',
    'ያለው',
    'ከአንደኛው',
    'መንገድ',
    'ስራ',
    'ስለሚጠቅም',
    'ደህንነት',
    'መንከሳት',
    'መጠጥ',
    'መንገድ',
    'መንግስቱ',
    'መከላከል',
    'መንደፊያ',
    'መኖ',
    'መጠቀም',
    'መረጃ',
    'አንደኛ',
    'አንደኛው',
    'አንደኛዋ',
    'አንደኛዎች',
    'አንደኛውን',
    'አንደኛውንው',
    'አንደኛውንዋ',
    'አንደኛዎችን',
    'አንደኛውንውን',
    'አንደኛውንዋን',
    'አንደኛዎችንው',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንውን',
    'አንደኛውንዋን',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንውን',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛውንዋ',
    'አንደኛውንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
    'አንደኛዎችንዋ',
    'አንደኛውንዋንው',
  ];
  // language: language = 'English';

  constructor() {
    // this.challengeService
    //   .getLanguage()
    //   .subscribe((language) => (this.language = language));
  }

  gameService = inject(GameService);
  marketService = inject(MarketService);
  activeService = inject(ActiveService);
  achievementService = inject(AchievementService);
  masteryService = inject(MasteryService);
  cardService = inject(CardService)
  // challengeService = inject(ChallengesService)

  generateWord() {
    let generatedWord: string = '';
    switch ('English') {
      case 'English':
        var filteredWordList = this.wordList.filter(
          (x) => x.length <= this.gameService.game().maxLength
        );
        generatedWord =
          filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
        break;
      // case 'Russian':
      //   generatedWord =
      //     this.russianWordList[
      //       Math.floor(Math.random() * this.russianWordList.length)
      //     ];
      //   break;
      // case 'Japanese':
      //   generatedWord =
      //     this.hiraganaWordList[
      //       Math.floor(Math.random() * this.hiraganaWordList.length)
      //     ];
      //   break;
      // case 'Amharic':
      //   generatedWord =
      //     this.amharicWordList[
      //       Math.floor(Math.random() * this.amharicWordList.length)
      //     ];
      //   break;
    }

    if (GameUtils.HasCard(this.gameService.game(), 12) || GameUtils.IsInChallenge(this.gameService.game(), 'Accuracy'))
      generatedWord = generatedWord.toLowerCase();

    return generatedWord;
  }

  checkWordMatch(input: string) {
    return this.currentWord() === input;
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
    console.log("Guessed word: ", word)
    this.wordBonus = '';
    let pointsLetters = word.length;
    let pointsBonus = word.length;
    let bonusValues: number[] = [];
    let bonusSumsValues: number[] = [];
    this.wordBonus += '[WordLength] ';
    let totalPoints = 0;
    let bonusMainSum = 0; //For bonusesValues[0] and bonusesSumsValues[0]
    let bonusMainMulti = 1; //For bonusesValues[1]
    bonusSumsValues.push(word.length);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Scr')) {
      var lettersValue = 0;
      lettersValue = this.GetPointsLetters(word);
      pointsLetters += lettersValue;
      pointsBonus += lettersValue;
      this.wordBonus += ` + [LettersValue] (Upgrade 8)`;
      bonusSumsValues.push(lettersValue);
      if (
        lettersValue > this.GetPointsLetters(this.gameService.game().bestWord)
      ) {
        this.gameService.game.update((game) => ({ ...game, bestWord: word }));
      }
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'WordsValueBitMore')) {
      totalPoints += 4;
      this.wordBonus += ' + 4 (Upgrade 2)';
      bonusMainSum += 4;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'WordsValueBitMoreMore')) {
      totalPoints += 10;
      this.wordBonus += ' + 10 (Upgrade 7)';
      bonusMainSum += 10;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'LastBasic')) {
      totalPoints += 20;
      this.wordBonus += ' + 20 (Upgrade 12)';
      bonusMainSum += 20;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'IntermediateBasicsTwo')) {
      totalPoints += 25;
      this.wordBonus += ' + 25 (Upgrade 18)';
      bonusMainSum += 25;
    }

    bonusSumsValues.push(bonusMainSum);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'saLW')) {
      let repeatedLettersBonus = Math.pow(1.25, this.getRepeatedLetters(word));
      pointsLetters += repeatedLettersBonus;
      this.wordBonus += ` + [DifferentRepeatedLetters] (Upgrade 14)`;
      bonusMainSum += repeatedLettersBonus;
      bonusSumsValues.push(repeatedLettersBonus);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'diLW')) {
      let differentLettersBonus = Math.pow(1.1, this.getDifferentLetters(word));
      pointsLetters += differentLettersBonus;
      this.wordBonus += ` + [DifferentLetters] (Upgrade 17)`;
      bonusMainSum += differentLettersBonus;
      bonusSumsValues.push(differentLettersBonus);
    }
    
    if(this.gameService.game().cards.find(x => x.bonusType === 'PointsAmount')) {
      let cardResultSum = this.cardService.getCardPointAmountTotal();
      bonusMainSum += cardResultSum[0]
      bonusSumsValues.push(cardResultSum[0]);
      this.wordBonus += cardResultSum[1];
    }
    console.log("Bonus Sums Values: ", bonusSumsValues)
    bonusValues.push((bonusSumsValues ?? []).reduce((a, b) => a + b, 0));
    totalPoints = (bonusSumsValues ?? []).reduce((a, b) => a + b, 0)
    console.log("Bonus Values init: ", bonusValues)
    if (totalPoints < 1) totalPoints = 1;

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'FirstUpgradePoints')) {
      totalPoints *= 1.3;
      this.wordBonus += ' x 1.3 (Upgrade 1)';
      bonusMainMulti *= 1.3;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'SecondUpgradePoints')) {
      totalPoints *= 1.5;
      this.wordBonus += ' x 1.5 (Upgrade 5)';
      bonusMainMulti *= 1.5;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'IntermediateBasicsOne')) {
      totalPoints *= 3;
      this.wordBonus += ' x 3 (Upgrade 15)';
      bonusMainMulti *= 3;
    }

    bonusValues.push(bonusMainMulti);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xWL')) {
      totalPoints *= pointsLetters;
      this.wordBonus += ' x[WordLength] (Upgrade 16)';
      bonusValues.push(pointsLetters);
    }

    if(this.gameService.game().cards.find(x => x.bonusType === 'PointsPercentage')) {
      let cardResultMulti = this.cardService.getCardPointPercentageTotal();
      bonusValues.push(cardResultMulti[0])
      this.wordBonus += cardResultMulti[1];
    }

    let muResult = this.activeService.CalculateMultiUpgradesPoints();
    totalPoints += muResult[0];
    this.wordBonus += muResult[1];
    bonusValues = bonusValues.concat(muResult[2]);
    bonusSumsValues = bonusSumsValues.concat(muResult[3]);

    // let result = this.activeService.CalculatePoints(pointsLetters);
    // totalPoints += result[0];
    // this.wordBonus += result[1];
    // bonusValues = bonusValues.concat(result[2]);
    // bonusSumsValues = bonusSumsValues.concat(result[3]);

    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Ach') &&
      this.gameService.game().achievements.length > 0
    ) {
      totalPoints *= Math.sqrt(this.gameService.game().achievements.length);
      this.wordBonus += ' x sqrt([Achievements] (Upgrade 6))';
      bonusValues.push(Math.sqrt(this.gameService.game().achievements.length));
    }
    if (
      GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'PaE') &&
      this.gameService.game().passivePoints > 0
    ) {
      totalPoints *= Math.log10(this.gameService.game().passivePoints);
      this.wordBonus += ' x log10([PassivePoints])';
      bonusValues.push(Math.log10(this.gameService.game().passivePoints));
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xcaAm')) {
      totalPoints *= Math.log(GameUtils.getCardBonus(this.gameService.game()));
      this.wordBonus += ' x ln([CardsBonus] (Upgrade 19 & 20))';
      bonusValues.push(Math.log(GameUtils.getCardBonus(this.gameService.game())));
    }


    if (GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), 'PrestigeFreeMultiplier')) {
      totalPoints *= 2;
      this.wordBonus += 'x 2 (Prestige Upgrade 1)';
      bonusValues.push(2);
    }

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xPrec')) {
      const wordCounter = this.gameService.game().wordCounterPerfection;

      if (wordCounter + 1 < 100) {
        totalPoints *= Math.sqrt(wordCounter + 1);
        this.wordBonus += 'xMath.sqrt(perfectWords)';
        bonusValues.push(Math.sqrt(wordCounter + 1));
      } else {
        totalPoints *= 10;
        this.wordBonus += 'x10 (perfectWords > 100)';
        bonusValues.push(10);
      }
    }

    if (this.critical()) {
      let critMulti = 2 * 1.1 ** (this.gameService.game().multiUpgrades.find(x => x.id == "MultiUpgradeCritMulti")?.count ?? 0)
      console.log("Crit Multi: ", critMulti)
      totalPoints *= critMulti;
      this.wordBonus += `x${critMulti} (CRITICAL)`;
      bonusValues.push(critMulti);
    }
    console.log("Bonus Values Final: ", bonusValues, "Bonus Sums Values: ", bonusSumsValues)
    console.log("Total Points: ", totalPoints)

    this.gameService.game.update((game) => ({
      ...game,
      points: (game.points += totalPoints),
    }));
    this.gameService.game.update((game) => ({
      ...game,
      allTimePoints: (game.allTimePoints += totalPoints),
    }));
    this.gameService.game.update((game) => ({
      ...game,
      wordsAmount: game.wordsAmount++,
    }));

    this.achievementService.checkAchievementsByWord(word);

    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Mast')) {
      const letters = word.split('');
      letters.forEach((letter) => {
        const mastery = this.gameService
          .game()
          .masteryLevels.find((x) => x.letters.includes(letter.toLowerCase()))!;
        this.masteryService.updateMasteryValue(mastery.tier);
      });
    }

    this.gameService.game.update((game) => ({
      ...game,
      bonusValues: bonusValues,
    }));
    this.gameService.game.update((game) => ({
      ...game,
      bonusSumsValues: bonusSumsValues,
    }));
    console.log(bonusValues);
  }

  GetPointsLetters(word: string, passive: boolean = false) {
    const lettersBonus = this.gameService.game().lettersBonus;
    var letters = word.toLowerCase().split('');
    var points = 0;
    let marketBonus: number[] = [];
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'Mark')) {
      marketBonus = this.marketService.letterBonus();
    }
    if (passive && !GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'PassiveMarket')) {
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

    // if (GameUtils.IsPurchasedUpgrade('UnlockMastery')) {
    //   this.masteryService.calculateMasteryPoints(letters);
    // }

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

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (word.lastIndexOf(char) > i) {
        repeatedLetters.add(char);
      }
    }

    return repeatedLetters.size;
  }

  getWordBonus(): string {
    return this.wordBonus;
  }
}

