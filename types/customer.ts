export interface CustomerSettings {
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    timezone: string;
    currency: string;
    language: string;
}

export type CreateAddressPayload = {
    id?: string;
    addressName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
    notes: string;
};

export interface CustomerPreferences extends CustomerSettings {
    id: string;
    customerId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
}

export interface CustomerProfile {
    id: string;
    email: string;
    name: string;
    // lastName: string;
    customerName: string;
    phoneNumber?: string;
    preferences: CustomerPreferences;
    shippingAddresses: Address[];
    billingAddresses: Address[];
    createdAt: string;
    updatedAt: string;
}

export type Customer = CustomerProfile;
