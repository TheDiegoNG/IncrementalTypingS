export class Upgrade {
  name: string;
  description: string;
  bonus?: string;
  cost: number;
  id: eIdUpgrade;
  parents: eIdUpgrade[] = []; // requisitos previos
  x: number = 0; // coordenadas para mostrar en el árbol
  y: number = 0;
  branch:
    | 'Starter'
    | 'Explorer'
    | 'Master'
    | 'GrandMaster'
    | 'Mighty'
    | 'Score'
    | 'PassiveScore'
    | 'Multi'
    | 'Passive'
    | 'Prestige';
  excludes?: eIdUpgrade[] = [];
  unlockType: UnlockType = 'ALL';

  constructor(
    upgradeName: string,
    upgradeDesc: string,
    upgradeCost: number,
    upgradeId: eIdUpgrade,
    branch:
      | 'Starter'
      | 'Explorer'
      | 'Master'
      | 'GrandMaster'
      | 'Mighty'
      | 'Score'
      | 'PassiveScore'
      | 'Multi'
      | 'Passive'
      | 'Prestige',
    parents: eIdUpgrade[] = [],
    x: number = 0,
    y: number = 0,
    bonus?: string,
    excludes?: eIdUpgrade[],
    unlockType: UnlockType = 'ALL'
  ) {
    this.name = upgradeName;
    this.description = upgradeDesc;
    this.cost = upgradeCost;
    this.bonus = bonus;
    this.id = upgradeId;
    this.parents = parents;
    this.x = x;
    this.y = y;
    this.branch = branch;
    this.excludes = excludes;
    this.unlockType = unlockType;
  }
}

export class MultiUpgrade extends Upgrade {
  count: number = 0;
  amountBought: number = 0;
  multiBonus: number = 0;

  constructor(
    upgradeName: string,
    upgradeDesc: string,
    upgradeCost: number,
    upgradeId: eIdUpgrade,
    branch:
      | 'Starter'
      | 'Explorer'
      | 'Master'
      | 'GrandMaster'
      | 'Mighty'
      | 'Score'
      | 'PassiveScore'
      | 'Multi'
      | 'Passive'
      | 'Prestige',
    multiBonus: number
  ) {
    super(upgradeName, upgradeDesc, upgradeCost, upgradeId, branch);
    this.multiBonus = multiBonus;
  }
}

