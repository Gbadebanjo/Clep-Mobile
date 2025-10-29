import { ProductAPI } from "@/apis/product-api";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import ProductsHeader from "@/components/Vendor/ProductsScreenHeader";
import { amountFormatter } from "@/helpers/data-utils";
import { useAuthStore } from "@/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Image,
    RefreshControl,
    ScrollView,
    useColorScheme,
} from "react-native";
import { ProductDetailsStyles } from "./style";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const productAPI = new ProductAPI();
  const [product, setProduct] = useState<any>(null);
  const { user } = useAuthStore();
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = ProductDetailsStyles(colorScheme);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [, setError] = useState<string | null>(null);
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

  const columns = [
    {
      header: "Image",
      width: 90,
      cell: (row: any) => (
        <ThemedView style={{ alignItems: "center" }}>
          {row.default_images?.length > 0 ? (
            <Image
              source={{ uri: row.default_images[0].image.url }}
              style={{ width: 50, height: 50, borderRadius: 6 }}
            />
          ) : (
            <ThemedView
              style={{
                width: 50,
                height: 50,
                borderRadius: 6,
                backgroundColor: "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText style={{ color: "#9CA3AF", fontSize: 10 }}>
                No image
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      width: 160,
      sorting: true,
      cell: (row: any) => (
        <ThemedText numberOfLines={1} style={styles.cellText}>
          {row.name}
        </ThemedText>
      ),
    },
    {
      header: "Category",
      width: 130,
      cell: (row: any) => (
        <ThemedText numberOfLines={1} style={styles.cellText}>
          {row.categories?.[0]?.category?.name || "Uncategorized"}
        </ThemedText>
      ),
    },
    {
      header: "Price",
      width: 100,
      cell: (row: any) => (
        <ThemedText style={styles.cellText}>
          {amountFormatter(row.base_price)}
        </ThemedText>
      ),
    },
    {
      header: "Status",
      width: 110,
      cell: (row: any) => {
        const statusStyle = getStatusColor(row.status);
        return (
          <ThemedView
            style={{
              backgroundColor: statusStyle.backgroundColor,
              borderRadius: 6,
              paddingVertical: 4,
              paddingHorizontal: 8,
              alignSelf: "flex-start",
            }}
          >
            <ThemedText style={{ color: statusStyle.color, fontWeight: "600" }}>
              {row.status}
            </ThemedText>
          </ThemedView>
        );
      },
    },
    {
      header: "Action",
      width: 100,
      cell: (row: any) => (
        <ThemedView style={styles.actions}>
          <ThemedTouchableOpacity
            onPress={() =>
              router.push(
                `/dashboard/vendor/products/productDetails?id=${row.id}`
              )
            }
          >
            <Feather name="eye" size={17} />
          </ThemedTouchableOpacity>

          <ThemedTouchableOpacity
            onPress={() =>
              router.push(`/dashboard/vendor/products/addProducts?id=${row.id}`)
            }
          >
            <Feather name="edit" size={17} />
          </ThemedTouchableOpacity>
        </ThemedView>
      ),
    },
  ];

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
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getProductById(id as string);
        setProduct(data.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ThemedLoader />;
  }

  if (!product) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Product not found</ThemedText>
      </ThemedView>
    );
  }

  const imageUrl =
    product.default_images?.[0]?.image?.url ||
    product.default_images?.[0]?.image ||
    product.default_images?.[0] ||
    "https://via.placeholder.com/400";

  const statusColor =
    product.status === "draft"
      ? "#FACC15"
      : product.status === "published"
      ? "#4ADE80"
      : "#9CA3AF";

  return (
    <>
      <ThemedView style={{ flex: 1, backgroundColor: "#fff", paddingTop: "7%" }}>

        <Header title="Products Detail" />
        <ScrollView style={styles.container}>
          <ThemedView style={styles.imgContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </ThemedView>

          <ThemedView style={styles.content}>
            <ThemedView style={styles.header}>
              <ThemedText style={styles.name}>{product.name}</ThemedText>
              <ThemedView
                style={[styles.statusTag, { backgroundColor: statusColor }]}
              >
                <ThemedText style={styles.statusText}>
                  {product.status}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedText style={styles.price}>
              {amountFormatter(product.variations?.[0].sale_price)}{" "}
              <ThemedText style={styles.strike}>
                {amountFormatter(product.variations?.[0].price)}
              </ThemedText>
            </ThemedText>

            <ThemedText style={styles.description}>
              {product.description}
            </ThemedText>

            <ThemedView style={styles.meta}>
              <ThemedText>SKU: {product?.variations?.[0].sku}</ThemedText>
              <ThemedText>CODE: {product?.variations?.[0].code}</ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedTouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push(
                    `/dashboard/vendor/products/addProducts?id=${product.id}`
                  )
                }
              >
                <Ionicons name="pencil-outline" size={20} color="#000" />
                <ThemedText style={styles.btnText}>
                  Edit Product Details
                </ThemedText>
              </ThemedTouchableOpacity>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ProductsHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              query={query}
              setQuery={setQuery}
              onSearch={(text: string) => fetchProducts(text, 1, activeTab)}
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
        </ScrollView>{" "}
      </ThemedView>
    </>
  );
}
