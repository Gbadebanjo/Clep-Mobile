import { Store } from './auth';

export type StoreCategory = {
    id: string;
    name: string;
    description: string;
    store: Store;
    isPublished: true;
    slug: string;
    image: { url: string; filename: string; id: string };
    order: number;
    createdAt: string;
    updatedAt: string;
};

export type StoreCategoriesResponse = {
    docs: StoreCategory[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
};

export type AddCategory = {
    name: string;
    description: string;
    store: string;
    isPublished: boolean;
    image: string;
};
