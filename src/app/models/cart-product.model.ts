/* front-end product data inside the shopping cart */
export interface ICartProduct {
    id: number;
    localId?: number;
    startDate: Date;
    endDate: Date | null;
}
