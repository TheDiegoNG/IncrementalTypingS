import { Component, computed, inject, model, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../Services/game.service';
// import { LayoutService } from '../../Services/layout.service';
// import { SaveService } from '../../Services/save.service';
import { WordsService } from '../../Services/words.service';
import { MessageService } from 'primeng/api';
// import {
//   ChallengesService,
//   language,
// } from 'src/app/services/challenges.service';
import { GameUtils } from '../../Utils/gameUtils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordbox',
  imports: [FormsModule],
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss'],
})
export class WordboxComponent {
  wordService = inject(WordsService);
  // layoutService = inject(LayoutService);
  gameService = inject(GameService);
  // saveService = inject(SaveService);
  // messageService = inject(MessageService);
  // challengeService = inject(ChallengesService);
  lettersPerSecond = 0;
  startTime = Date.now();
  letters = 0;
  inputValue = model('');
  LPSVisibility = false;
  ComboCounterVisibility = false;
  critical = false;
  // language: language = 'English';

  constructor() {
    // this.challengeService
    //   .getLanguage()
    //   .subscribe((language) => (this.language = language));
  }

  gameUtils = new GameUtils();

  comboCounter = computed(() => this.gameService.game().wordCounterPerfection);

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe(() => {
    //   this.updateLettersPerSecond();
    // });
    // this.layoutService.getLettersPerSecondVisibility().subscribe((visible) => {
    //   this.LPSVisibility = visible;
    // });
    // this.layoutService.getComboCounterVisibility().subscribe((visible) => {
    //   this.ComboCounterVisibility = visible;
    // });
  }

  checkWord() {
    // if (this.language === 'Japanese') {
    //   const japaneseMap = this.gameUtils.getJapaneseMap();
    //   const regex = new RegExp(Object.keys(japaneseMap).join('|'), 'g');
    //   this.inputValue = this.inputValue.replace(regex, (x) => japaneseMap[x]);
    // }
    // if (this.language === 'Russian') {
    //   const russianMap = this.gameUtils.getRussianCyrillicMap();
    //   const regex = new RegExp(Object.keys(russianMap).join('|'), 'g');
    //   this.inputValue = this.inputValue.replace(regex, (x) => russianMap[x]);
    // }
    // if (this.language === 'Amharic') {
    //   const amharicMap = this.gameUtils.getAmharicMap();
    //   const regex = new RegExp(Object.keys(amharicMap).join('|'), 'g');
    //   this.inputValue = this.inputValue.replace(regex, (x) => amharicMap[x]);
    // }
    this.gameService.game.update((game) => ({
      ...game,
      letterCounter: game.letterCounter++,
    }));
    this.gameService.game.update((game) => ({
      ...game,
      letterCounterPerfection: game.letterCounterPerfection++,
    }));
    if (!this.wordService.checkWordMatch(this.inputValue())) return;
    if (
      this.gameService.game().letterCounterPerfection ===
      this.wordService.currentWord().length
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        wordCounterPerfection: game.wordCounterPerfection++,
      }));
    } else {
      this.gameService.game.update((game) => ({
        ...game,
        wordCounterPerfection: 0,
      }));
    }
    this.gameService.game.update((game) => ({
      ...game,
      letterCounterPerfection: 0,
    }));
    this.wordService.wordShifted.next();
    this.wordService.guessedWord(this.inputValue());
    this.inputValue.set('');
    let critChance = 1 + (this.gameService.game().multiUpgrades.find(x => x.id == "MultiUpgradeCritChance")?.count ?? 0)
    console.log("Crit chance: ", critChance)
    this.wordService.critical.set(Math.floor(Math.random() * 100) <= critChance);
  }

  updateLettersPerSecond() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - this.startTime) / 1000;
    const newLetters = this.inputValue.length;
    const deltaLetters = newLetters - this.letters;
    this.letters = newLetters;
    this.lettersPerSecond = deltaLetters >= 0 ? deltaLetters / elapsedTime : 0;
    this.startTime = currentTime;
  }

  saveGame() {
    // this.saveService.saveGame();
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Saved!',
    //   life: 1000,
    //   contentStyleClass: 'my-toast',
    // });
  }

  // loadGame(event: Event) {
  //   const el = event.target as HTMLInputElement;
  //   const file = el.files?.[0];
  //   if (!file) return;
  //   const fileReader = new FileReader();
  //   fileReader.onload = async (event) => {
  //     const encodedString = event.target?.result as string;
  //     if (!encodedString) return;
  //     const decodedString = await this.saveService.decode(encodedString);
  //     this.saveService.loadGame(decodedString);
  //   };
  //   fileReader.readAsText(file);
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Loaded!',
  //     life: 1000,
  //     contentStyleClass: 'my-toast',
  //   });
  // }

  logGame() {
    console.log('Current Game: ', this.gameService.game());
    console.log('Challenge Game: ', this.gameService.challengeGame());
    console.log('Active Game: ', this.gameService.activeGame());
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'Logged!',
    //   life: 1000,
    //   contentStyleClass: 'my-toast',
    // });
  }
}
