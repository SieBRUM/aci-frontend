import { ProductData } from './ProductData.model';

/**
 * Defines data that is used in the inventory table
 */
export interface InventoryPage {
  // Collection of products
  products: ProductData[] | undefined;
  // The total amount of products accross all pages
  totalProductCount: number;
  // The page the object belongs to as an index starting with 0
  currentPage: number;
}