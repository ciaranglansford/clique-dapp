import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserPotService } from '@app/core/services/user-pot.service';

import { JoinedPotPreviewComponent } from './joined-pot-preview.component';

describe('PotPreviewComponent', () => {
  let component: JoinedPotPreviewComponent;
  let fixture: ComponentFixture<JoinedPotPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinedPotPreviewComponent, HttpClientTestingModule],
      providers: [
        { provide: UserPotService, useValue: jasmine.createSpyObj('UserPotService', ['getUserPots']) }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinedPotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
