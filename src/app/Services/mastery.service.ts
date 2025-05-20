import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { MasteryTier } from '../Classes/mastery';

@Injectable({
  providedIn: 'root'
})
export class MasteryService {
gameService = inject(GameService)

   updateMasteryValue(masteryTier: MasteryTier) {
    this.gameService.updateMasteryValue(masteryTier);
   }

   calculateMasteryPoints(letters: string[]) {
    // letters.forEach(letter => {
    //     switch (letter) {
    //       case 'a' || 'e' || 'i' || 'o' || 'u' || 'l' || 'n' || 's' || 't' || 'r':
    //           this.gameService.updateMasteryValue('Alpha')
    //         break;
        
    //       default:
    //         break;
    //     }
    // });
  }


}
