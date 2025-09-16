import BaseAPI from '@/apis/base-api';
import {
    VendorDetails,
    VendorProfile,
    VerifyBankAccountForm,
    VerifyNinForm,
    WalletCreationResponse,
} from '@/types/vendor';

export class VendorAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async findVendors(): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get('/vendors');
        return response.data;
    }

    public async findVendorById(
        user_id: string
    ): Promise<{ data: { message: string } & { docs: Array<VendorProfile> } }> {
        const response = await this.axiosInstance.get(`/vendors`, {
            params: { where: { User: { equals: user_id } } },
        });
        return response.data;
    }

    public async updateVendor(
        vendorId: string,
        data: VendorDetails
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(
            `/vendors/${vendorId}`,
            data
        );
        return response.data;
    }

    public async verifyNIN(data: VerifyNinForm): Promise<{ message: string }> {
        const response = await this.axiosInstance.post(
            '/vendors/verify-nin',
            data
        );
        return response.data;
    }

    public async verifyBankAccount(data: VerifyBankAccountForm): Promise<{
        data: WalletCreationResponse;
        message: string;
    }> {
        const response = await this.axiosInstance.post(
            '/vendors/verify-account',
            data
        );
        return response.data;
    }

    public async verifyAccountInfo(
        account_number: string,
        bank_code: string
    ): Promise<{ message: string; data: { data: { account_name: string } } }> {
        const response = await this.axiosInstance.get('/bank', {
            params: { account_number, bank_code },
        });
        return response.data;
    }
}
