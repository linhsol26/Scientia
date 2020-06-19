import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseParamsComponent } from './course-params.component';

describe('CourseParamsComponent', () => {
  let component: CourseParamsComponent;
  let fixture: ComponentFixture<CourseParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
