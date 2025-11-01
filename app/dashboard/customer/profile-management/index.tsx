"use client";

import AddressBook from "@/components/Customer/AddressBook";
import EditProfileDetailsForm from "@/components/Customer/EditProfileDetailsForm";
import Header from "@/components/Header";
import { ThemedView } from "@/components/ThemedView";
import { CustomerProfile } from "@/types/customer";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ProfilePageComp = (props: { customer: CustomerProfile }) => {
  const [activeTab, setActiveTab] = useState("Edit Personal Details");

  // Tabs list
  const tabs = [
    { name: "Edit Personal Details", disabled: false },
    { name: "Address Book", disabled: false },
    { name: "Payment Bank Method", disabled: true }, 
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Edit Personal Details":
        return (
          <View style={styles.section}>
            <EditProfileDetailsForm />
          </View>
        );
      case "Address Book":
        return (
          <View style={styles.section}>
            <AddressBook />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}>
      <Header title={"Settings"} />
      <View style={styles.container}>
        <View style={styles.row}>
          {/* Tabs */}
          <View style={styles.tabColumn}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.name}
                onPress={() => {
                  if (!tab.disabled) setActiveTab(tab.name);
                }}
                style={[
                  styles.tabItem,
                  activeTab === tab.name && styles.activeTab,
                  tab.disabled && styles.disabledTab, // 👈 disabled style
                ]}
                disabled={tab.disabled}
              >
                <View style={styles.tabRow}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab.name && styles.activeTabText,
                      tab.disabled && styles.disabledText,
                    ]}
                  >
                    {tab.name}
                  </Text>

                  {/* 👇 Show “Coming Soon” badge for disabled tab */}
                  {tab.disabled && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}></Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <ScrollView
            contentContainerStyle={styles.contentArea}
            showsVerticalScrollIndicator={false}
          >
            {renderTabContent()}
          </ScrollView>
        </View>
      </View>
    </ThemedView>
  );
};

export default ProfilePageComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16,
  },
  row: {
    flex: 1,
  },
  tabColumn: {
    width: "50%",
    paddingRight: 10,
    paddingBottom: 10,
  },
  tabItem: {
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  activeTab: {
    borderBottomColor: "#b30059",
  },
  activeTabText: {
    color: "#b30059",
    fontWeight: "700",
  },
  disabledTab: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#888",
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
 
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  contentArea: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 1,
  },
  section: {
    marginBottom: 20,
  },
});
