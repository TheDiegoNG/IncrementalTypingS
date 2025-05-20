import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UpgradeService } from '../../Services/upgrade.service';
import { Upgrade } from '../../Classes/upgrade';
import { GameService } from '../../Services/game.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-upgrades-menu',
  templateUrl: './upgrades-menu.component.html',
  styleUrls: ['./upgrades-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, ExponentialNumberPipe, MatCardModule],
})
export class UpgradesMenuComponent {
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

  selectUpgrade(upgrade: Upgrade) {
    this.selectedUpgrade = upgrade;
  }  

  getUpgradeById(id: string): Upgrade | undefined {
    return this.upgrades.find((u) => u.id === id);
  }

  canUnlock(upgrade: Upgrade): boolean {
    return upgrade.parents.every(pid => this.isUnlocked(pid)) &&
           !this.isUnlocked(upgrade.id);
  }

  onUpgradeClick(upgrade: Upgrade): void {
    const canUnlock = upgrade.parents.every(
      (pid) => this.isUnlocked(pid)
    );
  
    if (canUnlock && !this.isUnlocked(upgrade.id) && this.gameService.game().points >= upgrade.cost) {
      this.gameService.game.update((game) => ({...game, points: game.points - upgrade.cost}))
      this.gameService.addUpgrade(upgrade);
    }
  }

  isUnlocked(id: string): boolean {
    return this.gameService.game().upgrades.some(u => u.id === id);
  }

  // ViewBox control
  viewBox = '-100 -150 600 600';
  private panStart: { x: number; y: number } | null = null;
  private offset = { x: -300, y: -300 };
  private scale = 1;

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
    this.updateViewBox();
  }

  updateViewBox() {
    const width = 600 / this.scale;
    const height = 600 / this.scale;
    this.viewBox = `${this.offset.x} ${this.offset.y} ${width} ${height}`;
  }
}
