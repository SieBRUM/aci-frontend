import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ICartProduct } from '../models/cart-product.model';
import { CatalogItemsWithCategory } from '../models/catalog-items-with-catogery.model';
import { CatalogPage } from '../models/catalog-page.model';
import { ICatalogFlat } from '../models/catelog-flat.model';
import { IDateChangedEvent } from '../models/date-changed-event.model';
import { IProductFlat } from '../models/product-flat.model';

const PAGE_SIZE_DEFAULT = 5;
const INDEX_DEFAULT = 0;
const PRODUCT_COUNT_DEFAULT = 0;

@Component({
  selector: 'app-catalogus-page',
  templateUrl: './app-catalogus-page.component.html',
  styleUrls: ['./app-catalogus-page.component.scss']
})
export class AppCatalogusPageComponent implements OnInit {
  // MatPaginator Inputs
  totalProductCount = PRODUCT_COUNT_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  pageIndex = INDEX_DEFAULT;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 100];
  imageIndexx: number = 0;

  cartItems: Array<ICartProduct> = [];

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChildren('previewimage') previewImageElement!: QueryList<ElementRef>;
  /* Is true when loading products has failed */
  hasLoadingError = false;

  catalogItemsWithCategory: Array<CatalogItemsWithCategory>;

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private notificationService: MatSnackBar,
    private router: Router
  ) {
    this.catalogItemsWithCategory = new Array<CatalogItemsWithCategory>();
  }

  ngOnInit(): void {
    let inventoryPageOptions = localStorage.getItem('inventoryPageOptions');

    if (inventoryPageOptions != null)
      this.pageSize = JSON.parse(inventoryPageOptions);
  }

  ngAfterViewInit(): void {
    this.getCatalogItems();
  }

  public onClickPreviousImage(item: ICatalogFlat) {
    if (item.imageIndex <= 0) {
      item.imageIndex = item.images.length - 1;
    }
    else {
      item.imageIndex--;
    }
    this.onChangeSelectedImageIndex(item);
  }

  public onClickNextImage(item: ICatalogFlat) {
    if (item.imageIndex >= item.images.length - 1) {
      item.imageIndex = 0;
    }
    else {
      item.imageIndex++;
    }
    this.onChangeSelectedImageIndex(item);
  }

  onChangeSelectedImageIndex(item: ICatalogFlat) {
    var imageElement = this.previewImageElement.filter((element, index) => element.nativeElement.id == "image-" + item.id)[0];
    imageElement.nativeElement.src = 'data:image/png;base64,' + item.images[item.imageIndex]
  }

  addItemToCart(item: ICatalogFlat) {
    if (new Date(item.startDate) <= new Date() || new Date(item.endDate!) <= new Date()) {
      this.showErrorNotification("CATALOG.EMPTY_DATE");
    }
    else {
      var modal = <ICartProduct>{};
      modal.endDate = item.endDate;
      modal.startDate = item.startDate;
      modal.id = item.id;
      this.cartItems.push(modal)

      localStorage.setItem('cart', JSON.stringify(this.cartItems));

      this.notificationService.open(item.name + " " + this.translateService.instant('CATALOG.CART_ADD_SUCCESSFUL'), undefined, {
        panelClass: 'success-snack',
        duration: 2500
      });
    }
  }

  datepickerDatesChanged(item: ICatalogFlat, event: IDateChangedEvent): void {
    item.startDate = event.startDate;
    item.endDate = event.endDate;
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
    this.getCatalogItems();
    return event;
  }

  /**
   * Gets the data from the catalogPage object
   * @param pageData page data containing relevant data for inventory page
   * @returns void
   */
  private readCatalogPage(pageData: CatalogPage | null): void {
    if (pageData == null) {
      this.catalogItemsWithCategory = new Array<CatalogItemsWithCategory>()
      return;
    }
    this.catalogItemsWithCategory = pageData.catalogItems
    this.catalogItemsWithCategory.forEach(element => {

    });
    this.totalProductCount = pageData.totalProductCount
    this.pageIndex = pageData.currentPage;
    console.log(this.catalogItemsWithCategory);
  }

  /**
   * Sets page to first page
   */
  public resetPaging(): void {
    this.paginator.pageIndex = INDEX_DEFAULT;
  }

  private getCatalogItems(): void {
    this.apiService.getCatalogEntries(this.pageIndex, this.pageSize).subscribe({
      next: (resp) => {
        this.readCatalogPage(resp.body)
      },
      error: (err) => {
        this.showErrorNotification('CART.NO_FLAT_PRODUCT_RESPONSE');
        this.hasLoadingError = true;
      }
    });
  }


  /**
   * Show error notification
   * @param translateableMessage Message to translate and send to notification
   */
  private showErrorNotification(translateableMessage: string): void {
    this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }

}
