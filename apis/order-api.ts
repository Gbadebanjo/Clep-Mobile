import BaseAPI from '@/apis/base-api';
import {
    calculateShippingForm,
    CreateOrderForm,
    DeliveryStatus,
    DisputeForm,
    OrderBatchActionForm,
    OrderResponse,
    OrderResponseType,
    OrderStatusUpdate
} from '@/types/order';

export class OrderAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async createOrder(
        data: CreateOrderForm
    ): Promise<{ data: { doc: OrderResponse } }> {
        const response = await this.axiosInstance.post('/orders', data);
        return response.data;
    }

    public async getCustomerOrder(
        userId: string,
        queryParams?: Record<string, any>
    ): Promise<{ data: OrderResponseType; queryParams }> {
        const params = queryParams || {};
        const response = await this.axiosInstance.get(
            `/orders/my-orders//${userId}`,
            {
                params,
            }
        );
        return response.data;
    }

    public async getOrder(
        orderId: string
    ): Promise<{ data: { data: OrderResponse } }> {
        const response = await this.axiosInstance.get(
            `/orders/order/${orderId}`
        );
        return response.data;
    }

    public async getOrderTracking(
        trackingId: string
    ): Promise<{ data: { data: { order: DeliveryStatus } } }> {
        const response = await this.axiosInstance.post(`/orders/order-status`, {
            orderId: trackingId,
        });
        return response.data;
    }

    public async searchOrders(
        storeId: string,
        query?: Record<string, any>
    ): Promise<{ data: OrderResponse[] }> {
        const response = await this.axiosInstance.get(
            `/orders/my-store-orders/${storeId}`,
            {
                params: { query },
            }
        );
        return response.data;
    }

    public async getMyStoreOrders(
        storeId: string,
        queryParams?: Record<string, any>
    ): Promise<{ data: OrderResponseType }> {
        const params = queryParams || {};
        const response = await this.axiosInstance.get(
            `/orders/my-store-orders/${storeId}`,
            { params }
        );
        return response.data;
    }

    public async getOrderStats(
        storeId: string
    ): Promise<{ data: OrderResponseType }> {
        const response = await this.axiosInstance.get(
            `/orders/stats/${storeId}`
        );
        return response.data;
    }

    public async listOrders(
        queryParams: Record<string, any>
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get('/orders', {
            params: queryParams,
        });
        return response.data;
    }

    public async updateOrderStatus(
        orderId: string,
        data: OrderStatusUpdate
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/orders/${orderId}/status`,
            data
        );
        return response.data;
    }

    public async confirmOrder(
        orderId: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/orders/${orderId}/actions/confirm`
        );
        return response.data;
    }

    public async cancelOrder(
        orderId: string,
        reason: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/orders/${orderId}/actions/cancel`,
            { reason }
        );
        return response.data;
    }

    public async requestRefund(
        orderId: string,
        reason: string,
        refundAmount: number,
        token: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/orders/${orderId}/actions/refund`,
            { reason, refundAmount }
        );
        return response.data;
    }

    public async openDispute(
        orderId: string,
        reason: string,
        disputeDetails: DisputeForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/orders/${orderId}/actions/dispute`,
            { reason, disputeDetails }
        );
        return response.data;
    }

    public async calculateShipping(
        data: calculateShippingForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            '/orders/shipping/calculate',
            data
        );
        return response.data;
    }

    public async trackOrder(
        orderId: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get(
            `/orders/${orderId}/tracking`
        );
        return response.data;
    }

    public async batchActions(
        data: OrderBatchActionForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/orders/batch', data);
        return response.data;
    }
}
