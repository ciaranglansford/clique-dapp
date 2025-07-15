import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile.component';
import { Web3Service } from '@app/core/web3.service';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let web3Service: jasmine.SpyObj<Web3Service>;
  let userAddressSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    userAddressSubject = new BehaviorSubject<string | null>(null);
    const web3Spy = {
      userAddress$: userAddressSubject.asObservable(),
      checkExistingConnection: () => Promise.resolve(null)
    };

    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, HttpClientModule],
      providers: [
        { provide: Web3Service, useValue: web3Spy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    web3Service = TestBed.inject(Web3Service) as jasmine.SpyObj<Web3Service>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update userAddress when userAddress$ emits', () => {
    userAddressSubject.next('0xabc');
    fixture.detectChanges();
    expect(component.userAddress).toBe('0xabc');
  });

  it('should display error message', () => {
    component.message = 'Test error';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error-message')?.textContent).toContain('Test error');
  });
});
