import React, { useEffect } from "react";
import { useAuthStore } from "@/store";
import { useRouter } from 'expo-router';
import MeasurementRoot from "@/components/Measurement/MeasurementRoot";

export default function Measurement() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/customer/login');
    }
  }, [user, router]);

  return <MeasurementRoot />;
}