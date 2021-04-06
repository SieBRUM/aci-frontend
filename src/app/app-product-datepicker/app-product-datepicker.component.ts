import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { IReservation } from '../models/reservation.model';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-product-datepicker',
  templateUrl: './app-product-datepicker.component.html',
  styleUrls: ['./app-product-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppProductDatepickerComponent implements OnInit {

  @Input() productId = -1;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;

  isLoading = true;
  reservations: Array<IReservation> = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    const startDateFormGroup = new FormControl();
    const endDateFormGroup = new FormControl();

    startDateFormGroup.setValue(this.startDate);
    endDateFormGroup.setValue(this.endDate);
    console.log(this.startDate);
    this.range = new FormGroup({
      start: startDateFormGroup,
      end: endDateFormGroup
    });

    this.isLoading = true;
    this.apiService.getReservationsByProductId(this.productId).subscribe({
      next: (resp) => {
        if (resp.body == null) {
          this.reservations = [];
        } else {
          resp.body.forEach(reservation => {
            reservation.startDate = this.convertSqlDateToJsDate(reservation.startDate as unknown as string);
            reservation.endDate = this.convertSqlDateToJsDate(reservation.endDate as unknown as string);
            if (reservation.returnDate !== null) {
              reservation.returnDate = this.convertSqlDateToJsDate(reservation.returnDate as unknown as string);
            }
          });
          this.reservations = resp.body;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      return (this.isDateReserved(cellDate) ? 'is-reserved' : '');
    }

    return '';
  }

  private convertSqlDateToJsDate(dateToConvert: string): Date {
    return new Date(dateToConvert.replace('T', ' '));
  }

  private isDateReserved(date: Date): boolean {
    let isReserved = false;
    this.reservations.forEach(reservation => {
      if (moment(date).isBetween(reservation.startDate, reservation.endDate, 'day', '[]')) {
        isReserved = true;
      }
    });

    return isReserved;
  }
}
