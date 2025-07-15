import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JoinPotBtnComponent } from './join-pot-btn.component';
import { PotService } from '@app/core/services/pot.service';
import { UserPotService } from '@app/core/services/user-pot.service';
import { Web3Service } from '@app/core/web3.service';
import { BehaviorSubject } from 'rxjs';

class MockPotService {}

describe('JoinPotBtnComponent', () => {
  let component: JoinPotBtnComponent;
  let fixture: ComponentFixture<JoinPotBtnComponent>;
  let userAddressSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    userAddressSubject = new BehaviorSubject<string | null>(null);
    await TestBed.configureTestingModule({
      imports: [JoinPotBtnComponent, HttpClientTestingModule],
      providers: [
        { provide: PotService, useClass: MockPotService },
        { provide: UserPotService, useValue: jasmine.createSpyObj('UserPotService', ['joinPot']) },
        { provide: Web3Service, useValue: {
            connectWallet: jasmine.createSpy(),
            getContractAt: jasmine.createSpy(),
            checkExistingConnection: () => Promise.resolve(null),
            userAddress$: userAddressSubject.asObservable()
          }
        }
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
