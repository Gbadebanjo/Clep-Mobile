
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatCardProps } from "@/types/product";
import React from "react";
import { Image, useColorScheme } from "react-native";
import { StatCardStyles } from "./style";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  backgroundColor,
  imageSource,
}) => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = StatCardStyles(colorScheme);

  return (
    <ThemedView style={[styles.statCard, { backgroundColor }]}>
    <ThemedView style={[styles.statCardContent, { backgroundColor }]}>
      <ThemedView style={[styles.statCardLeft, { backgroundColor }]}>
        <ThemedText style={styles.statCardTitle}>{title}</ThemedText>
        <ThemedText style={styles.statCardValue}>{value}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.statCardIcon}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.imageIcon}
            resizeMode="contain"
          />
        ) : (
          icon
        )}
      </ThemedView>
    </ThemedView>
  </ThemedView>
  );
};
