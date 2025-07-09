import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePotBtnComponent } from './create-pot-btn.component';

describe('CreatePotBtnComponent', () => {
  let component: CreatePotBtnComponent;
  let fixture: ComponentFixture<CreatePotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePotBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
