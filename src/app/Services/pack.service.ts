import { Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { Pack } from '../Classes/pack';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  packs: Pack[] = [];
  constructor(private gameService: GameService) {
    this.createPack(
      new Pack(
        'Starter',
        1E5
      )
    );
    this.createPack(
      new Pack(
        'Explorer',
        1E15
      )
    );
    this.createPack(
      new Pack(
        'Master',
        1E25
      )
    );
    this.createPack(
      new Pack(
        'Grandmaster',
        1E35
      )
    );
    this.createPack(
      new Pack(
        'Mighty',
        1E45
      )
    );
    this.createPack(
      new Pack(
        'Ethereal',
        1E55
      )
    );
  }

  createPack(pack: Pack) {
    this.packs.push(pack)
  }
}
