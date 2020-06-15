import { TestBed } from '@angular/core/testing';

import { FcfsService } from './fcfs.service';

describe('FcfsService', () => {
  let service: FcfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
