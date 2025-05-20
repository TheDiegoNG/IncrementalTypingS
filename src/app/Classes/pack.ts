export class Pack {
    cost: number
    type: PackTier
    
    constructor(packType: PackTier, packCost: number) {
        this.type = packType;
        this.cost = packCost;
    }
}

export type PackTier =
  | 'Starter'
  | 'Explorer'
  | 'Master'
  | 'Grandmaster'
  | 'Mighty'
  | 'Ethereal';
