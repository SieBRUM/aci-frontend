/* Used for the DateChangedEvent emitted by the custom product datepicker */
export interface IDateChangedEvent {
    startDate: Date;
    endDate: Date | null;
}
