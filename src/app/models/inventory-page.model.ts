import { IProductData } from './product-data.model';

/**
 * Defines data that is used in the inventory table
 */
export interface IInventoryPage {
  // Collection of products
  products: IProductData[] | undefined;
  // The total amount of products accross all pages
  totalProductCount: number;
  // The page the object belongs to as an index starting with 0
  currentPage: number;
}
