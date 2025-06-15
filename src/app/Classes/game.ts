import { Achievement } from './achievement';
import { Card } from './card';
import { Challenge } from './challenge';
import { Generator } from './generator';
import { Mastery, MastShopItem } from './mastery';
import { Pack } from './pack';
import { MultiUpgrade, Upgrade } from './upgrade';

export class Game {
  //Points
  points: number;
  allTimePoints: number;
  bonusValues: Record<string, number> = {};
  bonusSumsValues: Record<string, number> = {};

  //Word Basics
  maxLength: number = 4;
  bestWord: string = '';
  wordsAmount: number = 0;
  letterCounter: number = 0;
  letterCounterPerfection: number = 0;
  wordCounterPerfection: number = 0;

  //Upgrades
  upgrades: Upgrade[] = [];
  multiUpgrades: MultiUpgrade[] = [
    new MultiUpgrade(
      'Point Booster',
      '+[bonus] Points per Word',
      50,
      'MultiUpgradePoints',
      'Multi',
      1
    ),
    new MultiUpgrade(
      'Multiplier Mastery',
      'x[bonus] Points',
      500,
      'MultiUpgradePointsMult',
      'Multi',
      1.25
    ),
    new MultiUpgrade(
      'Critical Chance',
      '+[bonus]% Critical Chance',
      1000,
      'MultiUpgradeCritChance',
      'Multi',
      1
    ),
    new MultiUpgrade(
      'Critical Multiplier',
      'x[bonus] Critical Multiplier',
      1000,
      'MultiUpgradeCritMulti',
      'Multi',
      1.1
    ),
  ];

  achievements: Achievement[] = [];
  
  //Passive
  passiveGenerators: Generator[] = [];
  passiveUpgrades: Upgrade[] = [];
  passiveLength: number = 4;
  passivePoints: number = 0;
  passiveRate: number = 1000;
  passiveCharges: number = 0;

  //Cards
  cards: Card[] = [];
  cardsAmount: number = 0;
  cardCost: number = 0;
  packs: Pack[] = [];
  rollsAmount: number = 10;

  //Challenges
  challenges: Challenge[] = [];
  challengesAmount: number = 0;
  gameType: GameType;
  
  //Prestige
  prestigePoints: number = 0;
  prestigeCount: number = 0;
  prestigeUpgrades: Upgrade[] = [];

  //Modules
  modulesUnlocked: boolean[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  mergeCount: number = 0;
  lettersBonus: number[] = [1, 2, 3, 4, 5, 8, 10, 20];

  //Mastery
  masteryLevels: Mastery[] = [
    new Mastery('Alpha', ['a', 'e', 'i', 'o', 'u', 'l', 'n', 's', 't', 'r'], 8),
    new Mastery('Beta', ['d', 'g'], 7),
    new Mastery('Gamma', ['b', 'c', 'm', 'p'], 6),
    new Mastery('Delta', ['f', 'h', 'v', 'w', 'y'], 5),
    new Mastery('Epsilon', ['k'], 4),
    new Mastery('Dseta', ['j', 'x'], 3),
    new Mastery('Eta', ['q', 'z'], 2),
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
      '.'
    ], 1),
  ];
  mastShopItems: MastShopItem[] = [
    new MastShopItem(
      'Lex Incrementum',
      "x1.1 '+1 Point per Word' Multiupgrade effect per level | Every 10 levels, gain an extra '+1 Point Per Word' level"
    ),
    new MastShopItem(
      'Compounding Glyph',
      "x1.01 'x1.25 Points' MultiUpgrade effect per level | Every 25 levels, gain an extra 'x1.25 Points' level"
    ),
    new MastShopItem(
      'Stasis Mark',
      "x1.01 MultiUpgrades Cost Growth Delay per level"
    ),
    new MastShopItem(
      'Ascendant Core',
      "1% Better Prestige Points formula per level"
    ),
  ]
  mastLevelAmount: number = 0
  
  //Market
  marketBonus: number[] = [];
  
  constructor(pointsAmount: number, gameType: GameType) {
    this.points = pointsAmount;
    this.allTimePoints = pointsAmount;
    this.gameType = gameType;
  }
}

export type GameType = 'Challenge' | 'Active' | 'Current';
