import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { formatChatDate } from "@/helpers/data-utils";
import { Measurement } from "@/types/measurement";
import { useRouter } from "expo-router";
import { Edit3, Share2 } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import MeasurementTableAndNotes from "../MeasurementTableAndNotes";
import ShareMeasurementModal from "../ShareMeasaurementModal";
import { MeasurementActionStyles } from "./style";

interface Props {
  measurement?: Measurement;
  token: string;
}

const MeasurementActionAndProfileView: React.FC<Props> = ({
  measurement,
  token,
}) => {
  const router = useRouter();
  const [showShareMeasurementModal, setShowShareMeasurementModal] =
    useState(false);
     const colorScheme = useColorScheme() as 'light' | 'dark';
      const styles = MeasurementActionStyles(colorScheme);

  // ✅ Normalize data (so both nested & flat shapes work)
  const data = useMemo(() => {
    return measurement?.measurements || measurement || {};
  }, [measurement]);

  const details = useMemo(() => {
    if (!data || !data.user) return [];

    return [
      {
        title: "Name",
        text: data.user.name || "Not available",
      },
      {
        title: "Date Taken",
        text: data.updatedAt
          ? formatChatDate(data.updatedAt)
          : data.createdAt
          ? formatChatDate(data.createdAt)
          : "Not available",
      },
    ];
  }, [data]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <ThemedView style={styles.headerContainer}>
        <ThemedView>
          <ThemedText style={styles.headerText}>View Saved Measurements</ThemedText>
          <ThemedText style={styles.headerDesc}>
            Body Measurements in Centimeters (cm)
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.darkButton]}
            onPress={() => router.push("/(tabs)/measurement")}
          >
            <Edit3 color="#fff" size={18} />
            <ThemedText style={[styles.buttonText, { color: "#fff" }]}>
              Add AI Measurements
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.lightButton]}
            onPress={() => setShowShareMeasurementModal(true)}
          >
            <Share2 color="#D84773" size={18} />
            <ThemedText style={[styles.buttonText, { color: "#ba577a" }]}>
              Share Measurements
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Basic Info */}
      <ThemedView style={styles.detailsContainer}>
        {details.length > 0 ? (
          details.map(({ title, text }, index) => (
            <ThemedView key={index} style={styles.detailItem}>
              <ThemedText style={styles.detailLabel}>{title}:</ThemedText>
              <ThemedText style={styles.detailValue}>{text}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={{ color: "gray" }}>No user info available</ThemedText>
        )}
      </ThemedView>

      {/* ✅ Measurement Table */}
      <ThemedView style={{ marginTop: 20 }}>
        <MeasurementTableAndNotes measurement={data} />
      </ThemedView>

      {/* Share Modal */}
      {showShareMeasurementModal && (
        <ShareMeasurementModal
          isOpen={showShareMeasurementModal}
          type="ai"
          token={token}
          onClose={() => setShowShareMeasurementModal(false)}
        />
      )}
    </ScrollView>
  );
};

export default MeasurementActionAndProfileView;


