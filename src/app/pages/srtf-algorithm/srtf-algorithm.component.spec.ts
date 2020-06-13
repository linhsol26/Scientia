import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrtfAlgorithmComponent } from './srtf-algorithm.component';

describe('SrtfAlgorithmComponent', () => {
  let component: SrtfAlgorithmComponent;
  let fixture: ComponentFixture<SrtfAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrtfAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrtfAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
