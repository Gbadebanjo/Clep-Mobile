import { Address, CustomerProfile } from "@/types/customer";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import AddAddressForm from "../AddAddressForm";
import { AddAdressStyles } from "./style";


interface IProp {
  isEdit: boolean;
  onClose: () => void;
  selectedAddress: Address | null;
  customer: CustomerProfile;
}

const AddAddress: React.FC<IProp> = ({ isEdit, onClose, selectedAddress, customer }) => {

  const handleBack = () => {
    onClose();
  };
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = AddAdressStyles (colorScheme);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={handleBack}>
     <ChevronLeft/>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <AddAddressForm
        handleBack={handleBack}
        isEdit={isEdit}
        selectedAddress={selectedAddress}
        customer={customer}
      />
    </View>
  );
};

export default AddAddress;

