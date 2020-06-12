import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRobinAlgorithmComponent } from './round-robin-algorithm.component';

describe('RoundRobinAlgorithmComponent', () => {
  let component: RoundRobinAlgorithmComponent;
  let fixture: ComponentFixture<RoundRobinAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundRobinAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundRobinAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
