"use client";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { ProductsScreenStyles } from "./style";

export default function ProductsHeader({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  onSearch,
  onExport,
  onAddProduct,
}: any) {
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = ProductsScreenStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      {/* === Header Title + Buttons === */}
      <ThemedView style={styles.topRow}>
        <ThemedView style={styles.buttonRow}>
          {/* 🟣 Export Button (optional) */}
          {onExport && (
            <TouchableOpacity style={styles.exportButton} onPress={onExport}>
              <Ionicons name="download-outline" size={16} color="#DB2777" />
              <ThemedText style={styles.exportText}>Export</ThemedText>
            </TouchableOpacity>
          )}

          {/* 🟢 Add Product Button (optional) */}
          {onAddProduct && (
            <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
              <Ionicons name="add" size={18} color="#fff" />
              <ThemedText style={styles.addText}>Add Product</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ThemedView>

      {/* === Tabs === */}
      <ThemedView style={styles.tabsContainer}>
        {["all", "published", "draft"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={styles.tabButton}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === "all"
                ? "All Products"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </ThemedText>
            {activeTab === tab && <ThemedView style={styles.activeUnderline} />}
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* === Search & Date Row === */}
      <ThemedView style={styles.filterRow}>
        <ThemedView style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={16}
            color="#9CA3AF"
            style={{ marginRight: 6 }}
          />
          <TextInput
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              onSearch?.(text);
            }}
            placeholder="Search Products"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </ThemedView>

        <TouchableOpacity style={styles.datePicker}>
          <Ionicons name="calendar-outline" size={16} color="#374151" />
          <ThemedText style={styles.dateText}>October 04, 2025</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
