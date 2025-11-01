"use client"

import { api } from "@/services/api"
import { useMutation } from "@tanstack/react-query"

interface UpdateBankAccountRequest {
  accountNumber: string
  bankCode: string
  accountName: string
  businessName?: string
  accountType: string
  bankName: string
  recipientCode?: string
}

interface UpdateBankAccountResponse {
  success: boolean
  message: string
  data?: {
    id: string
    bankCode: string
    bankName: string
    accountNumber: string
    accountName: string
    accountType: string
  }
}

export default function useUpdateBankAccount() {
  return useMutation({
    mutationFn: async (data: UpdateBankAccountRequest): Promise<UpdateBankAccountResponse> => {
      const response = await fetch(`${api.getBaseURL()}/bank-accounts/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update bank account")
      }

      return response.json()
    },
  })
}
