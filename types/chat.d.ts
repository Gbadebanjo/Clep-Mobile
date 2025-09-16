import { User } from './auth';

type DisputeRequestMessage = {
    roomId: string;
    participants: string[];
    type: 'dispute';
    message: string;
    metadata: {
        disputeData: {
            disputeId: string;
            action: 'open';
        };
    };
};

type BargainRequestMessage = {
    roomId: string;
    participants: string[];
    type: 'bargain';
    message: string;
    metadata: {
        bargainData: {
            bargainId: string;
            amount: number;
            action: 'offer' | 'counter-offer';
        };
    };
};

export type FollowUpMessage = {
    roomId: string;
    participants: string[];
    type: 'message';
    message: string;
};

export type ChatMessages = {
    id: string;
    createdAt: string;
    roomId: string;
    participants: User[];
    sender: User;
    type: 'message' | 'bargain' | 'dispute';
    message: string;
    metadata: {
        bargainData?: {
            bargainId: string;
            amount: s;
            action: 'offer' | 'counter-offer';
        };
        disputeData?: {
            disputeId: string;
            action: 'open';
        };
    };
    updatedAt: string;
};

export type ChatMessageRequest = {
    id: string;
    roomId: string;
    participants: User[];
    sender: User;
    type: 'message' | 'bargain' | 'dispute';
    message: string;
    updatedAt?: string;
    metadata: {
        bargainData: {
            bargainId?: string;
            amount?: number;
            action?: 'offer' | 'counter-offer';
        };
        disputeData: {};
    };
};
