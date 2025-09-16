import { User } from './auth';

export type CustomerProfile = {
    id: string;
    createdAt: string;
    updatedAt: string;
    customerName: string;
    shippingAddresses: Address[]; // You might want to define a specific type for shipping addresses
    preferences: {
        notifications: {
            email: boolean;
            sms: boolean;
            marketing: boolean;
        };
        language: string;
        currency: string;
        timezone: string;
    };
    metrics: {
        totalOrders: number;
        totalSpent: number;
        avgOrderValue: number;
    };
    status: string;
};

export type FollowDetails = {
    id: string;
    follower: User;
    vendor: User;
    followedAt: string;
    notifyOnNewProducts: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Address = {
    id: string;
    addressName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault: boolean;
    notes: string;
};
