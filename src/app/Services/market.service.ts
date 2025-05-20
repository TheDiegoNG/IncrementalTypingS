import { inject, Injectable, signal } from '@angular/core';
import { interval } from 'rxjs';
import { GameUtils } from '../Utils/gameUtils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  gameService = inject(GameService)
  letterBonus = signal<number[]>([])
  private readonly DATASETSCOUNT = 8;
  private bullMarket: boolean = false;

  constructor() {
    this.initLetterBonus();

    interval(17).subscribe(() => {
      this.changeLetterBonus();
    });

    interval(1000).subscribe(() => {
      if(GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'BullM')) {
        if(Math.floor(Math.random() * 10) === 1 && !this.bullMarket) {
          this.bullMarket = true;
          setTimeout(() => {
            this.bullMarket = false;
          }, 5000)
        }
      }
    })
  }

  initLetterBonus() {
    const datasets = this.letterBonus();
    if (this.letterBonus().length > 0) return;
    for (let index = 0; index < this.DATASETSCOUNT; index++) {
      datasets.push(GameUtils.random(-100, 100));
    }
  }

  changeLetterBonus() {
    const datasets = this.letterBonus();
    for (let index = 0; index < datasets.length; index++) {

      if(this.bullMarket) {
        datasets[index] += GameUtils.random(0, 5);
      }
      if(Math.floor(Math.random() * 100) == 1) {
        datasets[index] += 100;
        break; 
      }
      if (datasets[index] < -100)
        datasets[index] += GameUtils.random(0, 5);
      else if (datasets[index] < -50)
        datasets[index] += GameUtils.random(-2, 5);
      else if (datasets[index] <= 100)
        datasets[index] += GameUtils.random(-4, 5);
      else if (datasets[index] > 100)
        datasets[index] += GameUtils.random(-5, 2);
    }
    this.letterBonus.set(datasets);
  }
}
