"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
// import * as SecureStore from "expo-secure-store"
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api, showError } from "@/services/api";
import { useAuthStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Building,
    CheckCircle,
    CreditCard,
    Info,
    User,
} from "lucide-react-native";
import Toast from "react-native-toast-message";
import { KycStyles } from "./style";

type VerificationType = "nin" | "cac" | null;
type WizardStep = "select" | "details" | "bank" | "summary";
type VerificationStatus =
  | "unverified"
  | "pending"
  | "in_progress"
  | "verified"
  | "rejected";
type VerificationTier = "unverified" | "tier1" | "tier2";

interface BankOption {
  name: string;
  code: string;
}

interface NINVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    nin?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
  };
}

interface CACVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    cacNumber?: string;
    companyName?: string;
    companyType?: string;
    registrationDate?: string;
    directors?: Array<{ name: string; position?: string }>;
  };
}

interface BankVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    accountNumber: string;
    accountName: string;
    bankCode: string;
    bankName?: string;
    recipientCode?: string;
  };
}

interface VendorProfile {
  id: string;
  verificationStatus: VerificationStatus;
  verificationTier: VerificationTier;
  verificationStep: string;
  ninVerification?: {
    ninNumber: string;
    verifiedAt: string | null;
    verifiedData?: any;
    verificationId?: number;
  };
  cacVerification?: {
    cacNumber: string;
    verifiedAt: string | null;
    verifiedData?: any;
  };
  bankDetails?: {
    bankCode: string;
    bankName?: string;
    accountNumber: string;
    accountName: string;
    verified?: boolean;
    recipientCode?: string;
  };
  businessDetails?: {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    address?: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
}
interface KycTabProps {
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
}

export default function KycTab({ onError, onSuccess }: KycTabProps) {
  const [step, setStep] = useState<WizardStep>("select");
  const [verificationType, setVerificationType] =
    useState<VerificationType>(null);
  const [banks, setBanks] = useState<BankOption[]>([]);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(
    null
  );
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = KycStyles(colorScheme);

  const { user } = useAuthStore();
  const vendorId = user?.vendorProfile?.id;
  const [formData, setFormData] = useState({
    ninNumber: "",
    verifiedNinData: null as any,
    cacNumber: "",
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    recipientCode: "",
    street: "",
    city: "",
    state: "",
    country: "Nigeria",
    postalCode: "",
  });

  // Fetch vendor profile data
  const fetchVendorProfileQuery = useQuery({
    queryKey: ["vendorProfile"],
    queryFn: async () => {
      if (!vendorId) {
        throw new Error("Vendor ID not found");
      }
      const response = await fetch(`${api.getBaseURL()}/vendors/${vendorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch vendor profile");
      }
      const data = await response.json();
      return data.data as VendorProfile;
    },
  });

  // Fetch banks list
  const fetchBanksQuery = useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await fetch(`${api.getBaseURL()}/banks`);
      if (!response.ok) {
        throw new Error("Failed to fetch banks");
      }
      const data = await response.json();
      return data.data as BankOption[];
    },
  });

  // Set up initial data when profile is loaded
  useEffect(() => {
    if (fetchVendorProfileQuery.data) {
      const profile = fetchVendorProfileQuery.data;
      setVendorProfile(profile);
      setFormData((prev) => ({
        ...prev,
        ninNumber: prev.ninNumber || profile.ninVerification?.ninNumber || "",
        verifiedNinData:
          prev.verifiedNinData || profile.ninVerification?.verifiedData || null,
        cacNumber: prev.cacNumber || profile.cacVerification?.cacNumber || "",
        businessName:
          prev.businessName ||
          profile.businessDetails?.businessName ||
          profile.cacVerification?.verifiedData?.companyName ||
          "",
        businessEmail:
          prev.businessEmail || profile.businessDetails?.businessEmail || "",
        businessPhone:
          prev.businessPhone || profile.businessDetails?.businessPhone || "",
        bankCode: prev.bankCode || profile.bankDetails?.bankCode || "",
        bankName: prev.bankName || profile.bankDetails?.bankName || "",
        accountNumber:
          prev.accountNumber || profile.bankDetails?.accountNumber || "",
        accountName: prev.accountName || profile.bankDetails?.accountName || "",
        recipientCode:
          prev.recipientCode || profile.bankDetails?.recipientCode || "",
        street: prev.street || profile.businessDetails?.address?.street || "",
        city: prev.city || profile.businessDetails?.address?.city || "",
        state: prev.state || profile.businessDetails?.address?.state || "",
        country:
          prev.country ||
          profile.businessDetails?.address?.country ||
          "Nigeria",
        postalCode:
          prev.postalCode || profile.businessDetails?.address?.postalCode || "",
      }));
    }
  }, [fetchVendorProfileQuery.data]);

  // Set up banks data when loaded
  useEffect(() => {
    if (fetchBanksQuery.data) {
      setBanks(fetchBanksQuery.data);
    }
  }, [fetchBanksQuery.data]);

  // Determine initial verification type based on profile
  useEffect(() => {
    if (vendorProfile) {
      if (
        vendorProfile.verificationTier === "tier1" ||
        vendorProfile.ninVerification
      ) {
        setVerificationType("nin");
      } else if (
        vendorProfile.verificationTier === "tier2" ||
        vendorProfile.cacVerification
      ) {
        setVerificationType("cac");
      }
      if (
        vendorProfile.verificationTier === "tier1" &&
        vendorProfile.ninVerification?.verificationId &&
        !vendorProfile.bankDetails?.bankCode?.length
      ) {
        setStep("bank");
      }
    }
  }, [vendorProfile]);

  const handleChange = (name: string, value: string) => {
    if (name === "ninNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "bankCode") {
      const selectedBank = banks.find((bank) => bank.code === value);
      if (selectedBank) {
        setFormData((prev) => ({
          ...prev,
          bankName: selectedBank.name,
        }));
      }
    }
  };

  const handleTypeSelect = (type: VerificationType) => {
    setVerificationType(type);
    setStep("details");
  };

  const nextStep = () => {
    if (step === "select") {
      setStep("details");
    } else if (step === "details") {
      if (verificationType === "nin") {
        verifyNinMutation.mutate({ ninNumber: formData.ninNumber });
      } else if (verificationType === "cac") {
        verifyCacMutation.mutate({ cacNumber: formData.cacNumber });
      }
    } else if (step === "bank") {
      verifyBankMutation.mutate({
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode,
        accountName: formData.accountName,
        recipientCode: vendorProfile?.bankDetails?.recipientCode || "",
      });
    }
  };

  const prevStep = () => {
    if (step === "details") setStep("select");
    else if (step === "bank") setStep("details");
    else if (step === "summary") setStep("bank");
  };

  // NIN verification mutation
  const verifyNinMutation = useMutation({
    mutationFn: async (data: {
      ninNumber: string;
    }): Promise<NINVerificationResponse> => {
      const response = await fetch(`${api.getBaseURL()}/vendors/verify-nin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (
          (result.message &&
            result.message.toLowerCase().includes("name mismatch")) ||
          (result.details &&
            result.details.toLowerCase().includes("name mismatch"))
        ) {
          const errorMsg =
            "Your names do not match the names registered with the NIN.";
          onError?.(errorMsg);
          Toast.show({
            type: "error",
            text1: "Name Mismatch",
            text2: errorMsg,
          });
          throw new Error("Name mismatch");
        } else if (result.details) {
          onError?.(result.details);
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2: result.details,
          });
          throw new Error("Verification failed");
        } else {
          const errorMsg = result.message || "NIN verification failed";
          onError?.(errorMsg);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: errorMsg,
          });
          throw new Error("Verification failed");
        }
      }

