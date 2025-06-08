import { inject, Injectable } from '@angular/core';
import { Card, CardType, BonusType } from '../Classes/card';
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
    this.loadCards();
  }

  private async loadCards() {
    const response = await fetch('/cards.json');
    const list: CardJson[] = await response.json();
    for (const c of list) {
      this.createCard(new Card(c.name, c.type, c.bonusType, c.id));
    }
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

        this.achievementService.revealAchievementGroup("Cards Amount")
      
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


      this.achievementService.revealAchievementGroup("Merge Count")
    
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

interface CardJson {
  name: string;
  type: CardType;
  bonusType: BonusType;
  id: number;
}
