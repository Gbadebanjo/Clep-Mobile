import { MeasurementAPI } from "@/apis/measurement-api";
import { StoreAPI } from "@/apis/store-api";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import Toast from "react-native-toast-message";
import { SharedMeasurementModalStyles } from "./style";

interface ShareMeasurementModalProps {
  isOpen: boolean;
  type: string;
  token: string;
  onClose: () => void;
}

interface Store {
  id: string;
  name: string;
  image: string;
}

const ShareMeasurementModal: FC<ShareMeasurementModalProps> = ({
  isOpen,
  type,
  token,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const storeAPI = new StoreAPI(token);
  const measurementAPI = new MeasurementAPI(token);
  const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = SharedMeasurementModalStyles  (colorScheme);
  
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [storeOptions, setStoreOptions] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stores, isPending } = useQuery({
    queryKey: ["all-stores"],
    queryFn: () => storeAPI.getAllStores(),
  });

  useEffect(() => {
    if (stores?.data?.docs) {
      const formattedStores = stores.data.docs.map((a: any) => ({
        id: a.vendor.id,
        name: a.storeName,
        image: a.branding?.logo?.url ?? "",
      }));
      setStoreOptions(formattedStores);
    }
  }, [stores]);

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) return storeOptions;
    return storeOptions.filter((store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, storeOptions]);

  const { mutate, isPending: isShareMeasurementPending } = useMutation({
    mutationFn: ({ vendor, type }: { vendor: string; type: string }) =>
      measurementAPI.shareMeasurement({ vendor, type }),
    onSuccess: (response: any) => {
      Toast.show({
        type: "success",
        text1: response.message ?? "Measurement shared successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["manual-measurement"] });
      onClose();
      router.push("/dashboard/customer/measurement");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message ?? "Something went wrong",
      });
    },
  });

  const shareMeasurement = () => {
    if (selectedStore?.id) {
      mutate({ vendor: selectedStore.id.toString(), type });
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.title}>Share Measurement</ThemedText>

          {/* 🔍 Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search store..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Store List */}
          {isPending ? (
            <ActivityIndicator size="large" color="#D84773" style={{ marginTop: 20 }} />
          ) : filteredStores.length > 0 ? (
            <FlatList
              data={filteredStores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.storeItem,
                    selectedStore?.id === item.id && styles.storeSelected,
                  ]}
                  onPress={() => setSelectedStore(item)}
                  activeOpacity={0.8}
                >
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.storeImage}
                    />
                  ) : (
                    <ThemedView style={styles.placeholderImage} />
                  )}
                  <ThemedText style={styles.storeName}>{item.name}</ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>No stores found.</ThemedText>
            </ThemedView>
          )}

          {/* Buttons */}
          <ThemedView style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.shareButton,
                (!selectedStore || isShareMeasurementPending) &&
                  styles.disabledButton,
              ]}
              disabled={!selectedStore || isShareMeasurementPending}
              onPress={shareMeasurement}
            >
              {isShareMeasurementPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.shareButtonText}>Share</ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

export default ShareMeasurementModal;


