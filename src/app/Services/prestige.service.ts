import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameUtils } from '../Utils/gameUtils';
import { UpgradeService } from './upgrade.service';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root',
})
export class PrestigeService {
  gameService = inject(GameService)
  upgradeService = inject(UpgradeService)
  timerService = inject(TimerService)
  constructor(
  ) {}

  prestigeStats() {
    let maintainsPassive =
    GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), "PrestigeBringEnhancer");
    this.timerService.logGameTimer("Prestige");
    this.gameService.updatePrestige();
    const prestigeBringEnhancer = this.upgradeService.prestigeUpgrades.find(x => x.id === "PrestigeBringEnhancer")!;
    // const challengeYourself = this.upgradeService.getBasicUpgrades().find(x => x.id === "ChallengeYourself")!;
    //CHECK
    if (maintainsPassive) this.gameService.addUpgrade(prestigeBringEnhancer);
    // this.gameService.addUpgrade(challengeYourself)
  }
}
