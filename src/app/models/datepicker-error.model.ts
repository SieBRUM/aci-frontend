import * as moment from 'moment';
/* Used for the ErrorChangedEvent emitted by the custom product datepicker */
export interface IDatePickerError {
    date: Date | moment.Moment | string | null;
    error: string;
}
