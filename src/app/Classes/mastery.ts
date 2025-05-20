export class Mastery {
    tier: MasteryTier;
    letters: string[];
    amount: number = 0;

    constructor(masteryTier: MasteryTier, masteryLetters: string[]) {
        this.tier = masteryTier;
        this.letters = masteryLetters;
    }
}

export type MasteryTier = "Alpha" | "Beta" | "Gamma" | "Delta" | "Epsilon" | "Dseta" | "Eta" | "Zeta"
