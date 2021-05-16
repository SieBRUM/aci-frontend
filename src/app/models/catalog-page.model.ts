import { CatalogItemsWithCategory } from "./catalog-items-with-catogery.model";

/**
 * Defines data that is used in the catalog table
 */
export interface CatalogPage {
  // Collection of products
  catalogItems: CatalogItemsWithCategory[];
  // The total amount of products accross all pages
  totalProductCount: number;
  // The page the object belongs to as an index starting with 0
  currentPage: number;
}