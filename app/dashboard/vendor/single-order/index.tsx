"use client";

import { OrderAPI } from "@/apis/order-api";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useAuthStore } from "@/store";
import { OrderResponse } from "@/types/order";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, useColorScheme, View } from "react-native";
import SingleOrderTemplate from "./SingleOrderTemplate";

interface SingleOrderScreenProps {
  isVendor?: boolean;
  storeId?: string | null;
}

const SingleOrderScreen: React.FC<SingleOrderScreenProps> = ({
  isVendor = false,
  storeId = null,
}) => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthStore();
  const { orderId } = useLocalSearchParams(); 

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      const orderAPI = new OrderAPI(user?.token);
      const response = await orderAPI.getOrder(id);
      setOrder(response.data.data);
      console.log("Fetched order:", response.data.data);
    } catch (error: any) {
      console.error("Error fetching order:", error.message);
      Alert.alert("Error", error.message || "Unable to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId && typeof orderId === "string") {
      fetchOrder(orderId);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedLoader text="No Order ID provided" />
      </ScrollView>
    );
  }

  if (loading) {
    return <ThemedLoader />;
  }

  if (!order) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedLoader text="Order not found" />
      </ScrollView>
    );
  }

  return (

    <>
    <View style={{  paddingTop: "7%", backgroundColor: "#fff" }}>
  </View>
  <Header title={"Orders Details"} />
  <ScrollView contentContainerStyle={{ padding: 16 }}>
          <SingleOrderTemplate
              order={order}
              isVendor={isVendor} 
              storeId={storeId ?? null} />
      </ScrollView></>
  );
};

export default SingleOrderScreen;
