export class Era {
    name: string;
    bonus: number;
    desc: string;
    numberToReach: number;

    constructor(name: string, bonus: number, desc: string, numberToReach: number) {
        this.name = name;
        this.bonus = bonus;
        this.desc = desc;
        this.numberToReach = numberToReach;
    }
}
