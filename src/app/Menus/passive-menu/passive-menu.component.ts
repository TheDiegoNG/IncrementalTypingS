import { Component, OnInit, ChangeDetectorRef, ApplicationRef, inject, computed } from '@angular/core';
import { PassiveService } from '../../Services/passive.service';
import { GameService } from '../../Services/game.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { Generator } from '../../Classes/generator';
import { PassiveBarComponent } from "../../passive-bar-active/passive-bar-active.component";
import { GameUtils } from '../../Utils/gameUtils';
import { PassiveBarIdleComponent } from "../../passive-bar-idle/passive-bar-idle.component";
// import translator from "./translator";

@Component({
  selector: 'app-passive-menu',
  templateUrl: './passive-menu.component.html',
  styleUrls: ['./passive-menu.component.scss'],
  imports: [ExponentialNumberPipe, PassiveBarComponent, PassiveBarIdleComponent],
})
export class PassiveMenuComponent {
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
    const generatorToBuy = this.passiveService.generators.find(
      (x) => x.id == this.gameService.game().passiveGenerators.length + 1
    );
    if (!generatorToBuy) return;
    if (
      this.gameService.game().passiveGenerators.find(
        (x) => x.id == generatorToBuy.id - 1
      )!.amountGained >= generatorToBuy.cost
    ) {
      this.gameService.removeGenerators(generatorToBuy.id - 1, generatorToBuy.cost);
      this.gameService.addGenerator(generatorToBuy);
      this.gameService.buyGenerator(generatorToBuy.id);

      const generator = document.querySelector(
        `#PassivePointsGenerator${generatorToBuy.id - 1}`
      );
      if (generator && generator instanceof HTMLElement)
        generator.style.display = 'block';
    }
  }

  shouldDisplayGenerator(id: number): boolean {
    const game = this.gameService.game();
    return game.passiveGenerators.length >= id;
  }

  isPassiveActiveBarPurchased() {
    return GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xFast')
  }

  isPassiveIdleBarPurchased() {
    return GameUtils.IsPurchasedUpgrade(this.gameService.game(), 'xSlow')
  }

}
