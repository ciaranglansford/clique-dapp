import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllPotsComponent } from './display-all-pots.component';

describe('DisplayAllPotsComponent', () => {
  let component: DisplayAllPotsComponent;
  let fixture: ComponentFixture<DisplayAllPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAllPotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayAllPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
