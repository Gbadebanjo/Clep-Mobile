"use client";

import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import SingleOrderTemplate from "./SingleOrderTemplate";

export default function SingleOrderScreen() {
  const { order } = useLocalSearchParams(); // retrieve passed order
  const parsedOrder = order ? JSON.parse(order as string) : null;

  if (!parsedOrder) {
    return <View><Text>No order found.</Text></View>;
  }
  
  return (
        <>
        <View style={{ paddingTop: "7%", backgroundColor: "#fff" }}>
      </View>
      <Header title={"Orders Details"} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
              <SingleOrderTemplate
                  order={parsedOrder}
                  isVendor={false} // adjust if you have vendor mode
                  storeId={parsedOrder?.user?.id || null} />
          </ScrollView></>
  );
}
