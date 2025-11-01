import { Alert } from "react-native";

export interface IVerifyBankAccountPayload {
  account_number: string;
  account_bank: string;
}

interface VerifyBankAccountResponse {
  success: boolean;
  message: string;
  data?: {
    account_number: string;
    account_name: string;
    bank_code?: string;
    bank_name?: string;
  };
  error?: any;
}

const BASE_URL = "https://sandbox.vazzel.com/api"; // ✅ Replace with your API base URL

export async function verifyBankAccounts(
  data: IVerifyBankAccountPayload
): Promise<VerifyBankAccountResponse> {
  const { account_number, account_bank } = data;
  const apiUrl = `${BASE_URL}/vendors/verify-bank`;

  try {
    console.log("🔍 Verifying bank account at:", apiUrl);
    console.log("Payload:", { account_number, account_bank });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optionally add auth if your API requires it
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accountNumber: account_number,
        bankCode: account_bank,
      }),
    });

    const result = await response.json();
    console.log("✅ Bank verification response:", result);

    if (!response.ok) {
      console.error("❌ Bank verification failed:", {
        status: response.status,
        statusText: response.statusText,
        result,
      });

      return {
        success: false,
        message:
          result.message ||
          `Failed to verify bank account (${response.status}: ${response.statusText})`,
        error: result.error || {
          message: result.message || "API Error",
          status: response.status,
          url: apiUrl,
        },
      };
    }

    return {
      success: true,
      message: result.message || "Account verified successfully",
      data: {
        account_number: result.data.accountNumber,
        account_name: result.data.accountName,
        bank_code: result.data.bankCode,
        bank_name: result.data.bankName,
      },
    };
  } catch (error: any) {
    console.error("🚨 Error verifying bank account:", error);

    Alert.alert(
      "Network Error",
      error.message || "Unable to verify bank account. Please check your connection."
    );

    return {
      success: false,
      message: `Network error: ${error.message || "Connection failed"}`,
      error: {
        message: error.message || "Network connection error",
        type: "NETWORK_ERROR",
        details: error.toString(),
      },
    };
  }
}
