import BaseAPI from '@/apis/base-api';
import {
    AuthenticateRequest,
    AuthenticateResponse,
    CreateOrderResponse,
    DeliveryEstimateTimeResponse,
    DeliveryRequest,
    OrderDeliveryCostResponse,
    OrderTrackResponse,
    SingleOrderResponse,
} from '@/types/fez';

export class FezAPI extends BaseAPI {
    private fez_token: string | null = null;
    private isAuthenticating: boolean = false;

    constructor(token?: string) {
        super(token);

        this.axiosInstance.interceptors.request.use(
            async (config) => {
                if (!this.fez_token) {
                    await this.authenticateAndStore();
                }
                if (this.fez_token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${this.fez_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // TODO :: We need Optimise the API to add response interceptor to ensure authenticate is only
        // called only when token is not available or expired
    }

    private async authenticateAndStore() {
        if (this.isAuthenticating) return;

        this.isAuthenticating = true;
        try {
            const authData: AuthenticateRequest = {
                user_id: process.env.NEXT_PUBLIC_FEZ_USERID as string,
                password: process.env.NEXT_PUBLIC_FEZ_PASSWORD as string,
            };

            const response = await this.axiosInstance.post<{
                data: AuthenticateResponse;
            }>('/fez/user/authenticate', authData);

            this.fez_token = response?.data?.data?.authDetails?.authToken;
        } catch (error) {
            console.error('Authentication failed', error);
        } finally {
            this.isAuthenticating = false;
        }
    }

    public async createOrder(
        data: DeliveryRequest
    ): Promise<{ data: CreateOrderResponse }> {
        const response = await this.axiosInstance.post('/fez/order', data);
        return response.data;
    }

    public async getOrderById(
        order_id: string
    ): Promise<{ data: SingleOrderResponse }> {
        const response = await this.axiosInstance.get(`/orders/${order_id}`);
        return response.data;
    }

    public async deliveryCost(data: {
        state: string;
        pickUpState: string;
        weight: number;
    }): Promise<{
        data: OrderDeliveryCostResponse;
    }> {
        const response = await this.axiosInstance.post('/fez/order/cost', data);
        return response.data;
    }

    public async trackById(
        orderNumber: string
    ): Promise<{ data: OrderTrackResponse }> {
        const response = await this.axiosInstance.get(
            `/order/track/${orderNumber}`
        );
        return response.data;
    }

    public async deliveryEstimateTime(data: {
        delivery_type: 'import' | 'export' | 'local';
        pick_up_state: string;
        drop_off_state: number;
    }): Promise<{
        data: DeliveryEstimateTimeResponse;
    }> {
        const response = await this.axiosInstance.post('/fez/order/cost', data);
        return response.data;
    }
}
