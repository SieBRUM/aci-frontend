import { ICatalogFlat } from './catalog-flat.model';

export interface CatalogItemsWithCategory {
    catalogItems: ICatalogFlat[];
    categoryName: string;
}
