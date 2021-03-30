import { Component, OnInit } from '@angular/core';
import { ProductData } from '../models/ProductData';
import { ProductStatus } from '../models/ProductStatus';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  // determined whch columns that are displayed in the inventory table and in which order.
  displayedColumns: string[] = ['name', 'location', 'status'];
  dataSource!: MatTableDataSource<ProductData>;

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get<ProductData[]>('https://localhost:44372/api/product')
      .subscribe((data: ProductData[] | undefined) => this.dataSource = new MatTableDataSource(data));
  }
}
