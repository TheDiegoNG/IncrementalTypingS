import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ActiveService } from './active.service';
import { GameService } from './game.service';
import { Generator } from '../Classes/generator';
import { GameUtils } from '../Utils/gameUtils';
import { WordsService } from './words.service';
import { AchievementService } from './achievement.service';
import { Era } from '../Classes/era';

@Injectable({
  providedIn: 'root',
})
export class PassiveService {
  gameService = inject(GameService);
  activeService = inject(ActiveService);
  wordsService = inject(WordsService);
  achievementService = inject(AchievementService);

  generators: Generator[] = [];

  intervalId: ReturnType<typeof setInterval> | null = null;
  barUpdateInterval = 20; // ms
  useAnimationFrame = true;
  animationFrameId: number | null = null;
  idleIntervalId: ReturnType<typeof setInterval> | null = null;
  activeIntervalId: ReturnType<typeof setInterval> | null = null;

  passiveWord = signal('');
  passiveRate = computed(() => this.gameService.game().passiveRate);

  constructor() {
    this.createGenerator(new Generator('Portable Generator', 5, 1));
    this.createGenerator(new Generator('Small Generator', 6, 2));
    this.createGenerator(new Generator('Medium-sized Generator', 9, 3));
    this.createGenerator(new Generator('Ample Generator', 12, 4));
    this.createGenerator(new Generator('Substantial Generator', 15, 5));
    this.createGenerator(new Generator('Reasonable Generator', 18, 6));
    this.createGenerator(new Generator('Large Generator', 21, 7));
    this.createGenerator(new Generator('Major Generator', 24, 8));
    this.createGenerator(new Generator('Jumbo Generator', 27, 9));
    this.createGenerator(new Generator('Colossal Generator', 30, 10));

    effect(() => {
      const rate = this.passiveRate();
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.startPassInterval(rate);
      
    });

    // setInterval(() => {
    //   this.gameService.game.update((game) => ({
    //     ...game,
    //     passiveBarActMulti: this.wordsService.barActMultiplier(),
    //     passiveBarIdleMulti: this.wordsService.barIdleMultiplier(),
    //   }));
    // }, 1000);

    this.startBarUpdates();
  }

  startPassInterval(rate: number) {
    this.intervalId = setInterval(() => {
      this.createWord();
      this.calculatePassiveGenerators();
    }, rate);
  }

  passBarIdleProgress = signal(1); // de 0 a 1
  // passBarIdleSpeed = 0.0005; // velocidad de llenado (ajustable)
  passBarIdleSpeed = 0.0005;

  passBarActPosition = signal(0); // posición de la línea en la barra, 0 a 1
  passBarActDirection = signal(1); // dirección: 1 (derecha) o -1 (izquierda)
  passBarActSpeed = 0.005; // velocidad de movimiento
  passBarActZoneWidth = computed(() => {
    const barEnlargers = this.gameService
      .game()
      .passiveUpgrades.filter((x) => x.id.includes('LBarSize'));
    return 20 * 1.5 ** barEnlargers.length;
  }); //Ancho de la zona clickeable
  passBarActCritZoneWidth = signal(10);
  private startBarUpdates() {
    if (
      this.useAnimationFrame &&
      typeof requestAnimationFrame !== 'undefined'
    ) {
      const animate = () => {
        this.updateIdleBar();
        this.updateActiveBar();
        this.animationFrameId = requestAnimationFrame(animate);
      };
      this.animationFrameId = requestAnimationFrame(animate);
    } else {
      this.idleIntervalId = setInterval(
        () => this.updateIdleBar(),
        this.barUpdateInterval
      );
      this.activeIntervalId = setInterval(
        () => this.updateActiveBar(),
        this.barUpdateInterval
      );
    }
  }

  private updateIdleBar() {
    if(!GameUtils.IsPurchasedUpgrade(this.gameService.game(), "xPass/t")) return;
    let newProgress = this.passBarIdleProgress() + this.passBarIdleSpeed;
    this.gameService.game.update((game) => ({...game, passiveBarIdleMulti: newProgress}));
    this.passBarIdleProgress.set(newProgress);
  }

