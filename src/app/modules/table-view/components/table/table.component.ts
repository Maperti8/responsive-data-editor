import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stocks.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  stocks: Stock[] = [];
  totalRecords: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadStocksLazy({ first: 0, rows: 10 });
  }

  loadStocksLazy(event: any) {
    // Provide default values for 'first' and 'rows' if they are null or undefined
    const start = event.first != null ? event.first : 0;
    const rows = event.rows != null ? event.rows : 10;

    this.dataService.getDataSegment(start, rows).subscribe(data => {
      console.log(data); // Check what data you're receiving
      this.stocks = data.stocks;
      this.totalRecords = data.totalRecords;
    });
  }
}
