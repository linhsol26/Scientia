import { TestBed } from '@angular/core/testing';

import { RoundRobinService } from './round-robin.service';

describe('RoundRobinService', () => {
  let service: RoundRobinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundRobinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
