import axios, { AxiosInstance } from "axios";
import {
    AuthenticateRequest,
    AuthenticateResponse,
    CreateOrderResponse,
    DeliveryEstimateTimeResponse,
    DeliveryRequest,
    OrderDeliveryCostResponse,
    OrderTrackResponse,
    SingleOrderResponse,
} from "@/types/fez";

const baseURL = process.env.EXPO_PUBLIC_FEZ_API_BASE_URL;

export class FezAPI {
    private axiosInstance: AxiosInstance;
    private fez_token: string | null = null;
    private isAuthenticating: boolean = false;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 20000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // REQUEST INTERCEPTOR
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
    }

    /**
     * Authenticate using FEZ credentials and store token
     */
    private async authenticateAndStore() {
        if (this.isAuthenticating) return;

        this.isAuthenticating = true;

        try {
            const authData: AuthenticateRequest = {
                user_id: process.env.EXPO_PUBLIC_FEZ_USERID!,
                password: process.env.EXPO_PUBLIC_FEZ_PASSWORD!,
            };

            // console.log("authData", authData);

            const response = await axios.post<{
                authDetails: any; data: AuthenticateResponse 
}>(
                `${baseURL}/user/authenticate`,
                authData,
                { headers: { "Content-Type": "application/json" } }
            );

            this.fez_token = response?.data.authDetails?.authToken;

            console.log("FEZ TOKEN STORED:", this.fez_token);
        } catch (error: any) {
            console.error("Authentication failed", error?.response?.data || error.message);
        } finally {
            this.isAuthenticating = false;
        }
    }

    public async createOrder(data: DeliveryRequest) {
        console.log("FEZ ORDER PAYLOAD:", data);
        const response = await this.axiosInstance.post<{ data: CreateOrderResponse }>(
            "/order",
            data
        );
        return response.data;
    }

    public async getOrderById(order_id: string) {
        const response = await this.axiosInstance.get<{ data: SingleOrderResponse }>(
            `/orders/${order_id}`
        );
        return response.data;
    }

    public async deliveryCost(data: {
        state: string;
        pickUpState: string;
        weight: number;
    }) {
        const response = await this.axiosInstance.post<{ data: OrderDeliveryCostResponse }>(
            "/order/cost",
            data
        );
        return response.data;
    }

    public async trackById(orderNumber: string) {
        const response = await this.axiosInstance.get<{ data: OrderTrackResponse }>(
            `/order/track/${orderNumber}`
        );
        return response.data;
    }

    public async deliveryEstimateTime(data: {
        delivery_type: "import" | "export" | "local";
        pick_up_state: string;
        drop_off_state: number;
    }) {
        const response = await this.axiosInstance.post<{ data: DeliveryEstimateTimeResponse }>(
            "/order/cost",
            data
        );
        return response.data;
    }
}
