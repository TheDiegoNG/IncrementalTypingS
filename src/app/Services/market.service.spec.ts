import { TestBed } from '@angular/core/testing';
import * as rxjs from 'rxjs';

import { MarketService } from './market.service';
import { GameUtils } from '../Utils/gameUtils';

describe('MarketService', () => {
  let service: MarketService;
  let randomSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    spyOn(rxjs, 'interval').and.returnValue(rxjs.EMPTY);
    randomSpy = spyOn(GameUtils, 'random').and.returnValue(0);
    service = TestBed.inject(MarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initLetterBonus initializes an array of length 8 only once', () => {
    expect(service.letterBonus().length).toBe(8);
    const initial = [...service.letterBonus()];
    service.initLetterBonus();
    expect(service.letterBonus().length).toBe(8);
    expect(service.letterBonus()).toEqual(initial);
  });

  it('changeLetterBonus modifies values according to bull-market rules and clamps values within the expected range', () => {
    const start = [-105, -60, -10, 0, 50, 101, 110, 90];
    service.letterBonus.set([...start]);
    (service as any)['bullMarket'] = true;
    randomSpy.and.callFake((min: number, max: number) => (min < 0 ? min : max));
    spyOn(Math, 'random').and.returnValue(0);

    service.changeLetterBonus();

    const expected = [-102, -57, -9, 1, 51, 101, 110, 91];
    expect(service.letterBonus()).toEqual(expected);
    service.letterBonus().forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(-105);
      expect(v).toBeLessThanOrEqual(110);
    });
  });
});
