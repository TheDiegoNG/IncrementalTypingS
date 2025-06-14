import { GameUtils } from './gameUtils';
import { Game } from '../Classes/game';
import { Upgrade } from '../Classes/upgrade';
import { Card, CardType } from '../Classes/card';
import { Challenge, ChallengeType } from '../Classes/challenge';
import { Achievement } from '../Classes/achievement';
import { PackTier } from '../Classes/pack';

describe('GameUtils', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(0, 'Active');
    game.upgrades = [
      new Upgrade('Quality', 'desc', 0, 'caQual', 'Starter'),
      new Upgrade('Other', 'desc', 0, 'FirstUpgradePoints', 'Starter'),
    ];
    game.passiveUpgrades = [
      new Upgrade('Passive', 'desc', 0, 'PassiveLittleBonus', 'Passive'),
    ];
    game.prestigeUpgrades = [
      new Upgrade('Prestige', 'desc', 0, 'PrestigeFreeMultiplier', 'Prestige'),
    ];

    game.cards = [
      new Card('Common card', 'Common', 'PointsAmount', 1),
      new Card('Rare card', 'Rare', 'PointsAmount', 2),
    ];
    game.cardsAmount = game.cards.length;

    const chal = new Challenge('Speed', 'desc', 'reward', 60, 1, 1);
    chal.onChallenge = true;
    game.challenges = [chal];

    game.achievements = [
      new Achievement('Ach1', 'desc', 1, 1, 'Other', false, undefined, false),
    ];
  });

  it('IsPurchasedUpgrade true/false cases', () => {
    expect(GameUtils.IsPurchasedUpgrade(game, 'caQual')).toBeTrue();
    expect(GameUtils.IsPurchasedUpgrade(game, 'NonExist' as any)).toBeFalse();
  });

  it('IsPurchasedPassiveUpgrade true/false cases', () => {
    expect(GameUtils.IsPurchasedPassiveUpgrade(game, 'PassiveLittleBonus')).toBeTrue();
    expect(GameUtils.IsPurchasedPassiveUpgrade(game, 'Missing' as any)).toBeFalse();
  });

  it('IsPurchasedPrestigeUpgrade true/false cases', () => {
    expect(GameUtils.IsPurchasedPrestigeUpgrade(game, 'PrestigeFreeMultiplier')).toBeTrue();
    expect(GameUtils.IsPurchasedPrestigeUpgrade(game, 'OtherPrestige' as any)).toBeFalse();
  });

  it('HasCard for existing and missing cards', () => {
    expect(GameUtils.HasCard(game, 1)).toBeTrue();
    expect(GameUtils.HasCard(game, 99)).toBeFalse();
  });

  it('IsInChallenge with matching and none', () => {
    expect(GameUtils.IsInChallenge(game, 'Speed')).toBeTrue();
    expect(GameUtils.IsInChallenge(game, 'Language')).toBeFalse();
  });

  it('IsUnlockedAchievement for unlocked and missing achievements', () => {
    expect(GameUtils.IsUnlockedAchievement(game, 'Ach1')).toBeTrue();
    expect(GameUtils.IsUnlockedAchievement(game, 'Missing')).toBeFalse();
  });

  it('getCardType returns correct class name for each card type', () => {
    const map: Record<CardType, string> = {
      Broken: 'brokenCard',
      Common: 'commonCard',
      Uncommon: 'uncommonCard',
      Rare: 'rareCard',
      Epic: 'epicCard',
      Legendary: 'legendaryCard',
      Mythical: 'mythicalCard',
      Celestial: 'celestialCard',
      Divine: 'divineCard',
      Ultimate: 'ultimateCard',
      Infinite: 'infiniteCard',
      Omnipotent: 'omnipotentCard',
    };

    (Object.keys(map) as CardType[]).forEach((type) => {
      const card = new Card('name', type, 'PointsAmount', 1);
      expect(GameUtils.getCardType(card)).toBe(map[type]);
    });
  });

  it("getCardBonus with and without 'caQual'", () => {
    const withoutUpgrade = new Game(0, 'Active');
    withoutUpgrade.cardsAmount = 5;
    expect(GameUtils.getCardBonus(withoutUpgrade)).toBe(5);

    const withUpgrade = new Game(0, 'Active');
    withUpgrade.upgrades = [new Upgrade('q', 'd', 0, 'caQual', 'Starter')];
    withUpgrade.cards = [
      new Card('Common', 'Common', 'PointsAmount', 1),
      new Card('Rare', 'Rare', 'PointsAmount', 2),
    ];
    const expected = 1 + 1 + 4; // initial 1 + values for Common and Rare
    expect(GameUtils.getCardBonus(withUpgrade)).toBe(expected);
  });

  it('getProperty retrieves existing values and default', () => {
    const obj: Record<string, unknown> = { a: 1 };
    expect(GameUtils.getProperty<number>(obj, 'a', 0)).toBe(1);
    expect(GameUtils.getProperty<string>(obj, 'b', 'def')).toBe('def');
  });

  it('deepCopy produces a deep clone', () => {
    const original = { a: 1, b: { c: 2 } };
    const copy = GameUtils.deepCopy(original);
    (copy as any).b.c = 3;
    expect((original as any).b.c).toBe(2);
  });

  it('getPercentagesValues returns an array of length 12 summing close to 100', () => {
    const arr = GameUtils.getPercentagesValues('Starter');
    expect(arr.length).toBe(12);
    const sum = arr.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(100, 5);
  });

  it('random produces values within provided range', () => {
    for (let i = 0; i < 100; i++) {
      const val = GameUtils.random(2, 5);
      expect(val).toBeGreaterThanOrEqual(2);
      expect(val).toBeLessThan(5);
    }
  });
});

