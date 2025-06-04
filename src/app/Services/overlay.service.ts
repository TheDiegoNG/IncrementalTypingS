import { computed, inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { Card } from '../Classes/card';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  gameService = inject(GameService);
  cards = signal<Card[]>([]);
  challengeStatus = signal('inactive');
  progress = computed(() => {
    const challenge = this.gameService
      .game()
      .challenges.find((x) => x.onChallenge);

    return (
      (this.gameService.game().wordsAmount * 100) /
      (challenge ? challenge.objective : 1)
    );
  });

  clearCards() {
    this.cards.set([]);
  }

  constructor() {}
}
