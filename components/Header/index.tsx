import { useAuthStore } from "@/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Calculator,
  Eye,
  File,
  PencilRuler,
  ShoppingBag,
  TrendingUp,
  User,
} from "lucide-react-native";
import React, { JSX, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  LayoutAnimation,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedTouchableOpacity } from "../ThemedTouchableOpacity";
import { ThemedView } from "../ThemedView";
import { HeaderStyles } from "./style";

const { width } = Dimensions.get("window");

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  showBottomBorder?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
  showBottomBorder = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const { setUser, user } = useAuthStore();
  const storeId = user?.store?.id;
  const sidebarWidth = width * 0.8;
  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = HeaderStyles(colorScheme);
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
    {
      label: "Dashboard Overview",
      icon: <Feather name="home" size={22} />,
      roles: ["vendor"],
      route: "/(tabs)/user",
    },
    {
      label: "Wallet",
      icon: <Ionicons name="wallet-outline" size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/wallet",
    },
    {
      label: "Orders",
      icon: <Ionicons name="bag-outline" size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/orders",
    },
    {
      label: "Products",
      icon: <Ionicons name="cube-outline" size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/products",
    },
    {
      label: "Dispute",
      icon: <Ionicons name="chatbubble-ellipses-outline" size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/dispute",
    },
    {
      label: "Measurements",
      icon: <PencilRuler size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/measurement",
    },
    {
      label: "Store Fonts",
      icon: <Ionicons name="storefront-outline" size={22} />,
      roles: ["vendor"],
      route: "/dashboard/vendor/store-front",
    },
    {
      label: "My Store Fonts",
      icon: <Ionicons name="storefront-outline" size={22} />,
      roles: ["vendor"],
      route: `/store-front/${storeId}`,
    },

    {
      label: "Custom",
      icon: <Feather name="user" size={22} />,
      roles: ["vendor"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Bargain",
      icon: <Calculator size={22} />,
      roles: ["vendor"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Automation",
      icon: <PencilRuler size={22} />,
      roles: ["vendor"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Messages",
      icon: <Ionicons name="chatbubble-ellipses-outline" size={22} />,
      roles: ["vendor"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Coupons",
      icon: <Calculator size={22} />,
      roles: ["vendor"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Profile Management",
      icon: <Feather name="user" size={22} />,
      roles: ["customer"],
      route: "/dashboard/customer/profile-management",
    },
    {
      label: "Order History",
      icon: <Ionicons name="time-outline" size={22} />,
      roles: ["customer"],
      route: "/dashboard/customer/orders",
    },
    {
      label: "Saved Measurements",
      icon: <PencilRuler size={22} />,
      roles: ["customer"],
      route: "/dashboard/customer/measurement",
    },
    {
      label: "Cart",
      icon: <ShoppingBag size={22} />,
      roles: ["customer"],
      route: "/(tabs)/cart",
    },
    {
      label: "Followed Vendor",
      icon: <TrendingUp size={22} />,
      roles: ["customer"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Favourite Vendor",
      icon: <User size={22} />,
      roles: ["customer"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Recent View",
      icon: <Eye size={22} />,
      roles: ["customer"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Coupons",
      icon: <Calculator size={22} />,
      roles: ["customer"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    {
      label: "Newletter Preference",
      icon: <File size={22} />,
      roles: ["customer"],
      disabled: true,
      badgeText: "Coming Soon!",
    },
    // {
    //   label: "Wishlist",
    //   icon: <Feather name="heart" size={22} />,
    //   roles: ["customer"],
    //   route: "/customer/wishlist",
    // },
    // {
    //   label: "Shipping and Return",
    //   icon: <Feather name="package" size={22} />,
    //   roles: ["customer"],
    //   route: "/customer/shipping-return",
    // },
    // {
    //   label: "Size Guide",
    //   icon: <Feather name="book" size={22} />,
    //   roles: ["customer"],
    //   route: "/customer/size-guide",
    // },
    // {
    //   label: "Track Orders",
    //   icon: <Ionicons name="locate-outline" size={22} />,
    //   roles: ["customer"],
    //   route: "/customer/track-orders",
    // },
    // {
    //   label: "Contact Us",
    //   icon: <Feather name="phone" size={22} />,
    //   roles: ["customer"],
    //   route: "/customer/contact",
    // },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView
        style={[styles.header, showBottomBorder && styles.headerBottomBorder]}
      >
        <ThemedView style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={26} color="#000" />
            </TouchableOpacity>
          )}
          <ThemedText
            style={[styles.title, !showBackButton && { marginLeft: 8 }]}
          >
            {title}
          </ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Feather name="menu" size={26} color="#000" />
        </TouchableOpacity>
      </ThemedView>

      {/* Sidebar */}
      <Modal
        animationType="none"
        transparent
        visible={isOpen}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <ThemedView style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.sidebarLight,
            { width: sidebarWidth, transform: [{ translateX: slideAnim }] },
          ]}
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
            <ThemedView style={styles.customerBottomSection}>
              <ThemedView style={styles.menuRow}>
                <ThemedView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    opacity: 0.3,
                  }}
                >
                  <Feather name="settings" size={22} color="#292D32" />
                  <ThemedText style={[styles.menuText, { marginLeft: 8 }]}>
                    Settings
                  </ThemedText>

                  {/* Coming Soon badge */}
                  <ThemedView
                    style={{
                      marginLeft: 6,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 8,
                    }}
                  >
                    <ThemedText
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      Coming Soon
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>

              <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
                <Feather
                  name="log-out"
                  size={22}
                  color="#292D32"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <ThemedText style={styles.menuText}>Log out</ThemedText>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.vendorButton}>
                <Ionicons name="storefront-outline" size={18} color="#fff" />
                <ThemedText style={styles.vendorButtonText}>
                  Become a Vendor
                </ThemedText>
              </TouchableOpacity> */}
            </ThemedView>
          )}

          {user?.role?.toLowerCase() === "vendor" && (
            <ThemedView style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={toggleSettings}
              >
                <Feather name="settings" size={22} color="#000" />
                <ThemedText>Account</ThemedText>
                <Ionicons
                  name={showSettingsMenu ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#000"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>

              {showSettingsMenu && (
                <ThemedView style={styles.settingsMenu}>
                  <TouchableOpacity
                    style={styles.subItem}
                    onPress={() => router.push("/dashboard/vendor/account")}
                  >
                    <Ionicons name="key-outline" size={18} color="#333" />
                    <ThemedText style={styles.subItemText}>Security</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}

              <ThemedTouchableOpacity
                style={styles.bottomButton}
                onPress={handleLogout}
              >
                <Feather
                  name="log-out"
                  size={22}
                  color="#000"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
                <ThemedText>Logout</ThemedText>
              </ThemedTouchableOpacity>
            </ThemedView>
          )}
        </Animated.View>
      </Modal>
    </ThemedView>
  );
};

const SidebarItem: React.FC<{
  icon: JSX.Element;
  label: string;
  disabled?: boolean;
  badgeText?: string;
  onPress?: () => void;
}> = ({ icon, label, disabled = false, badgeText, onPress }) => {
  const coloredIcon = React.cloneElement(icon, {
    color: disabled ? "#aaa" : "#000",
  });
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = HeaderStyles(colorScheme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.sidebarItem, disabled && { opacity: 0.6 }]}
    >
      <ThemedView style={styles.icon}>{coloredIcon}</ThemedView>
      <ThemedText style={{ color: disabled ? "#aaa" : "#000", fontSize: 16 }}>
        {label}
      </ThemedText>
      {badgeText && (
        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>{badgeText}</ThemedText>
        </ThemedView>
      )}
    </TouchableOpacity>
  );
};

export default CustomHeader;
