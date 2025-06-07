import { inject, Injectable, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { MessageService } from 'primeng/api';
import { Achievement } from '../Classes/achievement';
import { GameUtils } from '../Utils/gameUtils';
import { Game } from '../Classes/game';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  gameService = inject(GameService);
  // messageService = inject(MessageService);
  achievements: Achievement[] = [];
  private intervalId;

  constructor(
  ) {
    this.createAchievement(
      new Achievement(
        'First Scribble',
        'Write your first word. Congratulations! You know how to write!',
        1,
        1,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Decalexicographer',
        'Write 10 words. Pay attention, it seems that you are close to your first upgrade',
        2,
        10,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quinquagenarian Scribe',
        'Write 50 words',
        3,
        50,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Epic 69er',
        'Write 69 words. Nice',
        37,
        69,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Centennial Lexiconist',
        'Write 100 words',
        4,
        100,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Palindrome Prodigy',
        'Write 121 words',
        41,
        121,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quadratopus Scribe',
        'Write 250 words',
        5,
        250,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Blaze It Bard',
        'Write 420 words',
        38,
        420,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quingentenary Scriptor',
        'Write 500 words',
        6,
        500,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Demonic Scribe',
        'Write 666 words',
        42,
        666,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Lucky Seven Lexicographer',
        'Write 777 words',
        39,
        777,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Millenium Maestro',
        'Write 1000 words',
        7,
        1000,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Golden Ratio Scribe',
        'Write 1618 words',
        40,
        1618,
        'wordsAmount'
      )
    );
    this.createAchievement(
      new Achievement('Initiate Explorer', 'Save 100 points', 8, 100, 'points')
    );
    this.createAchievement(
      new Achievement('Exemplary Attainer', 'Save 500 points', 9, 500, 'points')
    );
    this.createAchievement(
      new Achievement(
        'Milestone Achiever',
        'Save 2000 points',
        10,
        2000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Ascendant Achiever',
        'Save 8000 points',
        11,
        8000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Pinnacle Reacher',
        'Save 15000 points',
        12,
        15000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Epic Conqueror',
        'Save 40000 points',
        13,
        40000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Illustrious Achiever',
        'Save 80000 points',
        14,
        80000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Prestigious Attainer',
        'Save 125000 points',
        15,
        125000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Zenith Attainer',
        'Save 250000 points',
        16,
        250000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Distinguished Master',
        'Save 500000 points',
        17,
        500000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Apex Achiever',
        'Save 1000000 points',
        18,
        1000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Eminent Attainer',
        'Save 3000000 points',
        19,
        3000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Legacy Builder',
        'Save 10000000 points',
        20,
        10000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Venerable Attainer',
        'Save 50000000 points',
        21,
        50000000,
        'points'
      )
    );
    this.createAchievement(
      new Achievement(
        'Currency Collector',
        'Reach 10000 Passive Points',
        22,
        10000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Wealth Accumulator',
        'Reach 200000 Passive Points',
        23,
        200000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Millionaire Aspirant',
        'Reach 5000000 Passive Points',
        24,
        5000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Tycoon Trailblazer',
        'Reach 100000000 Passive Points',
        25,
        100000000,
        'passivePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Card Initiate',
        'You bought your first pack!',
        26,
        10,
        'cardsAmount'
      )
    );
    this.createAchievement(
      new Achievement('Card Enthusiast', 'Have 50 Cards', 27, 50, 'cardsAmount')
    );
    this.createAchievement(
      new Achievement(
        'Strategic Scholar',
        'Have 100 Cards',
        28,
        100,
        'cardsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Epic Card Hoarder',
        'Have 500 Cards',
        47,
        500,
        'cardsAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Deck Diversifier',
        'Collect cards from 4 different Tiers',
        46,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Octo-Collector Maestro',
        'Collect cards from 8 different Tiers',
        55,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Master of All Trades',
        'Collect cards from every Tier',
        56,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Legendary Card Archivist',
        'Collect 10 legendary cards',
        48,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Card Fusion Alchemist',
        'Merge cards 10 times',
        49,
        10,
        'mergeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Card Fusion Maestro',
        'Merge cards 50 times',
        51,
        50,
        'mergeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Divine Interventionist',
        'Obtain a Divine Card',
        50,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Challenge Novice',
        'Complete your first challenge',
        29,
        1,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Challenge Conqueror',
        'Complete 5 challenges',
        30,
        5,
        'challengesAmount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Prestige Pioneer',
        'Prestige for the first time',
        31,
        1,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Rebirth Recruit',
        'Prestige 5 times',
        52,
        5,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quantum Resetter',
        'Prestige 10 times',
        53,
        10,
        'prestigeCount'
      )
    );
    this.createAchievement(
      new Achievement(
        'Point Purveyor',
        'Have 100 Prestige Points',
        32,
        100,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Quantum Quantumizer',
        'Have 250 Prestige Points',
        33,
        250,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        'Eternal Point Maven',
        'Have 500 Prestige Points',
        34,
        500,
        'prestigePoints'
      )
    );
    this.createAchievement(
      new Achievement(
        '10-letter Word',
        'Write a 10-letter word',
        35,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Best Word',
        'Write the best word possible',
        36,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Word Virtuoso',
        'Write 10 words without any errors',
        57,
        10,
        'wordCounterPerfection'
      )
    );
    this.createAchievement(
      new Achievement(
        'Linguistic Maestro',
        'Write 30 words without any errors',
        58,
        30,
        'wordCounterPerfection'
      )
    );
    this.createAchievement(
      new Achievement(
        'Supreme Scribbler',
        'Write 60 words without any errors',
        59,
        60,
        'wordCounterPerfection'
      )
    );
    this.createAchievement(
      new Achievement(
        'Word Ascendant',
        'Write 100 words without any errors',
        60,
        100,
        'wordCounterPerfection'
      )
    );
    this.createAchievement(
      new Achievement(
        'Consonant Collector',
        'Write a word that contains 5 consecutive consonants',
        43,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Vowel Voyager',
        'Write a word that contains 4 consecutive vowels',
        44,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'Palindrome Searcher',
        'Write a palindrome word',
        45,
        1,
        'Other'
      )
    );
    this.createAchievement(
      new Achievement(
        'The Cycle Continues',
        'Merge Omnipotent Cards',
        54,
        1,
        'Other'
      )
    );

    this.intervalId = setInterval(() => {
      this.checkAchievements();
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  get groupedAchievements(): { [group: string]: Achievement[] } {
    return this.achievements
      .filter(a => a.group && a.group !== 'Other')
      .reduce((acc, achievement) => {
        const group = achievement.group!;
        acc[group] = acc[group] ?? [];
        acc[group].push(achievement);
        return acc;
      }, {} as { [group: string]: Achievement[] });
  }

  get individualAchievements(): Achievement[] {
    return this.achievements.filter(a => a.group === 'Other');
  }

  createAchievement(achievement: Achievement) {
    if (!achievement.group) {
      switch (achievement.property) {
        case 'wordsAmount':
          achievement.group = 'Words Amount';
          break;
        case 'points':
          achievement.group = 'Points';
          break;
        case 'passivePoints':
          achievement.group = 'Passive Points';
          break;
        case 'cardsAmount':
          achievement.group = 'Cards Amount';
          break;
        case 'mergeCount':
          achievement.group = 'Merge Count';
          break;
        case 'challengesAmount':
          achievement.group = 'Challenges Amount';
          break;
        case 'prestigeCount':
          achievement.group = 'Prestige Count';
          break;
        case 'prestigePoints':
          achievement.group = 'Prestige Points';
          break;
        case 'wordCounterPerfection':
          achievement.group = 'Word Counter Perfection';
          break;
        default:
          achievement.group = 'Other';
      }
    }
    this.achievements.push(achievement);
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  unlockAchievement(achievementName: string) {
    this.gameService.game().achievements.push(this.achievements.find((x) => x.name == achievementName)!)
    this.gameService.game.update((game) => ({...game, achievements: game.achievements}))
  }

  compareProgress(achievement: Achievement) {
    const target =
      this.gameService.game()[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return;
    }

    if (target >= achievement.target) {
      this.completeAchievement(achievement.name);
    }
  }

  completeAchievement(achievementName: string) {
    this.unlockAchievement(achievementName);
    this.showAchievement(achievementName);
  }

  getAchievementProgress(achievement: Achievement): number {
    const target =
      this.gameService.game()[achievement.property as keyof Game];
    if (!(typeof target === 'number')) {
      return 0;
    }
    const progress = (target * 100) / achievement.target;
    return progress <= 100 ? progress : 100;
  }

  checkAchievements() {
    this.achievements.forEach((achievement) => {
      if (GameUtils.IsUnlockedAchievement(this.gameService.game(), achievement.name)) {
        return;
      }
      this.compareProgress(achievement);
    });
  }

  checkAchievementsByWord(word: string) {
    if (
      word === 'Jack-go-to-bed-at-noon' &&
      !GameUtils.IsUnlockedAchievement(this.gameService.game(), 'Best Word')
    ) {
      this.completeAchievement('Best Word');
      this.showAchievement('Best Word');
    }

    if (
      word.length == 10 &&
      !GameUtils.IsUnlockedAchievement(this.gameService.game(), '10-letter Word')
    ) {
      this.completeAchievement('10-letter Word');
    }

    const consConsRegex = /[bcdfghjklmnpqrstvwxyz]{5}/i;

    if (
      consConsRegex.test(word) &&
      !GameUtils.IsUnlockedAchievement(this.gameService.game(), 'Consonant Collector')
    ) {
      this.completeAchievement('Consonant Collector');
    }

    const consVowelRegex = /[aeiou]{4}/i;

    if (
      consVowelRegex.test(word) &&
      !GameUtils.IsUnlockedAchievement(this.gameService.game(), 'Vowel Voyager')
    ) {
      this.completeAchievement('Vowel Voyager');
    }

    if (
      word === word.split('').reverse().join('') &&
      !GameUtils.IsUnlockedAchievement(this.gameService.game(), 'Palindrome Searcher')
    ) {
      this.completeAchievement('Palindrome Searcher');
    }
  }

  showAchievement(achievementName: string) {
    // this.messageService.add({
    //   severity: 'info',
    //   summary: `New Achievement! ${achievementName}`,
    //   life: 3000,
    //   contentStyleClass: 'my-toast',
    // });
  }
}
