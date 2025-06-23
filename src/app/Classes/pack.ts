export class Pack {
    cost: number
    type: PackTier
    exp: number
    
    constructor(packType: PackTier, packCost: number, exp: number) {
        this.type = packType;
        this.cost = packCost;
        this.exp = exp;
    }
}

export type PackTier =
  | 'Starter'
  | 'Explorer'
  | 'Master'
  | 'Grandmaster'
  | 'Mighty'
  | 'Ethereal';
