import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ViewPotButtonComponent } from './view-pot-button.component';

describe('ViewPotButtonComponent', () => {
  let component: ViewPotButtonComponent;
  let fixture: ComponentFixture<ViewPotButtonComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ViewPotButtonComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPotButtonComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateToPot', () => {
    it('should navigate to correct route when contractAddress exists', () => {
      const contractAddress = '0x1234567890123456789012345678901234567890';
      component.contractAddress = contractAddress;

      component.navigateToPot();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/pots', contractAddress]);
    });

    it('should log warning and do nothing if contractAddress is undefined', () => {
      spyOn(console, 'warn');
      component.contractAddress = undefined as any;

      component.navigateToPot();

      expect(console.warn).toHaveBeenCalledWith('No contractAddress provided to view-pot-button');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should log warning and do nothing if contractAddress is empty string', () => {
      spyOn(console, 'warn');
      component.contractAddress = '';

      component.navigateToPot();

      expect(console.warn).toHaveBeenCalledWith('No contractAddress provided to view-pot-button');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should log warning and do nothing if contractAddress is null', () => {
      spyOn(console, 'warn');
      component.contractAddress = null as any;

      component.navigateToPot();

      expect(console.warn).toHaveBeenCalledWith('No contractAddress provided to view-pot-button');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('button state', () => {
    it('should disable button when contractAddress is undefined', () => {
      component.contractAddress = undefined as any;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should disable button when contractAddress is empty', () => {
      component.contractAddress = '';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should enable button when contractAddress exists', () => {
      component.contractAddress = '0x1234567890123456789012345678901234567890';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });
  });

  describe('button click', () => {
    it('should call navigateToPot when button is clicked', () => {
      spyOn(component, 'navigateToPot');
      component.contractAddress = '0x1234567890123456789012345678901234567890';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(component.navigateToPot).toHaveBeenCalled();
    });
  });
});
