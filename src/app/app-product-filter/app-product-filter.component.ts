import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Status } from 'src/mapping/status';

@Component({
  selector: 'app-product-filter',
  templateUrl: './app-product-filter.component.html',
  styleUrls: ['./app-product-filter.component.scss']
})
export class AppProductFilterComponent implements OnInit {
  status = Status;
  keys: string[];
  inputField: String = "";
  picker: FormGroup;
  selectedDate: any;
  panelOpenState = false;

  constructor() {
    this.keys = Object.keys(this.status).filter(k => !isNaN(Number(k)));
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dayahead = today.getDate() +1;

    this.picker = new FormGroup({
      start: new FormControl(new Date(today)),
      end: new FormControl(new Date(year, month, dayahead))
    });
   
  }

  ngOnInit(): void {

  }

  onApplyFilter(){
    console.log(this.picker.value);
    console.log(status);
    console.log(this.inputField)
    console.log(this.keys)

  }




}


