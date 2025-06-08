import { Achievement } from './achievement';
import { Card } from './card';
import { Challenge } from './challenge';
import { Generator } from './generator';
import { Mastery } from './mastery';
import { Pack } from './pack';
import { MultiUpgrade, Upgrade } from './upgrade';

export class Game {
  points: number;
  allTimePoints: number;
  upgrades: Upgrade[] = [];
  maxLength: number = 4;
  bestWord: string = '';
  multiUpgrades: MultiUpgrade[] = [
    new MultiUpgrade(
      'Point Booster',
      '+1 Point per Word',
      50,
      'MultiUpgradePoints',
      'Multi'
    ),
    new MultiUpgrade(
      'Multiplier Mastery',
      'x1.25 Points',
      500,
      'MultiUpgradePointsMult',
      'Multi'
    ),
    new MultiUpgrade(
      'Critical Chance',
      '+1% Critical Chance',
      1000,
      'MultiUpgradeCritChance',
      'Multi'
    ),
    new MultiUpgrade(
      'Critical Multiplier',
      'x1.1 Critical Multiplier',
      1000,
      'MultiUpgradeCritMulti',
      'Multi'
    ),
  ];
  achievements: Achievement[] = [];
  wordsAmount: number = 0;
  passiveGenerators: Generator[] = [];
  passiveUpgrades: Upgrade[] = [];
  passiveLength: number = 4;
  passivePoints: number = 0;
  passiveRate: number = 1000;
  passiveCharges: number = 0;
  cards: Card[] = [];
  cardsAmount: number = 0;
  cardCost: number = 0;
  packs: Pack[] = [];
  rollsAmount: number = 10;
  challenges: Challenge[] = [];
  challengesAmount: number = 0;
  letterCounter: number = 0;
  prestigePoints: number = 0;
  prestigeCount: number = 0;
  prestigeUpgrades: Upgrade[] = [];
  modulesUnlocked: boolean[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  mergeCount: number = 0;
  lettersBonus: number[] = [1, 2, 3, 4, 5, 8, 10, 20];
  gameType: GameType;
  masteryLevels: Mastery[] = [
    new Mastery('Alpha', ['a', 'e', 'i', 'o', 'u', 'l', 'n', 's', 't', 'r']),
    new Mastery('Beta', ['d', 'g']),
    new Mastery('Gamma', ['b', 'c', 'm', 'p']),
    new Mastery('Delta', ['f', 'h', 'v', 'w', 'y']),
    new Mastery('Epsilon', ['k']),
    new Mastery('Dseta', ['j', 'x']),
    new Mastery('Eta', ['q', 'z']),
    new Mastery('Zeta', [
      "'",
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '-',
      '&',
    ]),
  ];
  letterCounterPerfection: number = 0;
  wordCounterPerfection: number = 0;
  marketBonus: number[] = [];
  bonusValues: Record<string, number> = {};
  bonusSumsValues: Record<string, number> = {};
  constructor(pointsAmount: number, gameType: GameType) {
    this.points = pointsAmount;
    this.allTimePoints = pointsAmount;
    this.gameType = gameType;
  }
}

export type GameType = 'Challenge' | 'Active' | 'Current';
