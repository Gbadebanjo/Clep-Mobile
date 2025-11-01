import { BusinessDetails, CurrentPlan, Store, User } from '@/types/auth';

export type VendorDetails = {
    businessDetails: {
        businessName?: string;
        businessEmail?: string;
        businessPhone?: string;
        businessAddress?: string;
        businessCity?: string;
        businessState?: string;
    };
};

export type VerifyNinForm = {
    ninNumber: string;
    dateOfBirth?: string;
    firstName?: string;
    lastName?: string;
};

export type VerifyCacForm = {
    cacNumber: string;
    companyName?: string;
    companyType?:
        | 'business_name'
        | 'limited_company'
        | 'non_profit'
        | 'partnership'
        | 'other';
    registrationDate?: string;
    directors?: Array<{
        name: string;
        position?: string;
    }>;
};

export type VerifyBankAccountForm = {
    accountNumber: string;
    bankCode: string;
    accountName?: string;
};

export type Bank = {
    name: string;
    code: string;
    longcode?: string;
    slug?: string;
    active?: boolean;
};

export type VerificationTier = 'unverified' | 'tier1' | 'tier2';
export type VerificationStatus =
    | 'pending'
    | 'in_progress'
    | 'verified'
    | 'rejected';

export type VendorProfile = {
    id: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    verificationStatus: VerificationStatus;
    verificationTier: VerificationTier;
    verificationStep: string;
    ninVerification: {
        ninNumber: string;
        verifiedAt: string | null;
        verificationId?: string;
        verifiedData: {
            firstName?: string;
            middleName?: string;
            lastName?: string;
            dateOfBirth?: string;
            phoneNumber?: string;
        };
    };
    cacVerification: {
        cacNumber: string;
        verifiedAt: string | null;
        verificationId?: string;
        companyName?: string;
        companyType?:
            | 'business_name'
            | 'limited_company'
            | 'non_profit'
            | 'partnership'
            | 'other';
        registrationDate?: string;
        directors?: Array<{
            name: string;
            position?: string;
        }>;
    };
    businessDetails: BusinessDetails;
    bankDetails: {
        bankCode: string;
        bankName?: string;
        accountNumber: string;
        accountName: string;
        verified?: boolean;
        subaccountId?: string;
        subaccountCode?: string;
        settlementSchedule?: 'daily' | 'weekly' | 'monthly';
    };
    currentPlan: CurrentPlan;
    subscriptionStats: {
        totalPaid: number;
        subscriptionCount: number;
        averageSubscriptionLength: number;
        longestSubscriptionLength: number;
    };
    wallet: {
        walletId: string;
        balances: {
            total: number;
            escrow: number;
            available: number;
        };
        withdrawalSettings: {
            minimumWithdrawal: number;
            autoWithdrawal: boolean;
            autoWithdrawalThreshold: number;
        };
        status: string;
    };
    store: Store[];
};

