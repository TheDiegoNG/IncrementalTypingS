import colorLib from '@kurkle/color';
import { DateTime } from 'luxon';

export class ChartUtils {
  constructor() {}

  // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  private _seed = Date.now();

  srand(seed: number) {
    this._seed = seed;
  }

  rand(min?: number, max?: number) {
    min = min || 0;
    max = max || 0;
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  numbers(config: ChartUtilsConfig) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var from = cfg.from || [];
    var count = cfg.count || 8;
    var decimals = cfg.decimals || 8;
    var continuity = cfg.continuity || 1;
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand() <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  }

  points(config: ChartUtilsConfig) {
    const xs = this.numbers(config);
    const ys = this.numbers(config);
    return xs.map((x, i) => ({ x, y: ys[i], r: 0 }));
  }

  bubbles(config: ChartUtilsConfig) {
    return this.points(config).map((pt) => {
      pt.r = this.rand(config.rmin, config.rmax);
      return pt;
    });
  }

  labels(config: ChartUtilsConfig) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var count = cfg.count || 8;
    var step = (max - min) / count;
    var decimals = cfg.decimals || 8;
    var dfactor = Math.pow(10, decimals) || 0;
    var prefix = cfg.prefix || '';
    var values = [];
    var i;

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor);
    }

    return values;
  }

  private readonly MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  months(config: ChartUtilsConfig) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }

  private readonly COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba',
  ];

  color(index: number) {
    return this.COLORS[index % this.COLORS.length];
  }

  transparentize(value: string | number[], opacity: number | undefined) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

  public readonly CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    lightblue: 'rgb(255, 147, 195)',
  };

  private readonly NAMED_COLORS = [
    this.CHART_COLORS.red,
    this.CHART_COLORS.orange,
    this.CHART_COLORS.yellow,
    this.CHART_COLORS.green,
    this.CHART_COLORS.blue,
    this.CHART_COLORS.purple,
    this.CHART_COLORS.grey,
    this.CHART_COLORS.lightblue,
  ];

  namedColor(index: number) {
    return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
  }

  newDate(days: number) {
    return DateTime.now().plus({ days }).toJSDate();
  }

  newDateString(days: number) {
    return DateTime.now().plus({ days }).toISO();
  }

  parseISODate(str: string) {
    return DateTime.fromISO(str);
  }
}

export interface ChartUtilsConfig {
  min?: number;
  max?: number;
  from?: number[];
  count?: number;
  decimals?: number;
  continuity?: number;
  rmin?: number;
  rmax?: number;
  prefix?: string;
  section?: number;
}
