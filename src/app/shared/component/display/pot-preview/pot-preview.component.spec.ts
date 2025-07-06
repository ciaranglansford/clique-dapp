import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotPreviewComponent } from './pot-preview.component';

describe('PotPreviewComponent', () => {
  let component: PotPreviewComponent;
  let fixture: ComponentFixture<PotPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
