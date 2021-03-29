import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-fullsize-filter',
  templateUrl: './app-product-fullsize-filter.component.html',
  styleUrls: ['./app-product-fullsize-filter.component.scss']
})
export class AppProductFullsizeFilterComponent implements OnInit {
  pickerFullsize: FormGroup;

  constructor() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dayahead = today.getDate() +1;

    this.pickerFullsize = new FormGroup({
      start: new FormControl(new Date(today)),
      end: new FormControl(new Date(year, month, dayahead))
    });
   }

  ngOnInit(): void {
  }

  onApplyFilterFullsize() {
    console.log(this.pickerFullsize.value);
  }

}
