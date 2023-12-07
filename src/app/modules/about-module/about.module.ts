import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { AboutComponent } from './components/about/about.component';
// routing
import { AboutRoutingModule } from './about-routing-module';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
  ],
  exports: [
    AboutComponent
  ],
})
export class AboutModule { }