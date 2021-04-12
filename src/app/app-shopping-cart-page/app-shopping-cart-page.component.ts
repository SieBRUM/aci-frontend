import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ICartProduct } from '../models/cart-product.model';
import { IDatePickerError } from '../models/datepicker-error.model';
import { IProductFlat } from '../models/product-flat.model';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './app-shopping-cart-page.component.html',
  styleUrls: ['./app-shopping-cart-page.component.scss']
})
export class AppShoppingCartPageComponent implements OnInit {
  cartProducts: Array<ICartProduct> = [];
  productsFlat: Array<IProductFlat> = [];
  datepickerErrors: Map<number, Array<IDatePickerError>> = new Map<number, Array<IDatePickerError>>();
  isLoading = false;

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
    private apiService: ApiService
  ) {
    // TODO: Remove
    // localStorage.setItem('cart', JSON.stringify(this.fakeItems));
  }

  ngOnInit(): void {
    this.convertLocalStorage();
    this.getFlatProducts();
  }

  datepickerErrorChanged(index: number, event: any): void {
    this.datepickerErrors.set(index, event);
  }

  hasCartProductErrors(index: number): boolean {
    const errors = this.datepickerErrors.get(index);
    return errors !== undefined && errors.length > 0;
  }

  getFlatProductById(id: number): IProductFlat {
    return this.productsFlat[this.productsFlat.findIndex(x => x.id === id)];
  }

  private convertLocalStorage(): void {
    const items = JSON.parse(localStorage.getItem('cart') as string) as Array<ICartProduct>;
    items.forEach(item => {
      // string -> date
      item.endDate = new Date(item.endDate);
      item.startDate = new Date(item.startDate);
    });

    this.cartProducts = items;
  }

  receivedFlatProduct(id: number): boolean {
    if (this.productsFlat.length < 1) {
      return false;
    }

    return this.productsFlat.findIndex(x => x.id === id) > -1;
  }

  private getFlatProducts(): void {
    this.productsFlat = [];
    const seen = new Set();
    const filteredProducts = this.cartProducts.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    filteredProducts.forEach(async product => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.apiService.getProductFlatById(product.id).subscribe({
        next: (resp) => {
          if (resp.body === null) {
            return;
          }

          this.productsFlat.push(resp.body as IProductFlat);
        },
        error: (err) => {
          // TODO: error
        }
      });
    });
  }
}
