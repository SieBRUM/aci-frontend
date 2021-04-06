import { ProductStatus } from './ProductStatus.enum';

/**
 * Defines data that is used in the inventory table
 */
export interface ProductData {
  name: string;
  location: string;
  reserver: string | null;
  status: ProductStatus;
}
