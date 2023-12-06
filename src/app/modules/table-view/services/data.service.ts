import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTickers(): Observable<any> {
    return this.http.get(this.apiUrl + '/tickers');
  }

  getDataSegment(start: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString());

    return this.http.get(this.apiUrl + '/data', { params });
  }

  getDataByTickers(selectedSymbols: string[]): Observable<any> {
    console.log('Service method invoked with selected symbols', selectedSymbols);
    
    const params = new HttpParams()
      .set('symbols', selectedSymbols.join(','));

    return this.http.get(this.apiUrl + '/data/tickers/filtered', { params });
  }

  updateStock(stock: Stock): Observable<any> {
    console.log(stock)
    return this.http.put(`${this.apiUrl}/data/update/stocks`, stock);
  }
}