"use client";

import { MeasurementAPI } from "@/apis/measurement-api";
import CardTable from "@/components/CardTable";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useAuthStore } from "@/store";
import { router } from "expo-router";
import { Eye } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { OrdersStyles } from "../orders/style";

export default function Measurement() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = OrdersStyles(colorScheme);
  const authAPI = new MeasurementAPI(user?.token);

  const fetchOrders = async (page: number) => {
    try {
      setLoading(true);
      const response = await authAPI.vendorSharedMeasurements(page);

      if (response?.data?.docs) {
        setOrders(response?.data?.docs);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      console.error("❌ Error fetching measurements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchOrders(newPage);
  };

  const columns = [
    {
      header: "Customer Name",
      width: 180,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.user?.name || "-"}
        </Text>
      ),
    },

    {
      header: "Type",
      width: 120,
      cell: (row: any) => {
        const type =
          row.measurements?.relationTo === "measurements" ? "AI" : "Manual";

        // Conditional styles
        const textColor = type === "AI" ? "#1B5E20" : "#0D47A1";
        const bgColor = type === "AI" ? "#C8E6C9" : "#BBDEFB";

        return (
          <Text
            style={[
              styles.cellText,
              {
                textTransform: "capitalize",
                color: textColor,
                backgroundColor: bgColor,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 16,
                overflow: "hidden",
                fontWeight: "600",
              },
            ]}
          >
            {type}
          </Text>
        );
      },
    },

    {
      header: "Status",
      width: 120,
      cell: (row: any) => (
        <Text style={[styles.cellText, { color: "green", fontWeight: "600" }]}>
          {row.status}
        </Text>
      ),
    },

    {
      header: "Shared On",
      width: 160,
      cell: (row: any) => (
        <Text style={styles.cellText}>
          {new Date(row.createdAt).toISOString().slice(0, 10)}
        </Text>
      ),
    },

    {
      header: "Actions",
      width: 80,
      cell: (row: any) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/dashboard/vendor/measurement-details",
              params: { measurementId: row.id },
            })
          }
        >
          <Eye color="#000" size={20} />
        </TouchableOpacity>
      ),
    },
  ];

  if (loading) return <ThemedLoader />;

  return (
    <View style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}>
      <Header title={"Shared Measurements"} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: "4%",
          marginTop: "7%",
          backgroundColor: "#fff",
        }}
      >
        <CardTable
          columns={columns}
          data={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
          onRowClick={(row) => {
            router.push({
              pathname: "/dashboard/vendor/measurement-details",
              params: { measurementId: row.id },
            });
          }}
        />
      </View>
    </View>
  );
}
