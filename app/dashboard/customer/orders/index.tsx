"use client";

import { OrderAPI } from "@/apis/order-api";
import OrdersHeader from "@/components/Customer/OrderScreenHeader";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { ThemedLoader } from "@/components/ThemedLoader";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import { OrdersStyles } from "./style";

export default function OrdersScreen() {
  const { user } = useAuthStore();
  const storeId = user?.id;
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = OrdersStyles(colorScheme);
  const authAPI = new OrderAPI(user?.token);

  const normalizeStatus = (tab: string) => {
    switch (tab) {
      case "Completed":
        return "delivered";
      case "Ongoing":
        return "pending";
      case "Cancelled":
        return "cancelled";
      default:
        return undefined;
    }
  };

  const fetchOrders = async (search = "", page = 1, tab = activeTab) => {
    if (!storeId) return;

    try {
      setLoading(true);
      setOrders([]);

      const status = normalizeStatus(tab);
      const params: Record<string, any> = { page };
      if (status) params.status = status;

      const response = await authAPI.getCustomerOrder(storeId, params);

      const orderList = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      const filtered = search
        ? orderList.filter((o: any) =>
            o.user?.name?.toLowerCase().includes(search.toLowerCase())
          )
        : orderList;

      setOrders(filtered);

      const pagination = response?.data?.pagination;
      setTotalPages(pagination?.totalPages || 1);
      setCurrentPage(pagination?.page || page);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setOrders([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders whenever activeTab changes
  useEffect(() => {
    setCurrentPage(1); // reset page
    fetchOrders(query, 1, activeTab); // explicitly pass activeTab
  }, [activeTab]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchOrders(query, newPage, activeTab);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#FEF9C3", color: "#854D0E" };
      case "delivered":
        return { backgroundColor: "#DCFCE7", color: "#166534" };
      case "cancelled":
        return { backgroundColor: "#FEE2E2", color: "#991B1B" };
      default:
        return { backgroundColor: "#E5E7EB", color: "#374151" };
    }
  };

  const columns = [
    {
      header: "Order Date",
      width: 120,
      cell: (row: any) => (
        <Text style={styles.cellText}>
          {new Date(row.createdAt).toISOString().slice(0, 10)}
        </Text>
      ),
    },
    {
      header: "Order Number",
      width: 160,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.orderNumber || "-"}
        </Text>
      ),
    },
    {
      header: "No. of items",
      width: 200,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row?.items?.length || 0}
        </Text>
      ),
    },
    {
      header: "Payment Method",
      width: 140,
      cell: (row: any) => (
        <Text style={styles.cellText}>{row.payment_info?.method || "-"}</Text>
      ),
    },
    {
      header: "Total (NGN)",
      width: 120,
      cell: (row: any) => (
        <Text style={styles.cellText}>
          {amountFormatter(row.total_amount || "0.00")}
        </Text>
      ),
    },
    {
      header: "Return",
      width: 100,
      cell: (row: any) => (
        <Text style={styles.cellText}>
          {row.items?.some((i: any) => i.return?.isReturned) ? "Returned" : "-"}
        </Text>
      ),
    },
    {
      header: "Status",
      width: 120,
      cell: (row: any) => {
        const color = getStatusColor(row.status);
        return (
          <View
            style={{
              backgroundColor: color.backgroundColor,
              borderRadius: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: color.color, fontWeight: "600" }}>
              {row.status}
            </Text>
          </View>
        );
      },
    },
  ];

  if (loading) return <ThemedLoader />;

  return (
    <View style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}>
      <Header title={"Orders"} />
      <OrdersHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        query={query}
        setQuery={setQuery}
        onSearch={(text: string) => {
          setCurrentPage(1);
          fetchOrders(text, 1, activeTab); // explicitly pass tab
        }}
        onFilter={() => console.log("Filter clicked")}
        onDate={() => console.log("Select Date clicked")}
      />
      <Table
        columns={columns}
        data={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={loading}
        onRowClick={(row) => console.log("Clicked:", row)}
      />
    </View>
  );
}
