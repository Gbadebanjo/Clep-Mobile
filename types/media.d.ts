export type UploadMediaForm = {
    file: File;
}

// Interface for querying media
export type MediaQueryParams = {
    page?: number;
    limit?: number;
    sort?: string;
    [key: string]: any; // Extendable for additional filters
}

export type MediaDetails =  {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
    createdAt: string;
    updatedAt: string;
}
