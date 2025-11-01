import { useMutation } from '@tanstack/react-query';
import { verifyBankAccounts } from './verify-bank-account';
// import { VerifyBankAccount } from './verify-bank-account';
// import { VerifyBankAccount } from '@/app/actions/vendor/verify-bank-account';

export interface IVerifyBankAccountPayload {
    account_number: string;
    account_bank: string;
}

interface IVerifyBankAccountResponse {
    success: boolean;
    message?: string;
    status?: number;
    data?: { account_number: string; account_name: string; bank_code?: string };
}

export interface IVerifyBankAccountError {
    message: string;
    status?: number;
}

const verifyBankAccount = async (
    data: IVerifyBankAccountPayload
): Promise<IVerifyBankAccountResponse> => {
    try {
        const response = await verifyBankAccounts(data);
        if (!response.success) {
            throw {
                message: response?.error?.message || 'Bank verification failed',
            } as IVerifyBankAccountError;
        }

        // The API returns nested data structure
        const accountData = result.data?.data || result.data;

        return {
            success: true,
            message: response.message,
            status: 200,
            data: response.data,
        };
    } catch (error: any) {
        console.error('Bank verification error:', error);
        throw error;
    }
};

const useVerifyBankAccount = () => {
    return useMutation({
        mutationFn: verifyBankAccount,
    });
};

export default useVerifyBankAccount;
