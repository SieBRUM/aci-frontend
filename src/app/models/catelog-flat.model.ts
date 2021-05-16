import { ICategory } from "./category.model";
import { ProductStatus } from "./ProductStatus.enum";

export interface ICatalogFlat {
    id: number;
    name: string;
    catalogNumber: number;
    description: string;
    requiresApproval: boolean;
    status: ProductStatus;
    images: Array<string>;
    category: ICategory;
    imageIndex: number;
    endDate: Date | null;
    startDate: Date;
}