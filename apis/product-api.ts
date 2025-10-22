import BaseAPI from '@/apis/base-api';
import {
    BulkProductUpdateForm,
    CreateProductForm,
    MeasurementFilterForm,
    MediaResponse,
    product,
    ProductAnalyticsParams,
    ProductBestSellersParams,
    productResponse,
    UpdatePriceForm,
    UpdateStockForm
} from '@/types/product';

export class ProductAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async createProduct(
        data: CreateProductForm
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.post('/products', data);
        return response.data;
    }

    public async updateProduct(
        productId: string,
        data: CreateProductForm
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.patch(
            `/products/${productId}`,
            data
        );
        return response.data;
    }

    public async uploadImage(data: FormData): Promise<{ data: MediaResponse }> {
        const response = await this.axiosInstance.post('/upload-media', data);
        return response.data;
    }
    public async getProducts(
        queryParams?: Record<string, any>
      ): Promise<{ data: productResponse }> {
        console.log('📦 Entered getProducts with params:', queryParams);
        try {
          const params = queryParams || {};
      
          const response = await this.axiosInstance.get('/products', { params });
      console.log('✅ ProductAPI.getProducts - Response:', JSON.stringify(response.data, null, 2));

      
          // ✅ Ensure consistent structure
          return {
            data: response.data?.data || response.data,
          };
        } catch (error: any) {
          console.error('❌ ProductAPI.getProducts - Error:', error);
      
          if (typeof window === 'undefined') {
            console.error('[ Server ] ProductAPI.getProducts - Query params:', queryParams);
          }
      
          // ✅ Return empty response on failure
          return {
            data: {
              docs: [],
              totalDocs: 0,
              limit: 10,
              totalPages: 0,
              page: 1,
              pagingCounter: 0,
              hasPrevPage: false,
              hasNextPage: false,
              prevPage: 0,
              nextPage: 0,
            },
          };
        }
      }
      
    public async getFeaturedProducts(
        queryParams?: Record<string, any>
    ): Promise<{ data: productResponse }> {
        const response = await this.axiosInstance.get('/products/featured', {
            params: queryParams,
        });
        return response.data;
    }

    public async getProductById(productId: string): Promise<{ data: product }> {
        const response = await this.axiosInstance.get(`/products/${productId}`);

        return response.data;
    }

    public async deleteProduct(
        productId: string
    ): Promise<{ data: { message: string } }> {
        const response = await this.axiosInstance.delete(
            `/products/${productId}`
        );
        return response.data;
    }

    public async updateStock(
        productId: string,
        data: UpdateStockForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/products/${productId}/stock`,
            data
        );
        return response.data;
    }

    public async updatePrice(
        productId: string,
        data: UpdatePriceForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/products/${productId}/price`,
            data
        );
        return response.data;
    }

    public async bulkUpdateProducts(
        data: BulkProductUpdateForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/products/bulk-update`,
            data
        );
        return response.data;
    }

    public async duplicateProduct(
        productId: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/products/${productId}/duplicate`
        );
        return response.data;
    }

    public async searchProducts(
        query?: Record<string, any>
    ): Promise<{ data: productResponse }> {
        const response = await this.axiosInstance.get(`/products/search`, {
            params: { query },
        });
        return response.data;
    }

    public async getCategoryStats(): Promise<{
        [key: string]: string | number;
    }> {
        const response = await this.axiosInstance.get(
            `/products/categories/stats`
        );
        return response.data;
    }

    public async filterByMeasurements(
        data: MeasurementFilterForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/products/measurements/search`,
            data
        );
        return response.data;
    }

    public async getProductAnalytics(
        params: ProductAnalyticsParams
    ): Promise<{ [key: string]: string | number }> {
        const { productId, startDate, endDate } = params;
        const response = await this.axiosInstance.get(
            `/products/${productId}/analytics`,
            {
                params: { startDate, endDate },
            }
        );
        return response.data;
    }

    public async getProductBestSellers(
        params: ProductBestSellersParams
    ): Promise<{ [key: string]: string | number }> {
        const { category, period } = params;
        const response = await this.axiosInstance.get(
            `/products/best-sellers`,
            {
                params: { category, period },
            }
        );
        return response.data;
    }
}
