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
  totalRecords: number = 0; 
  selectedPageSize = 10; // Default page size
  pageSizes = [{label: '10', value: 10}, {label: '20', value: 20}, {label: '50', value: 50}];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  loadStocksLazy(event: LazyLoadEvent | any) { 
    const start = event.first != null ? event.first : 0;
    const rows = event.rows != null ? event.rows : this.selectedPageSize;

    this.dataService.getDataSegment(start, rows).subscribe(data => {
      this.stocks = data.stocks;
      this.totalRecords = data.totalRecords;
    });
  }

  onPageSizeChange() {
    this.loadStocksLazy({ first: 0, rows: this.selectedPageSize });
  }
}
