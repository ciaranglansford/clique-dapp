import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Web3Service } from '../../core/web3.service';
import { PotService } from '../../core/services/pot.service';

import { of, throwError } from 'rxjs';

class MockWeb3Service {
  connectWallet = jasmine.createSpy().and.returnValue(Promise.resolve('0x123'));
}

class MockPotService {} 

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let web3: MockWeb3Service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientModule],
      providers: [
        { provide: Web3Service, useClass: MockWeb3Service },
        { provide: ActivatedRoute, useValue: {} },
        { provide: PotService, useClass: MockPotService } 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    web3 = TestBed.inject(Web3Service) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should connect wallet and update state', async () => {
    await component.connectWallet();
    expect(component.walletConnected).toBeTrue();
    expect(component.userAddress).toBe('0x123');
  });

  it('should show connect button when not connected', () => {
    component.walletConnected = false;
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.wallet-btn');
    expect(btn).toBeTruthy();
  });

  it('should show join/admin buttons when connected', () => {
    component.walletConnected = true;
    fixture.detectChanges();
    const joinBtn = fixture.nativeElement.querySelector('.join-btn');
    const adminBtn = fixture.nativeElement.querySelector('.admin-btn');
    expect(joinBtn).toBeTruthy();
    expect(adminBtn).toBeTruthy();
  });

  it('should alert on connection error', async () => {
    spyOn(window, 'alert');
    web3.connectWallet.and.returnValue(Promise.reject(new Error('fail')));
    await component.connectWallet();
    expect(window.alert).toHaveBeenCalledWith('fail');
  });
});
