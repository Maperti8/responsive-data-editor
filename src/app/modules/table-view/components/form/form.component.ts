import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// interfaces 
import { Stock } from '../../models/stock.interface'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() rowData: any;
  editable = false;
  stock: Stock[] = [];
  copyStock: Stock[] = [];

  stockForm: FormGroup = this.fb.group({
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
      this.stock = this.rowData
      this.copyStock = { ...this.stock }
     console.log('original', this.stock)
     console.log('copy', this.copyStock)
    }
  }

  onReset() { 
    this.stockForm.setValue(this.copyStock);
    console.log('reset');
  }

   onSubmit() {
    console.log(this.stockForm.value);
  }
}
