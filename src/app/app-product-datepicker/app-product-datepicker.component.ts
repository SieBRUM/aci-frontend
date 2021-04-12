import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { IReservation } from '../models/reservation.model';
import * as moment from 'moment';
import { IDatePickerError } from '../models/datepicker-error.model';

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

  @Output() errorsChanged: EventEmitter<Array<IDatePickerError>> = new EventEmitter();

  isLoading = true;
  reservations: Array<IReservation> = [];

  errors: Array<IDatePickerError> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
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
          this.dateChangeEvent();
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

  dateFilter = (d: Date | null): boolean => {
    if (d === null) {
      return false;
    }
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && !this.isDateReserved(moment(d));
  }

  dateChangeEvent(): void {
    this.errors = [];

    if (this.startDate == null) {
      this.errors.push({ date: null, error: 'START_DATE_NULL' });
      return;
    }

    const startDate = moment(this.startDate).clone();
    const endDate = moment(this.endDate).clone();
    const dates = [];
    let weekendDays = 0;

    if (this.endDate !== null) {
      while (startDate.isSameOrBefore(endDate)) {
        dates.push(startDate.clone());
        startDate.add('1', 'days');
      }
    } else {
      dates.push(startDate.clone());
    }

    dates.forEach((selectedDate, i) => {
      if (selectedDate.day() === 6 || selectedDate.day() === 0) {
        weekendDays++;
        if (i === 0) {
          this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'START_DATE_WEEKEND' });
        } else if (i === (dates.length - 1)) {
          this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'END_DATE_WEEKEND' });
        }
      }

      if (this.isDateReserved(selectedDate)) {
        this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'DATE_ALREADY_RESERVED' });
      }

    });

    if ((dates.length - weekendDays) > 5) {
      this.errors.push({ date: null, error: 'TOO_MANY_DAYS' });
    }

    this.errorsChanged.emit(this.errors);
  }

  private convertSqlDateToJsDate(dateToConvert: string): Date {
    return new Date(dateToConvert.replace('T', ' '));
  }

  private isDateReserved(date: Date | moment.Moment): boolean {
    let isReserved = false;
    this.reservations.forEach(reservation => {
      if (moment(date).isBetween(reservation.startDate, reservation.endDate, 'day', '[]')) {
        isReserved = true;
      }
    });

    return isReserved;
  }
}
