import BaseAPI from '@/apis/base-api';
import { productResponse } from '@/types/product';
import { AddCategory, StoreCategoriesResponse } from '@/types/store-category';

export class StoreCategoryAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async getCategories(
        query: Record<string, any>
    ): Promise<{ data: StoreCategoriesResponse }> {
        const response = await this.axiosInstance.get(`/store-categories`, {
            params: query,
        });
        return response.data;
    }

    public async addCategory(
        data: AddCategory
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.post(
            `/store-categories`,
            data
        );
        return response.data;
    }

    public async updateCategory(
        categoryId: string,
        data: AddCategory
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.patch(
            `/store-categories/${categoryId}`,
            data
        );
        return response.data;
    }

    public async deleteCategory(
        categoryId: string
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.delete(
            `/store-categories/${categoryId}`
        );
        return response.data;
    }

    public async getProducts(storeId: string): Promise<productResponse> {
        const response = await this.axiosInstance.get(
            `api/products?where[store][equals]=${storeId}`
        );
        return response.data;
    }
}
