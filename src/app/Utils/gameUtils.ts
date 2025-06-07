import { Card } from "../Classes/card";
import { PackTier } from "../Classes/pack";
import { eIdUpgrade } from "../Classes/upgrade";
import { ChallengeType } from "../Classes/challenge";
import { Game } from "../Classes/game";

export class GameUtils {

  static IsPurchasedUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.upgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static IsPurchasedPassiveUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.passiveUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static IsPurchasedPrestigeUpgrade(game: Game, upgradeNumber: eIdUpgrade): boolean {
    return game.prestigeUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  static HasCard(game: Game, cardNumber: number): boolean {
    return game.cards.some((x) => x.id == cardNumber);
  }

  static IsInChallenge(game: Game, challengeType: ChallengeType): boolean {
    const challenge = game.challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return false;
    return challenge.onChallenge;
  }

  static IsUnlockedAchievement(game: Game, achievementName: string): boolean {
    return game.achievements.some(
      (x) => x.name == achievementName
    );
  }

  static getCardType(card: Card): string {
    switch (card.type) {
      case "Broken":
        return 'brokenCard';
      case "Common":
        return 'commonCard';
      case "Uncommon":
        return 'uncommonCard';
      case "Rare":
        return 'rareCard';
      case "Epic":
        return 'epicCard';
      case "Legendary":
        return 'legendaryCard';
      case "Mythical":
        return 'mythicalCard';
      case "Celestial":
        return 'celestialCard';
      case "Divine":
        return 'divineCard';
      case "Ultimate":
        return 'ultimateCard';
      case "Infinite":
        return 'infiniteCard';
      case "Omnipotent":
        return 'omnipotentCard';
    }
  }

  static getCardBonus(game: Game): number {
    if (this.IsPurchasedUpgrade(game, "caQual")) {
      const cardValueMap = {
        ["Broken"]: 0.5,
        ["Common"]: 1,
        ["Uncommon"]: 2,
        ["Rare"]: 4,
        ["Epic"]: 8,
        ["Legendary"]: 16,
        ["Mythical"]: 32,
        ["Celestial"]: 64,
        ["Divine"]: 128,
        ["Ultimate"]: 256,
        ["Infinite"]: 512,
        ["Omnipotent"]: 1024

      };
      return game.cards.map((x) => cardValueMap[x.type]).reduce((a, b) => a + b, 1);
    } else {
      return game.cardsAmount;
    }
  }

  static getProperty<T>(
    obj: Record<string, unknown>,
    propertyName: string,
    defaultValue: T
  ): T {
    if (propertyName in obj) {
      return obj[propertyName] as T;
    } else {
      return defaultValue;
    }
  }

  static deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  static getPercentagesValues(packTier: PackTier): number[] {
    const cardPackDecayMap: Record<PackTier, number> = {
      ["Starter"]: 1.1,
      ["Explorer"]: 0.7,
      ["Master"]: 0.5,
      ["Grandmaster"]: 0.4,
      ["Mighty"]: 0.2,
      ["Ethereal"]: 0.1,
    };
    
    let percentagesArr: number[] = [];

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = 100 / Math.exp(cardPackDecayMap[packTier] * index);
    }

    const sumPercentages = percentagesArr.reduce((a, b) => a + b, 0);

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = percentagesArr[index - 1] / sumPercentages * 100;
    }

