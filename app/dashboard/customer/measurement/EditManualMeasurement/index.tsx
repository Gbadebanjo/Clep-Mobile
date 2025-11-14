import { MeasurementAPI } from '@/apis/measurement-api';
import Header from '@/components/Header';
import ManualMeasurementForm from '@/components/Measurement/ManualMeasurement';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedView } from '@/components/ThemedView';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import { EditManualMeasurementStyles } from './style';

interface EditManualMeasurementPropsI {
  token: string;
}

const EditManualMeasurement = ({ token }: EditManualMeasurementPropsI) => {
     const colorScheme = useColorScheme() as 'light' | 'dark';
      const styles = EditManualMeasurementStyles(colorScheme);
  const measurementAPI = new MeasurementAPI(token);

  const { data, isPending } = useQuery({
    queryKey: ['manual-measurement'],
    queryFn: () => measurementAPI.getManualMeasurement(),
  });

  let measurementEntries: any = {};
  if (data) {
    measurementEntries = data?.data?.docs?.[0] || {};
  }

  if (isPending) {
    return (
  <ThemedLoader/>
    );
  }

  return (
    <><ThemedView style={{ flex: 1, paddingTop: "7%", backgroundColor: "#fff" }}></ThemedView><Header title={"Manual Measurement Form"} /><ScrollView contentContainerStyle={styles.container}>
          <ThemedView style={styles.headerContainer}>
              {/* <Text style={styles.title}>Manual Measurement Form</Text> */}
              <Text style={styles.subtitle}>
                  Add all required measurements (e.g. height, sleeve, bust, shoulder, chest)
              </Text>
          </ThemedView>

          <ManualMeasurementForm
              token={token}
              isEdit={true}
              entries={{ entries: measurementEntries.entries }}
              id={measurementEntries.id} />
      </ScrollView></>
  );
};

export default EditManualMeasurement;


