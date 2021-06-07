import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ProductStatus } from '../models/product-status.enum';
import { IReservationAction } from '../models/reservation-action.model';
import { IReservationProduct } from '../models/reservation-product.model';
import { ActivatedRoute } from '@angular/router';
import { IProductFlat } from '../models/product-flat.model';

@Component({
  selector: 'app-app-reservation-action-page',
  templateUrl: './app-reservation-action-page.component.html',
  styleUrls: ['./app-reservation-action-page.component.scss']
})
export class AppReservationActionPageComponent implements OnInit {

  reservations: Array<IReservationProduct> = [
    { id: 1, startDate: new Date, endDate: new Date, pickedUpDate: new Date, productId: 1, product: { id: 1, name: "Testdata", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available, inventoryLocation: "" } },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && parseInt(id))
      this.LoadReservations(parseInt(id));
  }
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
  isLoading = false;
  isLoadingPage = false;

  constructor(
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  /**
   * Load all reservations similiar to given Id
   * @param id given id of reservation
   */
  LoadReservations(id: number) {
    var similarReservations;
    this.isLoadingPage = true;
    this.apiService.getReservationsSimilar(id)
      .subscribe({
        next: (response) => {
          this.reservations = new Array<IReservationProduct>();
          if (response.body === null) {
            return;
          }
          response.body.forEach(reservation => {
            this.reservations.push({
              id: reservation.id,
              startDate: reservation.startDate,
              endDate: reservation.endDate,
              returnDate: reservation.returnDate,
              pickedUpDate: reservation.pickedUpDate,
              productId: reservation.productId,
              product: null
            })
          });
          this.LoadProductData();
          this.isLoadingPage = false;
        },
        error: (_err: any) => {
          this.showErrorNotification('RESERVATION.NO_RESPONSE_DATA');
          this.isLoadingPage = false;
        }
      });
  }
  /**
     * Loads products for reservations
   */
  LoadProductData() {
    this.reservations.forEach(reservation => {
      this.apiService.getProductFlatById(reservation.productId)
        .subscribe({
          next: (response) => {
            if (response.body == null) {
              return;
            }
            if (response.body) {
              reservation.product = response.body;
            }
          },
          error: (_err: any) => {
            this.showErrorNotification('RESERVATION.PRODUCT.ERROR');
          }
        })
    })
  }

  /**
   * Action function to delete / out / in a reservation
   * @param action number, 0 delete, 1 out, 2 in
   * @param id number the id of the reservation
   */
  ReservationAction(action: number, id: number) {
    this.isLoading = true;
    const reservationAction: IReservationAction = { reservationId: id, actionNumber: action }
    if (id > 0) {
      this.apiService.reservationAction(reservationAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.SUCCESS'), undefined, {
            panelClass: 'success-snack',
            duration: 2500
          });
          this.updateReservation(action, id)
        },
        error: (err) => {
          this.isLoading = false;
          this.showErrorNotification(err.error);
        }
      });
    }
    else {
      this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.UNSUCCESSFUL'), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }
  }
  /**
  * Updates the currect list
  * @param action number, 0 delete, 1 out, 2 in
  * @param id number the id of the reservation
   */
  private updateReservation(action: number, id: number): void {
    this.reservations.forEach(reservation => {
      if (reservation.id == id) {
        switch (action) {
          case 0: {
            const index = this.reservations.indexOf(reservation, 0);
            if (index > -1) {
              this.reservations.splice(index, 1);
            }
            break;
          }
          case 1: {
            reservation.pickedUpDate = new Date();
            break;
          }
          case 2: {
            reservation.returnDate = new Date();
            break;
          }
          default: {
            //statements; 
            break;
          }
        }
      }
    })
  }
  /*
    Show error notification

    @param translatableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
  private showErrorNotification(translatableMessage: string): void {
    this.snackbarService.open(this.translate.instant(translatableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }
}
