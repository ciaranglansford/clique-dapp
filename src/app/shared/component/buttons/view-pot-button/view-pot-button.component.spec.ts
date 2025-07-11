import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPotButtonComponent } from './view-pot-button.component';

describe('ViewPotButtonComponent', () => {
  let component: ViewPotButtonComponent;
  let fixture: ComponentFixture<ViewPotButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPotButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPotButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
