import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CreatePotRequest, JoinPotRequest, JoinPotResponse, Pot, UserPot } from '@app/shared/models/pot.model';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private baseUrl = '/api/pots'; // Will resolve to localhost:8080 via proxy

  constructor(private http: HttpClient) {}

  /** Create a new pot */
  createPot(request: CreatePotRequest): Observable<Pot> {
    return this.http.post<Pot>(`${this.baseUrl}/create`, request)
      .pipe(catchError(this.handleError));
  }

  /** Join an existing pot */
  joinPot(request: JoinPotRequest): Observable<JoinPotResponse> {
    return this.http.post<JoinPotResponse>(`${this.baseUrl}/join`, request)
      .pipe(catchError(this.handleError));
  }

  /** Get all pots */
  getAllPots(): Observable<Pot[]> {
    return this.http.get<Pot[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  /** Get pots for a user */
  getUserPots(userId: string): Observable<UserPot[]> {
    return this.http.get<UserPot[]>(`${this.baseUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  /** Error handler */
  private handleError(error: any) {
    // Optionally log to remote server
    return throwError(() => error);
  }
}