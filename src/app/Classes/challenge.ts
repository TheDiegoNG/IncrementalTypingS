export class Challenge {
    type: ChallengeType;
    description: string;
    rewardDescription: string;
    time: number;
    onChallenge: boolean = false;
    objective: number;
    amount: number = 0;
    restriction: number;
  
    constructor(
      challengeType: ChallengeType,
      challengeDescription: string,
      challengeRewardDescription: string,
      challengeTime: number,
      challengeObjective: number,
      challengeRestriction: number
    ) {
      this.type = challengeType;
      this.description = challengeDescription;
      this.rewardDescription = challengeRewardDescription;
      this.time = challengeTime;
      this.objective = challengeObjective;
      this.restriction = challengeRestriction;
    }
  }
  
  export type ChallengeType = 'Accuracy' | 'Speed' | 'Language';
  