import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    TextInput,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import { OrderScreenStyles } from "./style";

export default function OrdersHeader({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  onSearch,
  onFilter,
  onDate,
}: any) {
  const tabs = ["All", "Delivered", "Processing", "Cancelled"];
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = OrderScreenStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      {/* Header Row */}
      {/* Tabs */}
      <ThemedView style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tabWrapper}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </ThemedText>
            {activeTab === tab && <ThemedView style={styles.activeUnderline} />}
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Search and Filters */}
      <ThemedView style={styles.searchRow}>
        <ThemedView style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={16}
            color="#9CA3AF"
            style={{ marginRight: 6 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Orders"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              onSearch(text);
            }}
          />
        </ThemedView>

        <TouchableOpacity style={styles.iconButton} onPress={onDate}>
          <Ionicons name="calendar-outline" size={18} color="#333" />
          <ThemedText style={styles.iconButtonText}>Select Date</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
          <Ionicons name="filter-outline" size={18} color="#333" />
          <ThemedText style={styles.iconButtonText}>Filters</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}


