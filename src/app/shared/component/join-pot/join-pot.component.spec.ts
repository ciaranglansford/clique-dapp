import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPotComponent } from './join-pot.component';

describe('JoinPotComponent', () => {
  let component: JoinPotComponent;
  let fixture: ComponentFixture<JoinPotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
