import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ICartProduct } from '../models/cart-product.model';
import { IProductFlat } from '../models/product-flat.model';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './app-shopping-cart-page.component.html',
  styleUrls: ['./app-shopping-cart-page.component.scss']
})
export class AppShoppingCartPageComponent implements OnInit {
  cartProducts: Array<ICartProduct> = [];
  productsFlat: Array<IProductFlat> = [];
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
  ];

  constructor(
    private apiService: ApiService
  ) {
    // TODO: Remove
    localStorage.setItem('cart', JSON.stringify(this.fakeItems));
  }

  ngOnInit(): void {
    this.convertLocalStorage();
    this.getFlatProducts();
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

  private getFlatProducts(): void {
    this.isLoading = true;
    this.productsFlat = [];
    const seen = new Set();
    const filteredProducts = this.cartProducts.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    filteredProducts.forEach(product => {
      this.apiService.getProductFlatById(product.id).subscribe({
        next: (resp) => {
          if (resp.body === null) {
            return;
          }

          this.productsFlat.push(resp.body as IProductFlat);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          // TODO: error
        }
      });
    });
  }
}
