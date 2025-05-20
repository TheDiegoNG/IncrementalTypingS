import { AfterViewInit, Component, inject } from '@angular/core';
import { Card } from '../../Classes/card';
import { Pack, PackTier } from '../../Classes/pack';
import { CardService } from '../../Services/card.service';
import { GameService } from '../../Services/game.service';
import { PackService } from '../../Services/pack.service';
import { TimerService } from '../../Services/timer.service';
import { GameUtils } from '../../Utils/gameUtils';
import { OverlayService } from '../../Services/overlay.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-menu',
  templateUrl: './cards-menu.component.html',
  styleUrls: ['./cards-menu.component.scss'],
  imports: [ExponentialNumberPipe, CommonModule],
})
export class CardsMenuComponent {
  cardService = inject(CardService)
  gameService = inject(GameService)
  overlayService = inject(OverlayService)
  timerService = inject(TimerService)
  packService = inject(PackService)
  cards: Card[] = [];

  constructor(
  ) {
  }
  getPack(packTier: PackTier) {
    const pack = this.packService.packs.find((x) => x.type === packTier)!;
    if (this.gameService.game().points >= pack.cost) {
      this.gameService.game.update((game) => ({...game, points: game.points-pack.cost}))
      var cards = this.cardService.getPack(packTier);
      this.timerService.logGameTimer('Purchased Cards');
      this.gameService.updateCardsCost();
      this.overlayService.cards.set(cards)
    }
  }

  getCardType(card: Card): string {
    return GameUtils.getCardType(card);
  }

  isCardPackUnlocked(pack: Pack) {
    switch (pack.type) {
      case 'Explorer':
        return GameUtils.IsPurchasedUpgrade(this.gameService.game(), '2ndP');
        break;
      case 'Master':
        return false;
        break;
      case 'Grandmaster':
        return false;
        break;
      case 'Mighty':
        return false;
        break;
      case 'Ethereal':
        return false;
        break;

      default:
        return true;
        break;
    }
  }
}
