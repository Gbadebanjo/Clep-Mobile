import { CustomerAPI } from '@/apis/customers-api';
import { showError, showSuccess } from '@/services/api';
import { Address } from '@/types/customer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Trash } from 'lucide-react-native';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { AdressBookCardStyles } from './style';

interface AddressBookCardProps {
  address: Address;
  selectAddress: (id: string) => void;
  onEdit?: (address: Address) => void;
}

const AddressBookCard: React.FC<AddressBookCardProps> = ({
  address,
  selectAddress,
  onEdit,
}) => {
  const queryClient = useQueryClient();
  const customerApi = new CustomerAPI();

  const deleteAddressMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await customerApi.removeAddress(id);
      return response;
    },
    onSuccess: () => {
      showSuccess( 'Address deleted successfully' );
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
    onError: () => {
      showError('Address could not be deleted' );
    },
  });

  const setAddressDefaultMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await customerApi.setDefaultAddress(id);
      return response;
    },
    onSuccess: () => {
      showSuccess( 'Address updated successfully' );
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
    onError: () => {
      showError('Address could not be updated' );
    },
  });

  // 🧠 Confirm delete handler
  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteAddressMutation.mutate(id),
        },
      ]
    );
  };
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = AdressBookCardStyles (colorScheme);
  return (
    <TouchableOpacity
      style={[
        styles.card,
        address.isDefault ? styles.defaultCard : styles.normalCard,
      ]}
      onPress={() => selectAddress(address.id)}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <Text style={styles.addressName}>{address.addressName}</Text>
        <View style={styles.addressDetails}>
          <Text style={styles.label}>Delivery Address</Text>
          <Text>{address.street}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {!address.isDefault && (
          <TouchableOpacity
            style={styles.defaultButton}
            onPress={() => setAddressDefaultMutation.mutate(address.id)}
          >
            {setAddressDefaultMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.defaultButtonText}>Set as default</Text>
            )}
          </TouchableOpacity>
        )}

        <View style={styles.rightActions}>
          {/* ✏️ Edit Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit && onEdit(address)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
            <Edit2 size={18} color="#000" />
          </TouchableOpacity>

          {/* 🗑️ Delete Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(address.id)}
            disabled={deleteAddressMutation.isPending}
          >
            {deleteAddressMutation.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.actionButtonText}>Delete</Text>
                <Trash size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddressBookCard;


