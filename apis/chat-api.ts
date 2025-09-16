import BaseAPI from '@/apis/base-api';
import {
    BargainRequestMessage,
    ChatMessages,
    DisputeRequestMessage,
    FollowUpMessage,
} from '@/types/chat';

export class ChatAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }

    public async createBargainChat(
        data: BargainRequestMessage
    ): Promise<{ data: { data: ChatMessages } }> {
        const response = await this.axiosInstance.post(
            `/chat-messages/create`,
            data
        );
        return response.data;
    }

    public async createDisputeChat(
        data: DisputeRequestMessage
    ): Promise<{ [key: string]: any }> {
        const response = await this.axiosInstance.post(
            `/chat-messages/create`,
            data
        );
        return response.data;
    }

    public async rooomMessages(
        roomId: string
    ): Promise<{ data: { data: ChatMessages[] } }> {
        const response = await this.axiosInstance.get(
            `/chat-messages/room/${roomId}`
        );
        return response.data;
    }

    public async followUpMessage(
        data: FollowUpMessage
    ): Promise<{ [key: string]: any }> {
        const response = await this.axiosInstance.post(
            `/chat-messages/create`,
            data
        );
        return response.data;
    }
}
