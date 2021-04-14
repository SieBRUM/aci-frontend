import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { IReservation } from '../models/reservation.model';
import * as moment from 'moment';
import { IDatePickerError } from '../models/datepicker-error.model';
import { IDateChangedEvent } from '../models/date-changed-event.model';

@Component({
  selector: 'app-product-datepicker',
  templateUrl: './app-product-datepicker.component.html',
  styleUrls: ['./app-product-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppProductDatepickerComponent implements OnInit {

  /* Contains the productId given by the parent component */
  @Input() productId = -1;
  /* Contains the startDate given by the parent component. If null, no default value will be set */
  @Input() startDate: Date | null = null;
  /* Contains the endDate given by the parent component. If null, no default value will be set */
  @Input() endDate: Date | null = null;

  /* Emitter to emit when errors are changed. Other components can hook into this */
  @Output() errorsChanged: EventEmitter<Array<IDatePickerError>> = new EventEmitter();
  /* Emitter to emit when selected date(s) are changed. Other components can hook into this */
  @Output() datesChanged: EventEmitter<IDateChangedEvent> = new EventEmitter();

  /* Contains loading state of the reservation data */
  isLoading = true;
  /* Contains all reservations received from the backend */
  reservations: Array<IReservation> = [];
  /* Contains all errors */
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
          if (this.startDate !== null && this.endDate === null) {
            this.endDate = this.startDate;
          }
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

  /*
    Custom classes for the days that are already reserved

    @param cellDate: Date to check
    @param view: "month" | "year" | "multiyear" Contains the current viewing type
    @returns string: The class to use
  */
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      return (this.isDateReserved(cellDate) ? 'is-reserved' : '');
    }

    return '';
  }

  /*
    Custom filter to disable entries in the datepicker.
    Days are disabled when:
    - The date is already reserved
    - It's a saterday
    - It's a sunday

    @param d Date | null The date to check if it has to be disabled
    @returns boolean true if enabled. False if disabled
  */
  dateFilter = (d: Date | null): boolean => {
    if (d === null) {
      return false;
    }
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && !this.isDateReserved(moment(d));
  }

  /*
    Hook on the Material datepicker DateChanged event.
    All functionality when the selected date is changed.
    Will check if the selected date has errors.

    Emits errors and new dates so other components can hook into this.
  */
  dateChangeEvent(): void {
    this.errors = [];

    if (this.startDate == null) {
      this.errors.push({ date: null, error: 'PRODUCT_DATEPICKER.ERROR.START_DATE_NULL' });
      return;
    }

    // Later, add 'time' slots
    this.startDate.setHours(23, 59, 58, 0);
    if (this.endDate !== null) {
      this.endDate.setHours(23, 59, 59, 0);
    }

    const startDate = moment(this.startDate).clone();
    const endDate = moment(this.endDate).clone();
    const dates = [];
    let weekendDays = 0;
    // Later, add a 'time' slot

    if (startDate < moment()) {
      this.errors.push({ date: null, error: 'PRODUCT_DATEPICKER.ERROR.START_DATE_CANNOT_BE_PAST' });
    }

    if (this.endDate !== null) {
      // Later, add a 'time' slot
      if (endDate.isBefore(startDate)) {
        this.errors.push({ date: null, error: 'PRODUCT_DATEPICKER.ERROR.END_DATE_BEFORE_START_DATE' });
      }
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
          this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'PRODUCT_DATEPICKER.ERROR.START_DATE_WEEKEND' });
        } else if (i === (dates.length - 1)) {
          this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'PRODUCT_DATEPICKER.ERROR.END_DATE_WEEKEND' });
        }
      }

      if (this.isDateReserved(selectedDate)) {
        this.errors.push({ date: selectedDate.clone().format('M/D/YYYY'), error: 'PRODUCT_DATEPICKER.ERROR.DATE_ALREADY_RESERVED' });
      }

    });

    if ((dates.length - weekendDays) > 5) {
      this.errors.push({ date: null, error: 'PRODUCT_DATEPICKER.ERROR.TOO_MANY_DAYS' });
    }

    this.errorsChanged.emit(this.errors);
    this.datesChanged.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  /*
    Converts the SQL date format to the Js date format

    @param dateToConvert: string The SQL date to return
    @returns Date The converted date
  */
  private convertSqlDateToJsDate(dateToConvert: string): Date {
    return new Date(dateToConvert.replace('T', ' '));
  }

  /*
    Checks if a date is already reserved

    @param date: Date | moment.Moment The date to check if it's already reserved
    @returns boolean True if already reserved. False if not reserved yet.
  */
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
