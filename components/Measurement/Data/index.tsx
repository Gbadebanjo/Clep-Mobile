import { MeasurementAPI } from '@/apis/measurement-api';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { useMeasurementStore } from '@/store';
import { AIMeasurement } from '@/types/measurement';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { DataStyles } from './styles';

// const HowToMeasure = require('@/assets/images/howtomeasure 1.png');
// const ArrowRight = require('@/assets/icon/arrow-right.png');

const getSizeRecommendation = ({ chest, waist, hips }: AIMeasurement) => {
  if (!chest || !waist || !hips) return 'N/A';
  const chestSize = Number(chest);

  if (chestSize < 90) return 'S';
  if (chestSize < 105) return 'M';
  if (chestSize < 120) return 'L';
  return 'XL';
};

export default function Data() {
  const colorScheme = useColorScheme();
  const styles = DataStyles(colorScheme);
  const router = useRouter();
  const measurements = useMeasurementStore((store) => store.measurements);
  const sizeRecommendation = getSizeRecommendation(measurements as AIMeasurement);

  const saveMeasurement = useMutation({
    mutationFn: (values: AIMeasurement) =>
      new MeasurementAPI().createMeasurement(values),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Measurement saved successfully!',
      });
      router.push('/measurement/share');
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Measurement failed',
      });
    },
  });

  const measurementData = Object.entries(measurements || {}).map(
    ([key, value]) => ({
      label: key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: value || 'N/A',
    })
  );

  return (
    <View style={[styles.root, { flex: 1 }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.rightPanel,
          { paddingBottom: 100 }, // 👈 Add padding to make the button scrollable into view
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Your Recommended Size:{" "}
          <Text style={styles.bold}>{sizeRecommendation}</Text>
        </Text>
  
        <Text style={styles.sectionTitle}>Measurement Data</Text>
  
        <View style={styles.table}>
          {measurementData.map(({ label, value }, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableLabel}>{label}</Text>
              <Text style={styles.tableValue}>{value} cm</Text>
            </View>
          ))}
        </View>
  
        <Text style={styles.recommendation}>
          Based on your measurements, we recommend a size{" "}
          <Text style={styles.bold}>{sizeRecommendation}</Text>.
        </Text>
  
        <TouchableOpacity
          disabled={saveMeasurement.isPending}
          style={[
            styles.saveButton,
            saveMeasurement.isPending && styles.saveButtonDisabled,
          ]}
          onPress={() =>
            saveMeasurement.mutate(
              Object.fromEntries(
                Object.entries(measurements).map(([key, value]) => [
                  key.replace(/\s+/g, "_"),
                  value,
                ])
              ) as AIMeasurement
            )
          }
          accessibilityLabel="Save Measurement"
        >
          {saveMeasurement.isPending ? (
            <>
              <Text style={styles.saveButtonText}>Share Measurement</Text>
              <ActivityIndicator color="#fff" />
            </>
          ) : (
            <Text style={styles.saveButtonText}>Share Measurement</Text>
          )}
        </TouchableOpacity>
  
        <Toast />
      </ScrollView>
    </View>
  );
}
