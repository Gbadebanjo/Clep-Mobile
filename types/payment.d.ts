export type PaymentForm = {
    "name": string
    "amount": number
    "interval": string
    "currency": string
}

export type WebhookForm = {
    event: 'subscription.created';
    data: {
        id: number;
        tx_ref: string;
        flw_ref: string;
        amount: number;
        currency: string;
        status: string;
        payment_plan: number;
    };
}
