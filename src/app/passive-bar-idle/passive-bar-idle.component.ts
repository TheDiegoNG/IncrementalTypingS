import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PassiveService } from '../Services/passive.service';

@Component({
  selector: 'app-passive-bar-idle',
  imports: [CommonModule],
  templateUrl: './passive-bar-idle.component.html',
  styleUrl: './passive-bar-idle.component.scss',
})
export class PassiveBarIdleComponent {
  passiveService = inject(PassiveService)
  progress = signal(99.7); // de 0 a 1
  speed = 0.0005; // velocidad de llenado (ajustable)
  constructor() {
    setInterval(() => {
      let newProgress = this.progress() + this.speed;
        this.passiveService.barIdleMultiplier.set(newProgress);
      
      this.progress.set(newProgress);
    }, 20);
  }
}
