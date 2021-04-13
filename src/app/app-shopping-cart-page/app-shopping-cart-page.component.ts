import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
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
  // TODO: Remove
  fakeItems: Array<ICartProduct> = [
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 2,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 3,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 4,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 5,
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 6,
      startDate: new Date(),
      endDate: new Date()
    },
  ];

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private notificationService: MatSnackBar
  ) {
    // TODO: Remove
    // localStorage.setItem('cart', JSON.stringify(this.fakeItems));
  }

  ngOnInit(): void {
    this.convertLocalStorage();
    this.getFlatProducts();
  }

  /*
    Click event when the 'remove product from shopping cart' button is clicked
    Removes item from the cartProducts array and removes all errors from datePickerErrors.
    Saves the new cartProducts array to localstorage

    @param localId: number | undefined localId will never be undefined. Contains localId of the item to remove
  */
  onClickRemove(localId: number | undefined): void {
    const index = this.cartProducts.findIndex(x => x.localId === localId);
    this.datepickerErrors.delete(localId as number);
    this.cartProducts.splice(index, 1);
    this.saveToLocalStorage();
  }

  /*
    Hook on the errorsChanged event emitted by the custom datepickers

    @param localId: number | undefined LocalId will never be undefined
    @param event: IDatePickerError[] Contains all DatePickerErrors from the specific localId datepicker
  */
  datepickerErrorChanged(localId: number | undefined, event: IDatePickerError[]): void {
    this.datepickerErrors.set(localId as number, event);
  }

  /*
    Hook on the dateChanged event emitted by the custom datepickers

    @param localId: number | undefined LocalId will never be undefined
    @param event: IDateChangedEvent Contains the new dates
  */
  datepickerDatesChanged(localId: number | undefined, event: IDateChangedEvent): void {
    const cartIndex = this.cartProducts.findIndex(x => x.localId === localId);
    const currentProduct = this.cartProducts[cartIndex];
    currentProduct.startDate = event.startDate;
    currentProduct.endDate = event.endDate;
    this.cartProducts[cartIndex] = currentProduct;
    this.saveToLocalStorage();
  }

  /*
    Checks if a product (based on localId) has any date errors

    @param localId: number | undefined LocalId will never be undefined
    @returns boolean Returns true if datepicker has errors. False if there are no errors.
  */
  hasCartProductErrors(localId: number | undefined): boolean {
    const errors = this.datepickerErrors.get(localId as number);
    return errors !== undefined && errors.length > 0;
  }

  /*
    Get all errors from the datepicker based on the temp localId

    @param localId: number | undefined Number will never be undefined.
    @returns IDatePickerError[] All DatePickerError's bound to the localId
  */
  getErrorsByLocalId(localId: number | undefined): IDatePickerError[] {
    return this.datepickerErrors.get(localId as number) as IDatePickerError[];
  }

  /*
    Receive IProductFlat based on product id

    @param id: number Id of the product
    @returns IProductFlat The backend product data
  */
  getFlatProductById(id: number): IProductFlat {
    return this.productsFlat[this.productsFlat.findIndex(x => x.id === id)];
  }

  /*
    Function to check if the backend has returned the product data for a specific product

    @param id: number The id of the product
    @returns boolean True if data is found. False if it's not found
  */
  receivedFlatProduct(id: number): boolean {
    if (this.productsFlat.length < 1) {
      return false;
    }

    return this.productsFlat.findIndex(x => x.id === id) > -1;
  }

  /*
    Function to save all cartProducts to localstorage
  */
  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  /*
    Converts localstorage to usable ICartProduct objects
    Sets a temp localId value to keep track of all the items
  */
  private convertLocalStorage(): void {
    let localId = 0;
    const items = JSON.parse(localStorage.getItem('cart') as string) as Array<ICartProduct>;
    items.forEach(item => {
      item.localId = localId;
      // string -> date
      item.endDate = (item.endDate !== null ? new Date(item.endDate) : null);
      item.startDate = new Date(item.startDate);
      localId++;
    });

    this.cartProducts = items;
  }

  /*
    Get all product data from the API.
    First, filters out duplicates so no duplicate calls are needed.
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
        }
      });
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
