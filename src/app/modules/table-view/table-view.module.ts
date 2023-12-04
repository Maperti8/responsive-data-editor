import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { TableViewComponent } from './components/table-view/table-view.component';
//routing
import { TableViewRoutingModule } from './table-view-routing.module';
// primeNG table 
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    TableViewComponent
  ],
  imports: [
    CommonModule,
    TableViewRoutingModule,
    TableModule,
  ]
})
export class TableViewModule { }
