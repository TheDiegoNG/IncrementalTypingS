import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../Services/game.service';
import { ExponentialNumberPipe } from "../../Pipes/exponential-number.pipe";

@Component({
  selector: 'app-points-counter',
  templateUrl: './points-counter.component.html',
  styleUrls: ['./points-counter.component.scss'],
  imports: [ExponentialNumberPipe]
})
export class PointsCounterComponent {
  gameService = inject(GameService)

  points = computed(() => this.gameService.game().points)
}
