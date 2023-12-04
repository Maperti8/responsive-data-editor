import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
// interface 
import { Stock } from '../../models/stocks.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  data: Stock[] = []

  constructor(private dataService: DataService) {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.dataService.getData().subscribe(data => {
      this.data=data
      console.log(data);
    });
  }
  
}
