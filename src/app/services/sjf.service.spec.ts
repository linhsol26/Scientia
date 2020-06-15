import { TestBed } from '@angular/core/testing';

import { SjfService } from './sjf.service';

describe('SjfService', () => {
  let service: SjfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SjfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
