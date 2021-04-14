/* The backend reservation class */
export interface IReservation {
    id: number;
    state: number;
    startDate: Date;
    endDate: Date;
    returnDate: Date | null;
    renterId: number;
    reviewerId: number;
    isApproved: boolean;
    productId: number;
}
