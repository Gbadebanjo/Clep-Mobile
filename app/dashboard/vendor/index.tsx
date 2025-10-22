"use client";

import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  backgroundColor: string;
  imageSource?: any;
}

interface OrderItemProps {
  orderId: string;
  amount: string;
  date: string;
  status: string;
}

interface ProductItemProps {
  name: string;
  soldCount: number;
}

/* ------------------------------ StatCard ------------------------------ */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  backgroundColor,
  imageSource,
}) => {
  const colorScheme = useColorScheme();
  const styles = DashboardStyles(colorScheme);

  return (
    <ThemedView style={[styles.statCard, { backgroundColor }]}>
      <ThemedView style={[styles.statCardContent, { backgroundColor }]}>
        <ThemedView style={styles.statCardLeft}>
          <ThemedText style={styles.statCardTitle}>{title}</ThemedText>
          <ThemedText style={styles.statCardValue}>{value}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statCardIcon}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.imageIcon}
              resizeMode="contain"
            />
          ) : (
            icon
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

/* ------------------------------ OrderItem ------------------------------ */
const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  amount,
  date,
  status,
}) => {
  const colorScheme = useColorScheme();
  const styles = DashboardStyles(colorScheme);

  return (
    <ThemedView style={styles.orderItem}>
      <ThemedView style={styles.orderItemLeft}>
        <ThemedText style={styles.orderItemId}>{orderId}</ThemedText>
        <ThemedText style={styles.orderItemDate}>{date}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.orderItemRight}>
        <ThemedText style={styles.orderItemAmount}>{amount}</ThemedText>
        <ThemedText style={styles.orderItemStatus}>{status}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

/* ------------------------------ ProductItem ------------------------------ */
const ProductItem: React.FC<ProductItemProps> = ({ name, soldCount }) => {
  const colorScheme = useColorScheme();
  const styles = DashboardStyles(colorScheme);

  return (
    <ThemedView style={styles.productItem}>
      <ThemedText style={styles.productName}>{name}</ThemedText>
      <ThemedText style={styles.productSold}>{soldCount} sold</ThemedText>
    </ThemedView>
  );
};

/* ------------------------------ Main Component ------------------------------ */
export default function VendorDashboard() {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme();
  const styles = DashboardStyles(colorScheme);

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const { media, fetchMedia, currentPage, usage, fetchUsage } = useMediaStore();

  useEffect(() => {
    fetchMedia();
    fetchUsage();
  }, [currentPage]);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <Header title={`Welcome ${user?.name || ""}`} showBackButton={false} />

      {/* Welcome Section */}
      <ThemedView style={styles.welcomeSection}>
        <ThemedText style={styles.welcomeSubtitle}>
          Here's Your Current Sales Overview
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
            <ThemedView>
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
        <ThemedView style={[styles.card, { width: width * 0.9 }]}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
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
        <ThemedView style={[styles.card, { width: width * 0.9 }]}>
          <ThemedView style={styles.header}>
            <Ionicons name="image-outline" size={22} color="#000" />
            <ThemedText style={styles.headerThemedText}>Media Library</ThemedText>
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedText style={styles.label}>Storage Usage</ThemedText>
            <ThemedText style={styles.value}>
              {usage ? (usage.usedStorage / 1024 / 1024).toFixed(2) : "0.00"} MB
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedView style={styles.fileCount}>
              <Image
                source={require("../../../assets/images/dashboard/Vector (1).png")}
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
              <ThemedText style={styles.fileThemedText}>
                {media?.length} files
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.percentThemedText}>
              {usage?.percentUsed ?? 0}% Used
            </ThemedText>
          </ThemedView>

          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push("/media")}
          >
            <ThemedText style={styles.manageThemedText}>
              Manage Media Library
            </ThemedText>
            <Ionicons name="open-outline" size={16} color="#000" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}
