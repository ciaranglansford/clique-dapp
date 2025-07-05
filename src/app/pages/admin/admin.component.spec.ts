import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable payout button if not connected', () => {
    component.userAddress = '';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.trigger-btn');
    expect(btn.disabled).toBeTrue();
  });

  it('should enable payout button if connected', () => {
    component.userAddress = '0x123';
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.trigger-btn');
    expect(btn.disabled).toBeFalse();
  });

  it('should display payout info and clear it', () => {
    component.payoutInfo = { round: 1n, winner: '0xabc', amount: '1.23' };
    fixture.detectChanges();
    const payoutDiv = fixture.nativeElement.querySelector('.payout-result');
    expect(payoutDiv.textContent).toContain('0xabc');
    const clearBtn = payoutDiv.querySelector('.clear-btn');
    clearBtn.click();
    fixture.detectChanges();
    expect(component.payoutInfo).toBeNull();
  });

  it('should display message if set', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const msg = fixture.nativeElement.querySelector('.message');
    expect(msg.textContent).toContain('Test message');
  });
});
