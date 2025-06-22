import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PassiveService } from '../Services/passive.service';
import { WordsService } from '../Services/words.service';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-passive-bar-idle',
  imports: [CommonModule],
  templateUrl: './passive-bar-idle.component.html',
  styleUrl: './passive-bar-idle.component.scss',
})
export class PassiveBarIdleComponent {
  passiveService = inject(PassiveService)
  wordsService = inject(WordsService)
  gameService = inject(GameService)
  
  constructor() {
    
  }
}
