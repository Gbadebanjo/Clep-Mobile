import { AuthAPI } from "@/apis/auth-api";
import Header from "@/components/Header";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { WalletResponse } from "@/types/store";

import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import TransactionList from "./components/transactionList";
import { styles } from "./style";

const WalletDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "Recent" | "Escrow credit" | "Withdrawal"
  >("Recent");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<WalletResponse["data"] | null>(
    null
  );
  const { user } = useAuthStore();

  const authAPI = new AuthAPI(user?.token);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.wallet();
      setWalletData(response.data as unknown as WalletResponse["data"]);
    } catch (error: any) {
      console.error("Error fetching wallet:", error.message);
      Alert.alert("Error", error.message || "Unable to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchWalletData();
    setRefreshing(false);
  }, []);

  const getActiveTransactions = () => {
    if (!walletData) return [];
    switch (activeTab) {
      case "Escrow credit":
        return walletData.recentTransactions || [];
      case "Withdrawal":
        return walletData.pendingWithdrawals || [];
      case "Recent":
      default:
        return walletData.recentTransactions || [];
    }
  };

  if (loading && !walletData) {
    return <ThemedLoader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <Header title={`Hello, ${user?.name || ""}`} />

      {/* Scrollable content below header */}
      <FlatList
        data={getActiveTransactions()}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => <TransactionList data={[item]} />}
        ListHeaderComponent={
          <ThemedView style={styles.balanceContainer}>
            {/* Balances */}
            <ThemedView style={styles.balanceCard}>
              <ThemedView style={styles.cardHeader}>
                <ThemedText style={styles.cardTitle}>
                  Available Balance
                </ThemedText>
                <ThemedView style={styles.switchCircle} />
              </ThemedView>
              <ThemedText style={styles.balanceAmount}>
                {amountFormatter(walletData?.balances?.available || 0)}
              </ThemedText>
              <TouchableOpacity style={styles.withdrawalButton}>
                <ThemedText style={styles.withdrawalButtonText}>
                  Withdraw
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.balanceCardLight}>
              <ThemedText style={styles.cardTitleLight}>
                Escrow Balance
              </ThemedText>
              <ThemedText style={styles.balanceAmountLight}>
                {amountFormatter(walletData?.balances?.escrow || 0)}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.balanceCardLight}>
              <ThemedView style={styles.totalBalanceHeader}>
                <ThemedText style={styles.cardTitleLight}>
                  Total Balance
                </ThemedText>

                <Image
                  source={require("../../../../assets/images/dashboard/Ellipse 369.png")}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </ThemedView>
              <ThemedText style={styles.balanceAmountLight}>
                {amountFormatter(walletData?.balances?.total || 0)}
              </ThemedText>
            </ThemedView>

            {/* Tabs */}
            <ThemedView style={styles.transactionSection}>
              <ThemedText style={styles.sectionTitle}>
                Transaction History
              </ThemedText>

              <ThemedView style={styles.tabsContainer}>
                {["Recent", "Escrow credit", "Withdrawal"].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                    onPress={() => setActiveTab(tab as any)}
                  >
                    <ThemedText
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.activeTabText,
                      ]}
                    >
                      {tab}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No transactions found</ThemedText>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
};

export default WalletDashboard;
