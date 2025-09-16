import { Store, User } from './auth';
import { product } from './product';

export type singleBargain = {
    id: string;
    initial_price: number;
    current_offer: number;
    counter_offer: number;
    status: string;
    product: product;
    user: User;
    store: Store;
    createdAt: string;
    updatedAt: string;
    expires_at: string;
};

export type Bargain = {
    data: singleBargain;
};

export type BargainResponse = {
    success: boolean;
    data: Bargain[];
    totalDocs: number;
    page: number;
    totalPages: number;
};

export type SingleBargainResponse = {
    data: {
        bargain: singleBargain;
    };
};
