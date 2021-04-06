import { Component, OnInit } from '@angular/core';
import { ProductData } from '../models/ProductData';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { timer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  // determined whch columns that are displayed in the inventory table and in which order.
  displayedColumns: string[] = ['name', 'location', 'status'];
  dataSource!: MatTableDataSource<ProductData>;

  constructor(
    private apiService: ApiService,
    private notificationService: MatSnackBar, 
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  /*
  * Get the necesesary data to display the page
  */
  private getInitialData(): void {
      this.apiService.getInventoryProducts()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response.body ?? undefined);
        },
        error: (err) => {
          this.showErrorNotification('INVENTORY.NO_INVENTORY_RESPONSE');
        }
      });
  }

    /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
    private showErrorNotification(translateableMessage: string): void {
      this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }
}
