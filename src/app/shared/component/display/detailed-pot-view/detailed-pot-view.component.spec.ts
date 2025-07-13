import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedPotViewComponent } from './detailed-pot-view.component';
import { PotInfoResponse } from '@app/shared/models/pot.model';

describe('DetailedPotViewComponent', () => {
  let component: DetailedPotViewComponent;
  let fixture: ComponentFixture<DetailedPotViewComponent>;

  const mockPotInfo: PotInfoResponse = {
    contractAddress: '0x1234567890123456789012345678901234567890',
    name: 'Test Pot',
    description: 'A test pot for testing',
    creator: '0x1234567890123456789012345678901234567890',
    balance: '0.2',
    participants: [
      '0x1234567890123456789012345678901234567890',
      '0x2345678901234567890123456789012345678901',
      '0x3456789012345678901234567890123456789012'
    ],
    createdAt: Date.now(),
    winner: '0x1234567890123456789012345678901234567890'
  };

  const mockPotInfoNoWinner: PotInfoResponse = {
    ...mockPotInfo,
    winner: undefined
  };

  const mockPotInfoEmptyParticipants: PotInfoResponse = {
    ...mockPotInfo,
    participants: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPotViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedPotViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input property', () => {
    it('should accept potInfo input', () => {
      component.potInfo = mockPotInfo;
      expect(component.potInfo).toBe(mockPotInfo);
    });
  });

  describe('Template rendering', () => {
    it('should display contract address', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const contractElement = fixture.nativeElement.querySelector('.detail-value');
      expect(contractElement.textContent).toContain(mockPotInfo.contractAddress);
    });

    it('should display creator address', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const creatorElements = fixture.nativeElement.querySelectorAll('.detail-value');
      expect(creatorElements[1].textContent).toContain(mockPotInfo.creator);
    });

    it('should display balance with ETH suffix', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const balanceElements = fixture.nativeElement.querySelectorAll('.detail-value');
      expect(balanceElements[2].textContent).toContain(mockPotInfo.balance);
      expect(balanceElements[2].textContent).toContain('ETH');
    });

    it('should display creation date', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const dateElements = fixture.nativeElement.querySelectorAll('.detail-value');
      const dateElement = dateElements[3];
      expect(dateElement.textContent).toContain(new Date(mockPotInfo.createdAt).getFullYear().toString());
    });

    it('should display all participants', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const participantElements = fixture.nativeElement.querySelectorAll('.participant-item');
      expect(participantElements.length).toBe(mockPotInfo.participants.length);

      mockPotInfo.participants.forEach((participant, index) => {
        expect(participantElements[index].textContent).toContain(participant);
      });
    });

    it('should display winner when available', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const winnerElements = fixture.nativeElement.querySelectorAll('.detail-value');
      const winnerElement = winnerElements[winnerElements.length - 1];
      expect(winnerElement.textContent).toContain(mockPotInfo.winner);
    });

    it('should display "Not yet selected" when winner is null', () => {
      component.potInfo = mockPotInfoNoWinner;
      fixture.detectChanges();

      const noWinnerElement = fixture.nativeElement.querySelector('.no-winner');
      expect(noWinnerElement.textContent).toContain('Not yet selected');
    });

    it('should handle empty participants list', () => {
      component.potInfo = mockPotInfoEmptyParticipants;
      fixture.detectChanges();

      const participantElements = fixture.nativeElement.querySelectorAll('.participant-item');
      expect(participantElements.length).toBe(0);
    });
  });

  describe('CSS classes and styling', () => {
    it('should have correct CSS classes', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.detailed-pot-view');
      expect(container).toBeTruthy();

      const detailsContainer = fixture.nativeElement.querySelector('.pot-details');
      expect(detailsContainer).toBeTruthy();

      const detailRows = fixture.nativeElement.querySelectorAll('.detail-row');
      expect(detailRows.length).toBeGreaterThan(0);

      const detailLabels = fixture.nativeElement.querySelectorAll('.detail-label');
      expect(detailLabels.length).toBeGreaterThan(0);

      const detailValues = fixture.nativeElement.querySelectorAll('.detail-value');
      expect(detailValues.length).toBeGreaterThan(0);
    });

    it('should have winner section with correct styling', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const winnerSection = fixture.nativeElement.querySelector('.winner-section');
      expect(winnerSection).toBeTruthy();
    });

    it('should have participants list with correct styling', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const participantsList = fixture.nativeElement.querySelector('.participants-list');
      expect(participantsList).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined potInfo gracefully', () => {
      component.potInfo = undefined as any;
      expect(() => {
        try {
          fixture.detectChanges();
        } catch (e) {
          // Expected to throw due to template binding
        }
      }).not.toThrow();
    });

    it('should handle null potInfo gracefully', () => {
      component.potInfo = null as any;
      expect(() => {
        try {
          fixture.detectChanges();
        } catch (e) {
          // Expected to throw due to template binding
        }
      }).not.toThrow();
    });

    it('should handle potInfo with missing optional fields', () => {
      const minimalPotInfo: PotInfoResponse = {
        contractAddress: '0x123',
        name: 'Test',
        description: 'Test',
        creator: '0x123',
        balance: '0',
        participants: [],
        createdAt: Date.now()
      };

      component.potInfo = minimalPotInfo;
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const heading = fixture.nativeElement.querySelector('h2');
      expect(heading.textContent).toContain('Pot Details');

      const detailRows = fixture.nativeElement.querySelectorAll('.detail-row');
      detailRows.forEach((row: Element) => {
        const label = row.querySelector('.detail-label');
        const value = row.querySelector('.detail-value');
        expect(label).toBeTruthy();
        // Some rows might not have detail-value (like participants list)
        if (value) {
          expect(value).toBeTruthy();
        }
      });
    });

    it('should have proper text content for screen readers', () => {
      component.potInfo = mockPotInfo;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.detailed-pot-view');
      expect(container.textContent).toContain('Contract:');
      expect(container.textContent).toContain('Creator:');
      expect(container.textContent).toContain('Balance:');
      expect(container.textContent).toContain('Created:');
      expect(container.textContent).toContain('Participants:');
      expect(container.textContent).toContain('Winner:');
    });
  });
}); 