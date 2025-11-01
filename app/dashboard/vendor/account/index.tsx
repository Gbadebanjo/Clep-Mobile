"use client"

import Header from "@/components/Header"
import { ThemedView } from "@/components/ThemedView"
import AccountTab from "@/components/Vendor/Account/account-info"
import KycTab from "@/components/Vendor/Account/kyc"
import NotificationSettingsScreen from "@/components/Vendor/Account/notification"
import ProfileSettingsScreen from "@/components/Vendor/Account/ProfileSettings"
import SecuritySettingsScreen from "@/components/Vendor/Account/security-settings"
import { showError, showSuccess } from "@/services/api"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState("KYC Information")

  const tabs = ["KYC Information", "Account Information", "Profile Settings", "Notification", "Security Settings"]

  const renderTabContent = () => {
    switch (activeTab) {
      case "KYC Information":
        return (
          <View style={styles.section}>
            <KycTab onError={(msg) => showError(msg)} onSuccess={(msg) => showSuccess(msg)} />
          </View>
        )
      case "Account Information":
        return (
          <View style={styles.section}>
            <AccountTab onSuccess={(msg) => showSuccess("Success", msg)} onError={(msg) => showError("Error", msg)} />
          </View>
        )
      case "Profile Settings":
        return (
          <View style={styles.section}>
            <ProfileSettingsScreen
              onSuccess={(msg) => showSuccess("Success", msg)}
              onError={(msg) => showError("Error", msg)}
            />
          </View>
        )
      case "Notification":
        return (
          <View style={styles.section}>
            <NotificationSettingsScreen />
          </View>
        )
      case "Security Settings":
        return (
          <View style={styles.section}>
            <SecuritySettingsScreen />
          </View>
        )
      default:
        return null
    }
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}>
      <Header title={"Settings"} />
      <View style={styles.container}>
        <View style={styles.row}>
          {/* Tabs */}
          <View style={styles.tabColumn}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <ScrollView contentContainerStyle={styles.contentArea} showsVerticalScrollIndicator={false}>
            {renderTabContent()}
          </ScrollView>
        </View>
      </View>
    </ThemedView>
  )
}

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: "#666",
  },
})

export default SettingsScreen
