import { Measurement } from "@/types/measurement";
import React, { useMemo } from "react";
import { FlatList, ScrollView, Text, useColorScheme, View } from "react-native";
import { MeasurementTableAndNotesStyles } from "./style";

interface Props {
  measurement?: Measurement;
}

const MeasurementTableAndNotes: React.FC<Props> = ({ measurement }) => {
  const EXCLUDED_KEYS = useMemo(
    () => new Set(["id", "lastUpdated", "createdAt", "updatedAt"]),
    []
  );

  const measureItems = useMemo(() => {
    if (!measurement) return [];
    // Prefer to render "entries" if available (from your log)
    if (measurement.entries && Array.isArray(measurement.entries)) {
      return measurement.entries.map((item, index) => ({
        serial_no: String(index + 1),
        attribute: item.name ?? "N/A",
        measurements: item.value ?? "N/A",
      }));
    }

    // fallback for flat measurement objects
    return Object.entries(measurement)
      .filter(([key, value]) => !EXCLUDED_KEYS.has(key) && typeof value !== "object")
      .map(([attribute, value], index) => ({
        serial_no: String(index + 1),
        attribute,
        measurements: value ?? "N/A",
      }));
  }, [measurement]);
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = MeasurementTableAndNotesStyles (colorScheme);
  

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Measurements</Text>


        {measurement ? (
          <View style={styles.tableContainer}>
            {/* Header Row */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell, { flex: 0.3 }]}>#</Text>
              <Text style={[styles.cell, styles.headerCell, { flex: 1 }]}>Attribute</Text>
              <Text style={[styles.cell, styles.headerCell, { flex: 1 }]}>Measurements</Text>
            </View>

            {/* Data Rows */}
            <FlatList
              data={measureItems}
              keyExtractor={(item) => item.serial_no}
              scrollEnabled={false} // ✅ Fix nested scroll conflict
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={[styles.cell, { flex: 0.3 }]}>{item.serial_no}</Text>
                  <Text style={[styles.cell, { flex: 1 }]}>{item.attribute}</Text>
                  <Text style={[styles.cell, { flex: 1 }]}>{String(item.measurements)}</Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.noDataBox}>
            <Text style={styles.noDataText}>No measurement data available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MeasurementTableAndNotes;


