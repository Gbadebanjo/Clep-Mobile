import BaseAPI from '@/apis/base-api';
import {
    LoginForm,
    LoginResponse,
    RegisterCustomerForm,
    RegisterCustomerResponse,
    RegisterVendorForm,
    User,
    VerifyEmailForm,
    resetPasswordForm,
} from '@/types/auth';
import { CommissionReportResponse, WalletResponse } from '@/types/store';

export class AuthAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }

    public async login(credential: LoginForm): Promise<LoginResponse> {
        const response = await this.axiosInstance.post(
            '/users/login',
            credential
        );
        return response?.data;
    }

    public async logout(): Promise<{ message: string }> {
        const response = await this.axiosInstance.post('/logout');
        return response?.data;
    }

    public async setCookie(args: {
        key: string;
        value: any;
    }): Promise<{ message: string }> {
        const response = await this.axiosInstance.post('/set-cookie', args);
        return response?.data;
    }

    public async registerCustomer(
        data: RegisterCustomerForm
    ): Promise<RegisterCustomerResponse> {
        const response = await this.axiosInstance.post('/users', data);
        return response.data;
    }

    public async registerVendor(
        data: RegisterVendorForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/users', data);
        return response.data;
    }

    public async verifyEmail(
        data: VerifyEmailForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post(
            '/users/verify-email',
            data
        );
        return response.data;
    }

    public async resendEmailVerification(
        email: string
    ): Promise<{ message: string }> {
        const response = await this.axiosInstance.post(
            '/users/resend-verification',
            { email }
        );
        return response.data;
    }

    public async forgotPassword(email: string): Promise<{ message: string }> {
        const response = await this.axiosInstance.post(
            '/users/forgot-password',
            {
                email,
            }
        );
        return response.data;
    }

    public async resetPassword(
        data: resetPasswordForm
    ): Promise<{ message: string }> {
        const response = await this.axiosInstance.post(
            '/users/reset-password',
            data
        );
        return response.data;
    }

    public async deleteUser(user_id: string): Promise<{ message: string }> {
        const response = await this.axiosInstance.delete(`/users/${user_id}`);
        return response.data;
    }

    public async updateUser(
        user_id: string,
        data: { [key: string]: string | number }
    ): Promise<{ data: { doc: User } }> {
        // Delete the email field if it exists in the data object
        delete data.email;

        const response = await this.axiosInstance.patch(`/users/${user_id}`, {
            ...data,
        });
        return response.data;
    }

    public async findUsers(): Promise<{ [key: string]: string | number }[]> {
        const response = await this.axiosInstance.get('/users');
        return response.data;
    }

    public async findUserById(
        user_id: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get(`/users/${user_id}`);
        return response.data;
    }

    public async currentUser(): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get('/users/me');
        return response.data;
    }

    public async wallet(): Promise<{ data: WalletResponse }> {
        try {
            // First ensure we have the vendor profile
            const userResponse = await this.axiosInstance.get('/users/me');
            const userData = userResponse.data;

            // The user data may have different structures - try all the paths where vendor ID might be
            let vendorId = null;

            // Check if data.user.vendorProfile.id exists
            if (userData?.data?.user?.vendorProfile?.id) {
                vendorId = userData.data.user.vendorProfile.id;
            }
            // Check if user.vendorProfile.id exists
            else if (userData?.user?.vendorProfile?.id) {
                vendorId = userData.user.vendorProfile.id;
            }
            // Check if data is directly the vendor profile
            else if (userData?.id && userData?.verificationTier) {
                vendorId = userData.id;
            }
            // Try to get from cookies as fallback
            else {
                // Try to get from cookies
                const vendorIdFromCookie =
                    typeof window !== 'undefined'
                        ? window.document.cookie
                              .split('; ')
                              .find((row) => row.startsWith('vendor_id='))
                              ?.split('=')[1]
                        : null;

                if (vendorIdFromCookie) {
                    vendorId = vendorIdFromCookie;
                }
            }

            if (!vendorId) {
                console.error(
                    'Could not extract valid vendor ID from user data:',
                    userData
                );
                throw new Error(
                    'Vendor profile not found. Please ensure you are logged in as a vendor.'
                );
            }
            // Make the wallet balance request
            const response = await this.axiosInstance.get(
                '/vendors/wallet-balance'
            );

            if (!response.data) {
                throw new Error('Invalid response from wallet balance server');
            }

            // Handle data directly or nested under data property
            return {
                data: response.data.data || response.data,
            };
        } catch (error: any) {
            console.error('Error fetching wallet balance:', error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch wallet balance';
            throw new Error(errorMessage);
        }
    }

    public async commissionReport(): Promise<{
        data: CommissionReportResponse;
    }> {
        try {
            // First ensure we have the vendor profile
            const userResponse = await this.axiosInstance.get('/users/me');
            const userData = userResponse.data;

            // The user data may have different structures - try all the paths where vendor ID might be
            let vendorId = null;

            // Check if data.user.vendorProfile.id exists
            if (userData?.data?.user?.vendorProfile?.id) {
                vendorId = userData.data.user.vendorProfile.id;
            }
            // Check if user.vendorProfile.id exists
            else if (userData?.user?.vendorProfile?.id) {
                vendorId = userData.user.vendorProfile.id;
            }
            // Check if data is directly the vendor profile
            else if (userData?.id && userData?.verificationTier) {
                vendorId = userData.id;
            }
            // Try to get from cookies as fallback
            else {
                // Try to get from cookies
                const vendorIdFromCookie =
                    typeof window !== 'undefined'
                        ? window.document.cookie
                              .split('; ')
                              .find((row) => row.startsWith('vendor_id='))
                              ?.split('=')[1]
                        : null;

                if (vendorIdFromCookie) {
                    vendorId = vendorIdFromCookie;
                }
            }

            if (!vendorId) {
                console.error(
                    'Could not extract valid vendor ID for commission report:',
                    userData
                );
                throw new Error(
                    'Vendor profile not found. Please ensure you are logged in as a vendor.'
                );
            }
            // Make the commission report request
            const response = await this.axiosInstance.get(
                '/vendors/commission-report'
            );

            if (!response.data) {
                throw new Error(
                    'Invalid response from commission report server'
                );
            }

            // Handle data directly or nested under data property

            return {
                data: response.data.data || response.data,
            };
        } catch (error: any) {
            console.error('Error fetching commission report:', error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch commission report';
            throw new Error(errorMessage);
        }
    }
}
