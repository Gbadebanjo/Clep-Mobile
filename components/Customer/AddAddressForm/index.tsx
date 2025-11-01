import { CustomerAPI } from '@/apis/customers-api';
import nigerianStates from '@/components/nigerianStates';
import { showError, showSuccess } from '@/services/api';
import { Address, CreateAddressPayload, CustomerProfile } from '@/types/customer';
import { Picker } from '@react-native-picker/picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import * as Yup from 'yup';
import { AddAdressFormStyles } from './style';

interface Props {
  isEdit: boolean;
  handleBack: () => void;
  selectedAddress: Address | null;
  customer: CustomerProfile;
}

const AddAddressForm: React.FC<Props> = ({ isEdit, selectedAddress, handleBack, customer }) => {
  const queryClient = useQueryClient();
  const customerApi = new CustomerAPI();
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = AddAdressFormStyles (colorScheme);
  const addAddressMutation = useMutation({
    mutationFn: async (payload: CreateAddressPayload) => {
      const response = await customerApi.addAddress(payload);
      return response.address;
    },
    onError: (e: any) => {
      showError( e.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer'] });
      showSuccess('Address added successfully' );
      handleBack();
    },
  });

  const validationSchema = Yup.object({
    addressName: Yup.string().required('Address name is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal code is required'),
  });

  const { handleChange, handleSubmit, values, errors, setFieldValue } = useFormik({
    initialValues: isEdit && selectedAddress ? selectedAddress : {
      addressName: '',
      street: '',
      city: '',
      state: '',
      country: 'NG',
      postalCode: '',
      notes: '',
      id: null,
    },
    validationSchema,
    onSubmit: (vals) => {
      addAddressMutation.mutate({
        ...vals,
        isDefault: customer.shippingAddresses.length === 0,
      });
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Address Name</Text>
        <TextInput
          style={[styles.input, errors.addressName && styles.errorInput]}
          placeholder="E.g Home"
          value={values.addressName}
          onChangeText={handleChange('addressName')}
        />
        {errors.addressName && <Text style={styles.errorText}>{errors.addressName}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={[styles.input, errors.street && styles.errorInput]}
          placeholder="E.g 123 Main St"
          value={values.street}
          onChangeText={handleChange('street')}
        />
        {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={[styles.input, errors.city && styles.errorInput]}
          placeholder="E.g Ikeja"
          value={values.city}
          onChangeText={handleChange('city')}
        />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>State</Text>
        <View style={[styles.pickerContainer, errors.state && styles.errorInput]}>
          <Picker
            selectedValue={values.state}
            onValueChange={(itemValue) => setFieldValue('state', itemValue)}
          >
            <Picker.Item label="Select state" value="" />
            {nigerianStates.map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
        </View>
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="E.g Nigeria"
          value={values.country}
          editable={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Postal Code</Text>
        <TextInput
          style={[styles.input, errors.postalCode && styles.errorInput]}
          placeholder="E.g 100001"
          keyboardType="numeric"
          value={values.postalCode}
          onChangeText={handleChange('postalCode')}
        />
        {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.textarea]}
          placeholder="Optional notes"
          value={values.notes}
          onChangeText={handleChange('notes')}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, addAddressMutation.isPending && styles.disabledButton]}
        onPress={() => handleSubmit()}
        disabled={addAddressMutation.isPending}
      >
        {addAddressMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>
            {isEdit ? 'Update Address' : 'Add Address'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAddressForm;

