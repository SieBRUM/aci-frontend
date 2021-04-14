import { ICartProduct } from './cart-product.model';

/* DTO used to send data to the reservation endpoint  */
export interface IAddReservation {
    productModels: Array<ICartProduct>;
}
