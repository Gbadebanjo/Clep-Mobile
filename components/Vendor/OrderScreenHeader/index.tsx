import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  TextInput,
  TouchableOpacity,
  useColorScheme,
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
  showTabs = true,
}: any) {
  const tabs = ["All", "Delivered", "Processing", "Cancelled"];
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = OrderScreenStyles(colorScheme);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      onDate?.(selectedDate);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* ✅ Tabs section is optional */}
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
              onSearch?.(text);
            }}
          />
        </ThemedView>

        <ThemedView>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowPicker(true)}
          >
            <Calendar size={16} color="#666" />
            <ThemedText style={styles.iconButtonText}>
              {date ? date.toDateString() : "Select Date"}
            </ThemedText>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </ThemedView>

        <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
          <Ionicons name="filter-outline" size={18} color="#333" />
          <ThemedText style={styles.iconButtonText}>Filters</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
