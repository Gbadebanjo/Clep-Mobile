"use client";

import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { useMediaStore } from "@/store/useMediaStore";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { Calendar, DollarSign } from "lucide-react-native";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { styles } from "./style";

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

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  backgroundColor,
  imageSource,
}) => (
  <View style={[styles.statCard, { backgroundColor }]}>
    <View style={styles.statCardContent}>
      <View style={styles.statCardLeft}>
        <ThemedText style={styles.statCardTitle}>{title}</ThemedText>
        <ThemedText style={styles.statCardValue}>{value}</ThemedText>
      </View>
      <View style={styles.statCardIcon}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.imageIcon}
            resizeMode="contain"
          />
        ) : (
          icon
        )}
      </View>
    </View>
  </View>
);

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  amount,
  date,
  status,
}) => (
  <View style={styles.orderItem}>
    <View style={styles.orderItemLeft}>
      <ThemedText style={styles.orderItemId}>{orderId}</ThemedText>
      <ThemedText style={styles.orderItemDate}>{date}</ThemedText>
    </View>
    <View style={styles.orderItemRight}>
      <ThemedText style={styles.orderItemAmount}>{amount}</ThemedText>
      <ThemedText style={styles.orderItemStatus}>{status}</ThemedText>
    </View>
  </View>
);

const ProductItem: React.FC<ProductItemProps> = ({ name, soldCount }) => (
  <View style={styles.productItem}>
    <ThemedText style={styles.productName}>{name}</ThemedText>
    <ThemedText style={styles.productSold}>{soldCount} sold</ThemedText>
  </View>
);

export default function VendorDashboard() {
  const { user } = useAuthStore();
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };
  const {
    media,
    fetchMedia,
    currentPage,
    usage,
    fetchUsage,
  } = useMediaStore();
  useEffect(() => {
    fetchMedia();
    fetchUsage();
  }, [currentPage]);


  console.log("user in vendor dashboard", user);
  return (
    <ThemedView style={styles.container}>
      {/* ✅ Fixed Header */}
      <Header title={`Welcome ${user?.name}`} showBackButton={false}/>

      {/* ✅ Welcome Section (outside scrollview) */}
      <View style={styles.welcomeSection}>
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
      </View>

      {/* ✅ Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
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
        </View>

        {/* Wallet Balance */}
        <View style={styles.walletCard}>
          <View style={styles.walletContent}>
            <View>
              <ThemedText style={styles.walletLabel}>Wallet Balance</ThemedText>
              <ThemedText style={styles.walletAmount}>{amountFormatter(user?.vendorProfile?.wallet?.balances?.total)}</ThemedText>
            </View>
            <Image
              source={require("../../../assets/images/dashboard/Frame 1321314936 (1).png")}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Total Orders */}
        <View style={styles.section}>
          <StatCard
            title="Total Orders"
            value="33"
            backgroundColor="#FFFFFF"
            imageSource={require("../../../assets/images/dashboard/lets-icons_order.png")}
          />
        </View>

        {/* Recent Orders */}
        <View style={[styles.card, { width: width * 0.9 }]}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllThemedText}>View All</ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#6B0C2D" />
            </TouchableOpacity>
          </View>
          <View style={styles.ordersList}>
            <OrderItem orderId="#GRDC3" amount="₦4,000" date="03/08/2025" status="successful" />
            <OrderItem orderId="#D9I3O" amount="₦8,000" date="03/08/2025" status="pending" />
            <OrderItem orderId="#4M_OC" amount="₦4,000" date="22/07/2025" status="pending" />
            <OrderItem orderId="#XPW8U" amount="₦8,000" date="17/07/2025" status="pending" />
            <OrderItem orderId="#TEQC3" amount="₦4,000" date="17/07/2025" status="pending" />
          </View>
        </View>

        {/* Popular Products */}
        <View style={[styles.card, { width: width * 0.9, paddingHorizontal: 10 }]}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Popular Products</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllThemedText}>
                Manage Products
              </ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#6B0C2D" />
            </TouchableOpacity>
          </View>
          <ProductItem name="Brown gown" soldCount={25} />
        </View>

        {/* Customer Insights */}
        <View style={[styles.card, { width: width * 0.9 }]}>
          <ThemedText style={styles.sectionTitle}>Customer Insights</ThemedText>
          <View style={styles.insightsRow}>
            <View style={styles.insightItem}>
              <ThemedText style={styles.insightLabel}>New Customers</ThemedText>
              <ThemedText style={styles.insightValue}>0</ThemedText>
            </View>
            <View style={styles.insightItem}>
              <ThemedText style={styles.insightLabel}>Returning</ThemedText>
              <ThemedText style={styles.insightValue}>2</ThemedText>
            </View>
          </View>
        </View>

        {/* Media Library */}
        <View style={[styles.card, { width: width * 0.9 }]}>
          <View style={styles.header}>
            <Ionicons name="image-outline" size={22} color="#000" />
            <ThemedText style={styles.headerThemedText}>Media Library</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.label}>Storage Usage</ThemedText>
            <ThemedText style={styles.value}>
              {usage ? (usage.usedStorage / 1024 / 1024).toFixed(2) : '0.00'} MB
            </ThemedText>
          </View>

          <View style={styles.row}>
            <View style={styles.fileCount}>
            <Image
              source={require("../../../assets/images/dashboard/Vector (1).png")}
              style={{ width: 16, height: 16 }}
              resizeMode="contain"
            />
            
              <ThemedText style={styles.fileThemedText}>{media?.length} files</ThemedText>
            </View>
            <ThemedText style={styles.percentThemedText}>
              {usage?.percentUsed}% Used
            </ThemedText>
          </View>

          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push("/media")}
          >
            <ThemedText style={styles.manageThemedText}>
              Manage Media Library
            </ThemedText>
            <Ionicons name="open-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}


