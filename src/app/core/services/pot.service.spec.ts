import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PotService } from './pot.service';
import { CreatePotRequest, Pot } from '@app/shared/models/pot.model';

describe('PotService', () => {
  let service: PotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a pot', () => {
    const reqData: CreatePotRequest = { contractAddress: '0xabc' };
    const mockResponse: Pot = { id: 1, contractAddress: '0xabc' };

    service.createPot(reqData).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/pots/create');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle errors on createPot', () => {
    const reqData: CreatePotRequest = { contractAddress: '0xabc' };

    service.createPot(reqData).subscribe({
      next: () => fail('should have errored'),
      error: (err) => {
        expect(err.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('/api/pots/create');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });


  it('should get all pots', () => {
    const mockResponse: Pot[] = [
      { id: 1, contractAddress: '0xabc' },
      { id: 2, contractAddress: '0xdef' }
    ];

    service.getAllPots().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/pots');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
