import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { eIdUpgrade, MultiUpgrade, Upgrade } from '../../Classes/upgrade';
import { GameService } from '../../Services/game.service';
import { UpgradeService } from '../../Services/upgrade.service';
import { ExponentialNumberPipe } from '../../Pipes/exponential-number.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-active-menu',
  templateUrl: './active-menu.component.html',
  styleUrls: ['./active-menu.component.scss'],
  imports: [ExponentialNumberPipe, MatIconModule],
})
export class ActiveMenuComponent {
  gameService = inject(GameService);
  upgradeService = inject(UpgradeService);
  scoreUpgrades: Upgrade[] = [];

  constructor() {}

  AddMultiUpgrade(upgradeNumber: eIdUpgrade) {
    this.upgradeService.getMultiUpgrade(upgradeNumber);
  }

  isUpgradeActive(index: eIdUpgrade): boolean {
    return this.gameService.game().upgrades.some((x) => x.id == index);
  }

  getVisibleScoreUpgrades() {
    const unlockedIds = this.gameService.game().upgrades.map(u => u.id);
    const upgrades = this.upgradeService.scoreUpgrades;
    const nextIndex = upgrades.findIndex(u => !unlockedIds.includes(u.id));
  
    return upgrades.map((u, i) => {
      if (unlockedIds.includes(u.id) || i === nextIndex) {
        return u;
      } else {
        return { ...u, name: '???????', description: '???????', cost: null };
      }
    });
  }
}
