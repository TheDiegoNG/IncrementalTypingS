import { Component, computed, inject } from '@angular/core';
import { Mastery } from '../../Classes/mastery';
import { GameService } from '../../Services/game.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mastery-menu',
  templateUrl: './mastery-menu.component.html',
  styleUrls: ['./mastery-menu.component.scss'],
  imports: [MatProgressBarModule, MatCardModule]
})
export class MasteryMenuComponent {
  gameService = inject(GameService)
  masteries = computed(() => this.gameService.game().masteryLevels);
  mastShopCards = [
    {name: "MastTest1", level: 0, costToLevelUp: 100, amount: 59},
    {name: "MastTest2", level: 0, costToLevelUp: 100, amount: 59},
    {name: "MastTest3", level: 0, costToLevelUp: 100, amount: 59},
    {name: "MastTest4", level: 0, costToLevelUp: 100, amount: 59}
  ]
  constructor() {
  }

    getTotalMasteryLevels() {
      return this.masteries().reduce((sum, mast) => sum + mast.level, 0);
    }
}
