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
// Pagnation Lazy loading
loadStocksLazy(event: LazyLoadEvent | any) { 
  const start = event.first != null ? event.first : 0;
  const rows = event.rows != null ? event.rows : this.selectedPageSize;

  this.dataService.getDataSegment(start, rows).subscribe(data => {
    this.stocks = data.stocks;
    this.totalRecords = data.totalRecords;
  });
}
// search selected tickers
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

onDescriptionFocus(stock: Stock, rowIndex: number) {
  // Save a copy of the original description when the user starts editing
    this.clonedStocks[rowIndex] = { ...stock };
    console.log(this.clonedStocks[rowIndex].id, 'here')
    console.log(stock.description, 'ngModel')
}

onSave(stock: Stock, rowIndex: number) {
  this.stocks[rowIndex] = {...stock};
  this.dataService.updateStock(this.stocks[rowIndex]).subscribe(
    (response) => {
      this.stocks[rowIndex]
      console.log('Stock updated', response);
    },
    (error) => {
      console.error('Error updating stock', error);
    }
  );
  delete this.clonedStocks[rowIndex];
}

onCancel(stock: Stock, rowIndex: number) {
  // Revert changes when the user clicks the cancel button
  if (this.clonedStocks[rowIndex]) {
    this.stocks[rowIndex] = { ...this.clonedStocks[rowIndex] };
    delete this.clonedStocks[rowIndex];
  }
}

  onPageSizeChange() {
    this.loadStocksLazy({ first: 0, rows: this.selectedPageSize });
  }
}
