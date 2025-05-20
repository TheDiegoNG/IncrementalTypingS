export class Generator {
    name: string;
    amountBought: number = 0;
    amountGained: number = 0;
    synergyValue: number = 1;
    synergyCost: number = 1_000_000_000_000;
    cost: number;
    id: number;
  
    constructor(generatorName: string, generatorCost: number, generatorNumber: number) {
      this.name = generatorName;
      this.cost = generatorCost;
      this.id = generatorNumber;
    }
  }
  