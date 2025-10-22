import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { MeasurementAPI } from "@/apis/measurement-api";
import { StoreAPI } from "@/apis/store-api";
import { useAuthStore } from "@/store";
import { debounce } from "lodash";
import { ThemedView } from "@/components/ThemedView";
import { ShareStyles } from "./styles";
import { useColorScheme } from "@/hooks/useColorScheme.web";

export default function ShareMeasurement() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const colorScheme = useColorScheme();
  const styles = ShareStyles(colorScheme);

  const [stores, setStores] = useState<any[]>([]);
  const [filteredStores, setFilteredStores] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loadingVendorId, setLoadingVendorId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const measurementAPI = new MeasurementAPI(user?.token);
  const storeAPI = new StoreAPI(user?.token);

  // Fetch initial store list
  useEffect(() => {
    (async () => {
      try {
        const res = await storeAPI.queryStore();
        console.log(res.data.docs);
        setStores(res.data.docs);
        setFilteredStores(res.data.docs);
      } catch {
        Toast.show({ type: "error", text1: "Failed to load stores" });
      }
    })();
  }, []);

  // Mutation for sharing measurement
  const shareMeasurement = useMutation({
    mutationFn: (vendorId: string) =>
      measurementAPI.shareMeasurement({ vendor: vendorId }),
    onMutate: (vendorId) => setLoadingVendorId(vendorId),
    onSettled: () => setLoadingVendorId(null),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Measurement shared successfully!",
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error?.message || "Measurement sharing failed",
      });
    },
  });

  // Debounced search
  const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setFilteredStores(stores);
        return;
      }
      setIsSearching(true);
      try {
        const res = await storeAPI.queryStore({
          where: { storeName: { contains: query } },
        });
        setFilteredStores(res.data.docs);
      } catch {
        Toast.show({ type: "error", text1: "Search failed" });
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [stores]
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  const renderStore = ({ item }: { item: any }) => {
    const isLoading = loadingVendorId === item.vendor.id;

    return (
      <View style={styles.storeCard}>
        <View style={styles.storeHeader}>
          <Image
            source={
              item?.branding?.logo?.url
                ? { uri: item.branding.logo.url }
                : require("@/assets/images/product-cloth.png")
            }
            style={styles.storeLogo}
          />

          <View>
            <Text style={styles.storeName}>{item.storeName}</Text>
            <Text style={styles.verifiedText}>Verified Vendor</Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => shareMeasurement.mutate(item.vendor.id)}
          style={[styles.shareButton, isLoading && { opacity: 0.6 }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.shareButtonText}>Share Measurement</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => router.push(`/store-front/${item.storeNumber}`)}
          style={[styles.viewProfileButton, isLoading && { opacity: 0.6 }]}
        >
          <Text style={styles.viewProfileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for vendor..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {isSearching && <ActivityIndicator />}
      </View>

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.vendor.id}
        renderItem={renderStore}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      <Toast />
    </ThemedView>
  );
}
