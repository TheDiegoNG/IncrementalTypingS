import { Component, OnInit, ChangeDetectorRef, ApplicationRef, inject, computed } from '@angular/core';
import { PassiveService } from '../../Services/passive.service';
import { GameService } from '../../Services/game.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { Generator } from '../../Classes/generator';
import { PassiveBarComponent } from "../../passive-bar-active/passive-bar-active.component";
import { GameUtils } from '../../Utils/gameUtils';
import { PassiveBarIdleComponent } from "../../passive-bar-idle/passive-bar-idle.component";
import { UpgradeService } from '../../Services/upgrade.service';
import { eIdUpgrade } from '../../Classes/upgrade';
import { MatIconModule } from '@angular/material/icon';
// import translator from "./translator";

@Component({
  selector: 'app-passive-menu',
  templateUrl: './passive-menu.component.html',
  styleUrls: ['./passive-menu.component.scss'],
  imports: [ExponentialNumberPipe, PassiveBarComponent, PassiveBarIdleComponent, MatIconModule],
})
export class PassiveMenuComponent {
  upgradeService = inject(UpgradeService)
  passiveService = inject(PassiveService)
  gameService = inject(GameService)
  generators: Generator[] = [];

  nextTierGeneratorsCost = computed(() => {
    const nextTierGenerators = this.passiveService.generators.find(generator => generator.id === this.gameService.game().passiveGenerators.length + 1);
    return nextTierGenerators ? nextTierGenerators.cost : 0
  })

  constructor() {

  }

  BuyGenerator(generatorNumber: number) {
    const yourGenerator = this.gameService.game().passiveGenerators.find(
      (x) => x.id == generatorNumber
    );
    if (!yourGenerator) return;
    if (generatorNumber == 1) {
      if (this.gameService.game().passivePoints >= yourGenerator.cost) {
        this.gameService.game.update((game) => ({...game, passivePoints: game.passivePoints-yourGenerator.cost}));
        this.gameService.buyGenerator(yourGenerator.id)
      }
    } else {
      if (
        this.gameService.game().passiveGenerators.find(
          (x) => x.id == generatorNumber - 1
        )!.amountGained >= yourGenerator.cost
      ) {
        this.gameService.removeGenerators(generatorNumber - 1, yourGenerator.cost)
        this.gameService.buyGenerator(yourGenerator.id)
      }
    }
  }

  BuyGeneratorTier() {
    const ownedGenerators = this.gameService.game().passiveGenerators;
    const nextIndex = ownedGenerators.length;

    // Cannot buy the very first generator with this method
    if (nextIndex === 0) return;

    const generatorToBuy = this.passiveService.generators[nextIndex];
    if (!generatorToBuy) return;

    const previousGenerator = ownedGenerators[nextIndex - 1];
    if (!previousGenerator) return;

    if (previousGenerator.amountGained >= generatorToBuy.cost) {
      this.gameService.removeGenerators(previousGenerator.id, generatorToBuy.cost);
      this.gameService.addGenerator(generatorToBuy);
      this.gameService.buyGenerator(generatorToBuy.id);
    }
  }

  shouldDisplayGenerator(id: number): boolean {
    const game = this.gameService.game();
    return game.passiveGenerators.length >= id;
  }

  isPassiveActiveBarPurchased() {
    return GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xPass/h')
  }

  isPassiveIdleBarPurchased() {
    return GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xPass/t')
  }

  getVisibleScoreUpgrades() {
    const unlockedIds = this.gameService.game().passiveUpgrades.map(u => u.id);
    const upgrades = this.upgradeService.passiveScoreUpgrades;
    const nextIndex = upgrades.findIndex(u => !unlockedIds.includes(u.id));
  
    return upgrades.map((u, i) => {
      if (unlockedIds.includes(u.id) || i === nextIndex) {
        return u;
      } else {
        return { ...u, name: '???????', description: '???????', cost: null };
      }
    });
  }

  isUpgradeActive(index: eIdUpgrade): boolean {
    return this.gameService.game().passiveUpgrades.some((x) => x.id == index);
  }

}
