"use client";

import { ProductAPI } from "@/apis/product-api";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedView } from "@/components/ThemedView";
import ProductsHeader from "@/components/Vendor/ProductsScreenHeader";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ProductsStyles } from "./style";

export default function ProductsScreen() {
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = ProductsStyles(colorScheme);
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");

  const fetchProducts = async (search?: string, page = 1, status?: string) => {
    try {
      if (!refreshing) setLoading(true);
      setError(null);
      const api = new ProductAPI();

      const where: any = {
        store: { equals: user?.store?.id },
        and: [
          {
            or: [
              { name: { contains: search || "" } },
              { description: { contains: search || "" } },
              { summary: { contains: search || "" } },
            ],
          },
        ],
      };

      if (status && status !== "all") {
        where.status = { equals: status };
      }

      const response = await api.getProducts({
        where,
        limit: pageSize,
        page,
      });

      if (response.data?.docs) {
        setProducts(response.data.docs);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.page || 1);
      } else {
        setProducts([]);
        setError("No products found.");
      }
    } catch (err) {
      console.error("[ProductsScreen] Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts(query, currentPage, activeTab);
  }, [activeTab]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchProducts(query, newPage, activeTab);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts(query, 1, activeTab);
  }, [query, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return { backgroundColor: "#DCFCE7", color: "#166534" };
      case "draft":
        return { backgroundColor: "#FEF9C3", color: "#854D0E" };
      default:
        return { backgroundColor: "#F3F4F6", color: "#374151" };
    }
  };

  const columns = [
    {
      header: "Image",
      width: 90,
      cell: (row: any) => (
        <View style={{ alignItems: "center" }}>
          {row.default_images?.length > 0 ? (
            <Image
              source={{ uri: row.default_images[0].image.url }}
              style={{ width: 50, height: 50, borderRadius: 6 }}
            />
          ) : (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 6,
                backgroundColor: "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#9CA3AF", fontSize: 10 }}>No image</Text>
            </View>
          )}
        </View>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      width: 160,
      sorting: true,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.name}
        </Text>
      ),
    },
    {
      header: "Category",
      width: 130,
      cell: (row: any) => (
        <Text numberOfLines={1} style={styles.cellText}>
          {row.categories?.[0]?.category?.name || "Uncategorized"}
        </Text>
      ),
    },
    {
      header: "Price",
      width: 100,
      cell: (row: any) => (
        <Text style={styles.cellText}>{amountFormatter(row.base_price)}</Text>
      ),
    },
    {
      header: "Status",
      width: 110,
      cell: (row: any) => {
        const statusStyle = getStatusColor(row.status);
        return (
          <View
            style={{
              backgroundColor: statusStyle.backgroundColor,
              borderRadius: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: statusStyle.color, fontWeight: "600" }}>
              {row.status}
            </Text>
          </View>
        );
      },
    },
    {
      header: "Action",
      width: 100,
      cell: (row: any) => (
        <ThemedView style={styles.actions}>
       <TouchableOpacity onPress={()=>router.push(`/dashboard/vendor/products/productDetails?id=${row.id}`)}>
          <Feather name="eye" size={17} />

        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>router.push(`/dashboard/vendor/products/addProducts?id=${row.id}`)}>
            <Feather name="edit" size={17} />

          </TouchableOpacity>
          </ThemedView>
   
      ),
    },
  ];

  if (loading && !refreshing) {
    return <ThemedLoader />;
  }

  return (
    <ThemedView style={styles.container}>
      <Header title="Products" />
      <ProductsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        query={query}
        setQuery={setQuery}
        onSearch={(text: string) => fetchProducts(text, 1, activeTab)}
        onExport={() => console.log("Export clicked")}
        onAddProduct={() =>
          router.push("/dashboard/vendor/products/addProducts")
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Table
          columns={columns}
          data={products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
          onRowClick={(row) => console.log("Clicked:", row)}
        />
      </ScrollView>
    </ThemedView>
  );
}
