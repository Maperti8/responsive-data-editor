import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    console.log('Service method invoked');
    return this.http.get(this.apiUrl);
  }

  getDataSegment(start: number, limit: number): Observable<any> {
    console.log('Service method invoked with pagination');
    const params = { start: start.toString(), limit: limit.toString() };
    return this.http.get(this.apiUrl, { params });
  }
}
