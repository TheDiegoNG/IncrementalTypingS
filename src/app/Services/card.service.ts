import { inject, Injectable, OnInit } from '@angular/core';
import { Card, CardType } from '../Classes/card';
import { Pack, PackTier } from '../Classes/pack';
import { GameUtils } from '../Utils/gameUtils';
import { GameService } from './game.service';
import { AchievementService } from './achievement.service';
import { PackService } from './pack.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  gameService = inject(GameService);
  packService = inject(PackService);
  achievementService = inject(AchievementService);
  cards: Card[] = [];
  constructor() {
    this.createCard(
      new Card('Percentage Points Booster', 'Common', 'PointsPercentage', 1)
    );
    this.createCard(
      new Card('Nominal Points Booster', 'Common', 'PointsAmount', 2)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Improver',
        'Common',
        'PassivePointsPercentage',
        3
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Improver',
        'Common',
        'PassivePointsAmount',
        4
      )
    );

    this.createCard(
      new Card('Percentage Points Augmentor', 'Uncommon', 'PointsPercentage', 5)
    );
    this.createCard(
      new Card('Nominal Points Augmentor', 'Uncommon', 'PointsAmount', 6)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Infuser',
        'Uncommon',
        'PassivePointsPercentage',
        7
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Infuser',
        'Uncommon',
        'PassivePointsAmount',
        8
      )
    );
    this.createCard(
      new Card(
        'Passive Points Accelerator',
        'Uncommon',
        'PassivePointsSpeed',
        9
      )
    );
    this.createCard(
      new Card('Word Length Extender', 'Uncommon', 'PassivePointsLength', 10)
    );

    this.createCard(
      new Card('Income Impairer', 'Broken', 'PointsPercentage', 24)
    );
    this.createCard(new Card('Detrimental Debt', 'Broken', 'PointsAmount', 25));
    this.createCard(
      new Card('Debilitating Discount', 'Broken', 'PassivePointsPercentage', 26)
    );
    this.createCard(
      new Card('Shrinking Stash', 'Broken', 'PassivePointsAmount', 27)
    );
    this.createCard(
      new Card('Lethargic Generator', 'Broken', 'PassivePointsSpeed', 28)
    );
    this.createCard(
      new Card('Diminished Diction', 'Broken', 'PassivePointsLength', 29)
    );

    this.createCard(
      new Card('Percentage Points Magnifier', 'Rare', 'PointsPercentage', 11)
    );
    this.createCard(new Card('All Lowercase', 'Legendary', 'Lowercase', 12));
    this.createCard(
      new Card('Nominal Points Magnifier', 'Rare', 'PointsAmount', 13)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Energizer',
        'Rare',
        'PassivePointsPercentage',
        14
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Energizer',
        'Rare',
        'PassivePointsAmount',
        15
      )
    );
    this.createCard(
      new Card('Passive Points Turbocharger', 'Rare', 'PassivePointsSpeed', 16)
    );
    this.createCard(
      new Card('Word Length Expander', 'Rare', 'PassivePointsLength', 17)
    );

    this.createCard(
      new Card('Percentage Points Empowerer', 'Epic', 'PointsPercentage', 18)
    );
    this.createCard(
      new Card('Nominal Points Empowerer', 'Epic', 'PointsAmount', 19)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Dynamo',
        'Epic',
        'PassivePointsPercentage',
        20
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Dynamo',
        'Epic',
        'PassivePointsAmount',
        21
      )
    );
    this.createCard(
      new Card('Passive Points Booster', 'Epic', 'PassivePointsSpeed', 22)
    );
    this.createCard(
      new Card('Word Length Enhancer', 'Epic', 'PassivePointsLength', 23)
    );

    this.createCard(
      new Card('Significant Surge', 'Legendary', 'PointsPercentage', 30)
    );
    this.createCard(
      new Card('Masterful Magnification', 'Legendary', 'PointsAmount', 31)
    );
    this.createCard(
      new Card('Measured Momentum', 'Legendary', 'PassivePointsPercentage', 32)
    );
    this.createCard(
      new Card('Incremental Impact', 'Legendary', 'PassivePointsAmount', 33)
    );
    this.createCard(
      new Card('Speedy Scripting', 'Legendary', 'PassivePointsSpeed', 34)
    );
    this.createCard(
      new Card('Longevity Linguistics', 'Legendary', 'PassivePointsLength', 35)
    );

    this.createCard(
      new Card('Pronounced Percentage', 'Mythical', 'PointsPercentage', 36)
    );
    this.createCard(new Card('Grandiose Gain', 'Mythical', 'PointsAmount', 37));
    this.createCard(
      new Card(
        'Exponential Enhancement',
        'Mythical',
        'PassivePointsPercentage',
        38
      )
    );
    this.createCard(
      new Card('Steady Stream', 'Mythical', 'PassivePointsAmount', 39)
    );
    this.createCard(
      new Card('Hustle Harmony', 'Mythical', 'PassivePointsSpeed', 40)
    );
    this.createCard(
      new Card('Word Length Enhancer', 'Mythical', 'PassivePointsLength', 41)
    );

    this.createCard(
      new Card('Elevated Expansion', 'Celestial', 'PointsPercentage', 42)
    );
    this.createCard(
      new Card('Illustrious Increase', 'Celestial', 'PointsAmount', 43)
    );
    this.createCard(
      new Card(
        'Amplified Ascendance',
        'Celestial',
        'PassivePointsPercentage',
        44
      )
    );
    this.createCard(
      new Card('Amplified Accumulation', 'Celestial', 'PassivePointsAmount', 45)
    );
    this.createCard(
      new Card('Velocity Versification', 'Celestial', 'PassivePointsSpeed', 46)
    );
    this.createCard(
      new Card('Extended Enunciation', 'Celestial', 'PassivePointsLength', 47)
    );

    this.createCard(
      new Card('Substantial Spike', 'Divine', 'PointsPercentage', 48)
    );
    this.createCard(
      new Card('Prodigious Profit', 'Divine', 'PointsAmount', 49)
    );
    this.createCard(
      new Card(
        'Magnitude Multiplicity',
        'Divine',
        'PassivePointsPercentage',
        50
      )
    );
    this.createCard(
      new Card('Significant Surplus', 'Divine', 'PassivePointsAmount', 51)
    );
    this.createCard(
      new Card('Supersonic Script', 'Divine', 'PassivePointsSpeed', 52)
    );
    this.createCard(
      new Card('Enduring Expression', 'Divine', 'PassivePointsLength', 53)
    );

    this.createCard(
      new Card('Momentous Multiplicity', 'Ultimate', 'PointsPercentage', 54)
    );
    this.createCard(
      new Card('Monumental Multiplication', 'Ultimate', 'PointsAmount', 55)
    );
    this.createCard(
      new Card('Grandiose Gargantua', 'Ultimate', 'PassivePointsPercentage', 56)
    );
    this.createCard(
      new Card('Elevated Endowment', 'Ultimate', 'PassivePointsAmount', 57)
    );
    this.createCard(
      new Card('Majestic Manuscript', 'Ultimate', 'PassivePointsSpeed', 58)
    );
    this.createCard(
      new Card('Celestial Composition', 'Ultimate', 'PassivePointsLength', 59)
    );

    this.createCard(
      new Card('Mythic Magnitude', 'Infinite', 'PointsPercentage', 60)
    );
    this.createCard(
      new Card('Legendary Lucre', 'Infinite', 'PointsAmount', 61)
    );
    this.createCard(
      new Card('Ultimate Uplift', 'Infinite', 'PassivePointsPercentage', 62)
    );
    this.createCard(
      new Card('Paramount Proliferation', 'Infinite', 'PassivePointsAmount', 63)
    );
    this.createCard(
      new Card('Grandiloquent Gyrator', 'Infinite', 'PassivePointsSpeed', 64)
    );
    this.createCard(
      new Card('Majestic Manifestation', 'Infinite', 'PassivePointsLength', 65)
    );

    this.createCard(
      new Card('Supreme Surplus', 'Omnipotent', 'PointsPercentage', 66)
    );
    this.createCard(
      new Card('Transcendent Treasury', 'Omnipotent', 'PointsAmount', 67)
    );
    this.createCard(
      new Card(
        'Celestial Sovereignty',
        'Omnipotent',
        'PassivePointsPercentage',
        68
      )
    );
    this.createCard(
      new Card('Ultimate Ubiquity', 'Omnipotent', 'PassivePointsAmount', 69)
    );
    this.createCard(
      new Card('Celestial Celerity', 'Omnipotent', 'PassivePointsSpeed', 70)
    );
    this.createCard(
      new Card('Supreme Syllabication', 'Omnipotent', 'PassivePointsLength', 71)
    );
  }

  createCard(card: Card) {
    this.cards.push(card);
  }

  getPack(packTier: PackTier): Card[] {
    var cards: Card[] = [];
    const pack = this.packService.packs.find((x) => x.type === packTier)!;
    let cardPercentages: number[] = GameUtils.getPercentagesValues(packTier);
    for (let index = 0; index < this.gameService.game().rollsAmount; index++) {
      var randomNumber = Math.random() * 100;
      var card: Card;
      let selectedTier = cardPercentages.length + 1;
      for (let tier = 0; tier < cardPercentages.length; tier++) {
        const condition = cardPercentages
          .slice(0, tier + 1)
          .reduce((sum, threshold) => sum + threshold, 0);

        if (randomNumber >= 100 - condition) {
          selectedTier = tier + 1;
          break;
        }
      }
      const cardMap: Record<number, CardType> = {
        [1]: 'Common',
        [2]: 'Uncommon',
        [3]: 'Broken',
        [4]: 'Rare',
        [5]: 'Epic',
        [6]: 'Legendary',
        [7]: 'Mythical',
        [8]: 'Celestial',
        [9]: 'Divine',
        [10]: 'Ultimate',
        [11]: 'Infinite',
        [12]: 'Omnipotent',
      };

      card = this.GetCard(cardMap[selectedTier]);

      if (card.id == 12 && GameUtils.HasCard(this.gameService.game(), 12)) {
        index--;
        continue;
      }

      this.gameService.game().cards.push(card);
      this.gameService.game.update((game) => ({ ...game, cards: game.cards, cardsAmount: ++game.cardsAmount }));
      
      if(GameUtils.IsUnlockedAchievement(this.gameService.game(), "Card Initiate")) {
        this.achievementService.revealAchievementGroup("Cards Amount")
      }
      //TODO: TAX EVASION


      switch (card.bonusType) {
        case 'PassivePointsSpeed':
          this.gameService.game.update((game) => ({
            ...game,
            passiveRate:
              game.passiveRate - (game.passiveRate * card.bonusAmount) / 100,
          }));
          break;
        case 'PassivePointsLength':
          this.gameService.game.update((game) => ({
            ...game,
            passiveLength: game.passiveLength + card.bonusAmount,
          }));
          break;
        default:
          break;
      }

      cards.push(card);

      if (
        card.type === 'Divine' &&
        !GameUtils.IsUnlockedAchievement(
          this.gameService.game(),
          'Divine Interventionist'
        )
      ) {
        this.achievementService.completeAchievement('Divine Interventionist');
      }
    }

    const gameCards = this.gameService.game().cards;
    const uniqueTypes = new Set(gameCards.map((obj) => obj.type));

    if (
      uniqueTypes.size >= 4 &&
      !GameUtils.IsUnlockedAchievement(
        this.gameService.game(),
        'Deck Diversifier'
      )
    )
      this.achievementService.completeAchievement('Deck Diversifier');
    if (
      uniqueTypes.size >= 8 &&
      !GameUtils.IsUnlockedAchievement(
        this.gameService.game(),
        'Octo-Collector Maestro'
      )
    )
      this.achievementService.completeAchievement('Octo-Collector Maestro');

    if (
      uniqueTypes.size >= 12 &&
      !GameUtils.IsUnlockedAchievement(
        this.gameService.game(),
        'Master of All Trades'
      )
    )
      this.achievementService.completeAchievement('Master of All Trades');

    if (
      this.gameService.game().cards.filter((x) => x.type === 'Legendary')
        .length >= 10 &&
      !GameUtils.IsUnlockedAchievement(
        this.gameService.game(),
        'Legendary Card Archivist'
      )
    ) {
      this.achievementService.completeAchievement('Legendary Card Archivist');
    }
    this.gameService.game().packs.push(pack);
    this.gameService.game.update((game) => ({ ...game, packs: game.packs }));
    return cards;
  }

  getBonus(): string {
    var bonusPercentage = 1;
    var bonusPointAmount = 0;
    var bonusPassivePercentage = 1;
    var bonusPassiveAmount = 0;
    var bonusPassiveSpeed = 1;
    var bonusPassiveLength = 0;
    var extraBonus = '';
    this.gameService.game().cards.forEach((x) => {
      switch (x.bonusType) {
        case 'PointsPercentage':
          bonusPercentage += x.bonusAmount;
          break;
        case 'PointsAmount':
          bonusPointAmount += x.bonusAmount;
          break;
        case 'PassivePointsPercentage':
          bonusPassivePercentage += x.bonusAmount;
          break;
        case 'PassivePointsAmount':
          bonusPassiveAmount += x.bonusAmount;
          break;
        case 'PassivePointsSpeed':
          bonusPassiveSpeed *= 1 + x.bonusAmount / 100;
          break;
        case 'PassivePointsLength':
          bonusPassiveLength += x.bonusAmount;
          break;
        case 'Lowercase':
          extraBonus += '- All Lowercase';
          break;
        default:
          break;
      }
    });
    return `You have x${(1 + bonusPercentage / 100).toFixed(
      2
    )} + ${bonusPointAmount} Bonus Points, x${(
      1 +
      bonusPassivePercentage / 100
    ).toFixed(
      2
    )} + ${bonusPassiveAmount} Bonus Passive Points, x${bonusPassiveSpeed.toFixed(
      2
    )} faster and ${bonusPassiveLength} letters longer ${extraBonus}`;
  }

  GetCard(type: CardType): Card {
    return this.cards.filter((x) => x.type == type)[
      Math.floor(
        Math.random() * this.cards.filter((x) => x.type == type).length
      )
    ];
  }

  mergeCards(card: Card) {
    const game = this.gameService.game()
    const sameCards = game.cards.filter((x) => x.id === card.id);
    if (game.mergeAmount > sameCards.length) return;
    const cardsToBeMerged = sameCards.slice(0, game.mergeAmount);

    const cardsTiersMap: { [key in CardType]: CardType } = {
      ['Broken']: 'Common',
      ['Common']: 'Uncommon',
      ['Uncommon']: 'Rare',
      ['Rare']: 'Epic',
      ['Epic']: 'Legendary',
      ['Legendary']: 'Mythical',
      ['Mythical']: 'Celestial',
      ['Celestial']: 'Divine',
      ['Divine']: 'Ultimate',
      ['Ultimate']: 'Infinite',
      ['Infinite']: 'Omnipotent',
      ['Omnipotent']: 'Broken',
    };

    const upgradedCard = this.cards.find(
      (x) =>
        x.bonusType === card.bonusType &&
        x.type === cardsTiersMap[card.type]
    );

    if (!upgradedCard) return;

    this.gameService.game.update((game) => ({
      ...game,
      cards: [
        ...this.removeExact(game.cards, cardsToBeMerged),
        upgradedCard,
      ],
      mergeCount: game.mergeCount + 1,
    }));

    if(GameUtils.IsUnlockedAchievement(this.gameService.game(), "Card Fusion Initiate")) {
      this.achievementService.revealAchievementGroup("Merge Count")
    }
  }

  removeExact<T>(list: T[], targets: T[]): T[] {
    const targetsCopy = [...targets];
    return list.filter(item => {
      const idx = targetsCopy.indexOf(item);
      if (idx !== -1) {
        targetsCopy.splice(idx, 1);
        return false;
      }
      return true;
    });
  }

  reduceMergeCost() {
    const game = this.gameService.game();
    if (game.cards.length >= game.mergeCardsCost) {
      this.gameService.game.update((game) => ({
        ...game,
        mergeCardsCost: game.mergeCardsCost + 100,
        mergeAmount: --game.mergeAmount,
        cards: [],
        cardsAmount: 0
      }));
    }
  }

  getCardPointAmountTotal(): [number, string] {
    let pointsAmountCards = this.gameService
      .game()
      .cards.filter((x) => x.bonusType === 'PointsAmount')
      .reduce((total, card) => total + card.bonusAmount, 0);

    return [pointsAmountCards, '+ Sum of PointsAmount Card'];
  }

  getCardPointPercentageTotal(): [number, string] {
    let pointsPercentageBonus =
      1 +
      this.gameService
        .game()
        .cards.filter((x) => x.bonusType === 'PointsPercentage')
        .reduce((total, card) => total + card.bonusAmount, 0) /
        100;
    return [pointsPercentageBonus, 'x Sum of PointsPercentage Card'];
  }
}
