import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { AppProductDatepickerComponent } from '../app-product-datepicker/app-product-datepicker.component';
import { IAddReservation } from '../models/add-reservation.model';
import { ICartProduct } from '../models/cart-product.model';
import { IDateChangedEvent } from '../models/date-changed-event.model';
import { IDatePickerError } from '../models/datepicker-error.model';
import { IProductFlat } from '../models/product-flat.model';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './app-shopping-cart-page.component.html',
  styleUrls: ['./app-shopping-cart-page.component.scss']
})
export class AppShoppingCartPageComponent implements OnInit {
  /* All cart products (received from localstorage) */
  cartProducts: Array<ICartProduct> = [];
  /* All backend products */
  productsFlat: Array<IProductFlat> = [];
  /* All datepicker errors. Key = localId, value = errors */
  datepickerErrors: Map<number, Array<IDatePickerError>> = new Map<number, Array<IDatePickerError>>();
  /* Keep state of reserving to show loading spinner */
  isReserving = false;
  /* Is true when loading products has failed */
  hasLoadingError = false;
  /* All AppProductDatepickerComponents so we can reload them if something goes wrong */
  @ViewChildren('productdatepicker')
  productDatePickers: QueryList<AppProductDatepickerComponent> = new QueryList<AppProductDatepickerComponent>();

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private notificationService: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.convertLocalStorage();
    this.getFlatProducts();
  }

  /**
   * Click event when the 'remove product from shopping cart' button is clicked
   * Removes item from the cartProducts array and removes all errors from datePickerErrors.
   * Saves the new cartProducts array to localstorage
   * @param localId localId will never be undefined. Contains localId of the item to remove
   */
  onClickRemove(localId: number | undefined): void {
    const index = this.cartProducts.findIndex(x => x.localId === localId);
    this.datepickerErrors.delete(localId as number);
    this.cartProducts.splice(index, 1);
    this.saveToLocalStorage();
  }

  /**
   * Hook on the errorsChanged event emitted by the custom datepickers
   * @param localId LocalId will never be undefined
   * @param event Contains all DatePickerErrors from the specific localId datepicker
   */
  datepickerErrorChanged(localId: number | undefined, event: IDatePickerError[]): void {
    this.datepickerErrors.set(localId as number, event);
  }

  /**
   * Hook on the dateChanged event emitted by the custom datepickers
   * @param localId LocalId will never be undefined
   * @param event Contains the new dates
   */
  datepickerDatesChanged(localId: number | undefined, event: IDateChangedEvent): void {
    const cartIndex = this.cartProducts.findIndex(x => x.localId === localId);
    const currentProduct = this.cartProducts[cartIndex];
    currentProduct.startDate = event.startDate;
    currentProduct.endDate = event.endDate;
    this.cartProducts[cartIndex] = currentProduct;
    this.saveToLocalStorage();
  }

  /**
   * Checks if a product (based on localId) has any date errors
   * @param localId LocalId will never be undefined
   * @returns True if datepicker has errors. False if there are no errors.
   */
  hasCartProductErrors(localId: number | undefined): boolean {
    const errors = this.datepickerErrors.get(localId as number);
    return errors !== undefined && errors.length > 0;
  }

  /**
   * Checks if there are any errors
   * @returns boolean True if any errors. False if no errors
   */
  anyErrorsExist(): boolean {
    let hasAnyErrors = false;

    for (const cartProduct of this.cartProducts) {
      if (this.hasCartProductErrors(cartProduct.localId)) {
        hasAnyErrors = true;
        break;
      }
    }

    return hasAnyErrors;
  }

  /**
   * Checks if all products are loaded from the backend
   * @returns Returns true if everything is loaded. False if not everything is loaded.
   */
  isEverythingLoaded(): boolean {
    let isAllLoaded = true;
    for (const cartProduct of this.cartProducts) {
      if (this.productsFlat.findIndex(x => x.id === cartProduct.id) < 0) {
        isAllLoaded = false;
        break;
      }
    }

    return isAllLoaded;
  }

  /**
   * Get all errors from the datepicker based on the temp localId
   * @param localId Number will never be undefined.
   * @returns All DatePickerError's bound to the localId
   */
  getErrorsByLocalId(localId: number | undefined): IDatePickerError[] {
    // Deepclone
    const seen = new Set();
    const errors = (this.datepickerErrors.get(localId as number) as IDatePickerError[]).filter(el => {
      const duplicate = seen.has(el.error);
      seen.add(el.error);
      return !duplicate;
    });

    return errors;
  }

  /**
   * Receive IProductFlat based on product id
   * @param id Id of the product
   * @returns The backend product data
   */
  getFlatProductById(id: number): IProductFlat {
    return this.productsFlat[this.productsFlat.findIndex(x => x.id === id)];
  }

  /**
   * Function to check if the backend has returned the product data for a specific product
   * @param id The id of the product
   * @returns True if data is found. False if it's not found
   */
  receivedFlatProduct(id: number): boolean {
    if (this.productsFlat.length < 1) {
      return false;
    }

    return this.productsFlat.findIndex(x => x.id === id) > -1;
  }

  /**
   * Functionality to save the reservations
   * Will reload the datepickers when a reservation fails
   */
  onClickReserve(): void {
    if (this.anyErrorsExist()) {
      this.showErrorNotification('CART.FIX_ERRORS');
      return;
    }
    this.isReserving = true;
    const reservationObject: IAddReservation = {
      productModels: this.cartProducts
    };

    this.apiService.reserveProducts(reservationObject).subscribe({
      next: (resp) => {
        this.notificationService.open(this.translateService.instant('CART.RESERVE_SUCCESSFUL'), undefined, {
          panelClass: 'success-snack',
          duration: 2500
        });
        localStorage.removeItem('cart');
        this.isReserving = false;
        this.router.navigate(['home']);
      },
      error: (err) => {
        if (err.error !== null && err.error.length > 0) {
          err.error.forEach((error: any) => {
            const faultyProduct = (error.key as ICartProduct);
            const datePicker = this.productDatePickers.filter(x => x.localId === faultyProduct.localId as number)[0];
            datePicker.initialiseDatePicker();
          });
        }
        this.showErrorNotification('CART.FIX_ERRORS');
        this.isReserving = false;
      }
    });
  }

  /**
   * Function to save all cartProducts to localstorage
   */
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  /**
   * Converts localstorage to usable ICartProduct objects
   * Sets a temp localId value to keep track of all the items
   */
  private convertLocalStorage(): void {
    let localId = 0;
    const items = JSON.parse(localStorage.getItem('cart') as string) as Array<ICartProduct>;
    if (items === null || items.length < 1) {
      this.cartProducts = [];
      return;
    }
    items.forEach(item => {
      item.localId = localId;
      // string -> date
      item.endDate = (item.endDate !== null ? new Date(item.endDate) : null);
      item.startDate = new Date(item.startDate);
      localId++;
    });

    this.cartProducts = items;
  }

  /**
   * Get all product data from the API.
   * First, filters out duplicates so no duplicate calls are needed.
   */
  private getFlatProducts(): void {
    this.productsFlat = [];
    const seen = new Set();
    const filteredProducts = this.cartProducts.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    filteredProducts.forEach(async product => {
      this.apiService.getProductFlatById(product.id).subscribe({
        next: (resp) => {
          if (resp.body === null) {
            return;
          }

          this.productsFlat.push(resp.body);
        },
        error: (err) => {
          this.showErrorNotification('CART.NO_FLAT_PRODUCT_RESPONSE');
          this.hasLoadingError = true;
        }
      });
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
