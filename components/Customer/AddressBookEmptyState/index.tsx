import { ShoppingBag } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { AdressBookEmptyStyles } from "./style";

interface AddressBookEmptyStateProps {
  addAddress: () => void;
}

const AddressBookEmptyState: React.FC<AddressBookEmptyStateProps> = ({ addAddress }) => {
      const colorScheme = useColorScheme() as "light" | "dark";
      const styles = AdressBookEmptyStyles (colorScheme);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Image source={ShoppingBagIcon} style={styles.image} /> */}
<ShoppingBag style={styles.image} />
        <Text style={styles.title}>You have not added an address</Text>
        <Text style={styles.subtitle}>Address added will be displayed here</Text>

        <TouchableOpacity style={styles.button} onPress={addAddress}>
          <Text style={styles.buttonText}>+ Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressBookEmptyState;

