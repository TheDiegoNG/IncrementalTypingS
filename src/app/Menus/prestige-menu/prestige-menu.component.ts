import { Component, computed, inject, Renderer2 } from '@angular/core';
import { GameService } from '../../Services/game.service';
import { PrestigeService } from '../../Services/prestige.service';

@Component({
  selector: 'app-prestige-menu',
  templateUrl: './prestige-menu.component.html',
  styleUrls: ['./prestige-menu.component.scss'],
})
export class PrestigeMenuComponent {
  gameService = inject(GameService)
  prestigeService = inject(PrestigeService)

  prestigePointsToGet = computed(() => Math.round(Math.cbrt(this.gameService.game().points)));

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
