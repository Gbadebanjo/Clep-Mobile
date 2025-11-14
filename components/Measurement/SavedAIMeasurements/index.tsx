import { MeasurementAPI } from "@/apis/measurement-api";
import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Edit3 } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import MeasurementActionAndProfileView from "../MeasurementActionAndProfileView";
import ShareMeasurementModal from "../ShareMeasaurementModal";
import { SavedAIMeasurementStyles } from "./style";

interface SavedAIMeasurementsProps {
  token: string;
}

const SavedAIMeasurements: React.FC<SavedAIMeasurementsProps> = ({ token }) => {
  const router = useRouter();
  const measurementAPI = new MeasurementAPI(token);
  const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = SavedAIMeasurementStyles (colorScheme);
  
  // Fetch AI measurements
  const { data, isPending, isError } = useQuery({
    queryKey: ["ai-measurement"],
    queryFn: () => measurementAPI.customerMeasurement(),
  });

  const [showShareMeasurementModal, setShowShareMeasurementModal] =
    useState(false);

  const handleShareMeasurement = () => {
    setShowShareMeasurementModal(true);
  };

  // Extract measurement object
  const measurement = data?.data;



  // ✅ Full-screen loader
  if (isPending) {
    return <ThemedLoader />;
  }

  // ✅ Error fallback
  if (isError) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Unable to load AI measurements. Please try again later.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <ThemedView style={styles.header}>
        {!measurement && (
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/measurement")}
            style={styles.addButton}
          >
            <Edit3 size={18} color="#fff" />
            <ThemedText style={styles.addButtonText}>Add AI Measurements</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>

      {/* AI Measurement Details */}
      {measurement ? (
        <ThemedView style={styles.contentWrapper}>
          <MeasurementActionAndProfileView
            measurement={measurement}
            token={token}
          />
       
        </ThemedView>
      ) : (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            No AI measurement data available.
          </ThemedText>
        </ThemedView>
      )}

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

export default SavedAIMeasurements;


