// import { FollowDetails } from '@/types/customer';

// Define FollowDetails interface locally since it's not exported
interface FollowDetails {
    id: string;
    follower: any;
    vendor: any;
    followedAt: string;
    notifyOnNewProducts: boolean;
    createdAt: string;
    updatedAt: string;
}
import BaseAPI from './base-api';

export class VendorFollowAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }

    public async toggleFollow(
        vendorId: string,
        notifyOnNewProducts: boolean = true
    ): Promise<any> {
        try {
            const response = await this.axiosInstance.post(
                `/vendor-follows/toggle`,
                {
                    vendorId: vendorId,
                    notifyOnNewProducts: notifyOnNewProducts,
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getFollows(): Promise<{ docs: FollowDetails[] }> {
        try {
            const response = await this.axiosInstance.get(
                `/vendor-follows/following`
            );
            return response.data.data;
        } catch (error) {
            return { docs: [] };
        }
    }

    public async checkFollowStatus(vendorId: string) {
        try {
            const response = await this.axiosInstance.get(
                `/vendor-follows/check/${vendorId}`
            );
            return response.data;
        } catch (error) {
            return { isFollowing: false };
        }
    }

    public async getVendorFollowersCount(vendorId: string): Promise<number> {
        try {
            const response = await this.axiosInstance.get(
                `/vendor-follows/count/${vendorId}`
            );
            return response.data.count || 0;
        } catch (error) {
            return 0;
        }
    }
}
