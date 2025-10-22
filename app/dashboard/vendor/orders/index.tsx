import { OrderAPI } from "@/apis/order-api";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { styles } from "./style";

export default function OrdersScreen() {
  const { user } = useAuthStore();
  const storeId = user?.store?.id;
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tabs = ["All Status", "Delivered", "Processing", "Cancelled"];
  const authAPI = new OrderAPI(user?.token);

  const normalizeStatus = (tab: string) => {
    switch (tab) {
      case "Processing":
        return "pending";
      case "Delivered":
        return "delivered";
      case "Cancelled":
        return "cancelled";
      default:
        return undefined;
    }
  };

  const fetchOrders = async (pageNum = 1, statusTab?: string) => {
    try {
      setLoading(true);
      const params: Record<string, any> = { page: pageNum };
      const normalizedStatus = normalizeStatus(statusTab || activeTab);
      if (normalizedStatus) params.status = normalizedStatus;

      const response = await authAPI.getMyStoreOrders(storeId, params);
      const orderList =
        Array.isArray(response?.data?.data?.data)
          ? response.data.data.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

      setOrders(orderList);
      const pagination = response?.data?.data?.pagination;
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders(page, activeTab);
  }, [page, activeTab]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders(page, activeTab);
  };

  const filteredOrders =
    activeTab === "All Status"
      ? orders
      : orders.filter(
          (order) => order.status?.toLowerCase() === normalizeStatus(activeTab)
        );

  if (loading) {
    return (
    //   <ThemedView style={styles.centerContainer}>
        <ThemedLoader />
    //   </ThemedView>
    );
  }

  return (
    <>
    <ThemedView style={{paddingTop:"5%"}}>
    <Header title={"Orders"} />
    </ThemedView>
    <SafeAreaView style={styles.container}>

   
  



          {/* Tabs */}
          <ThemedView style={styles.tabsContainer}>
              {tabs.map((tab) => (
                  <TouchableOpacity
                      key={tab}
                      style={[styles.tab, activeTab === tab && styles.activeTab]}
                      onPress={() => {
                          setActiveTab(tab);
                          setPage(1);
                      } }
                  >
                      <ThemedText
                          style={[styles.tabText, activeTab === tab && styles.activeTabText]}
                      >
                          {tab}
                      </ThemedText>
                  </TouchableOpacity>
              ))}
          </ThemedView>

          {/* Search & Filters */}
          <ThemedView style={styles.searchRow}>
              <ThemedView style={styles.searchBox}>
                  <Ionicons name="search-outline" size={18} color="#999" />
                  <TextInput
                      style={styles.searchInput}
                      placeholder="Search Orders"
                      placeholderTextColor="#999"
                      value={search}
                      onChangeText={setSearch} />
              </ThemedView>

              <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="calendar-outline" size={18} color="#333" />
                  <ThemedText style={styles.iconButtonText}>Select Date</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="filter-outline" size={18} color="#333" />
                  <ThemedText style={styles.iconButtonText}>Filters</ThemedText>
              </TouchableOpacity>
          </ThemedView>

          {/* Scrollable Table */}
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
              <ThemedView style={styles.table}>
                  {/* Header */}
                  <ThemedView style={[styles.tableRow, styles.tableHeader]}>
                      <ThemedText style={[styles.headerText, styles.dateCol]}>Order Date</ThemedText>
                      <ThemedText style={[styles.headerText, styles.nameCol]}>Customer Name</ThemedText>
                      <ThemedText style={[styles.headerText, styles.emailCol]}>
                          Customer Email
                      </ThemedText>
                      <ThemedText style={[styles.headerText, styles.itemsCol]}>No. of Items</ThemedText>
                      <ThemedText style={[styles.headerText, styles.paymentCol]}>
                          Payment Method
                      </ThemedText>
                      <ThemedText style={[styles.headerText, styles.totalCol]}>Total</ThemedText>
                      <ThemedText style={[styles.headerText, styles.returnCol]}>Return</ThemedText>
                      <ThemedText style={[styles.headerText, styles.statusCol]}>Status</ThemedText>
                      <ThemedText style={[styles.headerText, styles.actionCol]}>Action</ThemedText>
                  </ThemedView>

                  {/* Body */}
                  <FlatList
                      data={filteredOrders.filter((o) => o.user?.name?.toLowerCase().includes(search.toLowerCase())
                      )}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                          <ThemedView style={[styles.tableRow, styles.tableBodyRow]}>
                              <ThemedText style={[styles.cell, styles.dateCol]}>
                                  {new Date(item.createdAt).toISOString().slice(0, 10)}
                              </ThemedText>
                              <ThemedText style={[styles.cell, styles.nameCol]}>
                                  {item.user?.name || "-"}
                              </ThemedText>
                              <ThemedText
                                  style={[styles.cell, styles.emailCol]}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                              >
                                  {item.user?.email || "-"}
                              </ThemedText>
                              <ThemedText style={[styles.cell, styles.itemsCol]}>
                                  {item.items?.length || 0}
                              </ThemedText>
                              <ThemedText style={[styles.cell, styles.paymentCol]}>
                                  {item.payment_info?.method || "-"}
                              </ThemedText>
                              <ThemedText style={[styles.cell, styles.totalCol]}>
                                  NGN {item.total_amount?.toLocaleString() || "0.00"}
                              </ThemedText>
                              <ThemedText style={[styles.cell, styles.returnCol]}>
                                  {item.items?.some((i: any) => i.return?.isReturned)
                                      ? "Returned"
                                      : "-"}
                              </ThemedText>
                              <ThemedText
                                  style={[
                                      styles.cell,
                                      styles.statusCol,
                                      {
                                          color: item.status === "pending"
                                              ? "#E67E22"
                                              : item.status === "delivered"
                                                  ? "#2ECC71"
                                                  : item.status === "cancelled"
                                                      ? "#E74C3C"
                                                      : "#333",
                                      },
                                  ]}
                              >
                                  {item.status || "-"}
                              </ThemedText>
                              <ThemedView style={[styles.cell, styles.actionCol]}>
                                  <Ionicons name="eye-outline" size={18} color="#333" />
                              </ThemedView>
                          </ThemedView>
                      )}
                      ListEmptyComponent={<ThemedView style={styles.centerContainer}>
                          <ThemedText style={styles.emptyText}>No orders found</ThemedText>
                      </ThemedView>}
                      scrollEnabled={false} />
              </ThemedView>
          </ScrollView>

          {/* Pagination */}
          <ThemedView style={styles.pagination}>
              <TouchableOpacity
                  disabled={page <= 1}
                  onPress={() => setPage(page - 1)}
                  style={[styles.pageBox, page <= 1 && styles.disabledBox]}
              >
                  <ThemedText style={styles.pageArrow}>‹</ThemedText>
              </TouchableOpacity>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <TouchableOpacity
                      key={num}
                      onPress={() => setPage(num)}
                      style={[
                          styles.pageBox,
                          num === page && styles.activePageBox,
                      ]}
                  >
                      <ThemedText
                          style={[
                              styles.pageNumber,
                              num === page && styles.activePageNumber,
                          ]}
                      >
                          {num}
                      </ThemedText>
                  </TouchableOpacity>
              ))}

              <TouchableOpacity
                  disabled={page >= totalPages}
                  onPress={() => setPage(page + 1)}
                  style={[styles.pageBox, page >= totalPages && styles.disabledBox]}
              >
                  <ThemedText style={styles.pageArrow}>›</ThemedText>
              </TouchableOpacity>
          </ThemedView>
      </SafeAreaView></>
  );
}

