import { OrderResponse } from "@/types/order";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CustomerOrderDetailCard from "./CustomerOrderDetailCard";

interface ProductAndContactProps {
  order: OrderResponse;
}

const ProductAndContact = ({ order }: ProductAndContactProps) => {
  const firstItem = order.items?.[0];

  return (
    <View style={styles.container}>
    
      <CustomerOrderDetailCard
        name={order?.user?.name || "N/A"}
        phoneNumber={order?.user?.phoneNumber || "N/A"}
        address={`${order?.shipping_address?.street}, ${order?.shipping_address?.city}, ${order?.shipping_address?.postalCode ?? ''} ${order?.shipping_address?.state}, ${order?.shipping_address?.country}.`}
        productName={firstItem?.product?.name || "N/A"}
        deliveryDate={new Date(order?.createdAt!).toLocaleDateString()}
        amount={String(order?.total_amount)}
        chatCustomer={() => alert("chat customer")}
        viewCustomerOrder={() => alert("view customer order")}
        orderNo={order?.orderNumber || "N/A"}
        image={firstItem?.product?.default_images?.[0]?.image?.url}
      />
    </View>
  );
};

export default ProductAndContact;

// Styles
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // marginVertical: ,
  },
});
