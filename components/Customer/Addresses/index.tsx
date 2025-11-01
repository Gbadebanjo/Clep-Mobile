import { Address } from "@/types/customer";
import React from "react";
import { useColorScheme, View } from "react-native";
import AddressBookCard from "../AddressBookCard";
import { AdressesStyles } from "./style";

interface Props {
  addresses: Address[] | undefined;
  handleSelectedAddress: (_id: string) => void;
  onEdit: (address: Address) => void;
}

const CheckoutAddresses: React.FC<Props> = ({
  addresses,
  handleSelectedAddress,
  onEdit,
}) => {
      const colorScheme = useColorScheme() as "light" | "dark";
      const styles = AdressesStyles (colorScheme);
  return (
    <View style={styles.container}>
      {addresses?.map((address) => (
        <View key={address.id} style={styles.cardWrapper}>
          <AddressBookCard
            address={address}
            selectAddress={(id) => handleSelectedAddress(id)}
            onEdit={onEdit}
          />
        </View>
      ))}
    </View>
  );
};

export default CheckoutAddresses;


