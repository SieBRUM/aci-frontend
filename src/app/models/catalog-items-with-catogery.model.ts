import { ICatalogFlat } from "./catelog-flat.model";

export interface CatalogItemsWithCategory {
    catalogItems: ICatalogFlat[];
    categoryName: string;
}