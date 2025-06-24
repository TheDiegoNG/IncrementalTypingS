import {
  Component,
  computed,
  effect,
  inject,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
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
import { LayoutService } from '../../Services/layout.service';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../Services/timer.service';
import { LanguageService } from '../../Services/language.service';
import { SaveService } from '../../Services/save.service';
import { AchievementService } from '../../Services/achievement.service';

@Component({
  selector: 'app-wordbox',
  imports: [FormsModule, CommonModule],
  templateUrl: './wordbox.component.html',
  styleUrls: ['./wordbox.component.scss'],
})
export class WordboxComponent {
  wordService = inject(WordsService);
  layoutService = inject(LayoutService);
  gameService = inject(GameService);
  timerService = inject(TimerService)
  languageService = inject(LanguageService);
  saveService = inject(SaveService);
  achievementService = inject(AchievementService)
  // messageService = inject(MessageService);
  // challengeService = inject(ChallengesService);
  startTime = Date.now();
  critical = false;
  inputValue = model('');
  currentLetterCount = computed(() => this.inputValue().length);
  currentTime = signal(Date.now());
  lettersPerSecond = computed(() => this.wordService.lettersPerMinute());

  // language: language = 'English ';

  constructor(private messageService: MessageService) {

    // this.challengeService
    //   .getLanguage()
    //   .subscribe((language) => (this.language = language));

    effect(() => {
      this.wordService.recordInputLength(this.inputValue().length);
    });

    
  }
  comboCounter = computed(() => this.gameService.game().wordCounterPerfection);

  mockTyping() {
    const currWord = this.wordService.currentWord();
    const currentInput = this.inputValue();
    if (currentInput.length < currWord.length) {
      // Add the next letter from currentWord
      const nextLetter = currWord[currentInput.length];
      this.inputValue.set(currentInput + nextLetter);
  
      // Call checkWord to process the input
      this.checkWord();
    }
  }

  customTimerLog() {
    this.timerService.logGameTimer("Custom Timer")
  }

  startAuto() {
    setInterval(() => {
      this.mockTyping()
    }, 400)
  }

  async checkWord() {
    if (this.languageService.language() === 'Japanese') {
      const japaneseMap = await GameUtils.getJapaneseMap();
      const regex = new RegExp(Object.keys(japaneseMap).join('|'), 'g');
      this.inputValue.set(this.inputValue().replace(regex, (x) => japaneseMap[x]));
    }
    if (this.languageService.language() === 'Russian') {
      const russianMap = await GameUtils.getRussianCyrillicMap();
      const regex = new RegExp(Object.keys(russianMap).join('|'), 'g');
      this.inputValue.set(this.inputValue().replace(regex, (x) => russianMap[x]));
    }
    if (this.languageService.language() === 'Amharic') {
      const amharicMap = await GameUtils.getAmharicMap();
      const regex = new RegExp(Object.keys(amharicMap).join('|'), 'g');
      this.inputValue.set(this.inputValue().replace(regex, (x) => amharicMap[x]));
    }
    this.gameService.game.update((game) => ({
      ...game,
      letterCounter: ++game.letterCounter,
      letterCounterPerfection: ++game.letterCounterPerfection,
    }));
    if (!this.wordService.checkWordMatch(this.inputValue())) return;
    if (
      this.gameService.game().letterCounterPerfection ===
      this.wordService.currentWord().length
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        wordCounterPerfection: ++game.wordCounterPerfection,
        letterCounterPerfection: 0
      }));
      this.achievementService.revealAchievementGroup("Word Counter Perfection")
    } else {
      this.gameService.game.update((game) => ({
        ...game,
        wordCounterPerfection: 0,
        letterCounterPerfection: 0,
      }));
    }
    this.wordService.wordShifted.next();
    this.wordService.guessedWord(this.inputValue());
    this.inputValue.set('');
    let critChance =
      1 +
      (this.gameService
        .game()
        .multiUpgrades.find((x) => x.id == 'MultiUpgradeCritChance')?.count ??
        0);
    this.wordService.critical.set(
      Math.floor(Math.random() * 100) <= critChance
    );
  }

  saveGame() {
    this.saveService.saveGame();
    this.messageService.add({
      severity: 'info',
      summary: 'Saved!',
      life: 3000,
      contentStyleClass: 'my-toast',
    });
  }

  loadGame(event: Event) {
    const el = event.target as HTMLInputElement;
    const file = el.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const encodedString = event.target?.result as string;
      if (!encodedString) return;
      const decodedString = await this.saveService.decode(encodedString);
      this.saveService.loadGame(decodedString);
    };
    fileReader.readAsText(file);
    this.messageService.add({
      severity: 'info',
      summary: 'Loaded!',
      life: 1000,
      contentStyleClass: 'my-toast',
    });
  }

  logGame() {
    console.log('Current Game: ', this.gameService.game());
    console.log('Challenge Game: ', this.gameService.challengeGame());
    console.log('Active Game: ', this.gameService.activeGame());
    this.messageService.add({
      severity: 'info',
      summary: 'Logged!',
      life: 1000,
      contentStyleClass: 'my-toast',
    });
  }
}
