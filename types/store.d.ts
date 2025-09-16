import { User } from './auth';

export interface StoreType {
    id: string;
    vendor: {
        id: string;
        user: string;
        verificationStep: string;
        ninVerification: {
            ninNumber: string;
            verificationId: string;
            verifiedData: {
                firstName: string;
                lastName: string;
            };
            verifiedAt: string;
        };
        businessDetails: {
            businessName: string;
            businessEmail: string;
            businessPhone: string;
            businessAddress: string;
            businessCity: string;
            businessState: string;
            businessCountry: string;
        };
        flutterwaveSubaccount: {
            subaccountId: string;
            status: string;
        };
        createdAt: string;
        updatedAt: string;
    };
    owner: string;
    name: string;
    slug: string;
    status: string;
    contact: {
        email: string;
        phone: string;
    };
    address: Record<string, unknown>;
    settings: {
        currency: string;
        language: string;
        timezone: string;
        autoAcceptOrders: boolean;
    };
    metrics: {
        totalOrders: number;
        totalRevenue: number;
        averageOrderValue: number;
        totalProducts: number;
        rating: {
            average: number;
            count: number;
        };
    };
    paymentSettings: {
        flutterwave: {
            subaccountId: string;
            splitType: string;
            splitValue: number;
        };
        escrow: {
            enabled: boolean;
            holdPeriod: number;
            minimumAmount: number;
        };
        wallet: {
            balance: number;
            pendingBalance: number;
            minimumWithdrawal: number;
        };
    };
    createdAt: string;
    updatedAt: string;
    shippingZones: Array<unknown>;
}

export interface StoresResponseType {
    docs: Array<VendorStoreType>;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export type StoreDetailsForm = {
    name: string;
    description: string;
    contact: {
        email: string;
        phone: string;
        whatsapp: string;
        supportHours: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    settings: {
        currency: string;
        language: string;
        timezone: string;
        autoAcceptOrders: boolean;
        minimumOrderAmount: number;
        maximumOrderAmount: number;
    };
};

export type UpdateStoreDetailsForm = {
    name?: string;
    description?: string;
    settings?: {
        minimumOrderAmount?: number;
        [key: string]: any;
    };
};

export type WithdrawFromStoreForm = {
    amount?: number;
};

export type StoreQueryParams = {
    where?: {
        [key: string]: any; // Allows flexible query structure
    };
    page?: number;
    limit?: number;
    sort?: string;
    depth?: number;
};

export type Transaction = {
    id: string;
    createdAt: string;
    updatedAt: string;
    transactionId: string;
    wallet: User;
    type: string;
    amount: number;
    fee: number;
    netAmount: number;
    currency: string;
    status: string;
    relatedEntities: Record<string, unknown>;
};

export type WalletResponse = {
    data: {
        balances: {
            total: number;
            escrow: number;
            available: number;
        };
        withdrawalSettings: {
            minimumWithdrawal: number;
            autoWithdrawal: boolean;
        };
        status: string;
        recentTransactions: Transaction[];
        pendingWithdrawals: Transaction[];
    };
};

export type Advertisement = {
    store: string;
    position: string;
    image: string;
    link?: string;
    active: boolean;
};

export type HeroSlide = {
    slide: string; // Media ID
    caption?: string;
    link?: string;
};

export interface CommissionReportResponse {
    commissionRate: number;
    totalCommissionPaid: number;
    totalSales: number;
    effectiveRate: number;
    transactions: CommissionTransaction[];
}

export interface CommissionTransaction {
    id: string;
    amount: number;
    createdAt: string;
    status: string;
    metadata: {
        escrowId: string;
        feeType: string;
        originalAmount: number;
        commissionRate: number;
    };
}
