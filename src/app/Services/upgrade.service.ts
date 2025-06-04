import { inject, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { PassiveService } from './passive.service';
import { eIdUpgrade, Upgrade } from '../Classes/upgrade';
import { TimerService } from './timer.service';
import { GameUtils } from '../Utils/gameUtils';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  gameService = inject(GameService);
  layoutService = inject(LayoutService);
  passiveService = inject(PassiveService);
  timerService = inject(TimerService);
  starterUpgrades: Upgrade[] = [];
  explorerUpgrades: Upgrade[] = [];
  masterUpgrades: Upgrade[] = [];
  grandMasterUpgrades: Upgrade[] = [];
  mightyUpgrades: Upgrade[] = [];
  passiveUpgrades: Upgrade[] = [];
  prestigeUpgrades: Upgrade[] = [];
  scoreUpgrades: Upgrade[] = [];
  passiveScoreUpgrades: Upgrade[] = [];
  lengthUpgradeBlocked = signal(false);

  constructor() {
    this.createScoreUpgrade(
      new Upgrade(
        'First Upgrade of them all',
        'x1.3 Points',
        50,
        'FirstUpgradePoints',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        'Your words value a little bit more, absolutely',
        '+4 Points per Word',
        200,
        'WordsValueBitMore',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        '2nd Upgrade of this type',
        'x1.5 Points',
        5_000,
        'SecondUpgradePoints',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        'Your words value a bit more more, absolutely again',
        '+10 points per word',
        15_000,
        'WordsValueBitMoreMore',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        'Last Basic Upgrade! Your words value MORE, a bit more.',
        '+20 points per word',
        200_000,
        'LastBasic',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        `Lets go back to the basics`,
        'x3 Points!',
        600_000_000,
        'IntermediateBasicsOne',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        `Lets go back to the basics v2`,
        '+25 Points per Word',
        6_000_000_000,
        'IntermediateBasicsTwo',
        'Score'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'The Beginning',
        'The first root, as this upgrade, begins this journey. Here, your will to grow manifests as potential yet untouched. ',
        0,
        'TB',
        'Starter',
        [],
        150,
        100,
        'A feeling of determination'
      )
    );

    this.createStarterUpgrade(
      new Upgrade(
        'Letters per Value',
        'Your words are no longer just expressions — they become metrics of mastery. Each letter typed finds its weight in the great ledger of language, charting your fluency over time.',
        300,
        'LpV',
        'Starter',
        ['TB'],
        300,
        100,
        'Unlock a Letters per Minute'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Passive Word Enhancer',
        "Words now echo even in silence. The roots of language dig deeper, drawing meaning even from stillness. You've taken your first step into unseen productivity",
        1_500,
        'PaE',
        'Starter',
        ['TB'],
        150,
        200,
        'Unlock Passive Points generation'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Mental Expansion',
        'The mind stretches, and so do your words. Where once meaning ended, now a single letter more can shape thought, expand expression, and push boundaries.',
        500,
        '+1WLI',
        'Starter',
        ['TB'],
        300,
        200,
        'Word Length + 1'
      )
    );

    this.createStarterUpgrade(
      new Upgrade(
        `Echo Pattern`,
        'Repetition reveals rhythm. When letters echo within a word, they form patterns of power — familiar structures that amplify meaning through unity.',
        1_000,
        'saLW',
        'Starter',
        ['+1WLI'],
        450,
        100,
        '3.5^[Groups of +1 Same Letter]',
        ['diLW', 'xSlow', 'xPass/t', 'xSlow/cPrep']
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        `Lexical Diversity`,
        'Diversity shapes expression. Every unique letter adds a spark, a new angle to the word’s design — and with each difference, your potential multiplies.',
        1_250,
        'diLW',
        'Starter',
        ['+1WLI'],
        450,
        300,
        '1.8^[Different Letters]',
        ['saLW', 'xFast', 'xPass/h', 'xPrec']
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Momentum Drive',
        'The faster you move, the more you gain. Momentum becomes power, and hesitation is your enemy. Each word typed reignites the flame of intensity.',
        50000,
        'xFast',
        'Starter',
        ['saLW'],
        600,
        100,
        'x5 [NEEDS REAL TIME DATA]'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Patience Multiplier',
        'Stillness holds strength. The longer you wait, the more the multiplier blooms — a quiet build-up of potential waiting to be released with the next word.',
        75000,
        'xSlow',
        'Starter',
        ['diLW'],
        600,
        300,
        'x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Precision Harvest',
        'Precision breeds reward. Strike the rhythm of the bar at its peak, and watch passive power surge. But miss... and the silence will cost you.',
        1000000,
        'xPass/h',
        'Starter',
        ['xFast'],
        750,
        100,
        'Unlock a bar in the Passive Menu that boosts your Passive Points when clicked correctly. If not, then you lose points'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Passive Rainfall',
        'Patience becomes production. By allowing time to flow uninterrupted, your passive points accumulate like rain in a still pool.',
        1000000,
        'xPass/t',
        'Starter',
        ['xSlow'],
        750,
        300,
        'Get an increasing Passive Points Multiplier'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Flawless Focus',
        'Perfection sharpens progress. With every word typed flawlessly, your focus is rewarded — building momentum through mastery.',
        1000000,
        'xPrec',
        'Starter',
        ['xPass/h'],
        900,
        100,
        'You get a combo on words perfectly typed. x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Combo Resonance',
        'Momentum echoes through your systems. A strong combo sends ripples outward, empowering other multipliers in your arsenal.',
        1000000,
        'xSlow/cPrep',
        'Starter',
        ['xPass/t'],
        900,
        300,
        'Your Passive Points multiplier gets propagated to other multipliers'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Unlock Gacha',
        'Fortune spins in your favor — or against it. With a roll of fate, you unlock the unpredictable. Risk and reward merge in the great game of chance.',
        100_000,
        'Gacha',
        'Starter',
        ['xPrec', 'xSlow/cPrep'],
        1000,
        200,
        'Unlock Gacha',
        undefined,
        'ANY'
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        `Card Chorus`,
        'Each card held whispers its own power. The more you gather, the louder the chorus of influence — quantity becomes strength.',
        10_000_000_000,
        'xcaAm',
        'Starter',
        ['Gacha'],
        1100,
        100,
        'xSqrt([CardAmount])'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Lexical Reach',
        'The shape of thought stretches. Words now extend beyond their former bounds, allowing for longer, more potent expressions.',
        100_000,
        '+1WLII',
        'Explorer',
        ['Gacha'],
        1200,
        200,
        'Word Length + 1'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Milestone Power',
        'Your accomplishments no longer sit silent — they empower your every word. Each milestone adds weight to your progress.',
        6_000,
        'Ach',
        'Explorer',
        ['+1WLII'],
        1200,
        300,
        'x[AchievementAmount]/10'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Achievement Momentum',
        'Success feeds on itself. Achievements earned in succession create a current — the faster you rise, the stronger the surge.',
        6_000,
        'comboAch',
        'Explorer',
        ['Ach'],
        1200,
        400,
        'You get a combo on Achievements. x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Merit Multiplier',
        'Not all triumphs are equal. The rarer the feat, the greater the echo in your multiplier — excellence now truly counts.',
        6_000,
        'MileRes',
        'Explorer',
        ['Ach'],
        1350,
        400,
        'Your achievements value more based on how hard they are. [Achievement]x[Quality]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Unlock Scrabble',
        'Each letter now bears its true value. You unlock the linguistic ledger — where rarity becomes reward.',
        40_000,
        'Scr',
        'Explorer',
        ['+1WLII'],
        1350,
        200,
        'Every letter has a value based on Scrabble.'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Scrabble Module',
        "You now wield the power of linguistic weight. The Scrabble Module converts each letter's worth into point potential.",
        40_000,
        'ScrM',
        'Explorer',
        ['Scr'],
        1350,
        100,
        'You obtain the Scrabble Module!'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Rare Glyph Pulse',
        'When you call upon the obscure, the system rewards you. Uncommon letters spark bursts of scoring brilliance.',
        40_000,
        'ScrS',
        'Explorer',
        ['Scr'],
        1500,
        100,
        'Typing a word with an uncommon letter gives a temporary bonus. x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Echo Memory',
        'The past shapes the present. The Scrabble weight of your last ten words echoes into your next — a cascade of cumulative strength.',
        40_000,
        'LetPo',
        'Explorer',
        ['Scr'],
        1500,
        200,
        'You get a percentage of your Total Points based on your last 10 words typed by their values in Scrabble. x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Stretch Multiplier',
        'Longer thoughts yield greater power. The stretch of a word is now mirrored in the growth of your reward.',
        40_000,
        'xWL',
        'Explorer',
        ['+1WLII'],
        1350,
        300,
        'x[Word Length]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Branch Access',
        'You gaze across the divide and unlock what once was closed. Another path lies open — new strategies await.',
        40_000,
        'Act/IdleI',
        'Explorer',
        ['xWL'],
        1500,
        400,
        "You can purchase the branch that you didn't choose"
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Unlock Mastery',
        'Beyond repetition lies understanding. You now tap into the deeper layers of the alphabet — each letter becomes a skill to refine.',
        40_000,
        'Mast',
        'Explorer',
        ['xWL'],
        1800,
        200,
        'Unlock Mastery'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Enhance Alpha',
        'You deepen your understanding of the Alpha set. The first letters of knowledge sharpen under your hand, becoming more precise, more powerful.',
        40_000,
        'EnhAlpha',
        'Explorer',
        ['Mast'],
        1650,
        150,
        'You get more Alpha levels based on... x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Enhance Beta',
        'The second glyphs awaken. Letters once overlooked now reveal their strength, and your fluency with Beta flourishes with every use.',
        40_000,
        'EnhBeta',
        'Explorer',
        ['Mast'],
        1800,
        50,
        'You get more Beta levels based on... x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Enhance Gamma',
        'Gamma surges with untapped energy. These letters carry rhythm and resistance — mastering them unlocks new depths in your linguistic arsenal.',
        40_000,
        'EnhGamma',
        'Explorer',
        ['Mast'],
        1950,
        150,
        'You get more Gamma levels based on... x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Enhance Delta',
        'Delta flows like a river of nuance. These letters bend, echo, and build — strengthening this group shapes the tempo of your thoughts.',
        40_000,
        'EnhDelta',
        'Explorer',
        ['Mast'],
        1875,
        300,
        'You get more Delta levels based on... x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createExplorerUpgrade(
      new Upgrade(
        'Enhance Epsilon',
        'The final glyphs whisper from the edge of silence. Enhance Epsilon to command rare forms, quiet symbols, and the end of the alphabetic spectrum.',
        40_000,
        'EnhEpsilon',
        'Explorer',
        ['Mast'],
        1725,
        300,
        'You get more Epsilon levels based on... x1 [NEEDS REAL TIME DATA]'
      )
    );
    this.createMasterUpgrade(
      new Upgrade(
        'Lexical Stretch',
        'Your words stretch once more. Another letter joins the symphony, expanding your reach and your voice.',
        40_000,
        '+1WLIII',
        'Master',
        ['EnhAlpha', 'EnhBeta', 'EnhGamma', 'EnhDelta', 'EnhEpsilon'],
        1875,
        500,
        'Word Length + 1'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Unlock Second Pack`,
        'Beyond the first deck lies deeper opportunity. Another set of powers now awaits your draw.',
        20_000_000_000_000,
        '2ndP',
        'Master',
        ['+1WLIII'],
        1800,
        600,
        'You can purchase the second Cards Pack'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Merge Module`,
        'Fusion becomes possible. Through the Merge Module, your cards may unite — becoming greater than the sum of their parts.',
        50_000_000_000_000,
        'MergM',
        'Master',
        ['2ndP'],
        1875,
        700,
        "You obtain the Merge Module! You still don't know what to do with these"
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Card Synergy Multiplier`,
        "It's not just the amount — it's the essence. The quality of your cards now amplifies their quantity's worth.",
        1_500_000_000_000,
        'caQual',
        'Master',
        ['2ndP'],
        1650,
        500,
        'The cards quality amplifies the Card Multiplier Amount. [Card]x[Quality]'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Unlock Market`,
        'You now enter the shifting realm of value and risk. The Market awakens — dynamic, unpredictable, rewarding.',
        10_000_000_000_000,
        'Mark',
        'Master',
        ['2ndP'],
        1650,
        700,
        'Unlock Market'
      )
    );
    this.createMasterUpgrade(
      new Upgrade(
        `Branch Nexus`,
        'What once was locked is now open. You gain the ability to traverse paths you previously abandoned.',
        10_000_000_000_000,
        'Act/IdleII',
        'Master',
        ['Mark'],
        1650,
        800,
        "You can purchase the upgrades that you didn't choose."
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `High Stakes Draw`,
        'The edge sharpens. You now walk a higher-risk path — with greater odds of power, but darker shadows.',
        10_000_000_000_000,
        'All-In',
        'Master',
        ['Mark'],
        1500,
        600,
        'Better chance for Negative and Better cards.'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Safe Pull`,
        'Caution guides your draw. Negative cards are shielded, but so are the heights of greatness.',
        10_000_000_000_000,
        'InsideI',
        'Master',
        ['Mark'],
        1500,
        800,
        'You cannot get Negative cards, but you get worse cards'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Volatility Surge`,
        'The market trembles with chaotic energy. Rewards may spike — or crash — with every fluctuation.',
        10_000_000_000_000,
        'Crypto',
        'Master',
        ['All-In'],
        1350,
        600,
        'The Word Market increases and decreases with greater volatility'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Market Stabilizer`,
        'Balance returns. The market calms, offering slower but safer growth.',
        10_000_000_000_000,
        'RealEstate',
        'Master',
        ['InsideI'],
        1350,
        800,
        'The Word Market is less volatile'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Volatile Burst`,
        'For a time, the market flares with instability. Tread carefully — or profit wildly.',
        10_000_000_000_000,
        'VolatileM',
        'Master',
        ['Crypto'],
        1200,
        600,
        'You can get temporary boosts to the Market volatility'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Market Freeze Up`,
        'For a brief window, the market holds its breath. No decline, only opportunity.',
        10_000_000_000_000,
        'BullM',
        'Master',
        ['RealEstate'],
        1200,
        800,
        'From time to time, the Market cannot decrease at all'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Chance Surge on Word`,
        'With every word, fate rolls the dice. Sometimes, fortune grants you a flash of total power.',
        10_000_000_000_000,
        'ShadF',
        'Master',
        ['VolatileM'],
        1050,
        600,
        'You have a chance of getting a percentage of your Total Points on Word Typed'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Drip of Totality`,
        'With each word, a fraction of your total flows back — a subtle, steady stream of accumulated potential.',
        10_000_000_000_000,
        'DiviTr',
        'Master',
        ['BullM'],
        1050,
        800,
        'You get a reduced percentage of your total Points on Word Typed'
      )
    );

    this.createMasterUpgrade(
      new Upgrade(
        `Half-Curse Handling`,
        'The sting of misfortune is dulled. Though darkness still touches your cards, its grip weakens — and with it, your resilience grows.',
        500_000_000_000,
        'TaxEv',
        'Master',
        ['ShadF', 'DiviTr'],
        900,
        700,
        'Negative Cards effects are halved',
        undefined,
        'ANY'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Lexical Extension`,
        'The line between limitation and expression shifts once more. A single letter longer, and your words gain new dimensions.',
        100_000_000_000_000_000,
        '+1WLIV',
        'GrandMaster',
        ['TaxEv'],
        750,
        800,
        'Word Length + 1'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Unlock Cardinal Sins`,
        'You now step into forbidden territory. The Cardinal Sins awaken — trials of vice and virtue, where power is paid for in pain.',
        100_000_000_000_000_000,
        'CardSins',
        'GrandMaster',
        ['+1WLIV'],
        450,
        1100,
        'Unlock Cardinal Sins'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Tame the Pride`,
        'Perfection is no longer demanded, only encouraged. The edge of arrogance softens, giving you room to stumble and rise again.',
        100_000_000_000_000_000,
        'CSPride',
        'GrandMaster',
        ['CardSins'],
        450,
        900,
        'You have a 50% of not exiting the challenge on Wrong Word Typed while on CSPride'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Quiet the Desire`,
        'The temptations dim. What once glowed with reckless allure now flickers gently — easier to resist, and harder to fall for.',
        100_000_000_000_000_000,
        'CSLust',
        'GrandMaster',
        ['CardSins'],
        300,
        1300,
        '2 Bad Wheel Slots less while on CSLust'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Restrain the Appetite`,
        'Our hunger slows, and the urgency fades. Gluttony loses its grip, allowing for measured consumption and steadier control.',
        100_000_000_000_000_000,
        'CSGluttony',
        'GrandMaster',
        ['CardSins'],
        450,
        1300,
        'You have more time for purchasing upgrades while on CSGluttony. 3 sec to 5 sec.'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Silence the Envy`,
        'The gnawing jealousy retreats. The shadows that once stole from you now waver — their touch less constant, their sting less sharp.',
        100_000_000_000_000_000,
        'CSEnvy',
        'GrandMaster',
        ['CardSins'],
        200,
        1100,
        'Your points get reduced less. Instead of 0 you get ^0.5'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Calm the Wrath`,
        'The chaos quiets. The fury that once chased your every move now hesitates, giving you space to breathe and outmaneuver the storm.',
        100_000_000_000_000_000,
        'CSWrath',
        'GrandMaster',
        ['CardSins'],
        200,
        1000,
        "You don't get ads anymore. You get letters added less frequently"
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Shake the Sloth`,
        'Stillness no longer binds you as tightly. The weight of delay lightens, granting momentum where lethargy once ruled.',
        100_000_000_000_000_000,
        'CSSloth',
        'GrandMaster',
        ['CardSins'],
        200,
        1200,
        'You have to wait less for the next upgrade. From 10 sec to 5 sec.'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        `Diminish the Greed`,
        'The curve of loss becomes less cruel. Though Greed still takes, it takes less — letting you grow even within its grasp.',
        100_000_000_000_000_000,
        'CSGreed',
        'GrandMaster',
        ['CardSins'],
        300,
        900,
        'Your score gets reduced less. From ^0.5 to ^0.75'
      )
    );

    // this.createGrandMasterUpgrade(
    //   new Upgrade(
    //     `Unlock Minigames`,
    //     'You open a portal to play within the game. Minigames now emerge — trials of wit, skill, and timing, hidden within the greater wordstream.',
    //     500_000_000_000_000_000,
    //     'Mini',
    //     [],
    //     1000,
    //     600
    //   )
    // );

    this.createGrandMasterUpgrade(
      new Upgrade(
        'Unlock Challenges',
        'You step into structured trials. Challenges test your precision, speed, and adaptability — offering great reward to the prepared.',
        5_000_000,
        'Chal',
        'GrandMaster',
        ['+1WLIV'],
        750,
        700,
        'Unlock Challenges'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Investment',
        'Every trial strengthens your foundation. The more challenges you overcome, the stronger your passive power becomes.',
        5_000_000,
        'ChalInv',
        'GrandMaster',
        ['Chal'],
        750,
        600,
        'x[ChalAmount]'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Module',
        'You gain access to specialized challenge mechanics. Fine-tune your approach, control your fate.',
        5_000_000,
        'ChalM',
        'GrandMaster',
        ['Chal'],
        600,
        700,
        'You obtain the Merge Module!. You start to feel uneasy from just seeing them.'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Dividends',
        'Each challenge feeds your growth. Their echoes now return as dividends — point bonuses granted through perseverance.',
        5_000_000,
        'ChalDiv',
        'GrandMaster',
        ['ChalM'],
        600,
        600,
        'Percentage of TotalPoints based on Challenge Completions on Word Typed'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Preparation',
        "Calm before the storm. A moment of heightened focus grants you a powerful boost at the challenge's start.",
        5_000_000,
        'ChalPrep',
        'GrandMaster',
        ['ChalM'],
        450,
        700,
        'You start every challenge with a temporary boost'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Holy',
        'As failure draws near, a divine spark shields you. A single mistake does not spell the end — not this time.',
        5_000_000,
        'ChalHoly',
        'GrandMaster',
        ['ChalPrep'],
        450,
        800,
        'You get +1 Life on every challenge'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Advancement',
        'Mastery in speed rewards you twice. Complete a challenge with swift precision, and your victory echoes further.',
        5_000_000,
        'ChalAdv',
        'GrandMaster',
        ['ChalPrep'],
        300,
        700,
        'You can get multiple completions based on how fast you complete a challenge'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Time Bending',
        'You stretch the seconds. Time flows slower within the challenge, giving you the clarity to succeed.',
        5_000_000,
        'TimeBend',
        'GrandMaster',
        ['ChalAdv'],
        300,
        600,
        'Every challenge completed adds 10 seconds to every Challenge'
      )
    );
    this.createGrandMasterUpgrade(
      new Upgrade(
        'Challenge Nerf',
        'The burden lightens. Your challenges become gentler, their demands eased — not erased, just softened.',
        5_000_000,
        'ChalNerf',
        'GrandMaster',
        ['ChalAdv'],
        150,
        700,
        'Every challenge completed reduces the Challenge objective by 5%'
      )
    );

    this.createGrandMasterUpgrade(
      new Upgrade(
        'Word Extension',
        'Once again, the boundaries shift. A single extra letter reshapes how your words connect with the system.',
        5_000_000,
        '+1WLV',
        'GrandMaster',
        ['CardSins'],
        750,
        1000,
        'Word Length + 1'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Unlock Modules`,
        'Complex systems awaken. You unlock the capacity to specialize and upgrade deeply through modular mechanics.',
        100_000_000,
        'Mod',
        'Mighty',
        ['+1WLV'],
        750,
        1100,
        'Unlock Modules'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Length via Letter Value`,
        'Each rare letter now carries more weight. Your word length increases with the density of its Scrabble points.',
        100_000_000,
        'WLPerScr',
        'Mighty',
        ['Mod'],
        900,
        1000,
        'Words act as if they were longer based on Scrabble Points'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Achievement-Weighted Letters`,
        'The more you achieve, the more your letters are worth. Scrabble points scale with your journey.',
        100_000_000,
        'ScrPerAch',
        'Mighty',
        ['WLPerScr'],
        1050,
        1000,
        'Scrabble Points count as if they were more based on your Achievements'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Mastery-Fueled Achievements`,
        'Deep knowledge refines your milestones. The stronger your Mastery, the more meaningful your Achievements become.',
        100_000_000,
        'AchPerMast',
        'Mighty',
        ['ScrPerAch'],
        1200,
        1000,
        'Achievements worth more based on your Mastery Levels'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Length to Mastery`,
        'Longer words carry deeper lessons. Your mastery grows faster the further your expression stretches.',
        100_000_000,
        'MastPerWL',
        'Mighty',
        ['AchPerMast'],
        1350,
        1000,
        'Mastery EXP multiplier based on Word Length'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Doubled Length Recognition`,
        'Your words now resonate with double strength. Each letter counts twice, reshaping your entire structure of gain.',
        100_000_000,
        'WLx2',
        'Mighty',
        ['Mod'],
        900,
        1200,
        'Words act as if they were twice longer'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Scrabble Synergy`,
        'The more you invest in the Scrabble Module, the more your letters align. Every upgrade compounds your letter-based output.',
        100_000_000,
        'ScrSy',
        'Mighty',
        ['WLx2'],
        1050,
        1200,
        'You get more Scrabble Points based on your total amount of Scrabble Module Upgrades'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Foundational Recognition`,
        'Even your smallest victories now stand taller. The base value of all achievements rises by two.',
        100_000_000,
        'AchBase+2',
        'Mighty',
        ['ScrSy'],
        1200,
        1200,
        'Your achievements base value is increased by 2'
      )
    );

    this.createMightyUpgrade(
      new Upgrade(
        `Mastery Feedback`,
        'Your growth feeds itself. The more mastery you have, the faster you continue mastering — a self-sustaining cycle.',
        100_000_000,
        'MastSy',
        'Mighty',
        ['AchBase+2'],
        1350,
        1200,
        'You get more Mastery EXP based on your Mastery Levels'
      )
    );

    //Passive Upgrade
    this.createPassiveScoreUpgrade(
      new Upgrade(
        'You force the enhancer to be enhancerer',
        'x1.25 Points',
        100000,
        'PassiveEnhancerEnhancerer',
        'Passive'
      )
    );
    this.createPassiveScoreUpgrade(
      new Upgrade(
        "Here's a little bonus for you",
        '+2 points per Word',
        700000,
        'PassiveLittleBonus',
        'Passive'
      )
    );
    this.createPassiveScoreUpgrade(
      new Upgrade(
        "I don't know exactly what to upgrade, I'm sorry",
        'x1.5 Points',
        4000000,
        'PassiveDontKnow',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Whispers of Stillness`,
        'Silence becomes strength. With each breath, the system hums with unseen energy, setting the stage for a flow of passive power.',
        0,
        'PrTB',
        'Passive',
        [],
        200,
        300,
        'A feeling of silent potential'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Silent Lexicon`,
        "Letters don't just count in words, but also in passive flow. Each rare letter adds power, even without active typing.",
        100_000_000,
        'ScrPB',
        'Passive',
        ['PrTB'],
        200,
        200,
        'Scrabble bonuses now also apply to Passive Points.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Silent Scholar`,
        'Deep knowledge transcends the act of writing. Each Mastery level adds to your passive power.',
        100_000_000,
        'MastPB',
        'Passive',
        ['ScrPB'],
        400,
        100,
        'Mastery bonuses now also apply to Passive Points.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Legacy of Triumph`,
        'Your accomplishments echo beyond their moment, amplifying even the passive. Each milestone fuels your progress.',
        100_000_000,
        'AchPB',
        'Passive',
        ['ScrPB'],
        200,
        100,
        'Achievement bonuses now also apply to Passive Points.'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Silent Trade`,
        'The market never sleeps. Fluctuations in the Market now resonate directly with your passive generation.',
        100_000_000,
        'MarkPB',
        'Passive',
        ['AchPB'],
        0,
        100,
        'Market bonuses now also apply to Passive Points.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Code of Flow`,
        'Even the underlying code holds weight. The ASCII value of each word now influences your passive flow.',
        100_000_000,
        'AsciiPB',
        'Passive',
        ['MarkPB'],
        0,
        0,
        'ASCII bonuses now also apply to Passive Points.'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Passive Word Stretch`,
        'In the passive world, words grow longer, weaving new layers of hidden meaning. Each added letter amplifies the silent narrative.',
        3e5,
        'HorScal+',
        'Passive',
        ['PrTB'],
        0,
        300,
        '+1 Letter to Generated Word'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Path of Clarity`,
        'The line widens, giving more room to strike with precision. The Active Bar becomes more forgiving for those who watch closely.',
        2e6,
        'LBarSize+',
        'Passive',
        ['PrTB'],
        0,
        400,
        'Longer area for Active Bar'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Path of Precision`,
        'Further widening brings clarity to the path. Precision becomes easier to achieve as the Active Bar grows larger.',
        100_000_000,
        'LBarSize++',
        'Passive',
        ['LBarSize+'],
        0,
        500,
        'Longer area for Active Bar'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Path of Mastery`,
        'The path reaches its peak clarity. Every strike becomes more confident, each click more rewarding.',
        100_000_000,
        'LBarSize+++',
        'Passive',
        ['LBarSize++'],
        0,
        600,
        'Longer area for Active Bar'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Edge of Perfection`,
        'A hidden, narrow window reveals itself. Those who dare strike with perfect precision unlock a surge of passive power far beyond the norm.',
        100_000_000,
        'PrecBarCrit',
        'Passive',
        ['LBarSize+++'],
        0,
        700,
        'A new area in the Active Bar appears'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        `Gentle Decay`,
        'The system softens its edge. The penalty for slipping to the sides becomes lighter, offering forgiveness for near-misses.',
        100_000_000,
        'NerfNerf',
        'Passive',
        ['PrecBarCrit'],
        0,
        800,
        '-0.05 instead of -0.1 whenever the line touches the edges of the Active Bar'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Whispers of Speed`,
        'The idle flow accelerates. Time bends to your favor as the bar fills faster, bringing each collection closer.',
        100_000_000,
        'FastB+',
        'Passive',
        ['PrTB'],
        400,
        400,
        'Idle Bar fills 20% faster'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Pulse of Acceleration`,
        "The rhythm quickens further. The bar's pace intensifies, drawing you into the rush of passive accumulation.",
        100_000_000,
        'FastB++',
        'Passive',
        ['FastB+'],
        400,
        500,
        'Idle Bar fills 20% faster, again'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Torrent of Flow`,
        'The bar surges with unmatched speed. Time and flow merge, propelling you toward a passive crescendo.',
        100_000_000,
        'FastB+++',
        'Passive',
        ['FastB++'],
        400,
        600,
        'Idle Bar fills 20% faster, once again. This makes it twice faster than the original speed!'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Echo of Abundance`,
        'Each completion brings not one, but two rewards. Your grasp on passive power expands as charges double with every harvest.',
        100_000_000,
        'Charge+',
        'Passive',
        ['FastB+++'],
        400,
        700,
        '+1 Charges when collected'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Overdrive Surge`,
        'In a fleeting burst, your passive power ignites. Collecting a charge unleashes a surge of x2 power, rewarding patience with an explosive climax.',
        100_000_000,
        'OvDriveBar',
        'Passive',
        ['Charge+'],
        400,
        800,
        'Your multiplier charge gains a x2 bonus for 10 seconds before fully depleting when collected.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Dual Flow`,
        'Active clicks empower passive progress, and passive fills protect active flow. A hidden synergy emerges between the two bars.',
        100_000_000,
        'BarSyn',
        'Passive',
        ['OvDriveBar', 'NerfNerf'],
        200,
        900,
        "Active clicks fill a percentage of the Idle Bar. The Idle Bar's fill percentage is the chance to avoid decay on Active edge hits."
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Efficient Blueprint`,
        'The intricate design of your generators evolves, reducing the cost of higher tiers and paving the way for exponential growth.',
        100_000_000,
        'GenScalPlus',
        'Passive',
        ['BarSyn'],
        200,
        1000,
        'Generator cost scaling is improved.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Empowered Constructs`,
        'Charges can now be assigned to specific generators, infusing them with raw potential and amplifying their output.',
        100_000_000,
        'GenCharge',
        'Passive',
        ['GenScalPlus'],
        400,
        1000,
        'Assign charges to generators to overcharged them.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Linked Engines`,
        'Generators no longer operate in isolation. Each tier strengthens the others, creating a network of ascending power.',
        100_000_000,
        'SynGen',
        'Passive',
        ['GenScalPlus'],
        200,
        1100,
        'Generators boost each other, with higher tiers providing a better bonus.'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Synergy Module Unlocked`,
        'A hidden module awakens, allowing deeper optimization of generator synergies. Strategic improvements now await discovery.',
        100_000_000,
        'SynM',
        'Passive',
        ['SynGen'],
        400,
        1100,
        'Unlock the Synergy Module!'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        `Charge Ignition`,
        'Every charge collected ignites your generators, flooding them with energy for a short but intense boost.',
        100_000_000,
        'GenCharBoost',
        'Passive',
        ['SynGen'],
        200,
        1200,
        'Collecting a charge temporarily boosts generator output.'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Prestige Tree Beginning`,
        'Here begins the cycle of ascent. This first node, like the seed of a vast tree, whispers of endless potential waiting to unfold. With each reset, its roots stretch deeper into the fabric of growth, preparing the way for your future.',
        0,
        'PrTB',
        'Prestige',
        [],
        0,
        0,
        'A feeling of infinity'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Legacy`,
        'Your passive efforts become a hidden legacy, persisting across time. Even in new beginnings, their silent pulse remains, steady and unbroken.',
        0,
        'KeepPas',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Passive on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Foundry Surge`,
        'Each thousand echoes of Prestige fuels the fires of productivity. Passive points swell like molten metal in the heart of your forge, growing with every spark of progress.',
        0,
        'PrGenBulk',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '+X% Passive Point per 1000 Prestige Points'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Precision Arc`,
        'Your focus sharpens like a blade. The Active Bar responds, resonating with a higher, clearer multiplier — the mark of one who strikes with intent.',
        0,
        'ActBarMulti+',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better Active Bar Multiplier'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Rhythmic Surge`,
        'Each perfect strike upon the Active Bar sends ripples through the system. The rhythm of precision unlocks a chain of momentum, weaving a pattern of flawless power.',
        0,
        'ActBarPerf',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Gain a combo on consecutive successful Active Bar clicks'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Stillness Bloom`,
        'In the quiet of the Idle Bar, power accumulates unseen. The multiplier blossoms gently, waiting to be claimed when the world awakens again.',
        0,
        'IdleBarMulti+',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better Idle Bar Multiplier'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Engines`,
        'Your generators do not forget. Even through cycles of reset and rebirth, their quiet hum returns, ready to build anew from the depths.',
        0,
        'KeepGens',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Generators on Prestige'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Prestige-Driven Pulse`,
        'Prestige becomes the lifeblood of your generators, infusing them with a pulse that beats faster, stronger, pushing output to new heights.',
        0,
        'GenPrSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Faster Generators based on Prestige Points'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Crystalline Memory`,
        'Fragments of your past fill the Idle Bar even as you begin anew. The crystals glimmer with remembered strength, a reservoir waiting to be tapped.',
        0,
        'CrysCache',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'You keep a percentage of Crystal Charges on Prestige'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Flare of Continuity`,
        "Overdrive's flame burns longer, its brilliance unbroken. Momentum surges forward, defying time's grasp, extending the reach of power.",
        0,
        'OvDriveBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Overdrive Boost is extended'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Overflowing Crystal`,
        "When the crystals overflow, they grant not just a single charge, but a cascade. Power multiplies, spilling beyond the vessel's edge.",
        0,
        'CrysOvFlow',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'You can gain more than one charge per fill'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Engine's Awakening`,
        "Your generators awaken from slumber with renewed fervor. They surge forward, amplifying output in a wave of mechanical purpose.",
        0,
        'GenBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Generator Boost'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Synergy`,
        'The stillness of the Idle Bar and the hum of generators find harmony. Together, they weave a tapestry of amplified, silent growth.',
        0,
        'IdleGenAmp',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Idle Multiplier boost based on Generators'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Whispers of Fortune`,
        'The echoes of chance never fade. Even after rebirth, the threads of luck remain woven through your system, granting continuity to your pulls.',
        0,
        'KeepGacha',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Gacha on Prestige'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Overflowing Draw`,
        'The deck brims with possibility, spilling over its edges. With each draw, the tides of fortune widen, offering more than ever before.',
        0,
        'CaAm+2',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '+2 Cards per Roll'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Dealer`,
        'In the quiet passage of time, fortune stirs unseen. Every hour, a card is drawn from the void, a whisper of chance materialized.',
        0,
        'SilFort',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Generate 1 card every hour'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Fortune's Purge`,
        "The shadows of ill fortune are cast aside. With each draw, the hand you're dealt becomes purer, more favorable to your journey.",
        0,
        'PrCardCleanse',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Less Negative Cards'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Overflowing Promise`,
        'Your packs brim with latent energy, empowered by your Prestige. They spill forth extra cards, each a token of accumulated power.',
        0,
        'PackOvFlow',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '+1 Card on Pack based on Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Hand of Stars`,
        'The deck aligns in your favor. Each shuffle resonates with potential, drawing you closer to the rarest and most powerful cards.',
        0,
        'BetterCards',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'More probability for better cards'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Champion's Luck`,
        'Your persistent pursuit of fortune hones your draws. With each pack opened, your skill and luck combine, pulling the best from the deck.',
        0,
        'HighRoller',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better Cards based on Packs opened'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Convergence Ease`,
        'Cards align more easily, merging with less resistance. The energies of combination flow smoother, unlocking potential with fewer pieces.',
        0,
        'MergeNerf',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'You need less cards to merge them'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Unbroken Deck`,
        "Your packs remain intact through cycles of reset, their contents preserved as relics of fortune's favor.",
        0,
        'KeepPacks',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Packs on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Prestige's Echo`,
        "Prestige strengthens the silent dealer's hand. The number of cards drawn quietly increases, mirroring your rise in power.",
        0,
        'PrSilFort',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Generate more cards based on Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Whispering Ledger`,
        'The ledger of language never fades. Even across resets, your mastery of Scrabble persists, echoing with the power of rare letters.',
        0,
        'KeepScr',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Scrabble on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Gemstone Glyphs`,
        'The rarest letters shine brightest, each a gem in the tapestry of language. Their glow intensifies, granting a surge of points that matches their rarity.',
        0,
        'ScrPow',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better Boost to rarer characters'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Rare Glyph Cascade`,
        'When rare letters align in succession, they form a chain of brilliance. Each connection magnifies their power, building an unbroken cascade of points.',
        0,
        'ScrRareChain',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Each consecutive word with rare Scrabble letters increases point gains'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Mosaic Verse`,
        'The diversity of glyphs creates a mosaic of meaning. Words woven from rare and varied letters resonate with deeper strength, yielding higher rewards.',
        0,
        'ScrVariety',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'More unique letters based on Scrabble Tier gets a higher bonus'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Inferno of Letters`,
        'Every rare letter fuels a growing fire. When the reservoir of value bursts, it ignites a surge of points, illuminating your progress.',
        0,
        'ScrFuel',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Unlock a bar that fills based on Scrabble value. When filled, trigger a boost.'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Triumph`,
        'The weight of your achievements feeds an unseen current. This steady pulse flows into your Passive systems, amplifying growth silently.',
        0,
        'PassAch',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Passive Boost from Achievements'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Prismatic Record`,
        'Not all achievements gleam the same. The rarer and more luminous the milestone, the greater its resonance in your journey, magnifying your Prestige.',
        0,
        'QualPrAch',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Achievement Quality boosts Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Legacy's Gift`,
        'Every achievement unlocks deeper understanding. Mastery itself accelerates under the glow of past triumphs, each lesson fueling sharper focus.',
        0,
        'AchMastXP',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Boost to Mastery XP based on Achievements'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Anchor of Equilibrium`,
        'The tides of the Market settle, guided by unseen hands. Each rise and fall aligns more closely with order, creating a path of steady progress.',
        0,
        'MarkAnch',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Market fluctuation is more stable and consistent'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Vault of Echoes`,
        "The Market's pulse echoes through time. Even as the world resets, its vault of influence remains, untouched and unyielding.",
        0,
        'KeepMark',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Market on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Cascade of Ascent`,
        'One rise begets another. As the Market surges, it carries with it an echo of momentum, triggering a cascade of gains.',
        0,
        'SurgeChain',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'When the market rises, triggers another complementary rise immediately'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Rebound of Fate`,
        'When the Market stumbles thrice, fate intervenes. The fall is softened, rebounding with renewed force and purpose.',
        0,
        'MarkRebound',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Stabilizes and rebounds when falling 3 consecutive times'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Whisper of Resilience`,
        "The Market's sharp edges are dulled by your mastery. What once was perilous becomes manageable, reducing the sting of misfortune.",
        0,
        'RiskMitigator',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Negative Market Events are reduced'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Pulse of Commerce`,
        'Fortune flows quietly through the Market. Even when idle, the pulse of trade grants you bursts of unexpected wealth.',
        0,
        'TradeSurge',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Gain some points based on the Market from time to time'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Legacy of Trade`,
        'Your accumulated Prestige fuels the engines of commerce. Each point echoes through the Market, compounding your gains with every ascent.',
        0,
        'MarkTierBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Market gains are increased for every x Prestige Points earned'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Mark of Trial`,
        'The echoes of your completed challenges persist. Even across cycles of renewal, your mark remains, unwavering and true.',
        0,
        'KeepChal',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Challenges on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Steady Ascent`,
        'With each challenge overcome, a new step on your path unfolds. These victories feed a silent current that strengthens your Passive flow.',
        0,
        'ChalPassTier',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'For every 10 challenges completed, you get a passive bonus'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Tide of Triumph`,
        'Challenge completions ripple outward, weaving into the flow of Passive gains. Every step forward resonates with steady power.',
        0,
        'ChalPassFlow',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Passive Boost based on Challenge'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Trial's Grace`,
        'A hidden thread of resilience grants you one more chance. The path ahead may falter, but you shall endure beyond the first fall.',
        0,
        '+1ChalLife',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '+1 Life for Challenges'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Prestige Tribute`,
        'Your victories in Challenges echo beyond the present. Each completed trial strengthens your claim to Prestige, leaving a mark of triumph.',
        0,
        'ChalPrBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Prestige Point boost based on Challenge Completions'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Tangled Threads`,
        'The energy of Challenges resonates through the world. Passive flows, Market tides, and the pulse of Cards all feel its subtle influence.',
        0,
        'ChalFusion',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Small bonus to Passive, Market and Cards'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Cycle Rewoven`,
        'Your path through Challenges need not be final. The threads of fate can be unspooled and rewoven, allowing for fresh starts.',
        0,
        'ChalRespec',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'You can reset your challenge completions'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Echoes of Past Struggles`,
        'The past is not forgotten. Even before this path was taken, your previous Challenges leave their mark, bestowing retroactive rewards.',
        0,
        'ChalRetro',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Retroactive bonus to all Challenges'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Ascendant Momentum`,
        'Each consecutive triumph feeds the next. As the chain grows longer, your power swells, amplifying your journey.',
        0,
        'ChalChain',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Each consecutive challenge grants a stacking point bonus'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Sinbound Legacy`,
        'The shadows of the Cardinal Sins linger, binding themselves to your journey. Even across resets, their imprint remains, daring you to push further.',
        0,
        'KeepCS',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Cardinal Sins'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Echo of Defiance`,
        'A hidden spark ignites, granting you one more life in the depths of the Cardinal Sins. Even as you fall, the flame of resistance flickers on.',
        0,
        '+1CSLife',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '+1 Life in Cardinal Sins'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Shard Infusion`,
        'The Lexiconium Shards pulse with greater vigor, their essence resonating more powerfully with each challenge overcome.',
        0,
        'CSLexiBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexiconium Shards boost'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Web of Sins`,
        'Your mastery of the Cardinal Sins weaves a web of power. The further you venture, the more Lexiconium Shards echo back, amplifying your claim.',
        0,
        'CSinSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexi shards boost based on Cardinal Sins records'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Silent Concord`,
        'The Lexiconium Shards hum with silent resonance, feeding strength into your Passive flow. Their quiet influence grows with every shard gathered.',
        0,
        'CSPassSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexiconium Shards boost Passive Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Pulse of Power`,
        'The energy of Lexiconium Shards infuses your active efforts. Each word, each action surges with newfound potency, drawn from the Sins.',
        0,
        'CSActSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexiconium Shards boost Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Insightful Tithe`,
        'The lessons of sin feed wisdom into mastery. As the shards accumulate, so too does your understanding, each fragment a spark of greater skill.',
        0,
        'CSMastSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexiconium Shards boost Mastery XP'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Legacy Tribute`,
        'The Lexiconium Shards become more than tokens; they are tributes to your endurance, channeling into Prestige and fortifying your legacy.',
        0,
        'CSPrBonus',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Lexiconium Shards boost Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Enduring Blueprint`,
        'The blueprint of your systems remains etched in eternity. Even through resets, your modules persist, ready to awaken anew with each return.',
        0,
        'KeepMod',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Modules on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Glyph Weaver`,
        'The system now weaves its own threads of knowledge. The Scrabble Module expands without intervention, drawing power with every moment passed.',
        0,
        'AutoScrMod',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Autobuy Scrabble Module Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Tides of Cost`,
        'The currents of cost yield to your command. Each purchase now flows more smoothly, scaling in your favor.',
        0,
        'MuScal+',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better Cost Scaling on Multiupgrades. Cost: ([AmountBought]/2)**(Math.log10([AmountBought]/2))'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Hands of Fate`,
        'Automation whispers into the void. Multiupgrades now flow freely, weaving themselves into your systems without a single touch.',
        0,
        'AutoMulti',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Autobuy Multiupgrades'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Flare of Rebirth`,
        'In the instant of reset, a spark ignites. A burst of multiplier energy surges forth, propelling you into your next journey.',
        0,
        'PrTempB',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Temporary Multiplier when Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Point Echo`,
        'Your collected essence echoes across resets. Even as you begin anew, a fragment of your past clings to you, carrying forward a fraction of your points.',
        0,
        'PrNexus',
        'Prestige',
        ['PrTB'],
        0,
        0,
        '0.1% of Points on Prestige Reset'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Letters of Momentum`,
        'The faster your thoughts race across the page, the greater your power surges. Momentum is rewarded, translating speed into strength.',
        0,
        'LpVMulti',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Multiplier on Letter Per Second'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Convergence Pulse`,
        'All paths converge into a singular surge. Every multiplier resonates louder, their combined force magnified with each fragment of Prestige.',
        0,
        'PowSurge',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'All multipliers +x% per 1000 Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Glyph Flood`,
        'The sheer weight of your words crushes resistance. The more letters you conjure, the more your power swells.',
        0,
        'LetCountB',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Multiplier on Letter Count'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Blade of Precision`,
        'With every sharp stroke, your criticals strike deeper, slicing through resistance with amplified force.',
        0,
        'CritMultiB',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Boost Critical Multiplier'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Rhythm of Resolve`,
        'As your words flow uninterrupted, momentum builds. But break the rhythm, and the pulse dissipates into silence.',
        0,
        'WordPulse',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Multiplier on sustained words typed, resets after 10 seconds'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Echoes of Length`,
        'Your words stretch into the void, echoing louder with each extra letter. Prestige weaves longer threads of expression.',
        0,
        'WLPrSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Words count as longer based on Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Prestige Bloom`,
        'Your Prestige Points bloom like unseen flowers, unfolding quietly into points that surge across every system.',
        0,
        'PrPSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Points boost based on Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Dual Path Memory`,
        'The dual pulse of activity and stillness remains unbroken. Even through resets, both sides of your system hum quietly with power.',
        0,
        'KeepAct/Idle',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Keep Act/Idle on Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Glyph Legacy`,
        'Every word typed leaves a mark, a glyph carved into your Prestige. The echoes of your efforts cascade into lasting strength.',
        0,
        'WTPrSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Words Typed boosts Prestige Points'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Epoch Surge`,
        'Each Era fuels your journey forward. Their weight accumulates, cascading into a surge of points that ripples through the system.',
        0,
        'EraBoost',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Points boost based on Eras'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Era Crafting`,
        'You shape the future with the flames of Prestige. The next Era surges with crafted strength, forged from your accumulated power.',
        0,
        'EraForge',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Allocate Prestige Points to boost unlocked Eras'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Era Ascendancy`,
        'The strength of each Era grows sharper, its bonus resonating deeper into your systems with every moment of progress.',
        0,
        'EraBetB',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Era strength boost'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Era Harmony`,
        'All systems align under the banner of the current Era. Their rhythms merge, amplifying one another in a unified surge of growth.',
        0,
        'EraSyn',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Boost to everything based on Era'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Era Catalyst`,
        'The more Eras you cross, the greater the Prestige Points you claim. Progress accelerates, driven by the momentum of past triumphs.',
        0,
        'RapidAsc',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Prestige Points boost based on Era'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        `Temporal Surge`,
        'The path to Prestige bends and shortens. Each Era makes your climb more efficient, smoothing the journey ahead.',
        0,
        'EraRush',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Better formula for earning Prestige Points based on Eras'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Chrono Horizon`,
        'Beyond the known Eras lies a horizon of possibilities. The cost of reaching them lightens, drawing the future closer.',
        0,
        'EraFuture',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Eras are cheaper'
      )
    );

    this.createPrestigeUpgrade(
      new Upgrade(
        `Era Resonance`,
        'The fabric of the current Era vibrates with energy. Temporary pulses of power surge through your system, granting fleeting but potent bonuses.',
        0,
        'EraPulse',
        'Prestige',
        ['PrTB'],
        0,
        0,
        'Era events with temporary bonuses'
      )
    );
  }

  gameUtils = new GameUtils();

  createScoreUpgrade(upgrade: Upgrade) {
    this.scoreUpgrades.push(upgrade);
  }

  createStarterUpgrade(upgrade: Upgrade) {
    this.starterUpgrades.push(upgrade);
  }

  createExplorerUpgrade(upgrade: Upgrade) {
    this.explorerUpgrades.push(upgrade);
  }

  createMasterUpgrade(upgrade: Upgrade) {
    this.masterUpgrades.push(upgrade);
  }

  createGrandMasterUpgrade(upgrade: Upgrade) {
    this.grandMasterUpgrades.push(upgrade);
  }

  createMightyUpgrade(upgrade: Upgrade) {
    this.mightyUpgrades.push(upgrade);
  }

  createPassiveScoreUpgrade(upgrade: Upgrade) {
    this.passiveScoreUpgrades.push(upgrade);
  }

  createPassiveUpgrade(upgrade: Upgrade) {
    this.passiveUpgrades.push(upgrade);
  }

  createPrestigeUpgrade(upgrade: Upgrade) {
    this.prestigeUpgrades.push(upgrade);
  }
  getScoreUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.scoreUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getPassiveScoreUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.passiveScoreUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().passivePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints - upgrade.cost,
      }));
      this.gameService.addPassiveUpgrade(upgrade);
      this.timerService.logGameTimer(
        `Obtained Passive Upgrade: ${upgrade.name}"`
      );
    }
  }

  getStarterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.starterUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === 'LpV') {
        this.layoutService.lettersPerSecondVisible.set(true);
      }
      if (upgradeType === 'xPrec') {
        this.layoutService.comboCounterVisible.set(true);
      }
      if (upgradeType === 'xPass/t') {
        this.passiveService.passBarIdleProgress.set(1);
      }
      if (upgradeType === 'PaE') {
        if (!this.gameService.game().passiveGenerators.some((x) => x.id == 1)) {
          console.log('Bought PaE, added Generator');
          this.gameService.addGenerator(
            this.passiveService.generators.find((x) => x.id == 1)!
          );
        }
        this.gameService.buyGenerator(1);
      }
      if (upgradeType === '+1WLI') {
        this.gameService.game.update((game) => ({
          ...game,
          maxLength: ++game.maxLength,
        }));
      }
    }
  }

  getMultiUpgrade(upgradeType: eIdUpgrade) {
    const multiUpgrade = this.gameService
      .game()
      .multiUpgrades.find((x) => x.id === upgradeType);
    if (!multiUpgrade) return;
    if (this.gameService.game().points >= multiUpgrade.cost) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - multiUpgrade.cost,
      }));
      this.gameService.buyMultiUpgrade(upgradeType);
      this.gameService.setMultiUpgradeCost(
        upgradeType,
        GameUtils.IsPurchasedPrestigeUpgrade(
          this.gameService.game(),
          'PrestigeBetterScaling'
        )
          ? 2
          : 1
      );
      this.timerService.logGameTimer(`Obtained Upgrade: ${multiUpgrade.name}"`);
    }
  }

  getExplorerUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.explorerUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getMasterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.masterUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getGrandMasterUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.grandMasterUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getMightyUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.mightyUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game().upgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().points >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        points: game.points - upgrade.cost,
      }));
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }

  getPassiveUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().passivePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        passivePoints: game.passivePoints - upgrade.cost,
      }));
      this.gameService.addPassiveUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === 'HorScal+')
        this.gameService.game.update((game) => ({
          ...game,
          passiveLength: ++game.passiveLength,
        }));
    }
  }

  getPrestigeUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService
        .game()
        .passiveUpgrades.some((x) => x.id == upgradeType) &&
      this.gameService.game().prestigePoints >= upgrade.cost
    ) {
      this.gameService.game.update((game) => ({
        ...game,
        prestigePoints: game.prestigePoints - upgrade.cost,
      }));
      this.gameService.addPrestigeUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType == 'PrestigeGachaGods')
        this.gameService.game.update((game) => ({
          ...game,
          rollsAmount: game.rollsAmount + 2,
        }));
    }
  }

  getUpgradeByBranch(upgradeId: eIdUpgrade, branch: string) {
    switch (branch) {
      case 'Starter':
        return this.getStarterUpgrade(upgradeId);
      case 'Explorer':
        return this.getExplorerUpgrade(upgradeId);
      case 'Master':
        return this.getMasterUpgrade(upgradeId);
      case 'GrandMaster':
        return this.getGrandMasterUpgrade(upgradeId);
      case 'Mighty':
        return this.getMightyUpgrade(upgradeId);
      case 'Passive':
        return this.getPassiveUpgrade(upgradeId);
      default:
        throw new Error('Unknown upgrade branch: ' + branch);
    }
  }
}
