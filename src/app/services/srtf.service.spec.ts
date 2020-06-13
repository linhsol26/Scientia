import { TestBed } from '@angular/core/testing';

import { SrtfService } from './srtf.service';

describe('SrtfService', () => {
  let service: SrtfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrtfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
