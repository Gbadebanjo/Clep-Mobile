import React from "react";
import { View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Ionicons } from "@expo/vector-icons"; // for close + timer icons
import { PencilRuler } from "lucide-react-native";
import { MeasurementRootStyles } from "./style";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import  DynamicButton from "@/components/General/DynamicButton";

export default function MeasurementRoot() {
  const colorScheme = useColorScheme();
  const styles = MeasurementRootStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>Measurement</ThemedText>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <PencilRuler size={54} color={Colors[colorScheme].text} />
        </View>
        <ThemedText style={styles.timerText}>
          Get precise measurements for your perfect fit
        </ThemedText>
        {/* Timer */}
        <View style={styles.timerContainer}>
          <Ionicons
            name="time-outline"
            size={40}
            color={Colors[colorScheme].text}
          />
          <ThemedText style={styles.timerText}>2 min</ThemedText>
        </View>
        {/* Description */}
        <ThemedText style={styles.description}>
          Please take a moment to answer a few questions for a tailored fit
        </ThemedText>
        <DynamicButton
          text="Start"
          href="/measurement/height"
          backgroundColor={Colors[colorScheme].text}
          textColor={Colors[colorScheme].background}
          size="large"
          buttonStyle={{ width: '50%', alignSelf: "flex-start", height: 50 }}
        />
      </View>
    </ThemedView>
  );
}
