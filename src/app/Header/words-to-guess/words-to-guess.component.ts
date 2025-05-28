import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { WordsService } from '../../Services/words.service';
import { HttpClient } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ChallengesService } from '../../Services/challenge.service';

@Component({
  selector: 'app-words-to-guess',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './words-to-guess.component.html',
  styleUrls: ['./words-to-guess.component.scss'],
})
export class WordsToGuessComponent implements OnInit{
  wordService = inject(WordsService)
  challengeService = inject(ChallengesService)
  @ViewChild('WordToGuess', { static: true }) wordToGuessElement!: ElementRef;
  private wordListUrl: string =
    '/words.txt';
  wordLeft: string = '';
  wordLeft2: string = '';
  wordRight: string = '';
  wordRight2: string = '';
  private critical: boolean = false;

  constructor(
  ) {
    fetch(this.wordListUrl)
    .then(res => res.text())
    .then(text => {
        const wordList = text.split('\n');
        this.wordService.wordList = wordList;
        this.setWords();
      });

  }

  languageChange = computed(() => {
     this.shiftWords()
     this.shiftWords()
     this.shiftWords()
  })

  ngOnInit(): void {
    this.wordService.wordShifted.subscribe(() => {
      this.shiftWords();
    });
  }

  wordToGuess = computed(() => this.wordService.currentWord())

  // ngAfterViewInit(): void {
  //   this.wordService.getCritical().subscribe((value) => {
  //     if (this.critical) {
  //       const nativeElement = this.wordToGuessElement.nativeElement;
  //       this.renderer.setStyle(nativeElement, 'text-shadow', '0 0 0.1em red');
  //       this.renderer.setStyle(nativeElement, 'color', 'red');
  //     } else {
  //       const nativeElement = this.wordToGuessElement.nativeElement;
  //       this.renderer.setStyle(
  //         nativeElement,
  //         'text-shadow',
  //         '0 0 0.25em white'
  //       );
  //       this.renderer.setStyle(
  //         nativeElement,
  //         'color',
  //         'white'
  //       );
  //     }
  //   });
  // }



  setWords() {
    this.wordLeft = this.wordService.generateWord();
    this.wordLeft2 = this.wordService.generateWord();
    this.wordService.currentWord.set(this.wordService.generateWord());
    this.wordRight = this.wordService.generateWord();
    this.wordRight2 = this.wordService.generateWord();
  }

  shiftWords() {
    this.wordLeft = this.wordLeft2;
    this.wordLeft2 = this.wordToGuess();
    this.wordService.currentWord.set(this.wordRight);
    this.wordRight = this.wordRight2;
    this.wordRight2 = this.wordService.generateWord();
  }

  getWordBonus(): string {
    return this.wordService.getWordBonus();
  }

  countWordsByFirstLetter(wordList: string[]): Map<string, number> {
    const letterCountMap = new Map<string, number>();

    // Iterate through each word and count the words for each first letter
    for (const word of wordList) {
      if (word.length > 0) {
        const firstLetter = word[0].toLowerCase();
        const currentCount = letterCountMap.get(firstLetter) || 0;
        letterCountMap.set(firstLetter, currentCount + 1);
      }
    }
    return letterCountMap;
  }
}
