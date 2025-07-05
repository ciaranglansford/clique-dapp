import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinPotBtnComponent } from './join-pot-btn.component';
import { PotService } from '@app/core/services/pot.service';

class MockPotService {}

describe('JoinPotBtnComponent', () => {
  let component: JoinPotBtnComponent;
  let fixture: ComponentFixture<JoinPotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPotBtnComponent],
      providers: [
        { provide: PotService, useClass: MockPotService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinPotBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
