import { Game } from './game';

export class Achievement {
  id: number;
  name: string;
  description: string;
  target: number;
  property: keyof Game | 'Other';
  group?: string;
  revealed: boolean = false;

  constructor(
    achievementName: string,
    achievementDesc: string,
    achievementNumber: number,
    target: number,
    property: keyof Game | 'Other',
    revealed: boolean,
    group?: string,
  ) {
    this.id = achievementNumber;
    this.name = achievementName;
    this.description = achievementDesc;
    this.property = property;
    this.target = target;
    this.group = group;
    this.revealed = revealed
  }
}
