import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IProductFlat } from '../models/product-flat.model';
import { IReservation } from '../models/reservation.model';

@Component({
  selector: 'app-reservations-overview-page',
  templateUrl: './app-reservations-overview-page.component.html',
  styleUrls: ['./app-reservations-overview-page.component.scss']
})
export class AppReservationsOverviewPageComponent {

  /**
   * Contains all the flat products
   */
  productsFlat: Array<IProductFlat> = [];
  /**
   * Contains all the reservation
   */
  reservations: Array<Array<IReservation>> = [];
  /**
   * Holds if reservations are loading
   */
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: Router) {
    this.isLoading = true;
    this.apiService.getSimilarReservations().subscribe({
      next: (resp) => {
        this.isLoading = false;
        if (resp.body === null) {
          this.reservations = [];
          return;
        }

        this.reservations = resp.body;
        this.getProducts();
      }
    });
  }

  /**
   * Navigate to the detailed reservation page
   * @param reservationId the id of the reservation to navigate to
   */
  onClickNavigateToReservation(reservationId: number): void {
    this.route.navigate(['reservation', reservationId]);
  }

  /**
   * Returns if the product has been loaded yet
   * @param productId the productId to check if it has been loaded
   */
  hasLoadedProduct(productId: number): boolean {
    if (this.productsFlat === null || this.productsFlat.length < 1) {
      return false;
    }

    return this.productsFlat.findIndex(x => x.id === productId) > -1;
  }

  /**
   * Returns the name of the product
   * @param productId the productId to get the name of
   */
  getProductName(productId: number): string {
    return this.productsFlat[this.productsFlat.findIndex(x => x.id === productId)].name;
  }

  /**
   * Receive all the products
   */
  getProducts(): void {
    this.productsFlat = [];
    const seen = new Set();
    let filteredProducts: IReservation[] = [];

    this.reservations.forEach(reservation => {
      filteredProducts = filteredProducts.concat(reservation.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      }));
    });

    filteredProducts.forEach(async product => {
      this.apiService.getProductFlatById(product.id).subscribe({
        next: (resp) => {
          if (resp.body === null) {
            return;
          }

          this.productsFlat.push(resp.body);
        }
      });
    });
  }
}
