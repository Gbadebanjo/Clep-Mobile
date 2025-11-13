import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CustomerOrderDetailCardProps {
  name?: string;
  phoneNumber?: string;
  address?: string;
  productName?: string;
  deliveryDate?: string;
  amount?: string;
  chatCustomer?: () => void;
  viewCustomerOrder?: () => void;
  orderNo?: string;
  image?: string;
}

const CustomerOrderDetailCard = ({ address }: CustomerOrderDetailCardProps) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
   
        <Text style={styles.headerText}>Shipping</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.info}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="car" size={18} color="#111" />
          </View>
          <Text style={styles.text}>
            <Text style={styles.bold}>Shipping Method:</Text> Dispatch Shipping
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={18} color="#111" />
          </View>
          <Text style={styles.text}>
            <Text style={styles.bold}>Address:</Text> {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomerOrderDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerAccent: {
    width: 5,
    height: 20,
    backgroundColor: "#8e0e3c",
    borderRadius: 3,
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  text: {
    color: "#111",
    flexShrink: 1,
  },
  bold: {
    fontWeight: "600",
  },
});