export type eIdUpgrade =
  | 'FirstUpgradePoints'
  | 'WordsValueBitMore'
  | 'SecondUpgradePoints'
  | 'WordsValueBitMoreMore'
  | 'LastBasic'
  | 'IntermediateBasicsOne'
  | 'IntermediateBasicsTwo'
  | 'TB'
  | 'LpV'
  | 'PaE'
  | '+1WLI'
  | 'saLW'
  | 'diLW'
  | 'xFast'
  | 'xSlow'
  | 'xPass/h'
  | 'xPass/t'
  | 'xPrec'
  | 'xSlow/cPrep'
  | 'Gacha'
  | 'xcaAm'
  | '+1WLII'
  | 'Ach'
  | 'comboAch'
  | 'MileRes'
  | 'Scr'
  | 'ScrM'
  | 'ScrS'
  | 'LetPo'
  | 'xWL'
  | 'Act/IdleI'
  | 'Mast'
  | 'EnhAlpha'
  | 'EnhBeta'
  | 'EnhGamma'
  | 'EnhDelta'
  | 'EnhEpsilon'
  | 'EnhDseta'
  | 'EnhEta'
  | 'EnhZeta'
  | '+1WLIII'
  | '2ndP'
  | 'caQual'
  | 'MergM'
  | 'Mark'
  | 'Act/IdleII'
  | 'All-In'
  | 'InsideI'
  | 'Crypto'
  | 'RealEstate'
  | 'VolatileM'
  | 'BullM'
  | 'ShadF'
  | 'DiviTr'
  | 'TaxEv'
  | '+1WLIV'
  | 'Chal'
  | 'ChalInv'
  | 'ChalM'
  | 'ChalDiv'
  | 'ChalPrep'
  | 'ChalHoly'
  | 'ChalAdv'
  | 'TimeBend'
  | 'ChalNerf'
  | 'CardSins'
  | 'CSPride'
  | 'CSLust'
  | 'CSGluttony'
  | 'CSEnvy'
  | 'CSWrath'
  | 'CSSloth'
  | 'CSGreed'
  | '+1WLV'
  | 'Mod'
  | 'WLPerScr'
  | 'ScrPerAch'
  | 'AchPerMast'
  | 'MastPerWL'
  | 'WLx2'
  | 'ScrSy'
  | 'AchBase+2'
  | 'MastSy'
  | 'Mini'
  | 'PassiveEnhancerEnhancerer'
  | 'PassiveLittleBonus'
  | 'PassiveDontKnow'
  | 'ScrPB'
  | 'MastPB'
  | 'AchPB'
  | 'MarkPB'
  | 'AsciiPB'
  | 'SynM'
  | 'HorScal+'
  | 'LBarSize+'
  | 'LBarSize++'
  | 'LBarSize+++'
  | 'PrecBarCrit'
  | 'NerfNerf'
  | 'FastB+'
  | 'FastB++'
  | 'FastB+++'
  | 'Charge+'
  | 'OvDriveBar'
  | 'BarSyn'
  | 'GenScalPlus'
  | 'GenCharge'
  | 'SynGen'
  | 'SynM'
  | 'GenCharBoost'
  | 'PrestigeFreeMultiplier'
  | 'PrestigeGachaGods'
  | 'PrestigeBetterScaling'
  | 'PrestigeBringEnhancer'
  | 'MultiUpgradePoints'
  | 'MultiUpgradeWords'
  | 'MultiUpgradeCritChance'
  | 'MultiUpgradeCritMulti'
  | 'MultiUpgradePointsMult'
  | 'TreeBeginning'
  | 'PTB'
  | 'PrTB'
  | 'KeepPas'
  | 'PrGenBulk'
  | 'ActBarMulti+'
  | 'ActBarPerf'
  | 'IdleBarMulti+'
  | 'KeepGens'
  | 'GenPrSyn'
  | 'CrysCache'
  | 'OvDriveBoost'
  | 'CrysOvFlow'
  | 'GenBoost'
  | 'IdleGenAmp'
  | 'KeepGacha'
  | 'CaAm+2'
  | 'SilFort'
  | 'PrCardCleanse'
  | 'PackOvFlow'
  | 'BetterCards'
  | 'HighRoller'
  | 'MergeNerf'
  | 'KeepPacks'
  | 'PrSilFort'
  | 'KeepScr'
  | 'ScrPow'
  | 'ScrRareChain'
  | 'ScrVariety'
  | 'ScrFuel'
  | 'KeepAch'
  | 'PassAch'
  | 'QualPrAch'
  | 'AchMastXP'
  | 'MarkAnch'
  | 'KeepMark'
  | 'SurgeChain'
  | 'MarkRebound'
  | 'RiskMitigator'
  | 'TradeSurge'
  | 'MarkTierBoost'
  | 'KeepChal'
  | 'ChalPassTier'
  | 'ChalPassFlow'
  | '+1ChalLife'
  | 'ChalPrBoost'
  | 'ChalFusion'
  | 'ChalRespec'
  | 'ChalRetro'
  | 'ChalChain'
  | 'KeepCS'
  | '+1CSLife'
  | 'CSLexiBoost'
  | 'CSinSyn'
  | 'CSPassSyn'
  | 'CSActSyn'
  | 'CSMastSyn'
  | 'CSPrBonus'
  | 'KeepMod'
  | 'AutoScrMod'
  | 'MuScal+'
  | 'AutoMulti'
  | 'PrTempB'
  | 'PrNexus'
  | 'LpVMulti'
  | 'PowSurge'
  | 'LetCountB'
  | 'CritMultiB'
  | 'WordPulse'
  | 'WLPrSyn'
  | 'PrPSyn'
  | 'KeepAct/Idle'
  | 'WTPrSyn'
  | 'EraBoost'
  | 'EraForge'
  | 'EraBetB'
  | 'EraSyn'
  | 'RapidAsc'
  | 'EraRush'
  | 'EraFuture'
  | 'EraPulse';

export type UnlockType = 'ALL' | 'ANY';
