import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotInfoComponent } from './pot-info.component';

describe('PotInfoComponent', () => {
  let component: PotInfoComponent;
  let fixture: ComponentFixture<PotInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
