import BaseAPI from '@/apis/base-api';
import {
    Bargain,
    BargainResponse,
    SingleBargainResponse,
} from '@/types/bargain';

export class BargainAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async myBargains(
        query?: Record<string, any>
    ): Promise<{ data: BargainResponse }> {
        const response = await this.axiosInstance.get(`/bargains/my-bargains`);
        return response.data;
    }

    public async storeBargains(
        storeId: string
    ): Promise<{ data: BargainResponse }> {
        const response = await this.axiosInstance.get(
            `/bargains/store/${storeId}/bargains`
        );
        return response.data;
    }

    public async singleBargain(
        bargainId?: string
    ): Promise<{ data: SingleBargainResponse }> {
        const response = await this.axiosInstance.get(
            `bargains/${bargainId}/details`
        );
        return response.data;
    }

    public async productBargain(productId: string): Promise<{ data: Bargain }> {
        const response = await this.axiosInstance.get(
            `/bargains/product/${productId}`
        );
        return response.data;
    }

    public async createBargain(
        productId: string,
        offer_amount: number
    ): Promise<{ data: Bargain }> {
        const response = await this.axiosInstance.post(`/bargains/create`, {
            offer_amount,
            product_id: productId,
        });
        return response.data;
    }

    public async acceptBargain(bargainId: string): Promise<{ data: Bargain }> {
        const response = await this.axiosInstance.patch(
            `/bargains/${bargainId}/accept`
        );
        return response.data;
    }

    public async declineBargain(bargainId: string): Promise<{ data: Bargain }> {
        const response = await this.axiosInstance.patch(
            `/bargains/${bargainId}/decline`
        );
        return response.data;
    }
    public async counterOffer(
        bargainId: string,
        counter_offer: number
    ): Promise<{ data: Bargain }> {
        const response = await this.axiosInstance.patch(
            `/bargains/${bargainId}/counter-offer`,
            { counter_offer }
        );
        return response.data;
    }
}
