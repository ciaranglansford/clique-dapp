import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletConnectComponent } from './wallet-connect.component';
import { Web3Service } from '@app/core/web3.service';
import { BehaviorSubject } from 'rxjs';

describe('WalletConnectComponent', () => {
  let component: WalletConnectComponent;
  let fixture: ComponentFixture<WalletConnectComponent>;
  let web3Service: jasmine.SpyObj<Web3Service>;
  let userAddressSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    userAddressSubject = new BehaviorSubject<string | null>(null);
    const web3Spy = jasmine.createSpyObj('Web3Service', ['connectWallet'], {
      userAddress$: userAddressSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [WalletConnectComponent],
      providers: [
        { provide: Web3Service, useValue: web3Spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletConnectComponent);
    component = fixture.componentInstance;
    web3Service = TestBed.inject(Web3Service) as jasmine.SpyObj<Web3Service>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show connect wallet button if not connected', () => {
    userAddressSubject.next('');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.wallet-btn');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Connect Wallet');
  });

  it('should show wallet address if connected', () => {
    userAddressSubject.next('0x123');
    fixture.detectChanges();
    const addr = fixture.nativeElement.querySelector('p');
    expect(addr.textContent).toContain('0x123');
  });

  it('should show error message if error is set', () => {
    component.error = 'Test error';
    fixture.detectChanges();
    const err = fixture.nativeElement.querySelector('.error-text');
    expect(err.textContent).toContain('Test error');
  });

  it('should show loading state on button', () => {
    component.loading = true;
    userAddressSubject.next('');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.wallet-btn');
    expect(btn.textContent).toContain('Connecting...');
    expect(btn.disabled).toBeTrue();
  });

  it('should update userAddress when userAddress$ emits', () => {
    userAddressSubject.next('0xabc');
    fixture.detectChanges();
    expect(component.userAddress).toBe('0xabc');
  });
});
