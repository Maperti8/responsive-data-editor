import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  // lazy loaded modules
  { path: 'table', loadChildren: () => import('./modules/table-view/table-view.module').then(m => m.TableViewModule) },
  { path: 'about', loadChildren: () => import('./modules/about-module/about.module').then(m => m.AboutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
