import { ChartUtils } from './chartUtils';

describe('ChartUtils', () => {
  let utils: ChartUtils;

  beforeEach(() => {
    utils = new ChartUtils();
    utils.srand(42);
  });

  it('rand outputs values within the requested range', () => {
    for (let i = 0; i < 10; i++) {
      const value = utils.rand(1, 5);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(5);
    }
  });

  it('numbers returns an array of the requested length', () => {
    const result = utils.numbers({ count: 7 });
    expect(result.length).toBe(7);
  });

  it('points returns an array of the requested length', () => {
    const result = utils.points({ count: 4 });
    expect(result.length).toBe(4);
  });

  it('bubbles returns an array with values in range', () => {
    const result = utils.bubbles({ count: 3, rmin: 2, rmax: 4 });
    expect(result.length).toBe(3);
    result.forEach((b) => {
      expect(b.r).toBeGreaterThanOrEqual(2);
      expect(b.r).toBeLessThanOrEqual(4);
    });
  });

  it('labels generates a predictable sequence', () => {
    const result = utils.labels({ min: 0, max: 5, count: 5, decimals: 0, prefix: '#' });
    expect(result).toEqual(['#0', '#1', '#2', '#3', '#4']);
  });

  it('months generates a predictable sequence', () => {
    const result = utils.months({ count: 3, section: 3 });
    expect(result).toEqual(['Jan', 'Feb', 'Mar']);
  });
});
