import BaseAPI from '@/apis/base-api';
import { PaymentForm, WebhookForm } from '@/types/payment';

export class PaymentApi extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async createPaymentPlan(
        data: PaymentForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/payment-plans', data);
        return response.data;
    }

    public async getPaymentPlan(): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get('/payment-plans');
        return response.data;
    }

    public async cancelPaymentPlan(
        id: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/payment-plans/${id}/cancel`
        );
        return response.data;
    }

    public async paymentWebhook(
        data: WebhookForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/webhooks/flutterwave`,
            data
        );
        return response.data;
    }
}
