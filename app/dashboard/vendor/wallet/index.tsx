"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, RefreshControl, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";

import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { AuthAPI } from "@/apis/auth-api";
import CardTable from "@/components/CardTable";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { WalletResponse } from "@/types/store";
import { WalletStyles } from "./style";

const WalletDashboard = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = WalletStyles(colorScheme);
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

  const transactions = getActiveTransactions();

  const columns = [
    {
      header: "",
      width: 140,
      cell: (row: any) => (
        <ThemedText numberOfLines={1}>{row.transactionId || "N/A"}</ThemedText>
      ),
    },
    {
      header: "Date",
      width: 120,
      cell: (row: any) => (
        <ThemedText>
          {row.createdAt ? row.createdAt.split("T")[0] : "N/A"}
        </ThemedText>
      ),
    },
    {
      header: "Amount",
      width: 120,
      cell: (row: any) => (
        <ThemedText>{amountFormatter(row.netAmount)}</ThemedText>
      ),
    },
    {
      header: "Transaction Type",
      width: 120,
      cell: (row: any) => <ThemedText
      style={{
        color: row.status === "completed" ? "green" : "orange",
       
      }}>{row.type || "-"}</ThemedText>,
    },
    {
      header: "Status",
      width: 120,
      cell: (row: any) => (
        <ThemedText
          style={{
            color: row.status === "completed" ? "green" : "orange",
            fontWeight: "600",
          }}
        >
          {row.status || "Pending"}
        </ThemedText>
      ),
    },
    {
      header: "Details",
      width: 120,
      cell: (row: any) => (
        <ThemedText
      
        >
       
        </ThemedText>
      ),
    },
  ];

  if (loading && !walletData) {
    return <ThemedLoader />;
  }

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <Header title={`Hello, ${user?.name || ""}`} />
  
      {/* Scrollable Content with Pull-to-Refresh */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Balance Summary */}
        <ThemedView style={styles.balanceContainer}>
          <ThemedView style={styles.balanceCard}>
            <ThemedView style={styles.cardHeader}>
              <ThemedText style={styles.cardTitle}>Available Balance</ThemedText>
              <ThemedView style={styles.switchCircle} />
            </ThemedView>
            <ThemedText style={styles.balanceAmount}>
              {amountFormatter(walletData?.balances?.available || 0)}
            </ThemedText>
            <TouchableOpacity style={styles.withdrawalButton}>
              <ThemedText style={styles.withdrawalButtonText}>Withdraw</ThemedText>
            </TouchableOpacity>
          </ThemedView>
  
          <ThemedView style={styles.balanceCardLight}>
            <ThemedText style={styles.cardTitleLight}>Escrow Balance</ThemedText>
            <ThemedText style={styles.balanceAmountLight}>
              {amountFormatter(walletData?.balances?.escrow || 0)}
            </ThemedText>
          </ThemedView>
  
          <ThemedView style={styles.balanceCardLight}>
            <ThemedView style={styles.totalBalanceHeader}>
              <ThemedText style={styles.cardTitleLight}>Total Balance</ThemedText>
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
        </ThemedView>
  
        {/* Tabs */}
        <ThemedView style={styles.transactionSection}>
          <ThemedText style={styles.sectionTitle}>Transaction History</ThemedText>
  
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
  
        {/* Transactions Table */}
        {loading ? (
          <ThemedLoader />
        ) : transactions.length === 0 ? (
          <ThemedText style={styles.empty}>No transactions found</ThemedText>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
            <CardTable
              columns={columns}
              data={transactions}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
              isLoading={loading}
              onRowClick={(row) => console.log("Clicked transaction:", row)}
            />
          </View>
        )}
      </ScrollView>
      </ThemedView>
  );
  
};

export default WalletDashboard;
