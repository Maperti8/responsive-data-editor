import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataService) {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.dataService.getData().subscribe(data => {
      console.log(data);
    });
  }
}
