import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { TableViewComponent } from './components/table-view/table-view.component';
// routing
import { TableViewRoutingModule } from './table-view-routing.module';
// forms module
import { FormsModule } from '@angular/forms';
// primeNG table 
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    TableViewComponent,
  ],
  imports: [
    CommonModule,
    TableViewRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule, 
    ButtonModule,
    InputTextModule,
  ]
})
export class TableViewModule { }
