"use client";

import { ThemedView } from "@/components/ThemedView";
import useUpdateBankAccount from "@/hooks/use-update-bank-account";
import useVerifyBankAccount from "@/hooks/use-verify-bank-account";
import { api, showError, showSuccess } from "@/services/api";
import { useAuthStore } from "@/store";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import {
    AlertCircle,
    Building2,
    ChevronRight,
    CreditCard,
    Percent,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
// import { AlertCircle, Building2, ChevronRight, CreditCard, Percent } from "react-native-feather"
import Toast from "react-native-toast-message";

interface BankOption {
  name: string;
  code: string;
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
  verificationTier: "unverified" | "tier1" | "tier2";
  bankDetails?: {
    bankCode: string;
    bankName?: string;
    accountNumber: string;
    accountName: string;
    verified?: boolean;
    accountType?: string;
    recipientCode?: string;
  };
  businessDetails?: {
    businessName: string;
  };
}

interface AccountTabScreenProps {
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

export default function AccountTabScreen({
  onSuccess,
  onError,
}: AccountTabScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { user } = useAuthStore();
  const vendorId = user?.vendorProfile?.id;
  const [formData, setFormData] = useState({
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [banks, setBanks] = useState<BankOption[]>([]);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(
    null
  );
  const [showAccountUpdateForm, setShowAccountUpdateForm] = useState(false);

  const verifyBankAccount = useVerifyBankAccount();
  const updateBankAccount = useUpdateBankAccount();

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

  useEffect(() => {
    if (fetchVendorProfileQuery.data) {
      setVendorProfile(fetchVendorProfileQuery.data);
    }
  }, [fetchVendorProfileQuery.data]);

  useEffect(() => {
    if (fetchBanksQuery.data) {
      setBanks(fetchBanksQuery.data);
    }
  }, [fetchBanksQuery.data]);

  const openAccountUpdateForm = () => {
    const profile = vendorProfile;
    const updatedFormData = { ...formData };

    if (profile?.bankDetails) {
      updatedFormData.bankCode = profile.bankDetails.bankCode || "";
      updatedFormData.bankName = profile.bankDetails.bankName || "";
      updatedFormData.accountNumber = profile.bankDetails.accountNumber || "";
      updatedFormData.accountName = profile.bankDetails.accountName || "";
    }

    setShowAccountUpdateForm(true);
    setFormData(updatedFormData);
    setIsEditing(false);
  };

  const handleChange = (name: string, value: string) => {
    setIsEditing(true);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // Auto-verify account on account number change
  useEffect(() => {
    const { accountNumber, bankCode } = formData;

    if (!isEditing) return;
    if (!accountNumber || !bankCode) return;

    if (accountNumber.length !== 10) {
      if (formData.accountName) {
        setFormData((prev) => ({ ...prev, accountName: "" }));
      }
      return;
    }

    if (!verifyBankAccount.isPending) {
      verifyBankAccount.mutate(
        {
          account_number: accountNumber,
          account_bank: bankCode,
        },
        {
          onSuccess: (data) => {
            const accountName = data.data?.account_name;
            if (accountName) {
              setFormData((prev) => ({ ...prev, accountName }));
              showSuccess("Account name resolved successfully");
              onSuccess?.("Account name resolved successfully");
              fetchVendorProfileQuery.refetch();
            }
          },
          onError: (error: any) => {
            setFormData((prev) => ({ ...prev, accountName: "" }));
            const message = error.message || "Failed to resolve account name";
            showError(message);
            onError?.(message);
          },
        }
      );
    }
  }, [
    formData.accountNumber,
    formData.bankCode,
    verifyBankAccount.isPending,
    isEditing,
  ]);

  const handleSubmit = () => {
    if (
      !formData.bankCode ||
      !formData.accountNumber ||
      !formData.accountName
    ) {
      Toast.show({
        type: "error",
        text1: "Please complete all required fields",
      });
      return;
    }

    const selectedBank = banks.find((bank) => bank.code === formData.bankCode);
    const bankName = selectedBank?.name || formData.bankName;

    updateBankAccount.mutate(
      {
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode,
        accountName: formData.accountName,
        businessName: vendorProfile?.businessDetails?.businessName,
        accountType: "business",
        bankName: bankName,
        recipientCode: vendorProfile?.bankDetails?.recipientCode,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Bank account updated successfully",
          });

          // ✅ Notify parent
          onSuccess?.("Bank account updated successfully");

          fetchVendorProfileQuery.refetch();
          setShowAccountUpdateForm(false);
        },
        onError: (error: any) => {
          const message =
            error.details || error.message || "Failed to update bank account";

          Toast.show({
            type: "error",
            text1: message,
          });

          // ✅ Notify parent
          onError?.(message);
        },
      }
    );
  };

  const isNinVerified = vendorProfile?.verificationTier === "tier1";
  const isCACVerified = vendorProfile?.verificationTier === "tier2";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      //   padding: 16,
    },
    card: {
      backgroundColor: isDark ? "#262626" : "#ffffff",
      borderRadius: 12,
      padding: 6,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    wcard: {
      flexDirection: "row",
      backgroundColor: "#eff6ff",
      paddingVertical: 10,
      borderRadius: 6,
      paddingHorizontal: 6,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#bfdbfe",
    },
    cardHeader: {
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 12,
      color: isDark ? "#a0aec0" : "#6b7280",
    },
    alertBox: {
      flexDirection: "row",
      backgroundColor: "#fefce8",
      paddingVertical: 10,
      borderRadius: 6,
      paddingHorizontal: 6,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#fef08a",
    },
    alertIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    alertText: {
      flex: 1,
    },
    alertTextBold: {
      color: isDark ? "#fef3c7" : "#92400e",
      fontWeight: "600",
      fontSize: 14,
      marginBottom: 4,
    },
    alertTextRegular: {
      color: isDark ? "#fef3c7" : "#92400e",
      fontSize: 13,
    },
    blueAlert: {
      backgroundColor: isDark ? "#1e3a8a" : "#dbeafe",
      borderLeftColor: "#3b82f6",
    },
    blueAlertIcon: {
      color: "#3b82f6",
    },
    blueAlertText: {
      color: isDark ? "#93c5fd" : "#1e40af",
    },
    commissionBox: {
      flexDirection: "row",
      backgroundColor: isDark ? "#262626" : "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    commissionIcon: {
      marginRight: 16,
      marginTop: 4,
    },
    commissionContent: {
      flex: 1,
    },
    commissionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#9f0e42",
      marginBottom: 8,
    },
    commissionText: {
      fontSize: 14,
      color: isDark ? "#a0aec0" : "#6b7280",
      lineHeight: 20,
    },
    formContainer: {
      marginTop: 12,
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      marginBottom: 8,
    },
    input: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      padding: 12,
      fontSize: 14,
      color: isDark ? "#ffffff" : "#000000",
      borderWidth: 1,
      borderColor: isDark ? "#374151" : "#e5e7eb",
    },
    pickerContainer: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDark ? "#374151" : "#e5e7eb",
      overflow: "hidden",
    },
    picker: {
      color: isDark ? "#ffffff" : "#000000",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 20,
    },
    button: {
      backgroundColor: "#9f0e42",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    updateButton: {
      backgroundColor: "#9f0e42",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
    },
    updateButtonText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "600",
    },
    bankDetailContainer: {
      marginTop: 16,
    },
    bankDetailHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    bankDetailTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      flexDirection: "row",
      alignItems: "center",
    },
    bankDetailBox: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      padding: 12,
    },
    bankDetailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#e5e7eb",
    },
    bankDetailRowLast: {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
    bankDetailLabel: {
      fontSize: 12,
      color: isDark ? "#9ca3af" : "#6b7280",
      fontWeight: "500",
    },
    bankDetailValue: {
      fontSize: 14,
      color: isDark ? "#ffffff" : "#000000",
      fontWeight: "500",
      marginTop: 4,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDark
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(255, 255, 255, 0.9)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      zIndex: 10,
    },
    spinnerContainer: {
      alignItems: "center",
    },
    spinnerText: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
    },
  });

  if (fetchVendorProfileQuery.isLoading || fetchBanksQuery.isLoading) {
    return <ThemedView />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {!isCACVerified && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Update Bank Account</Text>
            <Text style={styles.cardDescription}>
              Manage your business bank account details
            </Text>
          </View>

          <View style={styles.alertBox}>
            <View style={styles.alertIcon}>
              <AlertCircle width={20} height={20} color="#ca8a04" />
            </View>
            <View style={styles.alertText}>
              <Text style={styles.alertTextBold}>
                CAC verification required.
              </Text>
              <Text style={styles.alertTextRegular}>
                You need to complete CAC verification (Tier 2) to use this
                feature.
              </Text>
            </View>
          </View>

          <Text style={[styles.cardDescription]}>
            To update your bank account information, please complete the CAC
            verification process in the KYC tab first.
          </Text>
        </View>
      )}

      {(isNinVerified || isCACVerified) && (
        <>
          {/* Commission Info */}
          <View style={styles.commissionBox}>
            <View style={styles.commissionIcon}>
              <Percent width={20} height={20} color="#9f0e42" />
            </View>
            <View style={styles.commissionContent}>
              <Text style={styles.commissionTitle}>
                Vendor Commission Structure
              </Text>
              <Text style={styles.commissionText}>
                Vazzel charges a 4% commission on all sales. Commission fees are
                automatically deducted from your sales and detailed in your
                wallet transactions.
              </Text>
            </View>
          </View>

          {/* Bank Account Section */}
          <View style={styles.card}>
            {showAccountUpdateForm ? (
              <>
                {updateBankAccount.isPending && (
                  <View style={styles.loadingOverlay}>
                    <View style={styles.spinnerContainer}>
                      <ActivityIndicator size="large" color="#9f0e42" />
                      <Text style={styles.spinnerText}>Updating...</Text>
                    </View>
                  </View>
                )}

                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Update Bank Account</Text>
                  <Text style={styles.cardDescription}>
                    Manage your business bank account details
                  </Text>
                </View>

                <View style={[styles.wcard]}>
                  <View style={styles.alertIcon}>
                    <AlertCircle width={20} height={20} color="#3b82f6" />
                  </View>
                  <View style={styles.alertText}>
                    <Text style={[styles.alertTextBold, styles.blueAlertText]}>
                      Business Account
                    </Text>
                    <Text
                      style={[styles.alertTextRegular, styles.blueAlertText]}
                    >
                      As a CAC-verified (Tier 2) vendor, you can update your
                      bank account details at any time.
                    </Text>
                  </View>
                </View>

                <View style={styles.formContainer}>
                  {/* Bank Selector */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Bank</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={formData.bankCode}
                        onValueChange={(value) =>
                          handleSelectChange("bankCode", value)
                        }
                        style={styles.picker}
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
                    </View>
                  </View>

                  {/* Account Number */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Account Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter 10-digit account number"
                      placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                      value={formData.accountNumber}
                      onChangeText={(value) =>
                        handleChange("accountNumber", value)
                      }
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>

                  {/* Account Name */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Account Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { color: isDark ? "#a0aec0" : "#6b7280" },
                      ]}
                      placeholder={
                        verifyBankAccount.isPending
                          ? "Resolving account name..."
                          : "Account name will appear here"
                      }
                      placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                      value={formData.accountName}
                      editable={false}
                    />
                  </View>

                  {/* Submit Button */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        (!formData.bankCode ||
                          !formData.accountNumber ||
                          !formData.accountName ||
                          updateBankAccount.isPending) &&
                          styles.buttonDisabled,
                      ]}
                      onPress={handleSubmit}
                      disabled={
                        !formData.bankCode ||
                        !formData.accountNumber ||
                        !formData.accountName ||
                        updateBankAccount.isPending
                      }
                    >
                      <Text style={styles.buttonText}>
                        {updateBankAccount.isPending
                          ? "Updating..."
                          : "Update Account"}
                      </Text>
                      {!updateBankAccount.isPending && (
                        <ChevronRight width={16} height={16} color="#ffffff" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                {vendorProfile?.bankDetails && (
                  <View style={styles.bankDetailContainer}>
                    <View style={styles.bankDetailHeader}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <CreditCard width={20} height={20} color="#9f0e42" />
                        <Text
                          style={[styles.bankDetailTitle, { marginLeft: 8 }]}
                        >
                          Current Bank Account
                        </Text>
                      </View>
                      {isCACVerified && (
                        <TouchableOpacity
                          style={styles.updateButton}
                          onPress={openAccountUpdateForm}
                        >
                          <Text style={styles.updateButtonText}>Update</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.bankDetailBox}>
                      <View style={styles.bankDetailRow}>
                        <View>
                          <Text style={styles.bankDetailLabel}>Bank</Text>
                          <Text style={styles.bankDetailValue}>
                            {vendorProfile.bankDetails.bankName ||
                              (vendorProfile.bankDetails.bankCode
                                ? banks.find(
                                    (bank) =>
                                      bank.code ===
                                      vendorProfile.bankDetails?.bankCode
                                  )?.name
                                : null) ||
                              "N/A"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.bankDetailRow}>
                        <View>
                          <Text style={styles.bankDetailLabel}>
                            Account Number
                          </Text>
                          <Text style={styles.bankDetailValue}>
                            {vendorProfile.bankDetails.accountNumber || "N/A"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.bankDetailRow}>
                        <View>
                          <Text style={styles.bankDetailLabel}>
                            Account Name
                          </Text>
                          <Text style={styles.bankDetailValue}>
                            {vendorProfile.bankDetails.accountName || "N/A"}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.bankDetailRowLast}>
                        <View>
                          <Text style={styles.bankDetailLabel}>
                            Account Type
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 4,
                            }}
                          >
                            <Building2 width={16} height={16} color="#3b82f6" />
                            <Text
                              style={[
                                styles.bankDetailValue,
                                { marginLeft: 6 },
                              ]}
                            >
                              {vendorProfile.verificationTier === "tier1"
                                ? "Personal Account"
                                : vendorProfile.verificationTier === "tier2"
                                ? "Business Account"
                                : ""}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </>
      )}

      <Toast />
    </ScrollView>
  );
}
