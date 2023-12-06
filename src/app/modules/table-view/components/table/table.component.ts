import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DataService } from '../../services/data.service';
// interfaces 
import { Stock } from '../../models/stock.interface';
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

  clonedStocks: { [s: string]: Stock } = {}; 

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
      this.totalRecords = data.totalRecords;
    });
  }

  onSearchClick() {
    if (this.selectedTickers.length > 0) {
      this.dataService.getDataByTickers(this.selectedTickers).subscribe(data => {
        this.stocks = data.stocks;

        this.totalRecords = data.totalRecords;
      });
    } else {
      console.log('No tickers selected');
    }
  }

  // inline editing 
  editRow(stock: Stock, rowIndex: number) {
    this.clonedStocks[stock.symbol] = { ...stock };
  }

  saveRow(stock: Stock, rowIndex: number) {
    console.log('Data saved:', stock);  
    delete this.clonedStocks[stock.symbol]; 
  }
  
  cancelRow(stock: Stock, rowIndex: number) {
    if (this.clonedStocks.hasOwnProperty(stock.symbol)) {
      this.stocks[rowIndex] = this.clonedStocks[stock.symbol]; // Revert to the original data
      delete this.clonedStocks[stock.symbol]; // Remove the cloned object reference
    }
  }  

  onPageSizeChange() {
    this.loadStocksLazy({ first: 0, rows: this.selectedPageSize });
  }
}
