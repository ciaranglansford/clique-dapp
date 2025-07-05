import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPotBtnComponent } from './join-pot-btn.component';

describe('JoinPotComponent', () => {
  let component: JoinPotBtnComponent;
  let fixture: ComponentFixture<JoinPotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPotBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinPotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
