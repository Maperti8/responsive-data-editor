import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  // populate tickers array
  getTickers(): Observable<any> {
    return this.http.get(this.apiUrl + '/tickers')
  }
  // populate table based on pagination
  getDataSegment(start: number, limit: number): Observable<any> {
    console.log('Service method invoked with pagination');
    const params = { start: start.toString(), limit: limit.toString() };
    return this.http.get(this.apiUrl + '/data', { params });
  }
}
