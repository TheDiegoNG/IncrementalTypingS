export class Card {
    name: string;
    description: string;
    type: CardType;
    bonusType: BonusType;
    bonusAmount: number;
    id: number;
  
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
  
    readonly cardProgressionformulaOptions: formulaOptions = {
      upperbound: 1000,
      steepness: 0.1,
      separator: 5,
      midpoint: 70,
    };
  
    constructor(
      cardName: string,
      cardType: CardType,
      bonusType: BonusType,
      cardNumber: number
    ) {
      this.name = cardName;
      this.type = cardType;
      this.bonusType = bonusType;
      this.id = cardNumber;
      this.description = this.getDescAmount();
      this.bonusAmount = this.getBonusAmount();
    }
  
    private getBonusAmount(): number {
      switch (this.bonusType) {
        case 'PointsAmount':
          return this.type === 'Broken'
            ? -10
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      )))
              );
        case 'PointsPercentage':
          return this.type === 'Broken'
            ? -50
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      )))
              ) * 5;
        case 'PassivePointsAmount':
          return this.type === 'Broken'
            ? -25
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      )))
              ) * 3;
        case 'PassivePointsPercentage':
          return this.type === 'Broken'
            ? -65
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      )))
              ) * 15;
        case 'PassivePointsSpeed':
          return this.type === 'Broken'
            ? -10
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      ))) *
                  0.5
              );
        case 'PassivePointsLength':
          return this.type === 'Broken'
            ? -1
            : Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      ))) *
                  0.4
              );
        default:
          return 1;
          break;
      }
    }
  
    private getDescAmount(): string {
      switch (this.bonusType) {
        case 'PointsAmount':
          return this.type === 'Broken'
            ? '-10 Points Per Word'
            : `+${Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      )))
              )} Points Per Word`;
        case 'PointsPercentage':
          return this.type === 'Broken'
            ? '-50% Points Per Word'
            : `+${
                Math.floor(
                  this.cardProgressionformulaOptions.upperbound *
                    (1 /
                      (1 +
                        Math.exp(
                          -this.cardProgressionformulaOptions.steepness *
                            (this.cardMap[this.type] *
                              this.cardProgressionformulaOptions.separator -
                              this.cardProgressionformulaOptions.midpoint)
                        )))
                ) * 5
              }% Points Per Word`;
        case 'PassivePointsAmount':
          return this.type === 'Broken'
            ? '-25 Passive Points Per Word'
            : `+${
                Math.floor(
                  this.cardProgressionformulaOptions.upperbound *
                    (1 /
                      (1 +
                        Math.exp(
                          -this.cardProgressionformulaOptions.steepness *
                            (this.cardMap[this.type] *
                              this.cardProgressionformulaOptions.separator -
                              this.cardProgressionformulaOptions.midpoint)
                        )))
                ) * 3
              } Passive Points Per Word`;
        case 'PassivePointsPercentage':
          return this.type === 'Broken'
            ? '-65% Passive Points Per Word'
            : `+${
                Math.floor(
                  this.cardProgressionformulaOptions.upperbound *
                    (1 /
                      (1 +
                        Math.exp(
                          -this.cardProgressionformulaOptions.steepness *
                            (this.cardMap[this.type] *
                              this.cardProgressionformulaOptions.separator -
                              this.cardProgressionformulaOptions.midpoint)
                        )))
                ) * 15
              }% Passive Points Per Word`;
        case 'PassivePointsSpeed':
          return this.type === 'Broken'
            ? 'Generate Passive Words -10% Faster'
            : `Generate Passive Words +${Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      ))) *
                  0.5
              )}% Faster`;
        case 'PassivePointsLength':
          return this.type === 'Broken'
            ? '-1 Passive Word Length'
            : `+${Math.floor(
                this.cardProgressionformulaOptions.upperbound *
                  (1 /
                    (1 +
                      Math.exp(
                        -this.cardProgressionformulaOptions.steepness *
                          (this.cardMap[this.type] *
                            this.cardProgressionformulaOptions.separator -
                            this.cardProgressionformulaOptions.midpoint)
                      ))) *
                  0.4
              )} Passive Word Length`;
              case "Lowercase":
                return 'All Words are Lowercase'
        default:
          return '';
          break;
      }
    }
  }
  
  export type BonusType =
    | 'PointsPercentage'
    | 'PointsAmount'
    | 'PassivePointsPercentage'
    | 'PassivePointsAmount'
    | 'PassivePointsSpeed'
    | 'PassivePointsLength'
    | 'Lowercase';
  
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
  
  interface formulaOptions {
    upperbound: number;
    steepness: number;
    separator: number;
    midpoint: number;
  }
  