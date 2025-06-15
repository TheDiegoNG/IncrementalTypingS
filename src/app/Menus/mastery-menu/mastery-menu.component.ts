import { Component, computed, inject } from '@angular/core';
import { Mastery, MastShopItem } from '../../Classes/mastery';
import { GameService } from '../../Services/game.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MasteryService } from '../../Services/mastery.service';

@Component({
  selector: 'app-mastery-menu',
  templateUrl: './mastery-menu.component.html',
  styleUrls: ['./mastery-menu.component.scss'],
  imports: [MatProgressBarModule, MatCardModule]
})
export class MasteryMenuComponent {
  gameService = inject(GameService)
  masteryService = inject(MasteryService)
  masteries = computed(() => this.gameService.game().masteryLevels);

  constructor() {
  }

    getTotalMasteryLevels() {
      return this.masteries().reduce((sum, mast) => sum + mast.level, 0);
    }

    getMastShopLevel(item: MastShopItem) {
      this.masteryService.getMastShopLevel(item, 1)
    }
    
}
