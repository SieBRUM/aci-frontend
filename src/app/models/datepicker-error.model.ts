import * as moment from 'moment';

export interface IDatePickerError {
    date: Date | moment.Moment | string | null;
    error: string;
}
