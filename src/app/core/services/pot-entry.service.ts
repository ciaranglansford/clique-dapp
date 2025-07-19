import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PotEntry } from '@app/shared/models/pot-entry.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotEntryService{

    private baseUrl = '/api/user-pots';

    constructor(private http: HttpClient) {}

  getUsersByContract(contractAddress: string): Observable<PotEntry[]> {
    return this.http.get<PotEntry[]>(`${this.baseUrl}/by-contract/${contractAddress}`)
        .pipe(catchError(this.handleError));
    }

    /** Error handler */
  private handleError(error: any) {
    // Optionally log to remote server
    return throwError(() => error);
  }
}