import { MeasurementAPI } from "@/apis/measurement-api";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useQuery } from "@tanstack/react-query";
import { Edit3 } from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";

import ManualMeasurementCard from "../ManualMeasurementCard";
import ShareMeasurementModal from "../ShareMeasaurementModal";
import { SavedManualMeasurementStyles } from "./style";

interface SavedManualMeasurementsProps {
  token: string;
}

const SavedManualMeasurements: React.FC<SavedManualMeasurementsProps> = ({ token }) => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = SavedManualMeasurementStyles (colorScheme);
  
  const measurementAPI = new MeasurementAPI(token);

  const { data, isPending, isError } = useQuery({
    queryKey: ["manual-measurement"],
    queryFn: () => measurementAPI.getManualMeasurement(),
  });

  const [showShareMeasurementModal, setShowShareMeasurementModal] = useState(false);

  const handleShareMeasurement = () => {
    setShowShareMeasurementModal(true);
  };

  const measurementEntries =
    data?.data?.docs?.[0]?.entries && Array.isArray(data.data.docs[0].entries)
      ? data.data.docs[0].entries
      : [];

  // ✅ Full screen loader
  if (isPending) {
    return (
  
        <ThemedLoader />
  
    );
  }

  // ✅ Error fallback
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to load measurements. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Saved Measurements</Text>
          <Text style={styles.headerDesc}>Body Measurements in Centimeters (cm)</Text>

        {(!measurementEntries || measurementEntries.length === 0) && (
          <TouchableOpacity
            // onPress={() => router.push("/my-account/measurements/manual/create")}
            style={styles.addButton}
          >
            <Edit3 size={18} color="white" />
            <Text style={styles.addButtonText}>Add Manual Measurements</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Measurement Cards */}
      <View style={styles.cardsWrapper}>
        {measurementEntries && measurementEntries.length > 0 ? (
          <ManualMeasurementCard
            entries={measurementEntries}
            shareMeasurement={handleShareMeasurement}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No manual measurements found.</Text>
          </View>
        )}
      </View>

      {/* Share Modal */}
      {showShareMeasurementModal && (
        <ShareMeasurementModal
          isOpen={showShareMeasurementModal}
          type="manual"
          token={token}
          onClose={() => setShowShareMeasurementModal(false)}
        />
      )}
    </ScrollView>
  );
};

export default SavedManualMeasurements;

