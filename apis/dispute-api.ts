import BaseAPI from '@/apis/base-api';
import {
    CreateDispute,
    DisputeResponse,
    DisputeStatistics,
    SingleDipsute,
} from '@/types/dispute';

export class DisputeAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async vendorDisputes(): Promise<{ data: DisputeResponse }> {
        const response = await this.axiosInstance.get(
            `/disputes/vendor-disputes`
        );
        return response.data;
    }

    public async customerDisputes(): Promise<{ data: DisputeResponse }> {
        const response = await this.axiosInstance.get(
            `/disputes/customer-disputes`
        );
        return response.data;
    }

    public async singleDispute(
        disputeId: string
    ): Promise<{ data: { data: SingleDipsute } }> {
        const response = await this.axiosInstance.get(
            `/disputes/dispute/${disputeId}`
        );
        return response.data;
    }

    public async createDispute(
        data: CreateDispute
    ): Promise<{ data: { data: SingleDipsute } }> {
        const response = await this.axiosInstance.post(
            `/disputes/create`,
            data
        );
        return response.data;
    }

    public async disputeStatistics(): Promise<{ data: DisputeStatistics }> {
        const response = await this.axiosInstance.get(`/disputes/stats`);
        return response.data;
    }

    public async updateDisputeStatus(
        disputeId: string,
        status: 'resolved' | 'inProgress',
        resolution: string
    ): Promise<{ data: SingleDipsute }> {
        const response = await this.axiosInstance.patch(
            `/disputes/dispute/${disputeId}/status`,
            { status, resolution }
        );
        return response.data;
    }
}
