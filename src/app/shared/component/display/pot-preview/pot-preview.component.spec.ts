import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserPotService } from '@app/core/services/user-pot.service';

import { PotPreviewComponent } from './pot-preview.component';

describe('PotPreviewComponent', () => {
  let component: PotPreviewComponent;
  let fixture: ComponentFixture<PotPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotPreviewComponent, HttpClientTestingModule],
      providers: [
        { provide: UserPotService, useValue: jasmine.createSpyObj('UserPotService', ['getUserPots']) }
      ]
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
