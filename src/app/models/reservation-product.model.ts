import { IProductFlat } from './product-flat.model';

export interface IReservationProduct {
    id: number;
    startDate: Date;
    endDate: Date;
    returnDate: Date | null;
    reviewerId?: number;
    isApproved?: boolean;
    product: IProductFlat;
}
