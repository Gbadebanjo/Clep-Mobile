import { Store, User } from '@/types/auth';

export type product = CreateProductForm & {
    id: string;
    status: string;
    isFeatured: boolean;
    is_featured?: boolean;
    best_seller?: boolean;
    createdAt: string;
    updatedAt: string;
    base_price: number;
    base_sale_price: number;
    is_on_sale: boolean;
    average_rating: number | null;
    rating_distribution?: {
        '1': number;
        '2': number;
        '3': number;
        '4': number;
        '5': number;
    };
    user?: User;
    store?: Store;
    related_products: product[];
};

export type productResponse = {
    docs: Array<product>;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
};

export type CreateProductForm = {
    id?: string;
    name: string;
    description: string;
    summary: string;
    currency?: string;
    categories: {
        category:
            | string
            | {
                  id: string;
                  name: string;
                  slug?: string;
                  description?: string;
                  createdAt?: string;
                  updatedAt?: string;
              };
    }[];
    tags: {
        tag: string;
        id?: string;
    }[];
    default_images: {
        image:
            | string
            | {
                  id?: string;
                  uploadedBy?: string;
                  isPublic?: boolean;
                  fileDetails?: Record<string, unknown>;
                  prefix?: string;
                  filename?: string;
                  mimeType?: string;
                  filesize?: number;
                  width?: number;
                  height?: number;
                  focalX?: number;
                  focalY?: number;
                  sizes?: {
                      thumbnail?: { url: string };
                      card?: { url: string };
                      tablet?: { url: string };
                      extraLarge?: { url: string };
                  };
                  createdAt?: string;
                  updatedAt?: string;
                  tags?: string[];
                  url: string;
              };
        id?: string;
    }[];
    variations: Variation[];

    seo: {
        title: string;
        description: string;
        keywords: string;
    };
    status: string;
};

export type UpdateStockForm = {
    variantId: string;
    quantity: number;
};

export type UpdatePriceForm = {
    variantId: string;
    price: {
        amount: number;
        compareAt?: number;
        currency: string;
    };
};

export type AddReviewForm = {
    rating: number;
    comment: string;
    userId: string;
};

export type QueryParams = {
    [key: string]: any;
};

export type BulkProductUpdateForm = {
    products: Array<{
        id: string;
        data: {
            status?: string;
            variants: Array<{
                id: string;
                stock?: number;
                price?: {
                    amount: number;
                    currency: string;
                };
            }>;
        };
    }>;
};

export type ProductSearchForm = {
    query?: string;
    filters?: {
        category?: string;
        gender?: string;
        fit?: string;
    };
    priceRange?: {
        min?: number;
        max?: number;
    };
    sizes?: string[];
    colors?: string[];
    materials?: string[];
    sort?: string;
    page?: number;
    limit?: number;
};

export type MeasurementFilterForm = {
    measurements: {
        bust?: { min?: number; max?: number };
        waist?: { min?: number; max?: number };
        hip?: { min?: number; max?: number };
    };
    tolerance?: number;
    unit?: string;
};

export type ProductAnalyticsParams = {
    productId: string;
    startDate: string;
    endDate: string;
};

export type ProductBestSellersParams = {
    category: string;
    period: string;
};

export type MediaResponse = {
    doc: {
        id: string;
        uploadedBy: User;
        isPublic: boolean;
        fileDetails: Record<string, unknown>;
        prefix: string;
        filename: string;
        mimeType: string;
        filesize: number;
        width: number;
        height: number;
        focalX: number;
        focalY: number;
        sizes: {
            thumbnail: {
                width: number | null;
                height: number | null;
                mimeType: string | null;
                filesize: number | null;
                filename: string | null;
                url: string;
            };
            card: {
                width: number;
                height: number;
                mimeType: string;
                filesize: number;
                filename: string;
                url: string;
            };
            tablet: {
                width: number;
                height: number;
                mimeType: string;
                filesize: number;
                filename: string;
                url: string;
            };
            extraLarge: {
                width: number;
                height: number;
                mimeType: string;
                filesize: number;
                filename: string;
                url: string;
            };
        };
        createdAt: string;
        updatedAt: string;
        tags: string[];
        url: string;
    };
    message: string;
};

export interface Variation {
    id: string;
    name: string;
    price: number;
    sale_price: number;
    stock: number;
    sku: string;
    image: string | null;
    quantity?: number;
    attributes?: Array<{
        name: string;
        value: string;
    }>;
    is_visible?: boolean;
    low_stock_threshold?: number;
}
