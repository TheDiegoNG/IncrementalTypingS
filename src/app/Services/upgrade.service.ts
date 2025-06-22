import { inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { PassiveService } from './passive.service';
import { eIdUpgrade, Upgrade, UnlockType } from '../Classes/upgrade';
import { TimerService } from './timer.service';
import { GameUtils } from '../Utils/gameUtils';

interface UpgradeJson {
  name: string;
  description: string;
  cost: number;
  id: eIdUpgrade;
  branch: Upgrade['branch'];
  parents?: eIdUpgrade[];
  x?: number;
  y?: number;
  bonus?: string;
  excludes?: eIdUpgrade[];
  unlockType?: UnlockType;
}

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  gameService = inject(GameService);
  layoutService = inject(LayoutService);
  passiveService = inject(PassiveService);
  timerService = inject(TimerService);
  starterUpgrades: Upgrade[] = [];
  explorerUpgrades: Upgrade[] = [];
  masterUpgrades: Upgrade[] = [];
  grandMasterUpgrades: Upgrade[] = [];
  mightyUpgrades: Upgrade[] = [];
  passiveUpgrades: Upgrade[] = [];
  prestigeUpgrades: Upgrade[] = [];
  scoreUpgrades: Upgrade[] = [];
  passiveScoreUpgrades: Upgrade[] = [];
  lengthUpgradeBlocked = signal(false);

  constructor() {
    this.loadUpgrades();
  }
  private async loadUpgrades() {
    const response = await fetch('/upgrades.json');
    const upgradeList: UpgradeJson[] = await response.json();
    for (const u of upgradeList) {
      const upgrade = new Upgrade(
        u.name,
        u.description,
        u.cost,
        u.id,
        u.branch,
        u.parents ?? [],
        u.x ?? 0,
        u.y ?? 0,
        u.bonus,
        u.excludes,
        u.unlockType ?? 'ALL'
      );
      switch (u.branch) {
        case 'Starter':
          this.createStarterUpgrade(upgrade);
          break;
        case 'Explorer':
          this.createExplorerUpgrade(upgrade);
          break;
        case 'Master':
          this.createMasterUpgrade(upgrade);
          break;
        case 'GrandMaster':
          this.createGrandMasterUpgrade(upgrade);
          break;
        case 'Mighty':
          this.createMightyUpgrade(upgrade);
          break;
        case 'Passive':
          this.createPassiveUpgrade(upgrade);
          break;
        case 'Prestige':
          this.createPrestigeUpgrade(upgrade);
          break;
        case 'Score':
          this.createScoreUpgrade(upgrade);
          break;
        case 'PassiveScore':
          this.createPassiveScoreUpgrade(upgrade);
          break;
        default:
          break;
      }
    }
  }

  gameUtils = new GameUtils();

  createScoreUpgrade(upgrade: Upgrade) {
    this.scoreUpgrades.push(upgrade);
  }

  createStarterUpgrade(upgrade: Upgrade) {
    this.starterUpgrades.push(upgrade);
  }

  createExplorerUpgrade(upgrade: Upgrade) {
    this.explorerUpgrades.push(upgrade);
  }

  createMasterUpgrade(upgrade: Upgrade) {
    this.masterUpgrades.push(upgrade);
  }

  createGrandMasterUpgrade(upgrade: Upgrade) {
    this.grandMasterUpgrades.push(upgrade);
  }

  createMightyUpgrade(upgrade: Upgrade) {
    this.mightyUpgrades.push(upgrade);
  }

  createPassiveScoreUpgrade(upgrade: Upgrade) {
    this.passiveScoreUpgrades.push(upgrade);
  }

  createPassiveUpgrade(upgrade: Upgrade) {
    this.passiveUpgrades.push(upgrade);
  }

  createPrestigeUpgrade(upgrade: Upgrade) {
    this.prestigeUpgrades.push(upgrade);
  }
  getScoreUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.scoreUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getPassiveScoreUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.passiveScoreUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().passivePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints - upgrade.cost,
      }));
      this.gameService.addPassiveUpgrade(upgrade);
      this.timerService.logGameTimer(
        `Obtained Passive Upgrade: ${upgrade.name}"`
      );
    }
  }

  getStarterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.starterUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === 'LpV') {
        this.layoutService.lettersPerSecondVisible.set(true);
      }
      if (upgradeType === 'xPrec') {
        this.layoutService.comboCounterVisible.set(true);
      }
      if (upgradeType === 'xPass/t') {
        this.passiveService.passBarIdleProgress.set(1);
      }
      if (upgradeType === 'PaE') {
        if (!this.gameService.game().passiveGenerators.some((x) => x.id == 1)) {
          console.log('Bought PaE, added Generator');
          this.gameService.addGenerator(
            this.passiveService.generators.find((x) => x.id == 1)!
          );
        }
        this.gameService.buyGenerator(1);
      }
      if (upgradeType === '+1WLI') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getMultiUpgrade(upgradeType: eIdUpgrade) {
    const multiUpgrade = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id === upgradeType);
    if (!multiUpgrade) return;
    if (this.gameService.game().points >= multiUpgrade.cost) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - multiUpgrade.cost,
      }));
      this.gameService.buyMultiUpgrade(upgradeType);
      let multi = GameUtils.IsPurchasedPrestigeUpgrade(
        this.gameService.game(),
        'MuScal+'
      )
        ? 1.1
        : 1;
      
      const mastShopItem = this.gameService.game().mastShopItems.find(x => x.name === 'Stasis Mark')
      multi *= Math.pow(1.01, mastShopItem!.level);
      this.gameService.setMultiUpgradeCost(
        upgradeType,
        multi
      );
      this.timerService.logGameTimer(`Obtained Upgrade: ${multiUpgrade.name}"`);
    }
  }

  getExplorerUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.explorerUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === '+1WLII') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getMasterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.masterUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === '+1WLIII') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getGrandMasterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.grandMasterUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === '+1WLIV') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getMightyUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.mightyUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === '+1WLV') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getPassiveUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().passivePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints - upgrade.cost,
      }));
      this.gameService.addPassiveUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === 'HorScal+')
        this.gameService.game.update((game) => ({
          ...game,
          passiveLength: ++game.passiveLength,
        }));
    }
  }

  getPrestigeUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().prestigePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        prestigePoints: game.prestigePoints - upgrade.cost,
      }));
      this.gameService.addPrestigeUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType == 'PrestigeGachaGods')
        this.gameService.game.update((game) => ({
          ...game,
          rollsAmount: game.rollsAmount + 2,
        }));
    }
  }

  getUpgradeByBranch(upgradeId: eIdUpgrade, branch: string) {
    switch (branch) {
      case 'Starter':
        return this.getStarterUpgrade(upgradeId);
      case 'Explorer':
        return this.getExplorerUpgrade(upgradeId);
      case 'Master':
        return this.getMasterUpgrade(upgradeId);
      case 'GrandMaster':
        return this.getGrandMasterUpgrade(upgradeId);
      case 'Mighty':
        return this.getMightyUpgrade(upgradeId);
      case 'Passive':
        return this.getPassiveUpgrade(upgradeId);
      case 'Prestige':
        return this.getPrestigeUpgrade(upgradeId);
      default:
        throw new Error('Unknown upgrade branch: ' + branch);
    }
  }
}
