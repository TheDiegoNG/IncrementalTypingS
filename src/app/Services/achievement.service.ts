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
  messageService = inject(MessageService);
  achievements: Achievement[] = [];
  private intervalId: ReturnType<typeof setInterval> | null = null;;

  constructor() {
    this.loadAchievements();
    this.loadBookAchievements();
  }

  private async loadAchievements() {
    const response = await fetch('/achievements.json');
    const list: AchievementJson[] = await response.json();
    for (const a of list) {
      this.createAchievement(
        new Achievement(
          a.name,
          a.description,
          a.id,
          a.target,
          a.property,
          false,
          a.group,
          a.isCompleted ?? false
        )
      );
    }

    console.log("Achievements: ", this.achievements)

    this.intervalId = setInterval(() => {
      this.checkAchievements();
    }, 100);
  }

  private async loadBookAchievements() {
    const response = await fetch('/books_achievements.json');
    const list: AchievementJson[] = await response.json();
    for (const a of list) {
      this.createAchievement(
        new Achievement(
          a.name,
          a.description,
          a.id,
          a.target,
          a.property,
          false,
          a.group,
          a.isCompleted ?? false
        )
      );
    }

    console.log("Book Achievements: ", list)
  }

  ngOnDestroy() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
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
        case 'passiveBarActMulti':
          achievement.group = 'Passive Bar Active Multiplier';
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
    const ach = this.achievements.find(a => a.name === achievementName);
    if (!ach || ach.isCompleted) return;
    ach.isCompleted = true;
    this.unlockAchievement(achievementName);
    this.showAchievement(achievementName);
  }

  getAchievementProgress(achievement: Achievement): number {
    if (achievement.isCompleted) return 100;
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
      if (achievement.isCompleted) {
        return;
      }
      this.compareProgress(achievement);
    });
  }

  checkAchievementsByWord(word: string) {
    const bestWordAch = this.achievements.find(a => a.name === 'Best Word');
    if (
      word === 'Jack-go-to-bed-at-noon' &&
      bestWordAch && !bestWordAch.isCompleted
    ) {
      this.completeAchievement('Best Word');
      this.showAchievement('Best Word');
    }

    const tenLetterAch = this.achievements.find(a => a.name === '10-letter Word');
    if (
      word.length == 10 &&
      tenLetterAch && !tenLetterAch.isCompleted
    ) {
      this.completeAchievement('10-letter Word');
    }

    const consConsRegex = /[bcdfghjklmnpqrstvwxyz]{5}/i;

    const consonantAch = this.achievements.find(a => a.name === 'Consonant Collector');
    if (
      consConsRegex.test(word) &&
      consonantAch && !consonantAch.isCompleted
    ) {
      this.completeAchievement('Consonant Collector');
    }

    const consVowelRegex = /[aeiou]{4}/i;

    const vowelVoyagerAch = this.achievements.find(a => a.name === 'Vowel Voyager');
    if (
      consVowelRegex.test(word) &&
      vowelVoyagerAch && !vowelVoyagerAch.isCompleted
    ) {
      this.completeAchievement('Vowel Voyager');
    }

    const palindromeAch = this.achievements.find(a => a.name === 'Palindrome Searcher');
    if (
      word === word.split('').reverse().join('') &&
      palindromeAch && !palindromeAch.isCompleted
    ) {
      this.completeAchievement('Palindrome Searcher');
    }
  }

  showAchievement(achievementName: string) {
    this.messageService.add({
      severity: 'info',
      summary: `New Achievement! ${achievementName}`,
      life: 3000,
      contentStyleClass: 'my-toast',
    });
  }

  revealAchievementGroup(groupName: string) {
    if(this.achievements
      .filter(a => a.group === groupName).some(a => a.revealed = true)) return;
      
    this.achievements
      .filter(a => a.group === groupName)
      .forEach(a => a.revealed = true);

    console.log("Achievements Revealed!", this.achievements)
  }
}

interface AchievementJson {
  name: string;
  description: string;
  id: number;
  target: number;
  property: Achievement['property'];
  group?: string;
  isCompleted?: boolean;
}
