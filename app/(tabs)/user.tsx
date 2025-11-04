import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import CustomerDashboard from "../dashboard/customer";
import VendorDashboard from "../dashboard/vendor";

export default function UserScreen() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        router.replace("/customer/login");
      }, 100);
    }
  }, [user]);

  if (user === undefined || user === null) {
    return (
      <ThemedLoader/>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      {user?.role === "customer" && <CustomerDashboard />}
      {user?.role === "vendor" && <VendorDashboard />}
    </ThemedView>
  );
}
