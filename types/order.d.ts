import { Store, User } from './auth';
import { product } from './product';

export type OrderSearchForm = {
    query?: string;
};

export type OrderItem = {
    product: product;
    fezOrderNumber?: string;
    variant?: {
        sku: string;
        color: string;
        size: string;
        price: number;
    };
    return?: {
        isReturned?: boolean;
        isRequested: boolean;
        reason?: string;
    };
    quantity?: number;
    price: number;
    id?: string;
    subtotal: number;
};

export type ShippingAddress = {
    name: string;
    // lastName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
};

export type PaymentDetails = {
    provider?: string;
    payment_reference: string;
    method: string;
    amount?: number;
    currency?: string;
};

export type OrderTotals = {
    subtotal: number;
    shippingCost: number;
    tax: number;
    discount: number;
    total: number;
};

type Escrow = {
    id: string;
    escrowId: string;
    order: {
        id: string;
        user: string;
        store: string;
        items: {
            product: string;
            quantity: number;
            price: number;
            id: string;
        }[];
        shipping_cost: number;
        subtotal: number;
        total_amount: number;
        status: string;
        shipping_address: {
            street: string;
            city: string;
            state: string;
            zip_code: string;
            country: string;
        };
        payment_info: {
            method: string;
            payment_reference: string;
        };
        requiresAttention: boolean;
        createdAt: string;
        updatedAt: string;
        escrow: string;
        escrowStatus: string;
        attentionReason: string;
    };
    customer: User;
    vendor: User;
    amount: number;
    platformFee: number;
    totalAmount: number;
    status: string;
    disputeDetails: Record<string, unknown>;
    expiresAt: string;
    isLocked: boolean;
    createdAt: string;
    updatedAt: string;
};

export type PaginationT = {
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

export type OrderResponseType = {
    data: OrderResponse[];
    pagination: PaginationT;
};

export type OrderResponse = {
    fezOrderNumber: string;
    user: User;
    store: Store;
    orderNumber: string;
    status: string;
    items: OrderItem[];
    total_amount: number;
    shipping_address: ShippingAddress;
    payment_info: PaymentDetails;
    totals: OrderTotals;
    escrow: Escrow;
    escrowStatus: string;
    id?: string;
    requiresAttention?: boolean;
    attentionReason?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type CreateOrderForm = {
    user: string;
    returnOrderId?: string;
    store: string;
    items: {
        product: string;
        quantity: number;
        price: number;
    }[];
    total_amount: number;
    subtotal: number;
    shipping_cost: number;
    shipping_address: {
        street: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
    payment_info: PaymentDetails;
};

export type OrderStatusUpdate = {
    status: string;
    reason: string;
};

export type calculateShippingForm = {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    shippingAddress: {
        state: string;
        city: string;
    };
};

export type OrderBatchActionForm = {
    orderIds: string[];
    action: string;
    reason?: string;
};

interface DisputeForm {
    reason: string;
    disputeDetails: {
        category: string;
        description: string;
        evidence: string[];
    };
}

export interface DeliveryStatus {
    id: number;
    clientAddress: string;
    orderNo: string;
    delivery_OTP: string | null;
    pickUpDate: string | null;
    quantity: number | null;
    dispatchDate: string | null;
    recipientName: string;
    recipientAddress: string;
    recipientEmail: string | null;
    recipient_phone: string;
    recipientPhone: string;
    itemDescription: string;
    statusDescription: string | null;
    orderStatus: string;
    deliveryDate: string | null;
    paymentMode: string | null;
    paymentStatus: string;
    cost: string;
    dropZoneName: string;
    returnReason: string | null;
    returnDate: string | null;
    recievedBySignature: string | null;
    additionalNote: string | null;
    orderVerified: string;
    thirdparty: string | null;
    thirdparty_sendersName: string | null;
    thirdparty_sendersPhone: string | null;
    recipientState: string;
    created_at: string;
    recipientAlternatePhone: string | null;
    createdBy: string;
    OrgRep: string;
    orderDate: string;
    weight: string;
    sub_organization_id: string | null;
    manifest: Manifest;
    organizationUser: OrganizationUser;
    subOrganization: any | null;
    cps: any | null;
    currency: string;
    currencySymbol: string;
    "client'": Client; // Note: There's a typo in the original JSON key
    manifest_print_out_url: string | null;
    is_item_cod: number;
    cod_amount: string | null;
}
