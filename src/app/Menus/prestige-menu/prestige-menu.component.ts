import { Component, computed, inject, Renderer2 } from '@angular/core';
import { GameService } from '../../Services/game.service';
import { PrestigeService } from '../../Services/prestige.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-prestige-menu',
  templateUrl: './prestige-menu.component.html',
  styleUrls: ['./prestige-menu.component.scss'],
  imports:[MatCardModule]
})
export class PrestigeMenuComponent {
  gameService = inject(GameService)
  prestigeService = inject(PrestigeService)

  prestigePointsToGet = computed(() => {
    const mastShopPres = this.gameService.game().mastShopItems.find(x => x.name === 'Ascendant Core')!;
    const exp = (1/3) + 0.57 * (1 - Math.exp(-0.00005 * mastShopPres.level));
    return Math.round(Math.pow(this.gameService.game().points, exp));
  });

  prestigeProgress = computed(() => {
    const points = this.gameService.game().prestigePoints;
    const eras = this.prestigeService.eras;
    if (eras.length === 0) return 0;
    const maxValue = Math.log10(Math.max(eras[eras.length - 1].numberToReach, 1));
    if (maxValue === 0) return 100;
    const value = Math.log10(Math.max(points, 1));
    return Math.min((value / maxValue) * 100, 100);
  });

  eraMarkers = computed(() => {
    const eras = this.prestigeService.eras;
    if (eras.length === 0) return [] as { name: string; position: number }[];
    const maxValue = Math.log10(Math.max(eras[eras.length - 1].numberToReach, 1));
    return eras.map(era => {
      const value = era.numberToReach > 0 ? Math.log10(era.numberToReach) : 0;
      const position = maxValue === 0 ? 0 : (value / maxValue) * 100;
      return { name: era.name, position };
    });
  });

  constructor(
    private renderer: Renderer2
  ) {
  }

  prestigeGame() {
    this.prestigeService.prestigeStats();
  }

  fadeOutBody() {
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.addClass(body, 'fade-out');
    setTimeout(() => {
      this.prestigeGame();
      this.renderer.removeClass(body, 'fade-out');
    }, 1000); // 1000ms = 1s, adjust the timeout to match the duration of your CSS animation
  }
}
