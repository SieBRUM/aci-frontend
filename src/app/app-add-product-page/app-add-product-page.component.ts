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
  /* Selected index of the image carousel. */
  selectedImageIndex = 1;
  removingImageIndex: number | null = null;

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

  /*
    Handles the functionality when the 'previous image' button is clicked.
    Roll over to last image when on first image, and previous is clicked. 
  */
  onClickPreviousImage(): void {
    if (this.product.images === null) {
      return;
    }

    if (this.selectedImageIndex === 1) {
      this.selectedImageIndex = this.product.images.length;
      this.onChangeSelectedImageIndex();
      return;
    }
    this.selectedImageIndex--;
    this.onChangeSelectedImageIndex();
  }

  /*
    Handles the functionality when the 'next image' button is clicked.
    Roll over to first image when on last image, and next is clicked.
  */
  onClickNextImage(): void {
    if (this.product.images === null) {
      return;
    }

    if (this.selectedImageIndex === this.product.images.length) {
      this.selectedImageIndex = 1;
      this.onChangeSelectedImageIndex();
      return;
    }
    this.selectedImageIndex++;
    this.onChangeSelectedImageIndex();
  }

  onChangeSelectedImageIndex(): void {
    if (this.product.images === null) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const element = document.getElementById('imagePreview') as HTMLImageElement;
      element.src = e.target?.result as string;
      console.log(e.target?.result);
    };

    reader.readAsDataURL(this.product.images[this.selectedImageIndex - 1]);
  }

  /*
    The Add image is a wrapper around the real file input because the real input is not style-able.
    When clicked, fake a click on the real fileInput
  */
  onClickAddImage(): void {
    const element = document.getElementById('fileInput') as HTMLElement;
    element.click();
  }

  onFileChanged(event: any): void {
    const element = document.getElementById('fileInput') as HTMLInputElement;
    if (element.files == null) {
      return;
    }

    for (let i = 0; i < element.files?.length; i++) {
      console.log(element.files.item(i) as File);
      console.log(this.product.images[0]);
      if (this.product.images.includes(element.files.item(i) as File)) {
        continue;
      }
      this.product.images.push(element.files.item(i) as File);
    }
    this.selectedImageIndex = this.product.images.length;
    this.onChangeSelectedImageIndex();
    return;
  }
}
