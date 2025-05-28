import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PassiveService } from '../Services/passive.service';
import { WordsService } from '../Services/words.service';

@Component({
  selector: 'app-passive-bar-active',
  imports: [CommonModule],
  templateUrl: './passive-bar-active.component.html',
  styleUrl: './passive-bar-active.component.scss',
})
export class PassiveBarComponent {
  passiveService = inject(PassiveService)
  wordsService = inject(WordsService)
  

  constructor() {
    
  }

  clickZone() {
    const pos = this.passiveService.passBarActPosition();
    const zoneStart = 0.4; // margen izquierdo del área clara
    const zoneEnd = 0.6; // margen derecho del área clara

    if (pos >= zoneStart && pos <= zoneEnd) {
      this.passiveService.increaseMultiplier();
    } else {
      this.passiveService.decreaseMultiplier(); // si hace clic fuera del área
    }
  }
}
 
