import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ProductItemProps } from "@/types/product";
import React from "react";
import { useColorScheme } from "react-native";
import { ProductItemStyles } from "./style";

export const ProductItem: React.FC<ProductItemProps> = ({ name, soldCount }) => {
    const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = ProductItemStyles(colorScheme);

  return (
    <ThemedView style={styles.productItem}>
      <ThemedText style={styles.productName}>{name}</ThemedText>
      <ThemedText style={styles.productSold}>{soldCount} sold</ThemedText>
    </ThemedView>
  );
};
