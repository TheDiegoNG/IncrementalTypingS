import { computed, inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  gameService = inject(GameService)
  gameNavbarItems = computed(() => {
    const game = this.gameService.game()
    return [
      { id: 'active', visible: true },
      { id: 'passive', visible: game.upgrades.some(x => x.id === "PaE") },
      { id: 'upgrades', visible: game.allTimePoints >= 50 },
      { id: 'cards', visible: game.upgrades.some(x => x.id === "Gacha") },
      { id: 'modules', visible: game.upgrades.some(x => x.id === "Mod") },
      { id: 'mastery', visible: game.upgrades.some(x => x.id === "Mast") },
      { id: 'challenges', visible: game.upgrades.some(x => x.id === "Chal") || game.gameType === "Challenge" },
      { id: 'minigames', visible: game.upgrades.some(x => x.id === "Mini") },
      { id: 'market', visible: game.upgrades.some(x => x.id === "Mark") },
      { id: 'prestige', visible: game.allTimePoints >= 1000000 },
      { id: 'achievements', visible: game.achievements.length >= 1 },
    ]
  }
  );

  optNavbarItems = [
    {id: 'stats', visible: true},
      {id: 'options', visible: true},
  ]
  activeMenu = signal<'active' | 'passive' | 'upgrades' | 'cards' | 'modules' | 'mastery' | 
  'challenges' | 'minigames' | 'market' | 'prestige' | 'achievements' | 'stats' | 'options'>('active')

  setActive(id: string) {
    this.activeMenu.set(id as any);
  }

}
