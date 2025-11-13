"use client";

import { DisputeAPI } from "@/apis/dispute-api";
import CardTable from "@/components/CardTable";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedView } from "@/components/ThemedView";
import OrdersHeader from "@/components/Vendor/OrderScreenHeader";
import { useAuthStore } from "@/store";
import React, { useEffect, useState } from "react";
import { Text, useColorScheme } from "react-native";
import { OrdersStyles } from "./style";

export default function OrdersScreen() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = OrdersStyles(colorScheme);
  const authAPI = new DisputeAPI(user?.token);

  const normalizeStatus = (tab: string) => {
    switch (tab) {
      case "Delivered":
        return "delivered";
      case "Processing":
        return "pending";
      case "Cancelled":
        return "cancelled";
      default:
        return undefined;
    }
  };

  const fetchOrders = async (search?: string, page = 1, status?: string) => {
    try {
      setLoading(true);
      const params: Record<string, any> = { page };

      const normalizedStatus = normalizeStatus(status || activeTab);
      if (normalizedStatus) params.status = normalizedStatus;

      const response = await authAPI.vendorDisputes();

      const orderList = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      const filtered = search
        ? orderList.filter((o: any) =>
            o.user?.name?.toLowerCase().includes(search.toLowerCase())
          )
        : orderList;

      setOrders(filtered);
    //   const pagination = response?.data?.pagination;
    //   setTotalPages(pagination?.totalPages || 1);
    //   setCurrentPage(pagination?.page || 1);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(query, currentPage, activeTab);
  }, [activeTab]);


  const columns = [
    {
      header: "Product",
      width: 120,
      cell: (row: any) => (
        <Text style={styles.cellText}>
          {new Date(row.createdAt).toISOString().slice(0, 10)}
        </Text>
      ),
    },
    {
      header: "Customer",
      width: 160,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.user?.name || "-"}
        </Text>
      ),
    },
    {
      header: "Amount",
      width: 200,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.user?.email || "-"}
        </Text>
      ),
    },
    {
      header: "Status",
      width: 120,
      cell: (row: any) => (
        <Text style={styles.cellText}>{row.items?.length || 0}</Text>
      ),
    },
    {
      header: "Action",
      width: 140,
      cell: (row: any) => (
        <Text style={styles.cellText}>{row.payment_info?.method || "-"}</Text>
      ),
    },
 
  ];

  if (loading) return <ThemedLoader />;

  return (
    <ThemedView style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}>
      <Header title={"Dispute"} />

  <Text style={{padding:16, color:"gray", fontWeight:"600", fontSize:15 }}>Here’s Your Current dispute Overview</Text>

<OrdersHeader
  showTabs={false}
  query={query}
  setQuery={setQuery}
//   onSearch={handleSearch}
/>

      <CardTable
        columns={columns}
        data={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        // onPageChange={handlePageChange}
        isLoading={loading}
        onRowClick={(row) => console.log("Clicked:", row)}
      />
    </ThemedView>
  );
}


