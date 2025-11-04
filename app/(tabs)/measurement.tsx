import MeasurementRoot from "@/components/Measurement/MeasurementRoot";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useAuthStore } from "@/store";
import { useRouter } from 'expo-router';
import React, { useEffect } from "react";

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
 <ThemedLoader/>
    );
  }

  return <MeasurementRoot />;
}