import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private gameTimerStart: number = 0;

  constructor() {}

  initialize(): Promise<any> {
      this.gameTimerStart = Date.now();
      console.log(this.gameTimerStart);
      return Promise.resolve();
    };

  logGameTimer(message?: string) {
    console.log((Date.now() - this.gameTimerStart) / 1000, message);
  }
}
