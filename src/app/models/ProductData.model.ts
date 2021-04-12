import { ProductStatus } from './ProductStatus.enum';

/**
 * Defines data that is used in the inventory table
 */
export interface ProductData {
  // The name of the product
  name: string;
  // The physical location of the product
  location: string;
  // Whether the product requires approval to be rented
  requiresApproval: boolean;
  // The availability status of the product
  status: ProductStatus;
}
