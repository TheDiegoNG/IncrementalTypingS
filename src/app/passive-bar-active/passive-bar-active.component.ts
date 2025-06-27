import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PassiveService } from '../Services/passive.service';
import { WordsService } from '../Services/words.service';
import { GameService } from '../Services/game.service';
import { GameUtils } from '../Utils/gameUtils';

@Component({
  selector: 'app-passive-bar-active',
  imports: [CommonModule],
  templateUrl: './passive-bar-active.component.html',
  styleUrl: './passive-bar-active.component.scss',
})
export class PassiveBarComponent {
  passiveService = inject(PassiveService)
  wordsService = inject(WordsService)
  gameService = inject(GameService)

  constructor() {
    
  }

  clickZone() {
    const pos = this.passiveService.passBarActPosition() * 100;
    const zoneStart = (100 - this.passiveService.passBarActZoneWidth())/2; // margen izquierdo del área clara
    const zoneEnd = (100 + this.passiveService.passBarActZoneWidth())/2; // margen derecho del área clara
    const critZoneStart = (100 - this.passiveService.passBarActCritZoneWidth())/2;
    const critZoneEnd = (100 + this.passiveService.passBarActCritZoneWidth())/2;
    
    if (pos >= zoneStart && pos <= zoneEnd) {
      this.passiveService.increaseMultiplier(0.1);
      if(pos >= critZoneStart && pos <= critZoneEnd && GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'PrecBarCrit')) {
        this.passiveService.increaseMultiplier(1);
      }
      this.passiveService.increaseActBarCombo();
    } else {
      this.passiveService.decreaseMultiplier(); // si hace clic fuera del área
      this.passiveService.resetActBarCombo();
    }
  }

  

  get isCritZoneUnlocked(): boolean {
    return GameUtils.IsPurchasedPassiveUpgrade(this.gameService.game(), 'PrecBarCrit');
  }

  get isBarActComboUnlocked(): boolean {
    return GameUtils.IsPurchasedPrestigeUpgrade(this.gameService.game(), 'ActBarPerf');
  }
}
 
