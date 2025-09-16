import BaseAPI from '@/apis/base-api';
import { CategoryResponse } from '@/types/category';

export class CategoryAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async getCategories(
        query?: Record<string, any>
    ): Promise<{ data: CategoryResponse }> {
        const response = await this.axiosInstance.get(`/categories`, {
            params: query,
        });
        return response.data;
    }
}