  private updateActiveBar() {
    let newPos =
      this.passBarActPosition() +
      this.passBarActDirection() * this.passBarActSpeed;
    if (newPos >= 1) {
      newPos = 1;
      this.passBarActDirection.set(-1);
      this.decreaseMultiplier();
    } else if (newPos <= 0) {
      newPos = 0;
      this.passBarActDirection.set(1);
      this.decreaseMultiplier();
    }
    this.passBarActPosition.set(newPos);
  }

  increaseMultiplier(bonus: number) {
    if(GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), 'ActBarMulti+')) {
      bonus *= 1.5
    }
    this.gameService.game.update((game) => ({...game, passiveBarActMulti: game.passiveBarActMulti + bonus})); // sube el multiplicador
  }

  decreaseMultiplier() {
    this.gameService.game.update((game) => ({...game, passiveBarActMulti: 
      Math.max(1, game.passiveBarActMulti - 0.1)
    })); // baja mínimo a 1
  }

  increaseActBarCombo() {
    this.gameService.game.update((game) => ({...game, passiveBarActCombo: game.passiveBarActCombo + 1}))
  }

  resetActBarCombo() {
    this.gameService.game.update((game) => ({...game, passiveBarActCombo: 0}))
  }

  createGenerator(generator: Generator) {
    this.generators.push(generator);
  }

  createWord() {
    const portableGenerator = this.gameService
      .game()
      .passiveGenerators.find((x) => x.name === 'Portable Generator');
    if (!portableGenerator) return;
    const word = this.GetRandomString(this.gameService.game().passiveLength);
    this.passiveWord.set(word);
    let points = this.getPassivePoints(word);
    if(points <= 0) points = 1
    points *= portableGenerator.amountGained;
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xFast')) {
      points *= this.gameService.game().passiveBarActMulti;
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xSlow')) {
      points *= this.gameService.game().passiveBarIdleMulti;
    }
    if(GameUtils.IsUnlockedAchievement(this.gameService.game(), "Epic Multiplier")) {
      points *= 2
    }
    if(GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), 'PowSurge')) {
      points *= 1 + Math.floor(this.gameService.game().prestigePoints / 1000) * 0.1;
    }
    if(GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), 'ActBarPerf')) {
      points *= Math.min(25, Math.pow(this.gameService.game().passiveBarActCombo + 1, 0.4));
    }
    if (GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'PaE'))
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints + points,
      }));
    

    this.achievementService.revealAchievementGroup('Passive Points');
    this.achievementService.revealAchievementGroup('Passive Bar Active Multiplier');
  }
  getPassivePoints(passiveWord: string) {
    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if (GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'ScrPB'))
      totalPoints += this.wordsService.GetPointsLetters(passiveWord, true);
    totalPoints += this.gameService
      .game()
      .cards.filter((x) => x.bonusType === 'PassivePointsAmount')
      .reduce((total, card) => total + card.bonusAmount, 0);
    if (
      GameUtils.IsPurchasedPassiveUpgrade(
        this.gameService.game(),
        'PassiveLittleBonus'
      )
    )
      totalPoints += 2;
    if (
      GameUtils.IsPurchasedPassiveUpgrade(
        this.gameService.game(),
        'PassiveEnhancerEnhancerer'
      )
    )
      totalPoints *= 1.25;
    if (
      GameUtils.IsPurchasedPassiveUpgrade(
        this.gameService.game(),
        'PassiveDontKnow'
      )
    )
      totalPoints *= 1.5;
    totalPoints *=
      1 +
      this.gameService
        .game()
        .cards.filter((x) => x.bonusType === 'PassivePointsPercentage')
        .reduce((total, card) => total + card.bonusAmount, 0) /
        100;
    return totalPoints;
  }

  GetRandomString(lettersAmount: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = '';
    for (let i = 0; i < lettersAmount; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }

  calculatePassiveGenerators() {
    if (this.gameService.game().passiveGenerators.length == 1) return;
    for (
      let index = 2;
      index <= this.gameService.game().passiveGenerators.length;
      index++
    ) {
      if (
        GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'SynM')
      ) {
        this.gameService.addGainedGeneratorsBoosted(index);
      } else {
        this.gameService.addGainedGenerators(index);
      }
    }
  }

  collectCharge() {
    this.passBarIdleProgress.set(0);
    this.gameService.game.update((game) => ({
      ...game,
      passiveCharges: ++game.passiveCharges,
    }));
  }
}