export type WalletCreationResponse = {
    message: string;
    data: {
        walletData: {
            walletId: string;
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
        };
        storeId: {
            id: string;
            createdAt: string;
            updatedAt: string;
            storeNumber: string;
            storeName: string;
            vendor: {
                id: string;
                createdAt: string;
                updatedAt: string;
                user: {
                    id: string;
                    createdAt: string;
                    updatedAt: string;
                    role: string;
                    permissions: Array<{
                        permission: string;
                        id: string;
                    }>;
                    name: string;
                    // lastName: string;
                    phoneNumber: string;
                    isActive: boolean;
                    emailVerified: boolean;
                    twoFactorEnabled: boolean;
                    ninNumber: string;
                    businessDetails: {
                        businessName: string;
                        businessEmail: string;
                        businessPhone: string;
                        address: {
                            street: string;
                            city: string;
                            state: string;
                            country: string;
                            postalCode: string;
                        };
                    };
                    currentPlan: {
                        plan: string;
                    };
                    apiKey: string | null;
                    email: string;
                    verification_expiry: string | null;
                    verification_token: string | null;
                    vendorProfile: string;
                    lastLogin: string;
                    loginAttempts: number;
                };
                verificationStatus: string;
                verificationTier: string;
                verificationStep: string;
                ninVerification: {
                    ninNumber: string;
                    verifiedAt: string;
                    verificationId: string;
                    verifiedData: {
                        firstName: string;
                        middleName: string;
                        lastName: string;
                        dateOfBirth: string;
                        phoneNumber: string;
                    };
                };
                cacVerification: {
                    cacNumber: string;
                    verifiedAt: string;
                    verificationId: string;
                    companyName: string;
                    companyType: string;
                    registrationDate: string;
                    directors: Array<{
                        name: string;
                        position: string;
                    }>;
                };
                businessDetails: {
                    businessName: string;
                    businessEmail: string;
                    businessPhone: string;
                    address: {
                        street: string;
                        city: string;
                        state: string;
                        country: string;
                        postalCode: string;
                    };
                };
                bankDetails: {
                    bankCode: string;
                    bankName: string;
                    accountNumber: string;
                    accountName: string;
                    verified: boolean;
                    subaccountId: string;
                    subaccountCode: string;
                    settlementSchedule: string;
                };
                currentPlan: {
                    plan: string;
                    status: string;
                    limits: {
                        products: number;
                        stores: number;
                        storage: number;
                        staff: number;
                        monthlyTransactions: number;
                    };
                    startDate: string;
                    endDate: string | null;
                    trialEndsAt: string;
                };
                subscriptionStats: {
                    totalPaid: number;
                    subscriptionCount: number;
                    averageSubscriptionLength: number;
                    longestSubscriptionLength: number;
                };
                wallet: {
                    walletId: string;
                    balances: {
                        total: number;
                        escrow: number;
                        available: number;
                    };
                    withdrawalSettings: {
                        minimumWithdrawal: number;
                        autoWithdrawal: boolean;
                        autoWithdrawalThreshold: number | null;
                    };
                    status: string;
                };
                store: Array<any>;
            };
            branding: {
                colors: {
                    primary: string;
                    secondary: string;
                    accent: string;
                };
                fonts: {
                    heading: string;
                    body: string;
                };
            };
            settings: {
                currency: string;
                language: string;
                timezone: string;
            };
            seo: {
                keywords: Array<string>;
            };
            contact: {
                email: string;
                phone: string;
                address: {
                    country: string;
                };
                socialLinks: Array<any>;
            };
            features: {
                livechat: boolean;
                reviews: boolean;
                wishlist: boolean;
                comparisons: boolean;
            };
            active: boolean;
            featured: boolean;
            popular: boolean;
            analytics: {
                views: number;
                orders: number;
                revenue: number;
            };
            hero_slides: Array<any>;
        };
    };
};

export type VerifyNinResponse = {
    data: {
        nin: string;
        firstName: string;
        middleName: string;
        lastName: string;
        dateOfBirth: string;
        phoneNumber: string;
        id?: string;
    };
    message: string;
    success: boolean;
};

export type VerifyCacResponse = {
    data: {
        cacVerification: {
            rcNumber: string;
            companyName: string;
            companyEmail: string;
            city: string;
            headOfficeAddress: string;
            lga: string;
            state: string;
            status: string;
            companyType: string;
            registrationDate: string;
            branchAddress: string;
            affiliates: string;
            classification: string;
            verifiedAt: string;
        };
        verificationTier: string;
    };
    message: string;
    success: boolean;
};

export type VerifyBankResponse = {
    data: {
        accountName: string;
        accountNumber: string;
        bankCode: string;
        bankName: string;
    };
    message: string;
    success: boolean;
};

export type ApiResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
};

export type VendorOrderStats = {
    total_orders: number;
    total_items: number;
    total_revenue: number;
    orders_by_status: Record<string, number>;
    average_order_value: number;
    latest_orders: LatestOrder[];
};

export interface LatestOrder {
    id: string;
    orderNumber: string;
    date: string;
    amount: number;
    formattedAmount: string;
    status: string;
    itemCount: number;
}

export interface VendorProfile {
    id: string;
    user?: {
      id: string;
      name?: string;
      email?: string;
      phoneNumber?: string;
      profilePicture?: string;
    };
    name?: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
    businessDetails?: {
      businessName?: string;
      businessPhone?: string;
      businessAddress?: string;
      businessState?: string;
      businessCity?: string;
      businessPostalCode?: string;
    };
  }
  
  export interface UpdateProfilePayload {
    name?: string;
    email?: string;
    phoneNumber?: string;
    profilePicture?: string;
    businessDetails?: {
      businessName?: string;
      businessPhone?: string;
      businessAddress?: string;
      businessState?: string;
      businessCity?: string;
      businessPostalCode?: string;
    };
  }