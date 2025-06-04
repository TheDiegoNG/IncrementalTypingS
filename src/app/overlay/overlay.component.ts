import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Card } from '../Classes/card';
import { OverlayService } from '../Services/overlay.service';
import { GameService } from '../Services/game.service';
import { GameUtils } from '../Utils/gameUtils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay',
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  overlayService = inject(OverlayService);
  gameService = inject(GameService);

  challengeStatus: string = 'inactive';

  @ViewChild('viewerCardsContainer') cardsContainer: ElementRef | undefined;
  @ViewChild('overlay') overlay: ElementRef | undefined;
  @ViewChild('light') light: ElementRef | undefined;

  private lastCardCount = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    effect(() => {
      const currentCount = this.cards().length;

      if (currentCount > 0 && this.lastCardCount === 0) {
        this.overlayVisible.set(true); // Solo se activa cuando antes estaba vacío
        setTimeout(() => this.viewerActive.set(true), 10);
      }

      this.lastCardCount = currentCount;
    });
  }

  overlayVisible = signal(false);
  viewerActive = signal(false)
  mouseX = signal(0);
  mouseY = signal(0);

  isViewerActive = computed(() => this.overlayVisible() && this.cards().length > 0);

  getCardType(card: Card): string {
    return GameUtils.getCardType(card);
  }

  cards = this.overlayService.cards;

  removeOverlay() {
    this.overlayVisible.set(false);
    this.viewerActive.set(false)
    setTimeout(() => this.overlayService.clearCards(), 250);
  }

  // showOverlay() {
  //   if (this.cards().length > 0) {
  //     this.overlayVisible.set(true);
  //   }
    
  // }

  onOverlayAnimationEnd() {
    if (this.overlayService.progress() >= 100)
      this.overlayService.challengeStatus.set('inactive');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX.set(event.clientX);
    this.mouseY.set(event.clientY);
  }

  calcLeft(x: number): string {
    return `calc(${x}px - 25vw)`; // 50vw / 2
  }
  calcTop(y: number): string {
    return `calc(${y}px - 25vh)`; // 50vh / 2
  }
}
