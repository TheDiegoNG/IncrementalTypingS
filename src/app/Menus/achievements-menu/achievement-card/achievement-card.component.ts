import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Achievement } from '../../../Classes/achievement';
import { AchievementService } from '../../../Services/achievement.service';
import { GameService } from '../../../Services/game.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-achievement-card',
  imports: [MatProgressBarModule, MatCardModule],
  templateUrl: './achievement-card.component.html',
  styleUrls: ['./achievement-card.component.scss'],
})
export class AchievementGroupCardComponent {
  achievementService = inject(AchievementService)
  gameService = inject(GameService)
  @Input() groupName!: string;
  @Input() achievements!: Achievement[];
  @Input() currentValue!: number;

  get unlockedCount(): number {
    return this.achievements.filter(a => this.achievementService.getAchievementProgress(a) >= 100).length;
  }

  get totalCount(): number {
    return this.achievements.length;
  }

  get lastUnlockedAchievement(): Achievement | null {
    const unlocked = this.achievements
      .filter(a => this.achievementService.getAchievementProgress(a) >= 100)
      .sort((a, b) => b.target - a.target);
    return unlocked[0] ?? null;
  }

  get nextAchievement(): Achievement | null {
    const locked = this.achievements
      .filter(a => !(this.achievementService.getAchievementProgress(a) >= 100))
      .sort((a, b) => a.target - b.target);
    return locked[0] ?? null;
  }

  get progressPercent(): number {
    const next = this.nextAchievement;
    if (!next) return 100;
    const percent = (this.currentValue / next.target) * 100;
    return Math.min(percent, 100);
  }

  getAchievementProgress(achievement: Achievement): number {
    if(this.gameService.game().achievements.some(x => x.id == achievement.id)){
      return 100;
    }
    return this.achievementService.getAchievementProgress(achievement);
  }
}