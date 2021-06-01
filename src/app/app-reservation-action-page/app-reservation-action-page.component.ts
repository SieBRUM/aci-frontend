import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ProductData } from '../models/ProductData.model';
import { ProductStatus } from '../models/ProductStatus.enum';
import { IReservationAction } from '../models/reservation-action.model';
import { IReservationProduct } from '../models/reservation-product.model';
import { IReservation } from '../models/reservation.model';

@Component({
  selector: 'app-app-reservation-action-page',
  templateUrl: './app-reservation-action-page.component.html',
  styleUrls: ['./app-reservation-action-page.component.scss']
})
export class AppReservationActionPageComponent implements OnInit {

  reservations: Array<IReservationProduct> = [
    { id: 1, startDate: new Date, endDate: new Date, pickupDate: new Date, product: { id: 1, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, pickupDate: new Date, returnDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, pickupDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, pickupDate: new Date, returnDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } },
    { id: 1, startDate: new Date, endDate: new Date, pickupDate: new Date, returnDate: new Date, product: { id: 2, name: "asd", description: "", image: "R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7", productState: ProductStatus.Available } }
];

  ngOnInit(): void {
  }
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
  isLoading = false;

  constructor(
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private apiService: ApiService,
    private router: Router
  ) { }

  ReservationAction(action: number, id: number) {
    this.isLoading = true;
    const reservationAction: IReservationAction = { reservationId: id, action: action }
    if (id > 0) {
      this.apiService.reservationAction(reservationAction).subscribe({
        next: (resp) => {
          this.isLoading = false;
          this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.SUCCESS'), undefined, {
            panelClass: 'success-snack',
            duration: 2500
          });
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
