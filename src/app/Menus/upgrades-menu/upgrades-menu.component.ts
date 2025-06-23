import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UpgradeService } from '../../Services/upgrade.service';
import { eIdUpgrade, Upgrade } from '../../Classes/upgrade';
import { GameService } from '../../Services/game.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { MatCardModule } from '@angular/material/card'
import { WordsService } from '../../Services/words.service';
import { TabsModule } from  'primeng/tabs'
@Component({
  selector: 'app-upgrades-menu',
  templateUrl: './upgrades-menu.component.html',
  styleUrls: ['./upgrades-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, ExponentialNumberPipe, MatCardModule, TabsModule],
})
export class UpgradesMenuComponent implements OnInit {
  upgradeService = inject(UpgradeService);
  gameService = inject(GameService)
  upgrades = this.upgradeService.starterUpgrades.concat(
    this.upgradeService.explorerUpgrades.concat(
      this.upgradeService.masterUpgrades.concat(
        this.upgradeService.grandMasterUpgrades.concat(
          this.upgradeService.mightyUpgrades
        )
      )
    )
  );

  selectedUpgrade: Upgrade | null = null;

  ngOnInit() {
    this.updateViewBox();
  }

  selectUpgrade(upgrade: Upgrade) {
    this.selectedUpgrade = upgrade;
  }  

  getUpgradeById(id: string): Upgrade | undefined {
    return this.upgrades.find((u) => u.id === id);
  }

  getPassiveUpgradeById(id: string): Upgrade | undefined {
    return this.upgradeService.passiveUpgrades.find((u) => u.id === id);
  }

  getPrestigeUpgradeById(id: string): Upgrade | undefined {
    return this.upgradeService.prestigeUpgrades.find((u) => u.id === id);
  }

  canUnlock(upgrade: Upgrade): boolean {
    if (upgrade.parents.length === 0) {
      return true; // upgrades sin padres siempre están desbloqueables
    }
  
    if (upgrade.unlockType === 'ALL') {
      return upgrade.parents.every(pid => this.isUnlocked(pid));
    } else if (upgrade.unlockType === 'ANY') {
      return upgrade.parents.some(pid => this.isUnlocked(pid));
    }
  
    return false;
  }

   onUpgradeClick(upgrade: Upgrade): void {
    if (this.canUnlock(upgrade) && !this.isUnlocked(upgrade.id)) {
      this.upgradeService.getUpgradeByBranch(upgrade.id, upgrade.branch);
    }
  }

  isUnlocked(id: eIdUpgrade): boolean {
    const upgrades = this.gameService.game().upgrades.concat(this.gameService.game().passiveUpgrades.concat(this.gameService.game().prestigeUpgrades))
    return upgrades.some(u => u.id === id);
  }

  isLocked(upgrade: Upgrade): boolean {
    const excludedUpg = upgrade.excludes ?? [];
    return excludedUpg.some(excludedId => this.isUnlocked(excludedId)) &&
           !this.isUnlocked('Act/IdleI');
  }

  // ViewBox control
  viewBox = '-100 -150 600 600';
  private panStart: { x: number; y: number } | null = null;
  // Coordinates of the first upgrade in upgrades.json
  private readonly ROOT_POS = { x: 150, y: 100 };
  private offset = { x: this.ROOT_POS.x - 300, y: this.ROOT_POS.y - 300 };
  private scale = 1;

  private readonly MIN_SCALE = 0.5;
  private readonly MAX_SCALE = 2.5;
  private readonly BOUNDS = {
    minX: -250,
    maxX: 2100,
    minY: -250,
    maxY: 1400,
  };

  startPan(event: MouseEvent) {
    this.panStart = { x: event.clientX, y: event.clientY };
  }

  pan(event: MouseEvent) {
    if (!this.panStart) return;

    const dx = (event.clientX - this.panStart.x) / this.scale;
    const dy = (event.clientY - this.panStart.y) / this.scale;

    this.offset.x -= dx;
    this.offset.y -= dy;
    this.panStart = { x: event.clientX, y: event.clientY };
    this.updateViewBox();
  }

  endPan() {
    this.panStart = null;
  }

  zoom(event: WheelEvent) {
    event.preventDefault();
    const zoomFactor = 1.1;
    if (event.deltaY < 0) {
      this.scale *= zoomFactor;
    } else {
      this.scale /= zoomFactor;
    }
    this.scale = Math.min(Math.max(this.scale, this.MIN_SCALE), this.MAX_SCALE);
    this.updateViewBox();
  }

  updateViewBox() {
    const width = 600 / this.scale;
    const height = 600 / this.scale;
    const maxX = this.BOUNDS.maxX - width;
    const maxY = this.BOUNDS.maxY - height;
    this.offset.x = Math.min(Math.max(this.offset.x, this.BOUNDS.minX), maxX);
    this.offset.y = Math.min(Math.max(this.offset.y, this.BOUNDS.minY), maxY);
    this.viewBox = `${this.offset.x} ${this.offset.y} ${width} ${height}`;
  }

  getUpgradeBonus() {
    const rawBonus = this.selectedUpgrade?.bonus;
    let formatted = '';
    if(rawBonus?.includes('[NEEDS MULTI]')) {
      const dynValue = this.gameService.game().bonusValues[this.selectedUpgrade!.id] ?? 1;
      formatted = dynValue.toFixed(2);
      return rawBonus.replace('[NEEDS MULTI]', formatted)
    }
    if(rawBonus?.includes('[MAX LENGTH]')) {
      formatted = this.gameService.game().maxLength.toString()
      return rawBonus?.replace('[MAX LENGTH]', formatted);
    }
    if(rawBonus?.includes('[NEEDS SUM]')) {
      const dynValue = this.gameService.game().bonusSumsValues[this.selectedUpgrade!.id] ?? 1;
      formatted = dynValue.toFixed(2);
      return rawBonus?.replace('[NEEDS SUM]', formatted);
    }
    return this.selectedUpgrade?.bonus
  }
}
