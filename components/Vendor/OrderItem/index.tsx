import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { OrderItemProps } from "@/types/order";
import React from "react";
import { useColorScheme } from "react-native";
import { OrderItemStyles } from "./style";

export const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  amount,
  date,
  status,
}) => {
    const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = OrderItemStyles(colorScheme);

  return (
    <ThemedView style={styles.orderItem}>
      <ThemedView style={styles.orderItemLeft}>
        <ThemedText style={styles.orderItemId}>{orderId}</ThemedText>
        <ThemedText style={styles.orderItemDate}>{date}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.orderItemRight}>
        <ThemedText style={styles.orderItemAmount}>{amount}</ThemedText>
        <ThemedText style={styles.orderItemStatus}>{status}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
