import { Component, computed, inject } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Card } from '../../Classes/card';
import { CardService } from '../../Services/card.service';
import { ActiveService } from '../../Services/active.service';
import { AchievementService } from '../../Services/achievement.service';
import { GameService } from '../../Services/game.service';
import { Generator } from '../../Classes/generator';
import { GameUtils } from '../../Utils/gameUtils';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { ModulesService } from '../../Services/modules.service';

@Component({
  selector: 'app-modules-menu',
  templateUrl: './modules-menu.component.html',
  styleUrls: ['./modules-menu.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, pointerEvents: 'none' })),
      transition('visible => hidden', animate('300ms ease-out')),
      transition('hidden => visible', animate('300ms ease-in')),
    ]),
  ],
  imports: [CommonModule, MatIconModule, ExponentialNumberPipe]
})
export class ModulesMenuComponent {
  modulesService = inject(ModulesService)
  gameService = inject(GameService)
  cardService = inject(CardService)
  activeService = inject(ActiveService)
  constructor() {}


  getCardType(card: Card): string {
    return GameUtils.getCardType(card);
  }
  
  getCardsAmount(card: Card): number {
    return this.gameService.game().cards.filter((x) => x.id === card.id)
      .length;
  }

  canMerge(card: Card) {
    return this.modulesService.mergeAmount <= this.getCardsAmount(card);
  }
}
