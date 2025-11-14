import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedView } from "@/components/ThemedView";
import { useAuthStore } from "@/store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import CustomerDashboard from "../dashboard/customer";
import VendorDashboard from "../dashboard/vendor";

export default function UserScreen() {
  const { user, rehydrated } = useAuthStore();
  
  useEffect(() => {
    if (rehydrated && !user) {
      router.replace("/customer/login");
    }
  }, [rehydrated, user]);

  if (!rehydrated || user === undefined || user === null) {
    return <ThemedLoader />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      {user.role === "customer" && <CustomerDashboard />}
      {user.role === "vendor" && <VendorDashboard />}
    </ThemedView>
  );
}
