import { TestBed } from '@angular/core/testing';

import { ChallengesService } from './challenge.service';

describe('ChallengesService', () => {
  let service: ChallengesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
