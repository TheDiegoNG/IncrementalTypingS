import { Card } from "../Classes/card";
import { PackTier } from "../Classes/pack";
import { eIdUpgrade } from "../Classes/upgrade";
import { ChallengeType } from "../Classes/challenge";
import { Game } from "../Classes/game";

export class GameUtils {

  static IsPurchasedUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.upgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static IsPurchasedPassiveUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.passiveUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static IsPurchasedPrestigeUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.prestigeUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static HasCard(game: Game, cardNumber: number): boolean {
    return game.cards.some((x) => x.id == cardNumber);
  }

  static IsInChallenge(game: Game, challengeType: ChallengeType): boolean {
    const challenge = game.challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return false;
    return challenge.onChallenge;
  }

  static IsUnlockedAchievement(game: Game, achievementName: string): boolean {
    return game.achievements.some(
      (x) => x.name == achievementName
    );
  }

  static getCardType(card: Card): string {
    switch (card.type) {
      case "Broken":
        return 'brokenCard';
      case "Common":
        return 'commonCard';
      case "Uncommon":
        return 'uncommonCard';
      case "Rare":
        return 'rareCard';
      case "Epic":
        return 'epicCard';
      case "Legendary":
        return 'legendaryCard';
      case "Mythical":
        return 'mythicalCard';
      case "Celestial":
        return 'celestialCard';
      case "Divine":
        return 'divineCard';
      case "Ultimate":
        return 'ultimateCard';
      case "Infinite":
        return 'infiniteCard';
      case "Omnipotent":
        return 'omnipotentCard';
    }
  }

  static getCardBonus(game: Game): number {
    if (this.IsPurchasedUpgrade(game, "caQual")) {
      const cardValueMap = {
        ["Broken"]: 0.5,
        ["Common"]: 1,
        ["Uncommon"]: 2,
        ["Rare"]: 4,
        ["Epic"]: 8,
        ["Legendary"]: 16,
        ["Mythical"]: 32,
        ["Celestial"]: 64,
        ["Divine"]: 128,
        ["Ultimate"]: 256,
        ["Infinite"]: 512,
        ["Omnipotent"]: 1024

      };
      return game.cards.map((x) => cardValueMap[x.type]).reduce((a, b) => a + b, 1);
    } else {
      return game.cardsAmount;
    }
  }

  static getProperty<T>(
    obj: Record<string, unknown>,
    propertyName: string,
    defaultValue: T
  ): T {
    if (propertyName in obj) {
      return obj[propertyName] as T;
    } else {
      return defaultValue;
    }
  }

  static deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  static getPercentagesValues(packTier: PackTier): number[] {
    const cardPackDecayMap: Record<PackTier, number> = {
      ["Starter"]: 1.1,
      ["Explorer"]: 0.7,
      ["Master"]: 0.5,
      ["Grandmaster"]: 0.4,
      ["Mighty"]: 0.2,
      ["Ethereal"]: 0.1,
    };

    let percentagesArr: number[] = [];

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = 100 / Math.exp(cardPackDecayMap[packTier] * index);
    }

    const sumPercentages = percentagesArr.reduce((a, b) => a + b, 0);

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = percentagesArr[index - 1] / sumPercentages * 100;
    }

    return percentagesArr;

  }
  private static japaneseMapPromise: Promise<Record<string, string>> | null = null;
  static getJapaneseMap(): Promise<Record<string, string>> {
    if (!this.japaneseMapPromise) {
      this.japaneseMapPromise = fetch('/maps/japanese-map.json').then(res => res.json());
    }
    return this.japaneseMapPromise;
  }

  private static russianMapPromise: Promise<Record<string, string>> | null = null;
  static getRussianCyrillicMap(): Promise<Record<string, string>> {
    if (!this.russianMapPromise) {
      this.russianMapPromise = fetch('/maps/russian-map.json').then(res => res.json());
    }
    return this.russianMapPromise;
  }

  private static amharicMapPromise: Promise<Record<string, string>> | null = null;
  static getAmharicMap(): Promise<Record<string, string>> {
    if (!this.amharicMapPromise) {
      this.amharicMapPromise = fetch('/maps/amharic-map.json').then(res => res.json());
    }
    return this.amharicMapPromise;
  }

  static random(min: number, max: number): number {
    let random = min + Math.random() * (max - min);
    return random;
  }
}

