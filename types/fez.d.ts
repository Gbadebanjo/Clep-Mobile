export type DeliveryEstimateTimeResponse = {
    status: string;
    description: string;
    data: {
        eta: string;
    };
};

export type OrderTrackResponse = {
    status: string;
    description: string;
    order: {
        orderNo: string;
        orderStatus: string;
        recipientAddress: string;
        recipientName: string;
        senderAddress: string;
        senderName: string;
        recipientState: string;
        createdAt: string;
    };
    history: {
        orderStatus: string;
        statusCreationDate: string;
        statusDescription: string;
    }[];
};

export type OrderDeliveryCostResponse = {
    status: string;
    description: string;
    Cost: [
        {
            state: string;
            cost: string;
        },
    ];
};

export type SingleOrderResponse = {
    status: string;
    description: string;
    orderDetails: {
        orderNo: string;
        recipientName: string;
        recipientEmail: string;
        recipientAddress: string;
        recipientPhone: string;
        orderStatus: string;
        statusDescription: string | null;
        cost: string;
        createdBy: string;
        OrgRep: string;
        pickUpDate: string;
        dispatchDate: string | null;
        deliveryDate: string | null;
        returnDate: string | null;
        dropZoneName: string | null;
        returnReason: string | null;
    };
    [];
};

export type CreateOrderResponse = {
    status: string;
    description: string;
    orderNos: Record<string, string>;
};

export type DeliveryRequest = {
    recipientAddress: string;
    recipientState: string;
    recipientName: string;
    recipientPhone: string;
    recipientEmail?: string;
    uniqueID: string;
    BatchID: string;
    CustToken?: string;
    itemDescription?: string;
    additionalDetails?: string;
    valueOfItem: string;
    weight: number;
    pickUpState?: string;
    waybillNumber?: string;
    pickUpDate?: Date;
}[];

export type AuthenticateRequest = {
    user_id: string;
    password: string;
};

export type AuthenticateResponse = {
    status: string;
    description: string;
    authDetails: {
        authToken: string;
        expireToken: string;
    };
    userDetails: {
        userID: string;
        'Full Name': string;
        Username: string;
    };
    orgDetails: {
        'secret-key': string;
        'Org Full Name': string;
    };
};
