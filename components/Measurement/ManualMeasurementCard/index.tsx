import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Share2 } from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import { ManualMeasurementCardStyles } from "./style";

interface ManualMeasurementCardProps {
  entries: { id: string; name: string; value: string }[];
  shareMeasurement: () => void;
}

const ManualMeasurementCard: React.FC<ManualMeasurementCardProps> = ({
  entries,
  shareMeasurement,
}) => {

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = ManualMeasurementCardStyles(colorScheme);
  return (
    <ThemedView style={styles.card}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {entries.map((measurement) => (
          <ThemedView key={measurement.id} style={styles.measurementRow}>
            <ThemedView style={styles.measurementLeft}>
              <ThemedView style={styles.dot} />
              <ThemedText style={styles.measurementName}>{measurement.name}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.measurementRight}>
              <ThemedText style={styles.measurementValue}>{measurement.value}</ThemedText>
            </ThemedView>
          </ThemedView>
        ))}

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={shareMeasurement}
          activeOpacity={0.8}
        >
          <Share2 color="#D84773" size={18} />
          <ThemedText style={styles.shareText}>Share Measurements</ThemedText>
        </TouchableOpacity>

        {/* Update Measurement */}
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => router.push("/dashboard/customer/measurement/EditManualMeasurement")}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.updateText}>Update Measurement</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

export default ManualMeasurementCard;


