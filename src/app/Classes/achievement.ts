import { Game } from './game';

export class Achievement {
  id: number;
  name: string;
  description: string;
  target: number;
  property: keyof Game | 'Other';
  group?: string;

  constructor(
    achievementName: string,
    achievementDesc: string,
    achievementNumber: number,
    target: number,
    property: keyof Game | 'Other',
    group?: string
  ) {
    this.id = achievementNumber;
    this.name = achievementName;
    this.description = achievementDesc;
    this.property = property;
    this.target = target;
    this.group = group;
  }
}
