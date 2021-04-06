import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './app-shopping-cart-page.component.html',
  styleUrls: ['./app-shopping-cart-page.component.scss']
})
export class AppShoppingCartPageComponent implements OnInit {
  cartItems: Array<ICartItem> = [];
  // TODO: Remove
  fakeItems: Array<ICartItem> = [
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date()
    }
  ];

  constructor() {
    localStorage.setItem('cart', JSON.stringify(this.fakeItems));
  }

  ngOnInit(): void {
    this.convertLocalStorage();
  }

  private convertLocalStorage(): void {
    const items = JSON.parse(localStorage.getItem('cart') as string) as Array<ICartItem>;
    items.forEach(item => {
      // string -> date
      item.endDate = new Date(item.endDate);
      item.startDate = new Date(item.startDate);
    });

    this.cartItems = items;
  }
}
