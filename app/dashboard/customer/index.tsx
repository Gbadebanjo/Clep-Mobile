import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StatusBar, View } from "react-native";
import { styles } from "./style";

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const stats = [
    { label: "Total Orders", value: "0", icon: "bag-outline" },
    { label: "Pending Orders", value: "0", icon: "time-outline" },
    { label: "Wishlist Items", value: "0", icon: "heart-outline" },
  ];
  const quickActions = [
    {
      icon: "cube-outline",
      title: "Track Order",
      subtitle: "View and track your orders",
      onPress: () => router.push("/dashboard/customer/orders"),
    },
    {
      icon: "heart-outline",
      title: "My Wishlist",
      subtitle: "Items you've saved for later",
      onPress: () => console.log("My Wishlist"),
    },
    {
      icon: "location-outline",
      title: "Saved Measurements",
      subtitle: "Your body measurements",
      // onPress: router.push("/(tabs)/measurement"),
      onPress: () => router.push("/(tabs)/measurement"),
    },
    {
      icon: "card-outline",
      title: "Payment Methods",
      subtitle: "Manage your payment options",
      onPress: () => console.log("My Wishlist"),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Welcome Section */}
      {/* <View style={styles.welcomeSection}>
          <ThemedText style={styles.welcomeTitle}>Welcome Back!</ThemedText>
          <ThemedText style={styles.welcomeSubtitle}>Here's what's happening with your account</ThemedText>
        </View> */}
      <Header title={`Welcome ${user?.name}`} showBackButton={false} />

      {/* ✅ Welcome Section (outside scrollview) */}
      <View style={styles.welcomeSection}>
        <ThemedText style={styles.welcomeSubtitle}>
          Here&apos;s Your Current Sales Overview
        </ThemedText>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statContent}>
                <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              </View>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon as any} size={24} color="#666" />
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>

          {quickActions.map((action, index) => (
            <ThemedTouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.actionIconContainer}>
                <Ionicons name={action.icon as any} size={24} color="#000" />
              </View>
              <View style={styles.actionContent}>
                <ThemedText style={styles.actionTitle}>
                  {action.title}
                </ThemedText>
                <ThemedText style={styles.actionSubtitle}>
                  {action.subtitle}
                </ThemedText>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#666" />
            </ThemedTouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
