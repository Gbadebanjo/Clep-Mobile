import { User } from './auth';
import { OrderResponse } from './order';
import { product } from './product';

export type SingleDipsute = {
    id: string;
    title: string;
    description: string;
    status: string;
    product: product;
    user: User;
    order: OrderResponse;
    createdAt: string;
    updatedAt: string;
};

export type DisputeResponse = {
    success: true;
    data: SingleDipsute[];
    totalDocs: number;
    page: number;
    totalPages: number;
    message: string;
};

export type DisputeStatistics = {
    success: boolean;
    data: {
        total_disputes: number;
        disputes_by_status: {
            open: number;
            inProgress: number;
            closed: number;
            resolved: number;
        };
        resolution_rate: number;
    };
    message: string;
};

export type CreateDispute = {
    title: string;
    description: string;
    product_id: string;
    order_id: string;
    status: 'open';
    user: string;
    escrowId: string;
};
