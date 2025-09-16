export type CreatePlanForm = {
    name: string;
    description: string;
    active: boolean;
    highlight: boolean;
    pricing: {
        monthly: number;
        yearly: number;
        currency: string;
    };
    features: {
        productsLimit: number;
        storageLimit: number;
        analytics: boolean;
        apiAccess: boolean;
        customDomain: boolean;
        supportLevel: string;
    };
    trialDays: number;
};

export type UpdatePlanForm = Partial<CreatePlanForm>;

export type Plan = {
    id: string;
    name: string;
    price: number;
    description: string;
    duration: number;
    features: string[];
    createdAt: string;
    updatedAt: string;
};

type Pricing = {
    monthly: number;
    yearly: number;
    currency: string;
};

type Features = {
    productsLimit: number;
    storageLimit: number;
    analytics: boolean;
    apiAccess: boolean;
    customDomain: boolean;
    supportLevel: string;
    customFeatures: any[];
};

type Flutterwave = {
    monthlyPlanId: string;
    yearlyPlanId: string;
};

type Doc = {
    id: string;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    highlight: boolean;
    pricing: Pricing;
    features: Features;
    trialDays: number;
    flutterwave: Flutterwave;
    createdAt: string;
    updatedAt: string;
};

export type PlansResponse = {
    docs: Doc[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
};
