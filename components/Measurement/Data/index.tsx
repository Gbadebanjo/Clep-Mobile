import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image as RNImage } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
// import { useMeasurementStore } from '@/store/measurementStore';
import { AIMeasurement } from '@/types/measurement';
import { MeasurementAPI } from '@/apis/measurement-api';
import Toast from 'react-native-toast-message';

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
  const router = useRouter();
//   const measurements = useMeasurementStore((store) => store.measurement);
//   const sizeRecommendation = getSizeRecommendation(measurements);

  const saveMeasurement = useMutation({
    mutationFn: (values: AIMeasurement) =>
      new MeasurementAPI().createMeasurement(values),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Measurement saved successfully!',
      });
    //   router.push('/measurements/share');
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Measurement failed',
      });
    },
  });

//   const measurementData = Object.entries(measurements || {}).map(
//     ([key, value]) => ({
//       label: key
//         .replace(/_/g, ' ')
//         .replace(/\b\w/g, (c) => c.toUpperCase()),
//       value: value || 'N/A',
//     })
//   );

  return (
    <View style={styles.root}>
      <View style={styles.leftPanel}>
        <RNImage
        //   source={HowToMeasure}
          style={styles.howToImage}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.rightPanel}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push('/')}
          accessibilityLabel="Close"
        >
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {/* Your Recommended Size: <Text style={styles.bold}>{sizeRecommendation}</Text> */}
          Your Recommended Size: <Text style={styles.bold}>60gb</Text>
        </Text>
        <Text style={styles.sectionTitle}>Measurement Data</Text>
        {/* <View style={styles.table}>
          {measurementData.map(({ label, value }, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableLabel}>{label}</Text>
              <Text style={styles.tableValue}>{value} cm</Text>
            </View>
          ))}
        </View> */}
        <Text style={styles.recommendation}>
          {/* Based on your measurements, we recommend a size <Text style={styles.bold}>{sizeRecommendation}</Text>. */}
        </Text>
        <TouchableOpacity
          disabled={saveMeasurement.isPending}
          style={[
            styles.saveButton,
            saveMeasurement.isPending && styles.saveButtonDisabled,
          ]}
        //   onPress={() =>
        //     saveMeasurement.mutate(
        //       Object.fromEntries(
        //         Object.entries(measurements).map(([key, value]) => [
        //           key.replace(/\s+/g, '_'),
        //           value,
        //         ])
        //       ) as AIMeasurement
        //     )
        //   }
          accessibilityLabel="Save Measurement"
        >
          {saveMeasurement.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.saveButtonText}>Save Measurement</Text>
              {/* <RNImage source={ArrowRight} style={styles.arrowIcon} /> */}
            </>
          )}
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftPanel: {
    display: 'none',
    backgroundColor: '#000',
    height: '100%',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howToImage: {
    width: 350,
    height: '100%',
  },
  rightPanel: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 28,
    color: '#444',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '400',
  },
  table: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  tableLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#222',
  },
  tableValue: {
    fontSize: 16,
    color: '#444',
  },
  recommendation: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#aaa',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 12,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
});