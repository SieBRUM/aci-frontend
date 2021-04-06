import { ICategory } from './category.model';

export interface IProductFlat {
    id: number;
    catalogNumber: number;
    name: string;
    description: string;
    isAvailable: boolean;
    archivedSince: Date | null;
    category: ICategory;
    image: string;
}
