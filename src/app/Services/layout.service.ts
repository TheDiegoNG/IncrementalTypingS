import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  lettersPerSecondVisible = signal(false);
  comboCounterVisible = signal(false);
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
