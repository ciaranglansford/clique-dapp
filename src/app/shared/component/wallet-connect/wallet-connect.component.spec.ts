import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletConnectComponent } from './wallet-connect.component';

describe('WalletConnectComponent', () => {
  let component: WalletConnectComponent;
  let fixture: ComponentFixture<WalletConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show connect wallet button if not connected', () => {
    component.userAddress = '';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.wallet-btn');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Connect Wallet');
  });

  it('should show wallet address if connected', () => {
    component.userAddress = '0x123';
    fixture.detectChanges();
    const addr = fixture.nativeElement.querySelector('.wallet-address');
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
    component.userAddress = '';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.wallet-btn');
    expect(btn.textContent).toContain('Connecting...');
    expect(btn.disabled).toBeTrue();
  });
});
