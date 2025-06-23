import { Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { Pack, PackTier } from '../Classes/pack';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  packs: Pack[] = [];
  constructor(private gameService: GameService) {
    this.createPack(
      new Pack(
        'Starter',
        1E9,
        2
      )
    );
    this.createPack(
      new Pack(
        'Explorer',
        1E15,
        3
      )
    );
    this.createPack(
      new Pack(
        'Master',
        1E25,
        4
      )
    );
    this.createPack(
      new Pack(
        'Grandmaster',
        1E35,
        5
      )
    );
    this.createPack(
      new Pack(
        'Mighty',
        1E45,
        6
      )
    );
    this.createPack(
      new Pack(
        'Ethereal',
        1E55,
        7
      )
    );
  }

  createPack(pack: Pack) {
    this.packs.push(pack)
  }

  updatePackCost(packTier: PackTier){
    const pack = this.packs.find(x => x.type === packTier)!;
    pack.cost = pack.cost * pack.exp;
  }
}
