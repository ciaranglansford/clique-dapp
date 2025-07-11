import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPotsListComponent } from './community-pots-list.component';

describe('CommunityPotsListComponent', () => {
  let component: CommunityPotsListComponent;
  let fixture: ComponentFixture<CommunityPotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityPotsListComponent]
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
