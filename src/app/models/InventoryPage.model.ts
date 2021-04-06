import { ProductData } from './ProductData.model';

/**
 * Defines data that is used in the inventory table
 */
export interface InventoryPage {
  products: ProductData[] | undefined;
  totalProductCount: number;
  currentPage: number;
}