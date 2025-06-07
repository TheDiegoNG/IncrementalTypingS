import { Component, inject } from '@angular/core';
import { AchievementService } from '../../Services/achievement.service';
import { Achievement } from '../../Classes/achievement';
import { GameService } from '../../Services/game.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AchievementGroupCardComponent } from './achievement-card/achievement-card.component';
import { Game } from '../../Classes/game';

@Component({
  selector: 'app-achievements-menu',
  templateUrl: './achievements-menu.component.html',
  styleUrls: ['./achievements-menu.component.scss'],
  imports: [CommonModule, MatCardModule, AchievementGroupCardComponent]
})
export class AchievementsMenuComponent {
  achievementService = inject(AchievementService)
  gameService = inject(GameService)

  constructor() {}

  isUnlocked(achievementNumber: number) {
    return this.gameService.game().achievements.some(x => x.id == achievementNumber) ? 'unlocked' : '';
  }

  getAchievementProgress(achievement: Achievement): number {
    if(this.gameService.game().achievements.some(x => x.id == achievement.id)){
      return 100;
    }
    return this.achievementService.getAchievementProgress(achievement);
  }

  getPlayerValueFor(property: string) {
    const target = this.gameService.game()[property as keyof Game]
    if (!(typeof target === 'number')) {
      return 0;
    }
    return target;
  }
}
