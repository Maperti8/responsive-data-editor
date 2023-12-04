import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // eager loaded components
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  // lazy loaded modules
  { path: 'table', loadChildren: () => import('./modules/table-view/table-view.module').then(m => m.TableViewModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
