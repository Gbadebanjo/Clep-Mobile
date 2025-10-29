import BaseAPI from '@/apis/base-api';
import { Store } from '@/types/auth';
import {
    Advertisement,
    HeroSlide,
    StoreDetailsForm,
    StoreQueryParams,
    StoreType,
    UpdateStoreDetailsForm,
    WithdrawFromStoreForm
} from '@/types/store';
import axios from 'axios';

export class StoreAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }

    public async findStores(
        params?: StoreQueryParams
    ): Promise<{ [key: string]: string | number }> {
        const requestParams: any = {
            where: {
                ...params?.where,
            },
        };

        // Add pagination parameters if provided
        if (params?.page !== undefined) {
            requestParams.page = params.page;
        }
        if (params?.limit !== undefined) {
            requestParams.limit = params.limit;
        }
        if (params?.sort) {
            requestParams.sort = params.sort;
        }

        const response = await this.axiosInstance.get('/stores', {
            params: requestParams,
        });
        return response.data;
    }

    public async getStoreById(
        storeId: string
    ): Promise<{ data: StoreType } | null> {
        try {
            const response = await this.axiosInstance.get(`/stores/${storeId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching store by ID:', error);
            return null;
        }
    }

    public async queryStore(
        query?: Record<string, any>
    ): Promise<{ data: { docs: [Store] } }> {
        const response = await this.axiosInstance.get(`/stores`, {
            params: query,
        });
        return response.data;
    }

    public async getAllStores(): Promise<any> {
        const response = await this.axiosInstance.get(
            `/stores?limit=9999999999&page=1`
        );
        return response.data;
    }

    public async createStore(
        data: StoreDetailsForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/stores', data);
        return response.data;
    }

    public async updateStore(
        storeId: string,
        data: UpdateStoreDetailsForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/stores/${storeId}`,
            data
        );
        return response.data;
    }

    public async getStoreWalletBalance(
        storeId: string
    ): Promise<{ data: { balance: number } }> {
        const response = await this.axiosInstance.get(
            `/stores/${storeId}/wallet/balance`
        );
        return response.data;
    }

    public async withdrawFromStoreWallet(
        data: WithdrawFromStoreForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/vendors/request-withdrawal`,
            data
        );
        return response.data;
    }

    public async releaseStoreEscrow(
        storeId: string,
        orderId: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/stores/${storeId}/escrow/release`,
            { orderId }
        );
        return response.data;
    }

    public async updateStoreLogo(
        storeId: string,
        logo: string,
        banner: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/stores/${storeId}/upload-branding`,
            { logo, banner }
        );
        return response.data;
    }

    public async addAdvert(data: Advertisement): Promise<Record<string, any>> {
        const response = await this.axiosInstance.post(
            '/store-adverts/create',
            data
        );
        return response.data;
    }

    public async updateStoreBranding(
        storeId: string,
        data: { [key: string]: any }
      ): Promise<{ [key: string]: string | number }> {
      
      try {
          const response = await this.axiosInstance.patch(`/stores/${storeId}`, data);
     
          return response.data;
        } catch (error: any) {
          console.log("🟥 API Error:", error?.response?.data || error?.message);
          throw error?.response?.data || error;
        }
      }
      

    public async updateStoreHeroSlides(
        storeId: string,
        slides: HeroSlide[]
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/stores/${storeId}/hero-slides/update`,
            { slides }
        );
        return response.data;
    }

    public async getStoreByNumber(
        storeNumber: string
    ): Promise<{ data: Store } | null> {
        try {
            const params: StoreQueryParams = {
                where: {
                    storeNumber: { equals: storeNumber },
                },
                limit: 1,
                depth: 2,
            };

            const response = await this.axiosInstance.get<{ docs: Store[] }>(
                '/stores',
                { params }
            );
            if (response.data?.docs && response.data.docs.length > 0) {
                return { data: response.data.docs[0] };
            } else {
                return null;
            }
        } catch (error) {
            console.error(
                `Error fetching store by number ${storeNumber}:`,
                error
            );
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
            return null;
        }
    }

    public async getMyStores(): Promise<{ data: Store } | null> {
        try {
            // Use the Next.js API route instead of direct backend call
            const response = await this.axiosInstance.get('/stores/my-stores');
            // The my-stores endpoint returns the first store in data.data if it exists
            if (response.data?.data?.id) {
                return { data: response.data.data };
            } else if (response.data?.data?.[0]) {
                // If it's an array, take the first one
                return { data: response.data.data[0] };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching my stores:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
            return null;
        }
    }
}