    return percentagesArr;

  }

  static getJapaneseMap(): Record<string, string> {
    return {
      a: 'あ',
      ka: 'か',
      ga: 'が',
      sa: 'さ',
      za: 'ざ',
      ta: 'た',
      da: 'だ',
      na: 'な',
      ha: 'は',
      ba: 'ば',
      pa: 'ぱ',
      ma: 'ま',
      ya: 'や',
      ra: 'ら',
      wa: 'わ',
      i: 'い',
      ki: 'き',
      gi: 'ぎ',
      shi: 'し',
      ji: 'じ',
      chi: 'ち',
      ni: 'に',
      hi: 'ひ',
      bi: 'び',
      pi: 'ぴ',
      mi: 'み',
      ri: 'り',
      u: 'う',
      ku: 'く',
      gu: 'ぐ',
      su: 'す',
      zu: 'ず',
      tsu: 'つ',
      nu: 'ぬ',
      fu: 'ふ',
      bu: 'ぶ',
      pu: 'ぷ',
      mu: 'む',
      ru: 'る',
      yu: 'ゆ',
      e: 'え',
      ke: 'け',
      ge: 'げ',
      se: 'せ',
      ze: 'ぜ',
      te: 'て',
      de: 'で',
      ne: 'ね',
      he: 'へ',
      be: 'べ',
      pe: 'ぺ',
      me: 'め',
      re: 'れ',
      o: 'お',
      ko: 'こ',
      go: 'ご',
      so: 'そ',
      zo: 'ぞ',
      to: 'と',
      do: 'ど',
      no: 'の',
      ho: 'ほ',
      bo: 'ぼ',
      po: 'ぽ',
      mo: 'も',
      yo: 'よ',
      ro: 'ろ',
      wo: 'を',
      nn: 'ん',
      kya: 'きゃ',
      kyu: 'きゅ',
      kyo: 'きょ',
      sha: 'しゃ',
      shu: 'しゅ',
      sho: 'しょ',
      cha: 'ちゃ',
      chu: 'ちゅ',
      cho: 'ちょ',
      nya: 'にゃ',
      nyu: 'にゅ',
      nyo: 'にょ',
      hya: 'ひゃ',
      hyu: 'ひゅ',
      hyo: 'ひょ',
      mya: 'みゃ',
      myu: 'みゅ',
      myo: 'みょ',
      rya: 'りゃ',
      ryu: 'りゅ',
      ryo: 'りょ',
      gya: 'ぎゃ',
      gyu: 'ぎゅ',
      gyo: 'ぎょ',
      ja: 'じゃ',
      ju: 'じゅ',
      jo: 'じょ',
      bya: 'びゃ',
      byu: 'びゅ',
      byo: 'びょ',
      pya: 'ぴゃ',
      pyu: 'ぴゅ',
      pyo: 'ぴょ',
      di: 'ぢ',
      du: 'づ',
      kk: 'っ',
      ss: 'っ',
      tt: 'っ',
      hh: 'っ',
      mm: 'っ',
      yy: 'っ',
      rr: 'っ',
      ww: 'っ',
      gg: 'っ',
      zz: 'っ',
      dd: 'っ',
      bb: 'っ',
      pp: 'っ',
    };
  }
  static getRussianCyrillicMap(): Record<string, string> {
    return {
      a: 'а',
      b: 'б',
      v: 'в',
      g: 'г',
      d: 'д',
      e: 'е',
      'е=': 'ё',
      зh: 'ж',
      z: 'з',
      i: 'и',
      j: 'й',
      k: 'к',
      l: 'л',
      m: 'м',
      n: 'н',
      o: 'о',
      p: 'п',
      r: 'р',
      s: 'с',
      t: 'т',
      u: 'у',
      f: 'ф',
      h: 'х',
      c: 'ц',
      цh: 'ч',
      сh: 'ш',
      w: 'щ',
      '"':'ъ',
      y: 'ы',
      "'": 'ь',
      'ё=': 'э',
      йu: 'ю',
      йa: 'я',
    }
  }
  static getAmharicMap(): Record<string, string> {
    return {
      ህe: 'ሀ',
      ልe:'ለ',
      ሕe:'ሐ',
      ምe:'መ',
      ሥe:'ሠ',
      ርe: 'ረ',
      ስe:'ሰ',
      ሽe:'ሸ',
      ቅe:'ቀ',
      ብe:'በ',
      ቭe: 'ቨ',
      ትe: 'ተ',
      ችe: 'ቸ',
      ኅe: 'ኀ',
      ንe: 'ነ',
      ኝe: 'ኘ',
      እe: 'አ',
    ህu: 'ሁ',
    ልu: 'ሉ',
    ሕu: 'ሑ',
    ምu: 'ሙ',
    ሥu: 'ሡ',
    ርu: 'ሩ',
    ስu: 'ሱ',
    ሽu: 'ሹ',
    ቅu: 'ቁ',
    ብu: 'ቡ',
    ቭu: 'ቩ',
    ትu: 'ቱ',
    ችu: 'ቹ',
    ኅu: 'ኁ',
    ንu: 'ኑ',
    ኝu: 'ኙ',
    እu: 'ኡ',
    ህi: 'ሂ',
    ልi: 'ሊ',
    ሕi: 'ሒ',
    ምi: 'ሚ',
    ሥi: 'ሢ',
    ርi: 'ሪ',
    ስi: 'ሲ',
    ሽi: 'ሺ',
    ቅi: 'ቂ',
    ብi: 'ቢ',
    ቭi: 'ቪ',
    ትi: 'ቲ',
    ችi: 'ቺ',
    ኅi: 'ኂ',
    ንi: 'ኒ',
    ኝi: 'ኚ',
    እi: 'ኢ',
    ህa: 'ሃ',
    ልa: 'ላ',
    ሕa: 'ሓ',
    ምa: 'ማ',
    ሥa: 'ሣ',
    ርa: 'ራ',
    ስa: 'ሳ',
    ሽa: 'ሻ',
    ቅa: 'ቃ',
    ብa: 'ባ',
    ቭa: 'ቫ',
    ትa: 'ታ',
    ችa: 'ቻ',
    ኅa: 'ኃ',
    ንa: 'ና',
    ኝa: 'ኛ',
    እa: 'ኣ',
    ሀe: 'ሄ',
    ለe: 'ሌ',
    ሐe: 'ሔ',
    መe: 'ሜ',
    ሠe: 'ሤ',
    ረe: 'ሬ',
    ሰe: 'ሴ',
    ሸe: 'ሼ',
    ቀe: 'ቄ',
    በe: 'ቤ',
    ቨe: 'ቬ',
    ተe: 'ቴ',
    ቸe: 'ቼ',
    ኀe: 'ኄ',
    ነe: 'ኔ',
    ኘe: 'ኜ',
    አe: 'ኤ',
    h: 'ህ',
    l: 'ል',
    H: 'ሕ',
    m: 'ም',
    ስz: 'ሥ',
    r: 'ር',
    s: 'ስ',
    ስh: 'ሽ',
    q: 'ቅ',
    b: 'ብ',
    v: 'ቭ',
    t: 'ት',
    c: 'ች',
    X: 'ኅ',
    n: 'ን',
    ንy: 'ኝ',
    '>': 'እ',
    ህo: 'ሆ',
    ልo: 'ሎ',
    ሕo: 'ሖ',
    ምo: 'ሞ',
    ሥo: 'ሦ',
    ርo: 'ሮ',
    ስo: 'ሶ',
    ሽo: 'ሾ',
    ቅo: 'ቆ',
    ብo: 'ቦ',
    ቭo: 'ቮ',
    ትo: 'ቶ',
    ችo: 'ቾ',
    ኅo: 'ኆ',
    ንo: 'ኖ',
    ኝo: 'ኞ',
    እo: 'ኦ',
    ላa: 'ሏ',
    ሓa: 'ሗ',
    ማa: 'ሟ',
    ሣa: 'ሧ',
    ራa: 'ሯ',
    ሳa: 'ሷ',
    ሻa: 'ሿ',
    ቃa: 'ቇ',
    ባa: 'ቧ',
    ቫa: 'ቯ',
    ታa: 'ቷ',
    ቻa: 'ቿ',
    ኃa: 'ኇ',
    ናa: 'ኗ',
    ኛa: 'ኟ',
    ኣa: 'ኧ',
    ክe: 'ከ',
    ኽe: 'ኸ',
    ውe: 'ወ',
    ዕe: 'ዐ',
    ዝe: 'ዘ',
    ዥe: 'ዠ',
    ይe: 'የ',
    ድe: 'ደ',
    ጅe: 'ጀ',
    ግe: 'ገ',
    ጥe: 'ጠ',
    ጭe: 'ጨ',
    ጵe: 'ጰ',
    ጽe: 'ጸ',
    ፅe: 'ፀ',
    ፍe: 'ፈ',
    ፕe: 'ፐ',
    ክu: 'ኩ',
    ኽu: 'ኹ',
    ውu: 'ዉ',
    ዕu: 'ዑ',
    ዝu: 'ዙ',
    ዥu: 'ዡ',
    ይu: 'ዩ',
    ድu: 'ዱ',
    ጅu: 'ጁ',
    ግu: 'ጉ',
    ጥu: 'ጡ',
    ጭu: 'ጩ',
    ጵu: 'ጱ',
    ጽu: 'ጹ',
    ፅu: 'ፁ',
    ፍu: 'ፉ',
    ፕu: 'ፑ',
    ክi: 'ኪ',
    ኽi: 'ኺ',
    ውi: 'ዊ',
    ዕi: 'ዒ',
    ዝi: 'ዚ',
    ዥi: 'ዢ',
    ይi: 'ዪ',
    ድi: 'ዲ',
    ጅi: 'ጂ',
    ግi: 'ጊ',
    ጥi: 'ጢ',
    ጭi: 'ጪ',
    ጵi: 'ጲ',
    ጽi: 'ጺ',
    ፅi: 'ፂ',
    ፍi: 'ፊ',
    ፕi: 'ፒ',
    ክa: 'ካ',
    ኽa: 'ኻ',
    ውa: 'ዋ',
    ዕa: 'ዓ',
    ዝa: 'ዛ',
    ዥa: 'ዣ',
    ይa: 'ያ',
    ድa: 'ዳ',
    ጅa: 'ጃ',
    ግa: 'ጋ',
    ጥa: 'ጣ',
    ጭa: 'ጫ',
    ጵa: 'ጳ',
    ጽa: 'ጻ',
    ፅa: 'ፃ',
    ፍa: 'ፋ',
    ፕa: 'ፓ',
    ከe: 'ኬ',
    ኸe: 'ኼ',
    ወe: 'ዌ',
    ዐe: 'ዔ',
    ዘe: 'ዜ',
    ዠe: 'ዤ',
    የe: 'ዬ',
    ደe: 'ዴ',
    ጀe: 'ጄ',
    ገe: 'ጌ',
    ጠe: 'ጤ',
    ጨe: 'ጬ',
    ጰe: 'ጴ',
    ጸe: 'ጼ',
    ፀe: 'ፄ',
    ፈe: 'ፌ',
    ፐe: 'ፔ',
    k:  'ክ',
    x:  'ኽ',
    w:  'ው',
    '<':'ዕ',
    z:  'ዝ',
    ዝh: 'ዥ',
    y:  'ይ',
    d:  'ድ',
    j:  'ጅ',
    g:  'ግ',
    ትh: 'ጥ',
    ችh: 'ጭ',
    ፕh: 'ጵ',
    ትs: 'ጽ',
    ትz: 'ፅ',
    f:  'ፍ',
    p:  'ፕ',
    ክo: 'ኮ',
    ኽo: 'ኾ',
    ውo: 'ዎ',
    ዕo: 'ዖ',
    ዝo: 'ዞ',
    ዥo: 'ዦ',
    ይo: 'ዮ',
    ድo: 'ዶ',
    ጅo: 'ጆ',
    ግo: 'ጎ',
    ጥo: 'ጦ',
    ጭo: 'ጮ',
    ጵo: 'ጶ',
    ጽo: 'ጾ',
    ፅo: 'ፆ',
    ፍo: 'ፎ',
    ፕo: 'ፖ',
    ኮe: 'ኯ',
    ዛa: 'ዟ',
    ዣa: 'ዧ',
    ዳa: 'ዷ',
    ጃa: 'ጇ',
    ጋa: 'ጏ',
    ጣa: 'ጧ',
    ጫa: 'ጯ',
    ጳa: 'ጷ',
    ጻa: 'ጿ',
    ፋa: 'ፏ',
    ፓa: 'ፗ',
    ቍe: 'ቈ',
    ኍe: 'ኈ',
    ኵe: 'ኰ',
    ዅe: 'ዀ',
    ጕe: 'ጐ',
    ቍi: 'ቊ',
    ኍi: 'ኊ',
    ኵi: 'ኲ',
    ዅi: 'ዂ',
    ጕi: 'ጒ',
    ቍa: 'ቋ',
    ኍa: 'ኋ',
    ኵa: 'ኳ',
    ዅa: 'ዃ',
    ጕa: 'ጓ',
    ቈe: 'ቌ',
    ኈe: 'ኌ',
    ኰe: 'ኴ',
    ዀe: 'ዄ',
    ጐe: 'ጔ',
    ቅw: 'ቍ',
    ኅw: 'ኍ',
    ክw: 'ኵ',
    ኽw: 'ዅ',
    ግw: 'ጕ',
  }

  }

  static random(min: number, max: number): number {
    let random = min + Math.random() * (max - min);
    return random;
  }
}
