import { Component } from '@angular/core';
import { AddProductObject } from '../models/add-product.model';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './app-add-product-page.component.html',
  styleUrls: ['./app-add-product-page.component.scss']
})
export class AppAddProductPageComponent {

  /* Contains the values for the new product. */
  product: AddProductObject;

  constructor() {
    this.product = {
      categoryId: 0,
      catalogNumber: 0,
      description: '',
      images: [],
      location: '',
      name: '',
      requiresApproval: false
    };
  }
}
