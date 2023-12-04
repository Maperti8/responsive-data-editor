import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { TableViewComponent } from './components/table-view/table-view.component';

const routes: Routes = [
  {
    path: '',
    component: TableViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableViewRoutingModule { }