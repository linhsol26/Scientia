import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SjfAlgorithmComponent } from './sjf-algorithm.component';

describe('SjfAlgorithmComponent', () => {
  let component: SjfAlgorithmComponent;
  let fixture: ComponentFixture<SjfAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SjfAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SjfAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
