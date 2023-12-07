import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() rowData: any;
  myForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
    symbol: [null, Validators.required],
    company: [null, Validators.required],
    price: [null, Validators.required],
    change: [null, Validators.required],
    date: [null, Validators.required],
    description: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.rowData) {
     console.log('here', this.rowData)
    }
  }

   onSubmit() {
    console.log(this.myForm.value);
  }

}
