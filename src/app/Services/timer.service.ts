import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private gameTimerStart: number = 0;

  constructor() {
    this.initialize()
  }

  initialize(): Promise<any> {
      this.gameTimerStart = Date.now();
      console.log(this.gameTimerStart);
      return Promise.resolve();
    };

  logGameTimer(message?: string) {
    console.log("Logging Timemark: ", (Date.now() - this.gameTimerStart) / 1000, message);
  }
}
