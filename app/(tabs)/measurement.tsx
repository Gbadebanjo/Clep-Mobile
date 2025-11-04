import React, { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useRouter } from 'expo-router';
import MeasurementRoot from "@/components/Measurement/MeasurementRoot";
import { ThemedView } from "@/components/ThemedView";
import Loader from "@/components/Loader";

export default function Measurement() {
  const { user } = useAuthStore();
  const router = useRouter();

  // console.log('User', user)

  useEffect(() => {
    if ( user === null) {
      const timer = setTimeout(() => {
        router.replace('/customer/login');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  if (user === undefined || user === null) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader visible />
      </ThemedView>
    );
  }

  return <MeasurementRoot />;
}