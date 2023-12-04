import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Stock } from '../../models/stocks.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  stocks: Stock[] = [];
  totalRecords: number = 0; // Total number of records for pagination

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  loadStocksLazy(event: LazyLoadEvent | any) { // Using 'any' to bypass strict type checking
    const start = event.first != null ? event.first : 0;
    const rows = event.rows != null ? event.rows : 10;

    this.dataService.getDataSegment(start, rows).subscribe(data => {
      this.stocks = data.stocks;
      this.totalRecords = data.totalRecords;
    });
  }
}
