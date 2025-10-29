"use client";

import { OrderAPI } from "@/apis/order-api";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MediaLibrary } from "@/components/Vendor/MediaLibrary";
import { OrderItem } from "@/components/Vendor/OrderItem";
import { ProductItem } from "@/components/Vendor/ProductItem";
import { StatCard } from "@/components/Vendor/StatCard";
import { amountFormatter } from "@/helpers/data-utils";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useAuthStore } from "@/store";
import { useMediaStore } from "@/store/useMediaStore";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { Calendar, DollarSign } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { DashboardStyles } from "./style";

const { width } = Dimensions.get("window");

export default function VendorDashboard() {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme();
  const styles = DashboardStyles(colorScheme);
  const authAPI = new OrderAPI(user?.token);
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const storeId = user?.store?.id;
  const { media, fetchMedia, currentPage, usage, fetchUsage } = useMediaStore();

  useEffect(() => {
    fetchMedia();
    fetchUsage();
  }, [currentPage]);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);


  };
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (search?: string, page = 1, status?: string) => {
    try {
      setLoading(true);
      const params: Record<string, any> = { page };
      const response = await authAPI.getMyStoreOrders(storeId, params);
      const orderList = response?.data?.data || [];
      setOrders(orderList);
      setTotalPages(response?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <Header title={`Welcome ${user?.name || ""}`}  showBottomBorder={false}  />

      {/* Welcome Section */}
      <ThemedView style={styles.welcomeSection}>
        <ThemedText style={styles.welcomeSubtitle}>
          Here&apos;s Your Current Sales Overview
        </ThemedText>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Calendar size={16} color="#666" />
          <ThemedText style={styles.dateButtonThemedText}>
            {date ? date.toDateString() : "Select Date"}
          </ThemedText>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </ThemedView>

      {/* Scrollable Dashboard */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <ThemedView style={styles.statsContainer}>
          <StatCard
            title="Total Sales"
            value="₦136,000"
            backgroundColor="#E1F7FF"
            icon={<DollarSign size={24} color="#000" />}
          />
          <StatCard
            title="Avg Order Value"
            value="₦12,363.64"
            backgroundColor="#FFF4FE"
            imageSource={require("../../../assets/images/dashboard/Vector.png")}
          />
          <StatCard
            title="Customer Acquisition Rate"
            value="0"
            backgroundColor="#F3FFF4"
            imageSource={require("../../../assets/images/dashboard/solar_box-outline.png")}
          />
        </ThemedView>

        {/* Wallet Balance */}
        <ThemedView style={styles.walletCard}>
          <ThemedView style={styles.walletContent}>
            <ThemedView style={styles.walletInfo}>
              <ThemedText style={styles.walletLabel}>Wallet Balance</ThemedText>
              <ThemedText style={styles.walletAmount}>
                {amountFormatter(
                  user?.vendorProfile?.wallet?.balances?.total ?? 0
                )}
              </ThemedText>
            </ThemedView>
            <Image
              source={require("../../../assets/images/dashboard/Frame 1321314936 (1).png")}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </ThemedView>
        </ThemedView>

        {/* Total Orders */}
        <ThemedView style={styles.section}>
          <StatCard
            title="Total Orders"
            value="33"
            backgroundColor="#FFFFFF"
            imageSource={require("../../../assets/images/dashboard/lets-icons_order.png")}
          />
        </ThemedView>

        {/* Recent Orders */}
        {/* <ThemedView style={[styles.card, { width: width * 0.9 }]}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
            <TouchableOpacity style={styles.viewAllButton} onPress={()=>router.push("/dashboard/vendor/orders")}>
              <ThemedText style={styles.viewAllThemedText}>View All</ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#6B0C2D" />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.ordersList}>
            <OrderItem
              orderId="#GRDC3"
              amount="₦4,000"
              date="03/08/2025"
              status="successful"
            />
            <OrderItem
              orderId="#D9I3O"
              amount="₦8,000"
              date="03/08/2025"
              status="pending"
            />
            <OrderItem
              orderId="#4M_OC"
              amount="₦4,000"
              date="22/07/2025"
              status="pending"
            />
            <OrderItem
              orderId="#XPW8U"
              amount="₦8,000"
              date="17/07/2025"
              status="pending"
            />
            <OrderItem
              orderId="#TEQC3"
              amount="₦4,000"
              date="17/07/2025"
              status="pending"
            />
          </ThemedView>
        </ThemedView> */}

<ThemedView style={[styles.card, { width: width * 0.9 }]}>
  <ThemedView style={styles.sectionHeader}>
    <ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
    <TouchableOpacity
      style={styles.viewAllButton}
      onPress={() => router.push("/dashboard/vendor/orders")}
    >
      <ThemedText style={styles.viewAllThemedText}>View All</ThemedText>
      <Ionicons name="arrow-forward" size={20} color="#6B0C2D" />
    </TouchableOpacity>
  </ThemedView>

  <ThemedView style={styles.ordersList}>
    {loading ? (
      <ThemedText>Loading orders...</ThemedText>
    ) : orders.length === 0 ? (
      <ThemedText>No recent orders found.</ThemedText>
    ) : (
      orders.slice(0, 5).map((order) => (
        <OrderItem
          key={order.id}
          orderId={`${order.orderNumber.slice(0, 5)}`}
          amount={`${amountFormatter(order.total_amount ?? 0)}`}
          date={
            order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A"
          }
          status={order.status ?? "pending"}
        />
      ))
    )}
  </ThemedView>
</ThemedView>


        {/* Popular Products */}
        <ThemedView
          style={[styles.card, { width: width * 0.9, paddingHorizontal: 10 }]}
        >
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Popular Products</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllThemedText}>
                Manage Products
              </ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#6B0C2D" />
            </TouchableOpacity>
          </ThemedView>
          <ProductItem name="Brown gown" soldCount={25} />
        </ThemedView>

        {/* Customer Insights */}
        <ThemedView style={[styles.card, { width: width * 0.9 }]}>
          <ThemedText style={styles.sectionTitle}>Customer Insights</ThemedText>
          <ThemedView style={styles.insightsRow}>
            <ThemedView style={styles.insightItem}>
              <ThemedText style={styles.insightLabel}>New Customers</ThemedText>
              <ThemedText style={styles.insightValue}>0</ThemedText>
            </ThemedView>
            <ThemedView style={styles.insightItem}>
              <ThemedText style={styles.insightLabel}>Returning</ThemedText>
              <ThemedText style={styles.insightValue}>2</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Media Library */}
        <MediaLibrary
          usage={usage ?? { usedStorage: 0, percentUsed: 0 }}
          media={media}
        />

        <ThemedView style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}