      return result;
    },
    onSuccess: (result) => {
      onSuccess?.("NIN verified successfully");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "NIN verified successfully",
      });
      const ninData = result.data || {};

      setFormData((prev) => ({
        ...prev,
        verifiedNinData: ninData,
        accountName:
          prev.accountName ||
          (ninData.firstName && ninData.lastName
            ? `${ninData.firstName} ${ninData.middleName || ""} ${
                ninData.lastName
              }`.trim()
            : ""),
      }));

      fetchVendorProfileQuery.refetch();
      setStep("bank");
    },
  });

  // CAC verification mutation
  const verifyCacMutation = useMutation({
    mutationFn: async (data: {
      cacNumber: string;
    }): Promise<CACVerificationResponse> => {
      const response = await fetch(`${api.getBaseURL()}/vendors/verify-cac`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.message || "CAC verification failed";
        onError?.(errorMsg);
        throw new Error(errorMsg);
      }

      const result = await response.json();
      return result;
    },
    onSuccess: (result) => {
      onSuccess?.("CAC verified successfully");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "CAC verified successfully",
      });
      const cacData = result.data || {};

      setFormData((prev) => ({
        ...prev,
        cacNumber: prev.cacNumber,
        businessName: cacData.companyName || prev.businessName,
        bankCode: prev.bankCode,
        bankName: prev.bankName,
        accountNumber: prev.accountNumber,
        accountName: prev.accountName,
        recipientCode: prev.recipientCode,
      }));

      fetchVendorProfileQuery.refetch();
      setStep("bank");
    },
    onError: (error: any) => {
      const errorMsg = error.message || "Failed to verify CAC";
      onError?.(errorMsg);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMsg,
      });
    },
  });

  // Bank account verification mutation
  const verifyBankMutation = useMutation({
    mutationFn: async (data: {
      accountNumber: string;
      bankCode: string;
      accountName: string;
      recipientCode: string;
    }): Promise<BankVerificationResponse> => {
      const endpoint =
        vendorProfile?.verificationTier === "tier2"
          ? `${api.getBaseURL()}/vendors/update-business-account`
          : `${api.getBaseURL()}/vendors/verify-account`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg =
          errorData.details ||
          errorData.message ||
          "Bank account verification failed";
        throw new Error(errorMsg);
      }

      return await response.json();
    },
    onSuccess: (result) => {
      onSuccess?.("Bank account verified successfully");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Bank account verified successfully",
      });

      if (result.data && typeof result.data.recipientCode === "string") {
        setFormData((prev) => ({
          ...prev,
          recipientCode: result.data?.recipientCode || "",
        }));
      }

      fetchVendorProfileQuery.refetch();
      setStep("select");
    },
    onError: (error: any) => {
      const errorMsg = error.message || "Failed to verify bank account";
      onError?.(errorMsg);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMsg,
      });
    },
  });

  const [accountError, setAccountError] = useState<string | null>(null);

  // Bank account resolution mutation
  const resolveAccountMutation = useMutation({
    mutationFn: async (data: { accountNumber: string; bankCode: string }) => {
      if (!data.accountNumber || !data.bankCode) {
        throw new Error("Account number and bank code are required");
      }

      if (data.accountNumber.length !== 10) {
        throw new Error("Account number must be 10 digits");
      }

      const url = `${api.getBaseURL()}/bank?account_number=${
        data.accountNumber
      }&bank_code=${data.bankCode}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server returned non-OK:", response.status, errorText);

        let errorMessage = "Failed to resolve account";
        try {
          const json = JSON.parse(errorText);
          errorMessage = json.error || json.message || errorMessage;
        } catch {
          // not JSON
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result.data?.data || result.data;
    },

    onSuccess: (data) => {
      setFormData((prev) => ({
        ...prev,
        accountName: data.account_name || "",
      }));

      // clear previous error
      setAccountError(null);
    },

    onError: (error: any) => {
      console.error("❌ Mutation error caught:", error);
      setFormData((prev) => ({
        ...prev,
        accountName: "",
      }));

      const message =
        error?.message || "Failed to resolve account name. Please try again.";
      setAccountError(message);
      showError(message);
    },
  });

  // Effect to auto-resolve account name
  useEffect(() => {
    if (step === "bank") {
      const { accountNumber, bankCode } = formData;

      if (
        accountNumber &&
        bankCode &&
        accountNumber.length === 10 &&
        !resolveAccountMutation.isPending
      ) {
        resolveAccountMutation.mutate({ accountNumber, bankCode });
      }
    }
  }, [
    formData.accountNumber,
    formData.bankCode,
    formData,
    resolveAccountMutation,
    step,
  ]);

  // Prepare data for final submission
  const prepareSubmissionData = () => {
    const data: any = {
      bankDetails: {
        bankCode: formData.bankCode,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        recipientCode:
          formData.recipientCode ||
          vendorProfile?.bankDetails?.recipientCode ||
          "",
      },
    };

    if (verificationType === "nin") {
      data.ninVerification = {
        ninNumber: formData.ninNumber,
        verifiedData: formData.verifiedNinData,
      };
    } else if (verificationType === "cac") {
      data.cacVerification = {
        rcNumber: formData.cacNumber,
      };
    }
    return data;
  };

  // Final KYC submission mutation
  const updateVendorMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!vendorId) {
        throw new Error("Vendor ID not found");
      }

      if (
        verificationType === "cac" &&
        !data.cacVerification?.rcNumber &&
        formData.cacNumber
      ) {
        data.cacVerification = {
          ...data.cacVerification,
          rcNumber: formData.cacNumber,
        };
      }

      if (!data.bankDetails?.recipientCode && formData.recipientCode) {
        data.bankDetails = {
          ...data.bankDetails,
          recipientCode: formData.recipientCode,
        };
      }

      const response = await fetch(`${api.getBaseURL()}/vendors/${vendorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg =
          errorData.message || "Failed to update vendor information";
        throw new Error(errorMsg);
      }

      const result = await response.json();
      return result;
    },
    onSuccess: (result) => {
      onSuccess?.("Verification information submitted successfully!");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Verification information submitted successfully!",
      });
      fetchVendorProfileQuery.refetch();
      setStep("select");
    },
    onError: (error: any) => {
      const errorMsg =
        error.message || "Failed to update verification information";
      onError?.(errorMsg);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMsg,
      });
    },
  });

  const renderVerificationStatus = (
    status: VerificationStatus,
    tier: VerificationTier
  ) => {
    let tierText = "Unverified";
    switch (tier) {
      case "tier1":
        tierText = "Tier 1 (NIN Verified)";
        break;
      case "tier2":
        tierText = "Tier 2 (CAC Verified)";
        break;
    }

    return (
      <ThemedView style={styles.statusContainer}>
        <ThemedText style={styles.tierText}>{tierText}</ThemedText>
      </ThemedView>
    );
  };

  const calculateProgress = (tier: VerificationTier | undefined): number => {
    if (tier === "tier2") return 100;
    if (tier === "tier1") return 50;
    return 0;
  };

  const handleSubmit = () => {
    if (step === "summary") {
      const submissionData = prepareSubmissionData();
      updateVendorMutation.mutate(submissionData);
    } else {
      nextStep();
    }
  };

  if (fetchVendorProfileQuery.isLoading || fetchBanksQuery.isLoading) {
    return <ThemedLoader />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView style={styles.container}>
        <ThemedView style={styles.headerSection}></ThemedView>

        {vendorProfile && (
          <>
            <ThemedView style={styles.headerSection}>
              <ThemedText style={styles.title}>
                Current Verification Status
              </ThemedText>
              <ThemedText style={styles.description}>
                Your current KYC verification level.
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.statusSection}>
              <Ionicons name="shield-outline" size={20} color="gray" />
              {renderVerificationStatus(
                vendorProfile.verificationStatus,
                vendorProfile.verificationTier
              )}
              <ThemedView style={styles.progressContainer}>
                {/* <ThemedText style={styles.progressLabel}>Verification Progress</ThemedText> */}
                {/* <ThemedText style={styles.progressValue}>{calculateProgress(vendorProfile.verificationTier)}%</ThemedText> */}
              </ThemedView>
            </ThemedView>
          </>
        )}

        {step === "select" && (
          <ThemedView style={styles.selectContainer}>
            {/* NIN Card */}
            <TouchableOpacity
              style={[
                styles.card,
                vendorProfile?.verificationTier === "tier1" ||
                vendorProfile?.verificationTier === "tier2"
                  ? styles.disabledCard
                  : {},
              ]}
              onPress={() => handleTypeSelect("nin")}
              disabled={
                vendorProfile?.verificationTier === "tier1" ||
                vendorProfile?.verificationTier === "tier2"
              }
            >
              <ThemedView style={styles.cardHeader}>
                <User size={24} color="#2563eb" />
                <ThemedText style={styles.cardTitle}>
                  Personal Verification (NIN)
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.cardDescription}>
                Required for basic store functions and payouts.
              </ThemedText>
              {vendorProfile?.verificationTier === "tier1" ||
              vendorProfile?.verificationTier === "tier2" ? (
                <>
                  <ThemedView style={{ marginBottom: 10 }}>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Verify your identity using your NIN.
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Enables Tier 1 verification.
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Use your personal bank account for payments.
                    </ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.verifiedBadge}>
                    <CheckCircle size={20} color="#16a34a" />
                    <ThemedText style={styles.verifiedText}>
                      NIN Verified (Tier 1 Achieved)
                    </ThemedText>
                  </ThemedView>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleTypeSelect("nin")}
                >
                  <ThemedText style={styles.buttonText}>
                    Start NIN Verification
                  </ThemedText>
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {/* CAC Card */}
            <TouchableOpacity
              style={[
                styles.card,
                vendorProfile?.verificationTier === "tier2"
                  ? styles.disabledCard
                  : {},
              ]}
              onPress={() => handleTypeSelect("cac")}
              disabled={vendorProfile?.verificationTier === "tier2"}
            >
              <ThemedView style={styles.cardHeader}>
                <Building size={24} color="#9333ea" />
                <ThemedText style={styles.cardTitle}>
                  Business Registration (CAC)
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.cardDescription}>
                Required for enhanced features and higher limits.
              </ThemedText>
              {vendorProfile?.verificationTier === "tier2" ? (
                <>
                  <ThemedView style={{ marginBottom: 10 }}>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Verify your business registration..
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Enables Tier 2 verification.
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Use a business account instead of personal account.
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.verifiedBadge}>
                    <CheckCircle size={20} color="#16a34a" />
                    <ThemedText style={styles.verifiedText}>
                      CAC Verified (Tier 2 Achieved)
                    </ThemedText>
                  </ThemedView>
                </>
              ) : (
                <>
                  <ThemedView style={{ marginBottom: 10 }}>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Verify your business registration..
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Enables Tier 2 verification.
                    </ThemedText>
                    <ThemedText style={styles.verifiedTextDec}>
                      • Use a business account instead of personal account.
                    </ThemedText>
                  </ThemedView>
                  <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => handleTypeSelect("cac")}
                  >
                    <ThemedText style={styles.buttonText}>
                      Start CAC Verification
                    </ThemedText>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          </ThemedView>
        )}

        {step === "details" && verificationType === "nin" && (
          <ThemedView style={styles.formContainer}>
            <ThemedText style={styles.label}>NIN Number</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your 11-digit NIN"
              value={formData.ninNumber}
              onChangeText={(text) => handleChange("ninNumber", text)}
              keyboardType="numeric"
              maxLength={11}
            />
            <ThemedText style={styles.helperText}>
              Must be exactly 11 digits
            </ThemedText>

            <ThemedView style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={prevStep}
              >
                <ArrowLeft size={18} />
                <ThemedText style={styles.buttonText}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  (!formData.ninNumber ||
                    formData.ninNumber.length !== 11 ||
                    verifyNinMutation.isPending) &&
                    styles.disabledButton,
                ]}
                onPress={nextStep}
                disabled={
                  !formData.ninNumber ||
                  formData.ninNumber.length !== 11 ||
                  verifyNinMutation.isPending
                }
              >
                {verifyNinMutation.isPending ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <ThemedText style={styles.buttonText}>
                      Verifying...
                    </ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText style={styles.buttonText}>
                      Verify NIN
                    </ThemedText>
                    <ArrowRight size={18} />
                  </>
                )}
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        {step === "details" && verificationType === "cac" && (
          <ThemedView style={styles.formContainer}>
            <ThemedText style={styles.label}>
              CAC Registration Number
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="E.g., RC123456"
              value={formData.cacNumber}
              onChangeText={(text) => handleChange("cacNumber", text)}
            />

            <ThemedView style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={prevStep}
              >
                <ArrowLeft size={18} />
                <ThemedText style={styles.buttonText}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  (!formData.cacNumber || verifyCacMutation.isPending) &&
                    styles.disabledButton,
                ]}
                onPress={nextStep}
                disabled={!formData.cacNumber || verifyCacMutation.isPending}
              >
                {verifyCacMutation.isPending ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <ThemedText style={styles.buttonText}>
                      Verifying...
                    </ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText style={styles.buttonText}>
                      Verify CAC
                    </ThemedText>
                    <ArrowRight size={18} />
                  </>
                )}
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        {step === "bank" && (
          <ThemedView style={styles.formContainer}>
            {vendorProfile?.verificationTier === "tier2" ? (
              <ThemedView style={styles.infoBox}>
                <Info size={20} color="#2563eb" />
                <ThemedText style={styles.infoText}>
                  As a CAC-verified (Tier 2) vendor, you can use a business
                  account that doesn't need to match your personal details.
                </ThemedText>
              </ThemedView>
            ) : (
              <>
                <ThemedView
                  style={{
                    backgroundColor: "#eff6ff",
                    borderWidth: 1,
                    borderColor: "#bfdbfe",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText
                    style={{
                      color: "#426bdf",
                      fontWeight: "600",
                      fontSize: 10,
                    }}
                  >
                    At least one verification is required to sell on Vazzel.
                  </ThemedText>
                </ThemedView>
              </>
            )}

            <ThemedView
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                padding: 12,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <View style={styles.warningBox}>
                <AlertCircle size={20} color="#eab308" />
                <View>
                  <ThemedText style={styles.warningHead}>
                    Personal Account Required
                  </ThemedText>
                  <ThemedText style={styles.warningText}>
                    You must use a bank account that matches your NIN verified
                    details.
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.label}>Account Number</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit account number"
                value={formData.accountNumber}
                onChangeText={(text) => handleChange("accountNumber", text)}
                keyboardType="numeric"
              />
              <ThemedText style={styles.label}>Bank</ThemedText>
              <ThemedView style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.bankCode}
                  onValueChange={(itemValue) =>
                    handleSelectChange("bankCode", itemValue)
                  }
                  style={styles.picker}
                  dropdownIconColor="#9f0e42"
                >
                  <Picker.Item label="Select a bank" value="" />
                  {banks.map((bank) => (
                    <Picker.Item
                      key={bank.code}
                      label={bank.name}
                      value={bank.code}
                    />
                  ))}
                </Picker>
              </ThemedView>

              <ThemedText style={styles.label}>Account Name</ThemedText>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                placeholder="Account name will appear here"
                value={formData.accountName}
                editable={false}
              />
              {accountError ? (
                <ThemedText style={styles.errorText}>{accountError}</ThemedText>
              ) : null}

              <ThemedView style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={prevStep}
                >
                  <ArrowLeft size={18} />
                  <ThemedText style={styles.buttonText}>Back</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    (!formData.bankCode ||
                      !formData.accountNumber ||
                      !formData.accountName ||
                      verifyBankMutation.isPending) &&
                      styles.disabledButton,
                  ]}
                  onPress={nextStep}
                  disabled={
                    !formData.bankCode ||
                    !formData.accountNumber ||
                    !formData.accountName ||
                    verifyBankMutation.isPending
                  }
                >
                  {verifyBankMutation.isPending ? (
                    <>
                      <ActivityIndicator color="#fff" />
                      <ThemedText style={styles.buttonText}>
                        Verifying...
                      </ThemedText>
                    </>
                  ) : (
                    <>
                      <ThemedText style={styles.buttonText}>
                        Verify Account
                      </ThemedText>
                      <ArrowRight size={18} />
                    </>
                  )}
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}

        {step === "summary" && (
          <ThemedView style={styles.formContainer}>
            {formData.accountNumber && (
              <ThemedView style={styles.summaryBox}>
                <ThemedView style={styles.summaryHeader}>
                  <CreditCard size={20} color="#2563eb" />
                  <ThemedText style={styles.summaryTitle}>
                    Bank Details
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.summaryContent}>
                  <ThemedView style={styles.summaryRow}>
                    <ThemedText style={styles.summaryLabel}>Bank</ThemedText>
                    <ThemedText style={styles.summaryValue}>
                      {formData.bankName}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.summaryRow}>
                    <ThemedText style={styles.summaryLabel}>
                      Account Number
                    </ThemedText>
                    <ThemedText style={styles.summaryValue}>
                      {formData.accountNumber}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.summaryRow}>
                    <ThemedText style={styles.summaryLabel}>
                      Account Name
                    </ThemedText>
                    <ThemedText style={styles.summaryValue}>
                      {formData.accountName}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            )}

            <ThemedView style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={prevStep}
              >
                <ArrowLeft size={18} />
                <ThemedText style={styles.buttonText}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  updateVendorMutation.isPending && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={updateVendorMutation.isPending}
              >
                {updateVendorMutation.isPending ? (
                  <>
                    <ActivityIndicator color="#fff" />
                    <ThemedText style={styles.buttonText}>
                      Submitting...
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText style={styles.buttonText}>
                    Confirm and Submit
                  </ThemedText>
                )}
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
