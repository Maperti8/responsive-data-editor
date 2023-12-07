import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  @Input() rowData: any;

  ngOnChanges() {
    if (this.rowData) {
     console.log('here', this.rowData)
    }
  }

}
