import BaseAPI from '@/apis/base-api';
import { SubscriptionForm } from '@/types/subscription';

export class SubscriptionsApi extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async createSubscription(
        data: SubscriptionForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/subscriptions', data);
        return response.data;
    }

    public async getUserSubscription(
        user_id: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get('/subscriptions', {
            params: { user: user_id },
        });
        return response.data;
    }

    public async cancelSubscription(
        id: string,
        immediate: boolean = false
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/subscriptions/${id}/cancel`,
            {
                immediate,
            }
        );
        return response.data;
    }

    public async trackFeatureUsage(
        id: string,
        feature: string,
        amount: number
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/subscriptions/${id}/usage`,
            {
                feature,
                amount,
            }
        );
        return response.data;
    }

    public async getUsageReport(
        id: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get(
            `/subscriptions/${id}/usage`
        );
        return response.data;
    }
}
