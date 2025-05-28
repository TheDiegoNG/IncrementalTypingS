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
        2_500,
        'SecondUpgradePoints',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        'Your words value a bit more more, absolutely again',
        '+10 points per word',
        10_000,
        'WordsValueBitMoreMore',
        'Score'
      )
    );
    this.createScoreUpgrade(
      new Upgrade(
        'Last Basic Upgrade! Your words value MORE, a bit more.',
        '+20 points per word',
        10_000_000,
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
        500,
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
        6_000,
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
        250_000_000,
        'saLW',
        'Starter',
        ['+1WLI'],
        450,
        100,
        '1.5^[Groups of +1 Same Letter]',
        ['diLW', 'xSlow', 'xPass/t', 'xSlow/cPrep']
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        `Lexical Diversity`,
        'Diversity shapes expression. Every unique letter adds a spark, a new angle to the word’s design — and with each difference, your potential multiplies.',
        4_500_000_000,
        'diLW',
        'Starter',
        ['+1WLI'],
        450,
        300,
        '1.1^[Different Letters]',
        ['saLW', 'xFast', 'xPass/h', 'xPrec']
      )
    );
    this.createStarterUpgrade(
      new Upgrade(
        'Momentum Drive',
        'The faster you move, the more you gain. Momentum becomes power, and hesitation is your enemy. Each word typed reignites the flame of intensity.',
        1000000,
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
        1000000,
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
    this.createPassiveUpgrade(
      new Upgrade(
        'You force the enhancer to be enhancerer',
        'x1.25 Points',
        50_000,
        'PassiveEnhancerEnhancerer',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "Here's a little bonus for you",
        '+5 points per Word',
        200_000,
        'PassiveLittleBonus',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "I don't know exactly what to upgrade, I'm sorry",
        'x1.5 Points',
        1_000_000,
        'PassiveDontKnow',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'Wow, it seems that they made a Scrabble <span class="highlight">module</span> for the enhancer too. Interesting',
        'Every letter gets a value',
        5_000_000,
        'PassiveScrabbleModule',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'Horizontal scaling ftw',
        '+1 Letter',
        100_000_000,
        'PassiveHorizontalScaling',
        'Passive'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'More <span class="highlight">modules</span>! This time you found a synergy <span class="highlight">module</span>.',
        'Every Generator Bought gives a Bonus to the other Generators!',
        500_000_000,
        'PassiveMoreModules',
        'Passive'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        'Passive Market',
        'Now Passive Points are affected by the Market',
        100_000_000_000_000_000,
        'PassiveMarket',
        'Passive'
      )
    );

    //Prestige Upgrade
    this.createPrestigeUpgrade(
      new Upgrade(
        'Welcome to Prestige! Take a free x2 multiplier',
        'Yes',
        10,
        'PrestigeFreeMultiplier',
        'Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'The Gacha Gods have spoken',
        '+2 Cards Per Roll',
        50,
        'PrestigeGachaGods',
        'Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'Better Scaling for MultiUpgrades!',
        'Cost: ([AmountBought]/2)**(Math.log10([AmountBought]/2))',
        100,
        'PrestigeBetterScaling',
        'Prestige'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'It seems that the next time you Prestige you can bring the enhancer with you. But the upgrades must wear out',
        'Keep your Passive Income (Not your upgrades) when Prestige! (PP resets too)',
        500,
        'PrestigeBringEnhancer',
        'Prestige'
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

  createPassiveUpgrade(upgrade: Upgrade) {
    this.passiveUpgrades.push(upgrade);
  }

  createPrestigeUpgrade(upgrade: Upgrade) {
    this.prestigeUpgrades.push(upgrade);
  }

  getScoreUpgrades(): Upgrade[] {
    return this.scoreUpgrades;
  }

  getStarterUpgrades(): Upgrade[] {
    return this.starterUpgrades;
  }

  getExplorerUpgrades(): Upgrade[] {
    return this.explorerUpgrades;
  }

  getMasterUpgrades(): Upgrade[] {
    return this.masterUpgrades;
  }

  getGrandMasterUpgrades(): Upgrade[] {
    return this.grandMasterUpgrades;
  }

  getMightyUpgrades(): Upgrade[] {
    return this.mightyUpgrades;
  }

  getPassiveUpgrades(): Upgrade[] {
    return this.passiveUpgrades;
  }

  getPrestigeUpgrades(): Upgrade[] {
    return this.prestigeUpgrades;
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
        this.passiveService.passBarIdleProgress.set(1)
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
      if (upgradeType == 'PassiveHorizontalScaling')
        this.gameService.game.update((game) => ({
          ...game,
          passiveLength: game.passiveLength++,
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
      default:
        throw new Error('Unknown upgrade branch: ' + branch);
    }
  }
}
