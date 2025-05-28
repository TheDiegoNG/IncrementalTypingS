import { inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { Challenge, ChallengeType } from '../Classes/challenge';
import { GameUtils } from '../Utils/gameUtils';
import { LayoutService } from './layout.service';
import { OverlayService } from './overlay.service';
import { PrestigeService } from './prestige.service';
import { Language, LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  gameService = inject(GameService);
  prestigeService = inject(PrestigeService);
  layoutService = inject(LayoutService);
  overlayService = inject(OverlayService);
  languageService = inject(LanguageService)

  challenges: Challenge[] = [];
  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.createChallenge(
      new Challenge(
        'Accuracy',
        'Write 4-letter Words with only a set amount of key presses',
        '+1 Card everytime you roll!',
        80,
        50,
        210
      )
    );
    this.createChallenge(
      new Challenge(
        'Speed',
        'Write 4-letter words in only 1 minute',
        '50% more Points!',
        60,
        50,
        0
      )
    );
    this.createChallenge(
      new Challenge(
        'Language',
        'Complete 50 words in another language!',
        '50% more Points! (Check)',
        100,
        50,
        0
      )
    );
  }

  gameUtils = new GameUtils();

  createChallenge(challenge: Challenge) {
    this.challenges.push(challenge);
  }

  getChallenges(): Challenge[] {
    return this.challenges;
  }

  startTimer(seconds: number, challengeType: ChallengeType) {
    let secondsChallenge = seconds;
    this.layoutService.startTimer(seconds);
    this.overlayService.challengeStatus.set('active');
    const challenge = this.gameService
      .game()
      .challenges.find((x) => x.type == challengeType);
    if (!challenge) return;
    this.intervalId = setInterval(() => {
      switch (challengeType) {
        case 'Accuracy':
          if (this.gameService.game().wordsAmount >= challenge.objective) {
            this.layoutService.challengeCompleted();
            this.overlayService.challengeStatus.set('success');
            this.gameService.completeChallenge(challengeType);
            this.gameService.activeGame.update((game) => ({
              ...game,
              rollsAmount:
                game.rollsAmount +
                game.challenges.find((x) => x.type == challengeType)!.amount,
            }));
            clearInterval(this.intervalId!);
            this.exitChallenge(challengeType);
          } else if (
            challenge.restriction <=
              this.gameService.game().letterCounter ||
            secondsChallenge <= 0
          ) {
            clearInterval(this.intervalId!);
            this.exitChallenge(challengeType, false);
          }
          break;
        case 'Language':
          if (this.gameService.game().wordsAmount >= challenge.objective) {
            this.layoutService.challengeCompleted();
            this.overlayService.challengeStatus.set('success');
            this.gameService.completeChallenge(challengeType);
            this.gameService.activeGame.update((game) => ({
              ...game,
              rollsAmount:
                game.rollsAmount +
                game.challenges.find((x) => x.type == challengeType)!.amount,
            }));
            clearInterval(this.intervalId!);
            this.exitChallenge(challengeType);
          } else if (secondsChallenge <= 0) {
            clearInterval(this.intervalId!);
            this.exitChallenge(challengeType, false);
          }
          break;
        default:
          break;
      }
      secondsChallenge--;
    }, 1000);
  }

  startChallenge(challengeType: ChallengeType) {
    if (this.gameService.game().gameType === 'Challenge')
      return alert('You are already in a Challenge');
    if (
      !this.gameService.game().challenges.some(
        (x) => x.type == challengeType
      )
    )
      this.gameService.game().challenges.push(
        this.challenges.find((x) => x.type == challengeType)!
      );
    const challenge = this.gameService.game().challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return;
    this.prestigeService.prestigeStats();
    setTimeout(() => {
      if (challenge.type === 'Language') this.languageService.language.set('Amharic');
      this.gameService.saveToActiveGame();
      this.loadAchievements();
      this.loadChallenges();
      this.gameService.loadChallengeGame();
      this.gameService.updateChallengeState(true, challengeType);
      this.startTimer(challenge.time, challengeType);
    }, 500);
  }

  exitChallenge(
    challengeType: ChallengeType,
    challengeCompleted: boolean = true
  ) {
    if (challengeType === 'Language') this.languageService.language.set('English');
    this.gameService.loadActiveGame();
    this.gameService.updateChallengeState(false, challengeType);
    this.gameService.game.update((game) => ({...game, letterCounter: 0}));
    clearInterval(this.intervalId!);
    if (!challengeCompleted) {
      this.layoutService.challengeFailed();
      this.overlayService.challengeStatus.set("failure");
    }
  }

  loadAchievements() {
    this.gameService.updateAchievements();
  }

  loadChallenges() {
    this.gameService.updateChallenges();
  }
}
