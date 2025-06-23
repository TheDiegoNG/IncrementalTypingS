export class Card {
  name: string;
  description: string;
  type: CardType;
  bonusType?: BonusType;
  bonusAmount: number;
  id: number;
  isSpecial: boolean;

  readonly cardMap: Record<CardType, number> = {
    ['Common']: 1,
    ['Uncommon']: 2,
    ['Broken']: 3,
    ['Rare']: 4,
    ['Epic']: 5,
    ['Legendary']: 6,
    ['Mythical']: 7,
    ['Celestial']: 8,
    ['Divine']: 9,
    ['Ultimate']: 10,
    ['Infinite']: 11,
    ['Omnipotent']: 12,
  };

  readonly cardPowerGrowthPerTier = 2.5;

  readonly baseBonusValues: Record<BonusType, number> = {
    PointsAmount: 1,
    PointsPercentage: 5,
    PassivePointsAmount: 3,
    PassivePointsPercentage: 15,
    PassivePointsSpeed: 0.5,
    PassivePointsLength: 0.4
  };

  constructor(
    cardName: string,
    cardType: CardType,
    id: number,
    options: { bonusType?: BonusType; isSpecial?: boolean } = {}
  ) {
    this.name = cardName;
    this.type = cardType;
    this.id = id;
    this.isSpecial = options.isSpecial ?? false;
    this.bonusType = options.bonusType;

    this.bonusAmount = this.isSpecial ? 0 : this.getBonusAmount();
    this.description = this.getDescAmount();
  }

  private getBonusAmount(): number {
    if (!this.bonusType || this.isSpecial) return 0;

    if (this.type === 'Broken') {
      const penalties: Record<BonusType, number> = {
        PointsAmount: -5,
        PointsPercentage: -25,
        PassivePointsAmount: -15,
        PassivePointsPercentage: -45,
        PassivePointsSpeed: -2.5,
        PassivePointsLength: -2
      };
      return penalties[this.bonusType] ?? 0;
    }

    const tierLevel = this.cardMap[this.type];
    const base = this.baseBonusValues[this.bonusType] ?? 1;
    return Math.floor(base * Math.pow(this.cardPowerGrowthPerTier, tierLevel - 1));
  }

  private getDescAmount(): string {
    if (this.isSpecial) {
      // Acá se pueden agregar más tipos especiales si es necesario
      switch (this.name) {
        case 'Lowercase':
          return 'All Words are Lowercase';
        default:
          return '';
      }
    }

    if (!this.bonusType) return '';

    if (this.type === 'Broken') {
      const brokenDescriptions: Record<BonusType, string> = {
        PointsAmount: '-5 Points Per Word',
        PointsPercentage: '-25% Points Per Word',
        PassivePointsAmount: '-15 Passive Points Per Word',
        PassivePointsPercentage: '-45% Passive Points Per Word',
        PassivePointsSpeed: 'Generate Passive Words 2.5% Slower',
        PassivePointsLength: '-2 Passive Word Length'
      };
      return brokenDescriptions[this.bonusType] ?? '';
    }

    const amount = this.getBonusAmount();

    switch (this.bonusType) {
      case 'PointsAmount':
        return `+${amount} Points Per Word`;
      case 'PointsPercentage':
        return `+${amount}% Points Per Word`;
      case 'PassivePointsAmount':
        return `+${amount} Passive Points Per Word`;
      case 'PassivePointsPercentage':
        return `+${amount}% Passive Points Per Word`;
      case 'PassivePointsSpeed':
        return `Generate Passive Words +${amount}% Faster`;
      case 'PassivePointsLength':
        return `+${amount} Passive Word Length`;
      default:
        return '';
    }
  }
}

export type BonusType =
  | 'PointsPercentage'
  | 'PointsAmount'
  | 'PassivePointsPercentage'
  | 'PassivePointsAmount'
  | 'PassivePointsSpeed'
  | 'PassivePointsLength';

export type CardType =
  | 'Broken'
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Mythical'
  | 'Celestial'
  | 'Divine'
  | 'Ultimate'
  | 'Infinite'
  | 'Omnipotent';
