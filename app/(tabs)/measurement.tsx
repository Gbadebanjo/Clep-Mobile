import MeasurementRoot from "@/components/Measurement/MeasurementRoot";
import VendorMeasurement from "../../components/VendorMeasuremnet/measurement";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useAuthStore } from "@/store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function Measurement() {
  const { user, rehydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after store is fully rehydrated
    if (rehydrated && !user) {
      const timer = setTimeout(() => {
        router.replace("/customer/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [rehydrated, user, router]);

  // Show loader until store rehydrates or user is null
  if (!rehydrated || user === undefined || user === null) {
    return <ThemedLoader />;
  }

  return user.role === "vendor" ? <VendorMeasurement /> : <MeasurementRoot />;
}