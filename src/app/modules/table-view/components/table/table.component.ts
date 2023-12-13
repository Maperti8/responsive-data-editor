import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
// services
import { DataService } from '../../services/data.service';
// interfaces 
import { Stock } from '../../models/stock.interface';
import { Ticker } from '../../models/ticker.interface'
// sweetalert 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  stocks: Stock[] = [];
  tickers: Ticker[] = [];
  selectedTickers: string[] = [];
  stockCopy: { [s: string]: Stock } = {}; 
  totalRecords: number = 0; 
  selectedPageSize = 10; 
  @Output() editRow = new EventEmitter<any>();
  pageSizes = [{label: '10', value: 10}, {label: '20', value: 20}, {label: '50', value: 50}];

  constructor(private dataService: DataService) {}

ngOnInit(): void {
  this.dataService.getTickers().subscribe(data => {
    this.tickers = data;
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
  }
} 

onDescriptionFocus(stock: Stock, rowIndex: number) {
  // Save a copy of the original 
    this.stockCopy[rowIndex] = { ...stock };
}

onSave(stock: Stock, rowIndex: number) {
  const updatedStock = { ...stock };

  this.dataService.updateStock(updatedStock).subscribe(
    () => {
      this.stocks[rowIndex] = updatedStock;
      Swal.fire({
        title: 'Stock updated!',
        icon: 'success',
        customClass: {
          popup: 'swal2-dark'
        }
      });
    },
    (error) => {
      console.error('Error updating stock', error);
    }
  );
  delete this.stockCopy[rowIndex];
}

onCancel(rowIndex: number) {
  // Revert changes when the user clicks the cancel button
  if (this.stockCopy[rowIndex]) {
    this.stocks[rowIndex] = { ...this.stockCopy[rowIndex] };
    delete this.stockCopy[rowIndex];
  }
}

onEdit(stock: Stock) {
  this.editRow.emit(stock);
}

  onPageSizeChange() {
    this.loadStocksLazy({ first: 0, rows: this.selectedPageSize });
  }
}
