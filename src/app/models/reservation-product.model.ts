import { IProductFlat } from './product-flat.model';

export interface IReservationProduct {
    id: number;
    startDate: Date;
    endDate: Date;
    returnDate?: Date | null;
    pickedUpDate?: Date | null;
    reviewerId?: number;
    isApproved?: boolean;
    productId: number;
    product: IProductFlat | null;
}
