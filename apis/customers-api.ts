import BaseAPI from '@/apis/base-api';
import { User } from '@/types/auth';
import {
    Address,
    CreateAddressPayload,
    CustomerProfile,
} from '@/types/customer';

export class CustomerAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async vendorCustomers(
        vendorId: string
    ): Promise<{ data: { data: { data: { user: User }[] } } }> {
        const response = await this.axiosInstance.get(
            `/orders/vendor-customers/${vendorId}`
        );
        return response.data;
    }

    public async getCustomer(
        customerId: string
    ): Promise<{ data: { customer: CustomerProfile } }> {
        const response = await this.axiosInstance.get(
            `/customers/${customerId}`
        );
        return response.data;
    }

    public async updateSettings(
        customerId: string,
        data: CustomerProfile['preferences']
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            `/customers/${customerId}/preferences`,
            data
        );
        return response.data;
    }

    public async addAddress(
        data: CreateAddressPayload
    ): Promise<{ address: Address }> {
        if (data.id) {
            const response = await this.axiosInstance.patch(
                `customers/addresses/${data.id}`,
                data
            );
            return response.data;
        }
        const response = await this.axiosInstance.post(
            `customers/addresses`,
            data
        );
        return response.data;
    }

    public async setDefaultAddress(addressId: string): Promise<any> {
        const response = await this.axiosInstance.post(
            `customers/addresses/${addressId}/default`,
            {},
            { withCredentials: true }
        );
        return response.data;
    }

    public async removeAddress(addressId: string): Promise<any> {
        const response = await this.axiosInstance.delete(
            `customers/addresses/${addressId}`
        );
        return response.data;
    }
}
