import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DataService } from '../../services/data.service';
// interfaces 
import { Stock } from '../../models/stocks.interface';
import { Ticker } from '../../models/ticker.interface'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  stocks: Stock[] = [];
  tickers: Ticker[] = [];
  selectedTickers: string[] = [];

  totalRecords: number = 0; 
  selectedPageSize = 10; 
  pageSizes = [{label: '10', value: 10}, {label: '20', value: 20}, {label: '50', value: 50}];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTickers().subscribe(data => {
      this.tickers = data;
      console.log(this.tickers)
    })
  }

  loadStocksLazy(event: LazyLoadEvent | any) { 
    const start = event.first != null ? event.first : 0;
    const rows = event.rows != null ? event.rows : this.selectedPageSize;

    this.dataService.getDataSegment(start, rows).subscribe(data => {
      this.stocks = data.stocks;
      console.log(this.stocks)
      this.totalRecords = data.totalRecords;
    });
  }

  onSearchClick() {
    if (this.selectedTickers.length > 0) {
      this.dataService.getDataByTickers(this.selectedTickers).subscribe(data => {
        this.stocks = data.stocks;
        console.log(this.stocks);
        this.totalRecords = data.totalRecords;
      });
    } else {
      // Handle the case when no tickers are selected
      console.log('No tickers selected');
    }
  }

  onPageSizeChange() {
    this.loadStocksLazy({ first: 0, rows: this.selectedPageSize });
  }
}
