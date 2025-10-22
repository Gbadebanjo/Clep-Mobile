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
          // Get user data first
          const userResponse = await this.axiosInstance.get('/users/me');
          const userData = userResponse.data;
      
          let vendorId: string | null = null;

          console.log('User Data:', userData);
      
          // Try extracting vendor ID from various possible structures
          if (userData?.data?.user?.vendorProfile?.id) {
            vendorId = userData.data.user.vendorProfile.id;
          } else if (userData?.user?.vendorProfile?.id) {
            vendorId = userData.user.vendorProfile.id;
          } else if (userData?.id && userData?.verificationTier) {
            vendorId = userData.id;
          }
      
          if (!vendorId) {
            console.warn('⚠️ Vendor ID not found in user data:', userData);
            throw new Error(
              'Vendor profile not found. Please ensure you are logged in as a vendor.'
            );
          }
      
          // Fetch wallet balance
          const response = await this.axiosInstance.get('/vendors/wallet-balance');
      
          if (!response.data) {
            throw new Error('Invalid response from wallet balance server');
          }
      
          return {
            data: response.data.data || response.data,
          };
        } catch (error: any) {
          console.error('Error fetching wallet balance:', error);
          throw new Error(
            error.response?.data?.message ||
              error.message ||
              'Failed to fetch wallet balance'
          );
        }
      }
      
      public async commissionReport(): Promise<{ data: CommissionReportResponse }> {
        try {
          // Get user data first
          const userResponse = await this.axiosInstance.get('/users/me');
          const userData = userResponse.data;
      
          let vendorId: string | null = null;
      
          // Try extracting vendor ID from various possible structures
          if (userData?.data?.user?.vendorProfile?.id) {
            vendorId = userData.data.user.vendorProfile.id;
          } else if (userData?.user?.vendorProfile?.id) {
            vendorId = userData.user.vendorProfile.id;
          } else if (userData?.id && userData?.verificationTier) {
            vendorId = userData.id;
          }
      
          if (!vendorId) {
            console.warn('⚠️ Vendor ID not found in user data:', userData);
            throw new Error(
              'Vendor profile not found. Please ensure you are logged in as a vendor.'
            );
          }
      
          // Fetch commission report
          const response = await this.axiosInstance.get('/vendors/commission-report');
      
          if (!response.data) {
            throw new Error('Invalid response from commission report server');
          }
      
          return {
            data: response.data.data || response.data,
          };
        } catch (error: any) {
          console.error('Error fetching commission report:', error);
          throw new Error(
            error.response?.data?.message ||
              error.message ||
              'Failed to fetch commission report'
          );
        }
      }
      
}
