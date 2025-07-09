import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { GetUserPotRequest, JoinPotRequest, JoinPotResponse, PotContractList } from '@app/shared/models/user-pot.model';
@Injectable({
  providedIn: 'root'
})
export class UserPotService {
  private baseUrl = '/api/user'; // Will resolve to localhost:8080 via proxy

  constructor(private http: HttpClient) {}

    /** Join an existing pot */
    joinPot(request: JoinPotRequest): Observable<JoinPotResponse> {
      return this.http.post<JoinPotResponse>(`${this.baseUrl}/join`, request)
        .pipe(catchError(this.handleError));
    }

  //getPotList

   /** Get pots for a user */
  getUserPots(walletAddress: string): Observable<PotContractList> {
  return this.http.get<PotContractList>(`${this.baseUrl}/list`, {
    params: { walletAddress }
  }).pipe(
    catchError(this.handleError)
  );
}

   /** Error handler */
    private handleError(error: any) {
      // Optionally log to remote server
      return throwError(() => error);
    }
}