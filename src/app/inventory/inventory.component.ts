import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
export interface ProductData {
  name: string;
  location: string;
  isAvailable: boolean;
}

const TEST_DATA: ProductData[] = [
  {name: 'CANON R5', location: 'Somewhere', isAvailable: false},
  {name: 'CANON R5', location: 'Die ene plank', isAvailable: true},
  {name: 'CANON R5', location: 'Somewhere', isAvailable: false},
  {name: 'CANON R5', location: 'Somewhere', isAvailable: false},
  {name: 'CANON R5', location: 'Somewhere', isAvailable: false},
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
    displayedColumns: string[] = ['name', 'location', 'isAvailable'];
    dataSource = TEST_DATA;

  constructor(private breakpointObserver: BreakpointObserver) {}
}
