import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameUtils } from '../Utils/gameUtils';
import { UpgradeService } from './upgrade.service';
import { TimerService } from './timer.service';
import { AchievementService } from './achievement.service';
import { PassiveService } from './passive.service';

@Injectable({
  providedIn: 'root',
})
export class PrestigeService {
  gameService = inject(GameService)
  upgradeService = inject(UpgradeService)
  timerService = inject(TimerService)
  achievementService = inject(AchievementService) 
  passiveService = inject(PassiveService)
  constructor(
  ) {}

  prestigeStats() {
    this.timerService.logGameTimer("Prestige");
    this.gameService.updatePrestige(this.upgradeService);
    this.achievementService.revealAchievementGroup("Prestige Count")
    this.achievementService.revealAchievementGroup("Prestige Points")
    // const challengeYourself = this.upgradeService.getBasicUpgrades().find(x => x.id === "ChallengeYourself")!;
    //CHECK
    // this.gameService.addUpgrade(challengeYourself)
  }
}
