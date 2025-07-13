import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PotInfoComponent } from './pot-info.component';
import { PotService } from '@app/core/services/pot.service';
import { PotInfoResponse } from '@app/shared/models/pot.model';
import { DetailedPotViewComponent } from '@app/shared/component/display/detailed-pot-view/detailed-pot-view.component';

describe('PotInfoComponent', () => {
  let component: PotInfoComponent;
  let fixture: ComponentFixture<PotInfoComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockPotService: jasmine.SpyObj<PotService>;
  let paramMapSpy: jasmine.SpyObj<any>;

  const mockPotInfo: PotInfoResponse = {
    contractAddress: '0x1234567890123456789012345678901234567890',
    name: 'Test Pot',
    description: 'A test pot for testing',
    creator: '0x1234567890123456789012345678901234567890',
    balance: '0.2',
    participants: [
      '0x1234567890123456789012345678901234567890',
      '0x2345678901234567890123456789012345678901'
    ],
    createdAt: Date.now(),
    winner: '0x1234567890123456789012345678901234567890'
  };

  beforeEach(async () => {
    paramMapSpy = jasmine.createSpyObj('ParamMap', ['get']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: paramMapSpy
      }
    });

    const potServiceSpy = jasmine.createSpyObj('PotService', ['getPotInfo']);

    await TestBed.configureTestingModule({
      imports: [PotInfoComponent, DetailedPotViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: PotService, useValue: potServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PotInfoComponent);
    component = fixture.componentInstance;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    mockPotService = TestBed.inject(PotService) as jasmine.SpyObj<PotService>;
    
    // Setup the paramMap spy
    paramMapSpy.get.and.returnValue('0x123');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should extract contractAddress from route and fetch pot info', () => {
      const contractAddress = '0x1234567890123456789012345678901234567890';
      paramMapSpy.get.and.returnValue(contractAddress);
      mockPotService.getPotInfo.and.returnValue(of(mockPotInfo));

      component.ngOnInit();

      expect(component.contractAddress).toBe(contractAddress);
      expect(mockPotService.getPotInfo).toHaveBeenCalledWith(contractAddress);
    });

    it('should set hasError to true if no contractAddress in route', () => {
      paramMapSpy.get.and.returnValue(null);

      component.ngOnInit();

      expect(component.hasError).toBe(true);
      expect(mockPotService.getPotInfo).not.toHaveBeenCalled();
    });

    it('should set hasError to true if contractAddress is empty string', () => {
      paramMapSpy.get.and.returnValue('');

      component.ngOnInit();

      expect(component.hasError).toBe(true);
      expect(mockPotService.getPotInfo).not.toHaveBeenCalled();
    });
  });

  describe('fetchPotInfo', () => {
    beforeEach(() => {
      component.contractAddress = '0x1234567890123456789012345678901234567890';
    });

    it('should fetch pot info successfully', () => {
      mockPotService.getPotInfo.and.returnValue(of(mockPotInfo));

      component.fetchPotInfo();

      expect(component.hasError).toBe(false);
      expect(mockPotService.getPotInfo).toHaveBeenCalledWith(component.contractAddress);
    });

    it('should handle API error gracefully', () => {
      const error = new Error('API Error');
      mockPotService.getPotInfo.and.returnValue(throwError(() => error));
      spyOn(console, 'error');

      component.fetchPotInfo();

      expect(component.hasError).toBe(true);
      expect(console.error).toHaveBeenCalledWith('Failed to fetch pot info', error);
    });

  });

  describe('observable behavior', () => {
    it('should use shareReplay to cache results', () => {
      paramMapSpy.get.and.returnValue('0x123');
      mockPotService.getPotInfo.and.returnValue(of(mockPotInfo));

      component.ngOnInit();

      // Subscribe multiple times to test caching
      const subscription1 = component.potInfo$.subscribe();
      const subscription2 = component.potInfo$.subscribe();

      expect(mockPotService.getPotInfo).toHaveBeenCalledTimes(1);

      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });

    it('should return null on error', () => {
      const error = new Error('API Error');
      paramMapSpy.get.and.returnValue('0x123');
      mockPotService.getPotInfo.and.returnValue(throwError(() => error));

      component.ngOnInit();

      component.potInfo$.subscribe(result => {
        expect(result).toBeNull();
      });
    });
  });
});
