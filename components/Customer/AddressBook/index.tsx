import { CustomerAPI } from "@/apis/customers-api";
import { useAuthStore } from "@/store";
import { Address, CustomerProfile } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import AddAddress from "../AddAddress";
import AddressBookEmptyState from "../AddressBookEmptyState";
import Addresses from "../Addresses";
import { AdressBookStyles } from "./style";

const AddressBook: React.FC = () => {
  const customerApi = new CustomerAPI();
  const { user } = useAuthStore();
  const customerId = user?.customerProfile?.id;
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = AdressBookStyles (colorScheme);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // ✅ Fetch customer data using React Query
  const {
    data,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      if (!customerId) throw new Error("No customer ID found");
      const response = await customerApi.getCustomer(customerId);
      return response.data.customer as CustomerProfile;
    },
    enabled: !!customerId, // only run if user is logged in
  });

  const customer = data;
  const addresses = customer?.shippingAddresses ?? [];

  // ✏️ Edit Address
  const handleEditAddress = (address: Address) => {
    setIsEdit(true);
    setSelectedAddress(address);
    setShowAddressForm(true);
  };

  // 🏠 Select an address for checkout
  const handleSelectedAddress = (id: string) => {
    const foundAddress = addresses.find((address) => address.id === id);
    if (!foundAddress) return;
    setIsEdit(true);
    setSelectedAddress(foundAddress);
    setShowAddressForm(true);
  };

  // ➕ Add new address
  const addAddress = () => {
    setIsEdit(false);
    setSelectedAddress(null);
    setShowAddressForm(true);
  };

  // 🧾 Show Add/Edit Address Form
  if (showAddressForm) {
    if (!customer) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }
    return (
      <AddAddress
        isEdit={isEdit}
        onClose={() => setShowAddressForm(false)}
        selectedAddress={selectedAddress}
        customer={customer}
      />
    );
  }

  // 🧭 Main UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Add Address Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={addAddress}>
          <Text style={styles.buttonText}>Add Address</Text>
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {isFetching && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Error */}
      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading your addresses...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isFetching && !error && addresses.length === 0 && (
        <AddressBookEmptyState addAddress={addAddress} />
      )}

      {/* Address List */}
      {!isFetching && !error && addresses.length > 0 && (
        <Addresses
          addresses={addresses}
          handleSelectedAddress={handleSelectedAddress}
          onEdit={handleEditAddress} // ✅ Correct: pass a function reference
        />
      )}
    </ScrollView>
  );
};

export default AddressBook;

