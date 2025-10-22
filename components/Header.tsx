import { useAuthStore } from "@/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Calculator, PencilRuler } from "lucide-react-native";
import React, { JSX, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedTouchableOpacity } from "./ThemedTouchableOpacity";

const { width } = Dimensions.get("window");

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const { setUser, user } = useAuthStore();
  const sidebarWidth = width * 0.8;
  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -sidebarWidth,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          handleClose();
          setUser(null);
          router.replace("/customer/login" as any);
        },
      },
    ]);
  };

  const toggleSettings = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSettingsMenu(!showSettingsMenu);
  };

  // ✅ MENU ITEMS WITH ROUTES
  const menuItems = [
    { label: "Dashboard Overview", icon: <Feather name="home" size={22} />, roles: ["vendor"], route: "/vendor/dashboard" },
    { label: "Wallet", icon: <Ionicons name="wallet-outline" size={22} />, roles: ["vendor"], route: "/dashboard/vendor/wallet" },
    { label: "Orders", icon: <Ionicons name="bag-outline" size={22} />, roles: ["vendor"], route: "/dashboard/vendor/orders" },
    { label: "Products", icon: <Ionicons name="cube-outline" size={22} />, roles: ["vendor"], route: "/dashboard/vendor/products" },
    { label: "Dispute", icon: <Ionicons name="chatbubble-ellipses-outline" size={22} />, roles: ["vendor"], route: "/vendor/dispute" },
    { label: "Measurements", icon: <PencilRuler size={22} />, roles: ["vendor"], route: "/vendor/measurements" },
    { label: "Store Fonts", icon: <Ionicons name="storefront-outline" size={22} />, roles: ["vendor"], route: "/vendor/store-fonts" },
    { label: "Custom", icon: <Feather name="user" size={22} />, roles: ["vendor"], disabled: true, badgeText: "Coming Soon!" },
    { label: "Bargain", icon: <Calculator size={22} />, roles: ["vendor"], disabled: true, badgeText: "Coming Soon!" },
    { label: "Automation", icon: <PencilRuler size={22} />, roles: ["vendor"], disabled: true, badgeText: "Coming Soon!" },
    { label: "Messages", icon: <Ionicons name="chatbubble-ellipses-outline" size={22} />, roles: ["vendor"], disabled: true, badgeText: "Coming Soon!" },
    { label: "Coupons", icon: <Calculator size={22} />, roles: ["vendor"], disabled: true, badgeText: "Coming Soon!" },
    { label: "Profile Management", icon: <Feather name="user" size={22} />, roles: ["customer"], route: "/customer/profile" },
    { label: "Order History", icon: <Ionicons name="time-outline" size={22} />, roles: ["customer"], route: "/customer/orders" },
    { label: "Saved Measurements", icon: <PencilRuler size={22} />, roles: ["customer"], route: "/customer/saved-measurements" },
    { label: "Wishlist", icon: <Feather name="heart" size={22} />, roles: ["customer"], route: "/customer/wishlist" },
    { label: "Shipping and Return", icon: <Feather name="package" size={22} />, roles: ["customer"], route: "/customer/shipping-return" },
    { label: "Size Guide", icon: <Feather name="book" size={22} />, roles: ["customer"], route: "/customer/size-guide" },
    { label: "Track Orders", icon: <Ionicons name="locate-outline" size={22} />, roles: ["customer"], route: "/customer/track-orders" },
    { label: "Contact Us", icon: <Feather name="phone" size={22} />, roles: ["customer"], route: "/customer/contact" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Feather name="menu" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      <Modal animationType="none" transparent visible={isOpen} onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.sidebarLight, { width: sidebarWidth, transform: [{ translateX: slideAnim }] }]}
        >
          <ScrollView
            style={styles.menuList}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {menuItems
              .filter((item) => item.roles.includes(user?.role))
              .map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  disabled={item.disabled}
                  badgeText={item.badgeText}
                  onPress={() => {
                    if (!item.disabled && item.route) {
                      handleClose();
                      router.push(item.route as any);
                    }
                  }}
                />
              ))}
          </ScrollView>

          {/* Bottom Section */}
          {user?.role?.toLowerCase() === "customer" && (
            <View style={styles.customerBottomSection}>
              <TouchableOpacity style={styles.menuRow}>
                <Feather name="settings" size={22} color="#292D32" />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow}>
                <Ionicons name="help-circle-outline" size={22} color="#292D32" />
                <Text style={styles.menuText}>Platform Support</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
                <Feather name="log-out" size={22} color="#292D32" style={{ transform: [{ rotate: "180deg" }] }} />
                <Text style={styles.menuText}>Log out</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.vendorButton}>
                <Ionicons name="storefront-outline" size={18} color="#fff" />
                <Text style={styles.vendorButtonText}>Become a Vendor</Text>
              </TouchableOpacity>
            </View>
          )}

          {user?.role?.toLowerCase() === "vendor" && (
            <View style={styles.bottomSection}>
              <TouchableOpacity style={styles.bottomButton} onPress={toggleSettings}>
                <Feather name="settings" size={22} color="#000" />
                <ThemedText>Settings</ThemedText>
                <Ionicons
                  name={showSettingsMenu ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#000"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>

              {showSettingsMenu && (
                <View style={styles.settingsMenu}>
                  <TouchableOpacity style={styles.subItem}>
                    <Ionicons name="key-outline" size={18} color="#333" />
                    <Text style={styles.subItemText}>Security</Text>
                  </TouchableOpacity>
                </View>
              )}

              <ThemedTouchableOpacity style={styles.bottomButton} onPress={handleLogout}>
                <Feather
                  name="log-out"
                  size={22}
                  color="#000"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <ThemedText>Logout</ThemedText>
              </ThemedTouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Modal>
    </View>
  );
};

// ✅ Sidebar Item
const SidebarItem: React.FC<{
  icon: JSX.Element;
  label: string;
  disabled?: boolean;
  badgeText?: string;
  onPress?: () => void;
}> = ({ icon, label, disabled = false, badgeText, onPress }) => {
  const coloredIcon = React.cloneElement(icon, { color: disabled ? "#aaa" : "#000" });
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.sidebarItem, disabled && { opacity: 0.6 }]}
    >
      <View style={styles.icon}>{coloredIcon}</View>
      <Text style={{ color: disabled ? "#aaa" : "#000", fontSize: 16 }}>{label}</Text>
      {badgeText && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ✅ Styles remain unchanged
const styles = StyleSheet.create({
  container: { width: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: Platform.OS === "android" ? 20 : 60,
    zIndex: 100,
  },
  leftSection: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: { padding: 4 },
  title: { fontSize: 20, fontWeight: "bold" },
  menuButton: { padding: 4 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)" },
  sidebarLight: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 16 : 40,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  sidebarItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  icon: { marginRight: 12 },
  menuList: { flexGrow: 1 },
  bottomSection: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8,
    paddingBottom: 24,
  },
  bottomButton: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12, backgroundColor: "#fff" },
  settingsMenu: { paddingLeft: 28, paddingBottom: 8 },
  subItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8, gap: 8 },
  subItemText: { fontSize: 15, color: "#333" },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
  badgeText: { fontSize: 10, fontWeight: "700", color: "red", opacity: 0.25 },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 12 },
  menuText: { fontSize: 16, color: "#292D32" },
  customerBottomSection: { borderTopWidth: 1, borderTopColor: "#E5E5E5", paddingTop: 24, paddingBottom: 20 },
  vendorButton: {
    marginTop: 30,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 50,
  },
  vendorButtonText: { color: "#fff", fontSize: 16, fontWeight: "800", marginLeft: 8 },
});

export default CustomHeader;
