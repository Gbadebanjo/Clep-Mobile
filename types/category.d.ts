export type CategoryImage = {
    id: string;
    uploadedBy: string;
    isPublic: boolean;
    tags: string[];
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
            width: number;
            height: number;
            mimeType: string;
            filesize: number;
            filename: string;
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
    url: string;
};

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
    category_image: CategoryImage;
    createdAt: string;
    updatedAt: string;
};

export type CategoryResponse = {
    docs: Category[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
};
