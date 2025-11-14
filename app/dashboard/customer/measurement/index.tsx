import Header from "@/components/Header";
import SavedAIMeasurements from "@/components/Measurement/SavedAIMeasurements";
import SavedManualMeasurements from "@/components/Measurement/SavedManualMeasurements";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Measurement } from "@/types/measurement";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import { CustomerMeasurementStyles } from "./style";

type Props = {
  token: string;
  measurement: Measurement;
};

const SavedMeasurements: React.FC<Props> = ({ token, measurement }) => {
  const tabs = [
    { label: "AI Measurements", value: "ai" },
    { label: "Manual Measurements", value: "manual" },
  ];

  const [currentTab, setCurrentTab] = useState<string>(tabs[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useLocalSearchParams();
   const colorScheme = useColorScheme() as 'light' | 'dark';
      const styles = CustomerMeasurementStyles(colorScheme);
  // Handle tab from URL params
  useEffect(() => {
    if (params?.tab && typeof params.tab === "string") {
      setCurrentTab(params.tab);
    }
  }, [params]);

  // Simulate a short loading delay when switching tabs
  const handleTabSwitch = (value: string) => {
    if (value === currentTab) return;
    setIsLoading(true);
    setTimeout(() => {
      setCurrentTab(value);
      setIsLoading(false);
    });
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff", paddingTop: "7%" }}>
      {/* Header stays fixed at the top */}
      <Header title={"Saved Measurements"} />

      {/* Content below header */}
      {isLoading ? (
     <ThemedLoader/>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {/* Tabs */}
          <ThemedView style={styles.tabsContainer}>
            {tabs.map(({ value, label }) => {
              const isActive = currentTab === value;
              return (
                <TouchableOpacity
                  key={value}
                  style={[styles.tabButton, isActive && styles.activeTab]}
                  onPress={() => handleTabSwitch(value)}
                >
                  <ThemedText
                    style={[styles.tabText, isActive && styles.activeTabText]}
                  >
                    {label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>

          {/* Tab Content */}
          <ThemedView style={styles.tabContent}>
            {currentTab === "ai" ? (
              <SavedAIMeasurements measurement={measurement} token={token} />
            ) : (
              <SavedManualMeasurements token={token} />
            )}
          </ThemedView>
        </ScrollView>
      )}
    </ThemedView>
  );
};

export default SavedMeasurements;


