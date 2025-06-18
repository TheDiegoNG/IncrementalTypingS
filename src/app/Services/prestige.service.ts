import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameUtils } from '../Utils/gameUtils';
import { UpgradeService } from './upgrade.service';
import { TimerService } from './timer.service';
import { AchievementService } from './achievement.service';
import { PassiveService } from './passive.service';
import { Era } from '../Classes/era';

@Injectable({
  providedIn: 'root',
})
export class PrestigeService {
  gameService = inject(GameService)
  upgradeService = inject(UpgradeService)
  timerService = inject(TimerService)
  achievementService = inject(AchievementService) 
  passiveService = inject(PassiveService)

  eras: Era[] = [];
  
  constructor(
  ) {
    this.createEra(new Era('Ascent', 2, 'x[BONUS] Points', 0));
    this.createEra(new Era('Surge', 1.25, 'x[BONUS] Passive Rate', 1e5));
    this.createEra(new Era('Growth', 2, 'x[BONUS] Bonus Mastery Exp', 1e10));
    this.createEra(new Era('Overflow', 15, '[BONUS]% Free Gacha Draw', 1e15));
    this.createEra(new Era('Eclipse', 2, 'x[BONUS] Passive Bars', 1e20));
  }

  createEra(era: Era) {
    this.eras.push(era);
  }

  prestigeStats() {
    this.timerService.logGameTimer("Prestige");
    this.gameService.updatePrestige(this.upgradeService);
    this.achievementService.revealAchievementGroup("Prestige Count")
    this.achievementService.revealAchievementGroup("Prestige Points")

    this.eras.forEach(era => {
      const eraPlayer = this.gameService.game().prestigeEras.find(x => x.name === era.name);
      if(this.gameService.game().prestigePoints > era.numberToReach && !eraPlayer) {
        const prestigeErasPlayer = this.gameService.game().prestigeEras;
        prestigeErasPlayer.push({...era});
        this.gameService.game.update((game) => ({...game, prestigeEras: prestigeErasPlayer}))
      } 
    });

    // const challengeYourself = this.upgradeService.getBasicUpgrades().find(x => x.id === "ChallengeYourself")!;
    //CHECK
    // this.gameService.addUpgrade(challengeYourself)
  }
}
