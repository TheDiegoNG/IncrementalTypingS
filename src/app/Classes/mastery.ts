export class Mastery {
    tier: MasteryTier;
    letters: string[];
    amount: number = 0;
    costToLevelUp: number;
    level: number = 0;

    constructor(masteryTier: MasteryTier, masteryLetters: string[], cost: number) {
        this.tier = masteryTier;
        this.letters = masteryLetters;
        this.costToLevelUp = cost;
    }
}

export type MasteryTier = "Alpha" | "Beta" | "Gamma" | "Delta" | "Epsilon" | "Dseta" | "Eta" | "Zeta"

export class MastShopItem {
    level = 0;
    name: string;
    desc: string;

    constructor(name: string, desc: string) {
        this.name = name;
        this.desc = desc;
    }
}
