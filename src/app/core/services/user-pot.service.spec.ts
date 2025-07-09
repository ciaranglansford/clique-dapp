import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserPotService } from './user-pot.service';
import { JoinPotRequest, JoinPotResponse, UserPot } from '@app/shared/models/user-pot.model';

describe('PotService', () => {
  let service: UserPotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserPotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should join a pot', () => {
    const reqData: JoinPotRequest = { contractAddress: '0x123', walletAddress: '0xabc' };
    const mockResponse: JoinPotResponse = {
      potId: 1,
      walletAddress: '0xabc',
      joinedAt: new Date()
    };

    service.joinPot(reqData).subscribe(res => {
      expect(res.potId).toBe(1);
      expect(res.walletAddress).toBe('0xabc');
      expect(res.joinedAt).toBeInstanceOf(Date);
    });

    const req = httpMock.expectOne('/api/pots/join');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });


  it('should handle errors on joinPot', () => {
    const reqData: JoinPotRequest = { contractAddress: '0x123', walletAddress: '0xabc' };

    service.joinPot(reqData).subscribe({
      next: () => fail('should have errored'),
      error: (err) => {
        expect(err.status).toBe(400);
      }
    });

    const req = httpMock.expectOne('/api/pots/join');
    req.flush('Error', { status: 400, statusText: 'Bad Request' });
  });

  it('should get user pots', () => {
    const userId = 'user1';
    const mockResponse: UserPot[] = [
      { userId, potId: 1 }
    ];

    service.getUserPots(userId).subscribe(res => {
      expect(res.potList.length).toBe(1);
      expect(res.potList[0]).toBe(userId);
    });

    const req = httpMock.expectOne(`/api/pots/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
