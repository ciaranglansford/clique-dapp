import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JoinPotBtnComponent } from './join-pot-btn.component';
import { PotService } from '@app/core/services/pot.service';
import { UserPotService } from '@app/core/services/user-pot.service';
import { Web3Service } from '@app/core/web3.service';

class MockPotService {}

describe('JoinPotBtnComponent', () => {
  let component: JoinPotBtnComponent;
  let fixture: ComponentFixture<JoinPotBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPotBtnComponent, HttpClientTestingModule],
      providers: [
        { provide: PotService, useClass: MockPotService },
        { provide: UserPotService, useValue: jasmine.createSpyObj('UserPotService', ['joinPot']) },
        { provide: Web3Service, useValue: jasmine.createSpyObj('Web3Service', ['connectWallet', 'getContractAt']) }
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
