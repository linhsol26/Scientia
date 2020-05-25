import { TestBed } from '@angular/core/testing';

import { CrudCoursesService } from './crud-courses.service';

describe('CrudCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudCoursesService = TestBed.get(CrudCoursesService);
    expect(service).toBeTruthy();
  });
});
