import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PotService } from '@app/core/services/pot.service';
import { of } from 'rxjs';

import { CommunityPotsListComponent } from './community-pots-list.component';

describe('CommunityPotsListComponent', () => {
  let component: CommunityPotsListComponent;
  let fixture: ComponentFixture<CommunityPotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPotsListComponent, HttpClientTestingModule],
      providers: [
        { provide: PotService, useValue: { getAllPots: () => of({ potList: [] }) } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityPotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
