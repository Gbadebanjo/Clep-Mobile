export type SubscriptionForm = {
    planId: string;
    interval: 'string'
    billingDetails: {
        name: string;
        email: string;
        phone: string;
        address: {
            line1: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
        };
    };
}
