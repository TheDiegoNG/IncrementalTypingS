import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PassiveService } from '../Services/passive.service';

@Component({
  selector: 'app-passive-bar-active',
  imports: [CommonModule],
  templateUrl: './passive-bar-active.component.html',
  styleUrl: './passive-bar-active.component.scss',
})
export class PassiveBarComponent {
  passiveService = inject(PassiveService)
  position = signal(0); // posición de la línea en la barra, 0 a 1
  direction = signal(1); // dirección: 1 (derecha) o -1 (izquierda)
  speed = 0.01; // velocidad de movimiento

  constructor() {
    setInterval(() => {

      let newPos = this.position() + this.direction() * this.speed;
      if (newPos >= 1) {
        newPos = 1;
        this.direction.set(-1);
        this.decreaseMultiplier(); // toca el extremo derecho
      } else if (newPos <= 0) {
        newPos = 0;
        this.direction.set(1);
        this.decreaseMultiplier(); // toca el extremo izquierdo
      }
      this.position.set(newPos);
    }, 20); // actualiza cada 20ms para suavidad
  }

  clickZone() {
    const pos = this.position();
    const zoneStart = 0.4; // margen izquierdo del área clara
    const zoneEnd = 0.6; // margen derecho del área clara

    if (pos >= zoneStart && pos <= zoneEnd) {
      this.increaseMultiplier();
    } else {
      this.decreaseMultiplier(); // si hace clic fuera del área
    }
  }

  increaseMultiplier() {
    this.passiveService.barActMultiplier.update((multi) => multi + 0.1); // sube el multiplicador
  }

  decreaseMultiplier() {
    this.passiveService.barActMultiplier.update((multi) => Math.max(1, multi - 0.1)); // baja mínimo a 1
  }
}
