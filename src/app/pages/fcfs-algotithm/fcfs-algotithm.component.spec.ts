import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcfsAlgotithmComponent } from './fcfs-algotithm.component';

describe('FcfsAlgotithmComponent', () => {
  let component: FcfsAlgotithmComponent;
  let fixture: ComponentFixture<FcfsAlgotithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcfsAlgotithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcfsAlgotithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
