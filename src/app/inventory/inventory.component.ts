import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductData } from '../models/ProductData.model';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryPage } from '../models/InventoryPage.model';
import { MatDialog } from '@angular/material/dialog';
import { AppArchiveDialogComponent } from '../app-archive-dialog/app-archive-dialog.component';

const PAGE_SIZE_DEFAULT = 50
const INDEX_DEFAULT = 0
const PRODUCT_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  // determined whch columns that are displayed in the inventory table and in which order.
  displayedColumns: string[] = ['name', 'location', 'requiresApproval', 'status', 'options'];

  // MatPaginator Inputs
  totalProductCount = PRODUCT_COUNT_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  pageIndex = INDEX_DEFAULT;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private notificationService: MatSnackBar,
    private translateService: TranslateService,
    private dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    let inventoryPageOptions = localStorage.getItem('inventoryPageOptions');

    if (inventoryPageOptions != null)
      this.pageSize = JSON.parse(inventoryPageOptions);
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
  public handlePageEvent(event?: PageEvent): PageEvent | undefined {
    this.pageIndex = event?.pageIndex ?? INDEX_DEFAULT
    if (this.pageSize != event?.pageSize) {
      this.pageSize = event?.pageSize ?? PAGE_SIZE_DEFAULT
      localStorage.setItem('inventoryPageOptions', JSON.stringify(this.pageSize));
    }
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

    this.dataSource.data = pageData.products ?? new Array<ProductData>();
    this.totalProductCount = pageData.totalProductCount
    this.pageIndex = pageData.currentPage;
  }

  /**
   * Sets page to first page
   */
  public resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
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

  /*
  *Show dialog for archiving
*/
  openDialog(element: any) {
    const dialogRef = this.dialog.open(AppArchiveDialogComponent, {
      data: {
        id: element.id,
        name: element.name
      },
      backdropClass: 'no-backdrop',
    });
  }
}
