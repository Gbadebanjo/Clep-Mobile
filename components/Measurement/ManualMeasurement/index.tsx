import { MeasurementAPI } from '@/apis/measurement-api';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFirstFormikErrorMessage } from '@/hooks/misc';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { ManualMeasurementStyles } from './style';

interface ManualMeasurementFormPropsI {
  token: string;
  isEdit?: boolean;
  entries?: { entries: { name: string; value: string }[] };
  id?: string;
}

const initialMeasurement = {
  entries: [
    { name: 'Sleeve', value: '' },
    { name: 'Shoulder', value: '' },
    { name: 'Waist', value: '' },
    { name: 'Bust', value: '' },
  ],
};

const ManualMeasurementForm = ({
  token,
  isEdit = false,
  id,
  entries: initialSavedEntries,
}: ManualMeasurementFormPropsI) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const measurementAPI = new MeasurementAPI(token);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = ManualMeasurementStyles(colorScheme);

  const validationSchema = Yup.object({
    entries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        value: Yup.string().required('Value is required'),
      })
    ),
  });

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: isEdit ? initialSavedEntries : initialMeasurement,
    validationSchema,
    onSubmit: (values) => mutate(values),
  });

  const entries = values.entries;

  const addParameter = () => {
    setFieldValue('entries', [...entries, { name: '', value: '' }]);
  };

  const updateMeasurement = (
    index: number,
    field: 'name' | 'value',
    value: string
  ) => {
    const updated = [...entries];
    updated[index][field] = value;
    setFieldValue('entries', updated);
  };

  const removeAttribute = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setFieldValue('entries', updated);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { entries: { name: string; value: string }[] }) => {
      if (!isEdit) return measurementAPI.submitManualMeasurement(data);
      return measurementAPI.updateManualMeasurement({ ...data, id });
    },
    onSuccess: (response) => {
      Toast.show({ type: 'success', text1: response.message ?? 'Measurement submitted' });
      queryClient.invalidateQueries({ queryKey: ['manual-measurement'] });
      navigation.goBack();
    },
    onError: (error: any) => {
      Toast.show({ type: 'error', text1: error.message });
    },
  });

  const submitForm = () => {
    if (Object.keys(errors).length) {
      const firstErrorMessage = getFirstFormikErrorMessage(errors);
      if (firstErrorMessage)
        Toast.show({ type: 'error', text1: firstErrorMessage });
      return;
    }
    handleSubmit();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.addRow}>
        <TouchableOpacity style={styles.addButton} onPress={addParameter}>
          <ThemedText style={styles.addButtonText}>+ Add more</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {(!entries || entries.length === 0) && (
        <ThemedText style={styles.emptyText}>No attributes added</ThemedText>
      )}

      {entries.map((attr, index) => (
        <ThemedView key={index} style={styles.inputRow}>
          <ThemedView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={attr.name}
              onChangeText={(text) => updateMeasurement(index, 'name', text)}
              placeholder="Name (e.g. Length)"
            />
            {errors?.entries?.[index]?.name && (
              <ThemedText style={styles.errorText}>{errors.entries[index].name}</ThemedText>
            )}
          </ThemedView>
          <ThemedView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={attr.value}
              onChangeText={(text) => updateMeasurement(index, 'value', text)}
              placeholder="Value (e.g. 38cm)"
            />
            {errors?.entries?.[index]?.value && (
              <ThemedText style={styles.errorText}>{errors.entries[index].value}</ThemedText>
            )}
          </ThemedView>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeAttribute(index)}
          >
            <ThemedText style={styles.removeText}>×</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ))}

      <TouchableOpacity
        style={[styles.submitButton, isPending && { opacity: 0.7 }]}
        onPress={submitForm}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ThemedText style={styles.submitText}>Submit Measurements</ThemedText>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ManualMeasurementForm;

