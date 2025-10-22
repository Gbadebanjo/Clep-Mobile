import { ProductAPI } from "@/apis/product-api";
import { useAuthStore } from "@/store";
import { productResponse } from "@/types/product";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// 🏷️ Tabs
const tabs = [
  { label: "All Products", value: "all_products" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const ProductsTabs = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [products, setProducts] = useState<productResponse>({ docs: [] });
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const user = useAuthStore((state) => state.user);
  const productAPI = new ProductAPI();

  // 🔄 Fetch products on mount
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", user?.store?.id],
    queryFn: () =>
      productAPI.getProducts({
        where: {
          store: { equals: user?.store?.id },
        },
      }),
    enabled: !!user?.store?.id,
    onSuccess: (response) => {
      setProducts(response.data);
    },
  });

  // 🔍 Search mutation
  const handleSearch = useMutation({
    mutationFn: (values: { query: string }) => {
      if (!values.query.trim()) {
        return Promise.resolve({ data: data?.data || { docs: [] } });
      }

      return productAPI
        .getProducts({
          where: {
            store: { equals: user?.store?.id },
            $or: [
              { name: { contains: values.query } },
              { description: { contains: values.query } },
              { summary: { contains: values.query } },
            ],
          },
        })
        .then((response) => {
          const query = values.query.toLowerCase();
          const filteredDocs = response.data.docs.filter((product) => {
            const searchableText = [
              product.name,
              product.description,
              product.summary,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            return searchableText.includes(query);
          });
          response.data.docs = filteredDocs;
          response.data.totalDocs = filteredDocs.length;
          return response;
        })
        .catch((error) => {
          console.warn("Backend product search failed:", error);
          return { data: data?.data || { docs: [] } };
        });
    },
    onSuccess: (response) => {
      setProducts(response.data);
    },
    onError: (error) => {
      console.error("Search error:", error);
    },
  });

  // ⏱ Manual debounce (no lodash)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = useCallback(
    (text: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        handleSearch.mutate({ query: text });
      }, 600);
    },
    [handleSearch]
  );

  // 🧩 Filter products by tab
  const filteredProducts = products?.docs?.filter((p) => {
    if (currentTab === "published") return p.status === "published";
    if (currentTab === "draft") return p.status === "draft";
    return true;
  });

  const renderTab = ({ label, value }: (typeof tabs)[0]) => (
    <TouchableOpacity
      key={value}
      style={[styles.tab, currentTab === value && styles.activeTab]}
      onPress={() => setCurrentTab(value)}
    >
      <Text
        style={[
          styles.tabLabel,
          currentTab === value && styles.activeTabLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  // 🧠 Debug log
  useEffect(() => {
    console.log("Loaded products:", products || 0);
  }, [products]);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>{tabs.map(renderTab)}</View>

      {/* Search + Date Picker */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          {handleSearch.isPending || isLoading ? (
            <ActivityIndicator color="#858D9D" style={{ marginRight: 6 }} />
          ) : (
            <Text style={{ marginRight: 6 }}>🔍</Text>
          )}
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products"
            onChangeText={handleSearchChange}
          />
        </View>

        <TouchableOpacity
          style={styles.datePickerTrigger}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ marginRight: 6 }}>📅</Text>
          <Text>{date ? date.toDateString() : "Select Date"}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </View>

      {/* Product List */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc} numberOfLines={2}>
                {item.summary || item.description || "No description available."}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found.</Text>
          }
        />
      )}
    </View>
  );
};

export default ProductsTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FB",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#007AFF",
  },
  tabLabel: {
    fontSize: 16,
    color: "#777",
  },
  activeTabLabel: {
    color: "#007AFF",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  datePickerTrigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productDesc: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
});
