import { Component, OnInit } from '@angular/core';
import { ProductData} from '../models/ProductData';
import { ProductStatus} from '../models/ProductStatus';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

const TEST_DATA: ProductData[] = [
  {name: 'DJ set', location: 'A3.3', status: ProductStatus.AwaitingApproval, reserver: 'Bob Bieb'},
  {name: 'CANON R5', location: 'Die ene plank', status: ProductStatus.Reserved, reserver: 'Renée François'},
  {name: 'CANON R5', location: 'Balie', status: ProductStatus.LentOut, reserver: 'John-Paul Sørina'},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'A5', status: ProductStatus.Unavailable, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
  {name: 'CANON R5', location: 'Kamer A, bovenste plank', status: ProductStatus.Available, reserver: null},
];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
    // determined whch columns that are displayed in the inventory table and in which order.
    displayedColumns: string[] = ['name', 'location', 'reserver', 'status'];
    dataSource!: MatTableDataSource<ProductData>;

    constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {}

    ngOnInit(): void {
      this.getData();
    }

    getData(): void {
      this.http
            .get<ProductData[]>('http://localhost:44382/Item/inventory/get')
            .subscribe(data => this.dataSource = new MatTableDataSource(data));
    }

}
