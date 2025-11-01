import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { OrderScreenStyles } from "./style";

interface OrdersHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  query: string;
  setQuery: (query: string) => void;
  onSearch: (text: string) => void;
  onFilter?: () => void;
  onDate?: () => void;
  showTabs?: boolean;
}

export default function OrdersHeader({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  onSearch,
  onFilter,
  onDate,
  showTabs = true, // default true
}: OrdersHeaderProps) {
  const tabs = ["Ongoing", "Completed"];
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = OrderScreenStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      {/* Tabs */}
      {showTabs && (
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
      )}

      {/* Search Bar */}
      <TextInput
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text); // call parent search function
        }}
        placeholder="Search orders..."
        style={styles.searchInput}
        placeholderTextColor={colorScheme === "dark" ? "#ccc" : "#666"}
      />

    </ThemedView>
  );
}
