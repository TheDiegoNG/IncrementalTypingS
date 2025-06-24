import { computed, inject, Injectable, signal } from '@angular/core';
import { GameUtils } from '../Utils/gameUtils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  gameService = inject(GameService)
  lettersPerSecondVisible = computed(() => GameUtils.IsPurchasedUpgrade(this.gameService.game(), "LpV"));
  comboCounterVisible = computed(() => GameUtils.IsPurchasedUpgrade(this.gameService.game(), "xPrec"));
  challengeTimerVisible = signal(false);
  challengeTimerValue = signal('');
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {}

  startTimer(seconds: number) {
    this.challengeTimerVisible.set(true);
    this.challengeTimerValue.set(seconds.toString());
    this.intervalId = setInterval(() => {
      seconds--;
      if (seconds >= 0) {
        this.challengeTimerValue.set(seconds.toString());
      } else {
        this.challengeFailed();
      }
    }, 1000);
  }

  challengeCompleted() {
    clearInterval(this.intervalId!);
    this.challengeTimerValue.set('Success!');
  }

  challengeFailed() {
    clearInterval(this.intervalId!);
    this.challengeTimerValue.set('Failed!');
  }
}
