import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePotRequest, JoinPotRequest, JoinPotResponse, Pot, UserPot } from '@app/shared/models/pot.model';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  private baseUrl = '/api/pots'; // Will resolve to localhost:8080 via proxy

  constructor(private http: HttpClient) {}

  createPot(request: CreatePotRequest): Observable<Pot> {
    return this.http.post<Pot>(`${this.baseUrl}/create`, request);
  }

  joinPot(request: JoinPotRequest): Observable<JoinPotResponse> {
    return this.http.post<JoinPotResponse>(`${this.baseUrl}/join`, request);
  }
}