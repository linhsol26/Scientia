import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoParamsComponent } from './algo-params.component';

describe('AlgoParamsComponent', () => {
  let component: AlgoParamsComponent;
  let fixture: ComponentFixture<AlgoParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
