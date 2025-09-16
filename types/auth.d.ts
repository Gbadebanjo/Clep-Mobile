import { VendorProfile } from '@/types/vendor';
import { CustomerProfile } from './customer';

export type Role = 'customer' | 'vendor';

type Permission = {
    permission: string;
    id: string;
};

type Address = {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
};

type BusinessDetails = {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
    businessCity: string;
    businessState: string;
    address: Address;
};

type CurrentPlan = {
    plan: string;
    status?: string;
    limits?: {
        products: number;
        stores: number;
        storage: number;
        staff: number;
        monthlyTransactions: number;
    };
    startDate?: string;
    endDate?: string | null;
    trialEndsAt?: string;
};

type Store = {
    id: string;
    createdAt: string;
    updatedAt: string;
    storeNumber: string;
    storeName: string;
    vendor: VendorProfile;
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
        logo: {
            url: string;
            filename: string;
            id: string;
        };
        banner: {
            url: string;
            filename: string;
            id: string;
        };
    };
    settings: {
        currency: string;
        language: string;
        timezone: string;
    };
    seo: {
        keywords: string[];
    };
    contact: {
        email: string;
        phone: string;
        storeAddress: string;
        storeCity: string;
        storeState: string;
        address: {
            country: string;
        };
        socialLinks: string[];
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
    hero_slides: SlideData;
    adverts: {
        id: string;
        position: string;
        image: Image;
        link: string;
        active: boolean;
        metrics: {
            views: number;
            clicks: number;
        };
        createdAt: string;
        updatedAt: string;
    }[];
};

type Image = {
    id: string;
    uploadedBy: User;
    isPublic: boolean;
    fileDetails: Record<string, unknown>;
    prefix: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    url: string;
};

type SlideData = {
    slide: Image;
    caption: string;
    link: string;
    id: string;
}[];

type User = {
    id: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    permissions: Permission[];
    name: string;
    phoneNumber: string;
    isActive: boolean;
    emailVerified: boolean;
    twoFactorEnabled: boolean;
    ninNumber: string;
    customerProfile: CustomerProfile;
    businessDetails: BusinessDetails;
    currentPlan: CurrentPlan;
    apiKey?: string | null;
    email: string;
    vendorProfile: VendorProfile;
    store?: Store;
    lastLogin?: string;
    loginAttempts?: number;
    profilePicture?: string;
};

export type LoginForm = Pick<User, 'email'> & { password: string };

export type RegisterCustomerForm = {
    email: string;
    name: string;
    phoneNumber: string;
    role: Role;
    password: string;
};
export type RegisterCustomerResponse = {
    data: { doc: Partial<User>; message: string };
};

export type RegisterVendorForm = RegisterCustomerForm & {
    isActive: boolean;
    ninNumber: string;
    businessDetails?: {
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
};

export type VerifyEmailForm = {
    otp: string;
    email: string;
};
export type resetPasswordForm = {
    email: string;
    otp: string;
    newPassword: string;
};

export type LoginResponse = {
    data: {
        user: User;
        token: string;
        message: string;
        exp: number;
    };
};
