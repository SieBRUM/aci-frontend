import { ProductStatus } from './product-status.enum';

/* The backend DTO for the shopping cart product data */
export interface IProductFlat {
    id: number;
    name: string;
    description: string;
    image: string;
    productState: ProductStatus;
}
