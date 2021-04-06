import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductData } from '../models/ProductData.model';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryPage} from '../models/InventoryPage.model';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  // determined whch columns that are displayed in the inventory table and in which order.
  displayedColumns: string[] = ['name', 'location', 'status'];

  // MatPaginator Inputs
  totalProductCount = 0;
  pageSize = 2;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
 
  // MatPaginator Output
  pageEvent: PageEvent | undefined;
   
  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private notificationService: MatSnackBar, 
    private translateService: TranslateService) {
      this.dataSource = new MatTableDataSource();
     }
     
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getProductData();
  }


  /**
   * get product data that gets displayed in the inventory
   */
  private getProductData(): void {
      this.apiService.getInventoryProducts(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response) => { 
          this.readInventoryPage(response.body);
        },
        error: (_err: any) => {
          this.showErrorNotification('INVENTORY.NO_INVENTORY_RESPONSE');
        }
      });
  }

  /**
   * Handles paginator page events
   * @param event event object that should be handled
   * @returns same event object that got sent as parameter
   */
  public handlePageEvent(event?:PageEvent) : PageEvent | undefined{
    this.pageIndex = event?.pageIndex ?? 0
    this.pageSize = event?.pageSize ?? 10
    this.getProductData();
    return event;
  }

  /**
   * Gets the data from the inventoryPage object
   * @param pageData page data containing relevant data for inventory page
   * @returns void
   */
  private readInventoryPage(pageData: InventoryPage | null): void {          
    if (pageData == null) {
      this.dataSource.data = new Array<ProductData>()
      return;
    }

    this.dataSource.data =  pageData.products ?? new Array<ProductData>();
    this.totalProductCount = pageData.totalProductCount
    this.pageIndex = pageData.currentPage;
  }

  /**
   * Sets page to first page
   */
  public resetPaging(): void {
    this.paginator.pageIndex = 0;
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
