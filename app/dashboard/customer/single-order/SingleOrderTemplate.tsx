import { amountFormatter } from "@/helpers/data-utils";
import { OrderResponse, OrderStatusType } from "@/types/order";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import ContactSupportCard from "./ContactSupportCard";
import ProductAndContact from "./ProductAndContact";

interface SingleOrderTemplateProps {
  order: OrderResponse;
  isVendor: boolean;
  storeId: string | null;
}

const SingleOrderTemplate: React.FC<SingleOrderTemplateProps> = ({
  order,
  isVendor,
  storeId,
}) => {
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = getStyles(colorScheme);

  const productsInOrder = useMemo(() => {
    if (!order?.items) return [];

    return order.items
      .filter((item) => !isVendor || item.product?.store?.id === storeId)
      .map((item) => ({
        orderNumber: item.orderNumber,
        trackingNumber: item.fezOrderNumber,
        orderId: order?.id ?? "Unknown ID",
        productName: item.product?.name,
        productId: item.product?.id,
        storeName: item.product?.store?.storeName,
        storeId: item.product?.store?.storeNumber,
        price: item.price,
        quantity: item.quantity,
        totalAmount: item.quantity * item.price,
        status: item.return?.isReturned
          ? "returned"
          : (order.status as OrderStatusType) ?? "Unknown Status",
        imageURL:
          item.product?.default_images?.[0]?.image?.url ??
          "https://via.placeholder.com/150",
      }));
  }, [order, isVendor, storeId]);


  console.log("Products in Order:", productsInOrder);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🧾 Order Summary Section */}

 {/* 🧾 Order Summary Section */}
       <View style={styles.section}>
         <View style={styles.card}>
           <Text style={styles.sectionHeader}>Order Info</Text>
 
           <View style={styles.rowWithIcon}>
             <View style={styles.iconContainer}>
               <Ionicons name="cube" size={16} color="#111" />
             </View>
             <Text style={styles.rowText}>
               <Text style={styles.label}>Order Number:</Text> {order.orderNumber}
             </Text>
           </View>
 
           <View style={styles.rowWithIcon}>
             <View style={styles.iconContainer}>
               <Ionicons name="calendar" size={16} color="#111" />
             </View>
             <Text style={styles.rowText}>
               <Text style={styles.label}>Added:</Text>{" "}
               {new Date(order.createdAt).toLocaleDateString()}
             </Text>
           </View>
 
           <View style={styles.rowWithIcon}>
             <View style={styles.iconContainer}>
               <Ionicons name="card" size={16} color="#111" />
             </View>
             <Text style={styles.rowText}>
               <Text style={styles.label}>Payment Method:</Text>{" "}
               {order.payment_info?.method ?? "N/A"}
             </Text>
           </View>
         </View>
       </View>

        {/* Product & Customer Info */}
        <View style={{  }}>
          <ProductAndContact order={order} />
        </View>

        <ContactSupportCard/>

        {/* 🛍️ Product List Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <FlatList
  data={productsInOrder ?? []}
  keyExtractor={(item, index) =>
    `${item.productId}-${item.trackingNumber ?? index}`
  }
  renderItem={({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.imageURL }} style={styles.productImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.subText}>{item.storeName}</Text>
        <Text style={styles.subText}>
          Tracking Number:{" "}
          <Text style={{ color: "#8e0e3c", fontWeight: "700" }}>
            {item.trackingNumber}
          </Text>
        </Text>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>{amountFormatter(item.totalAmount)}</Text>
          <Text style={[styles.status, getStatusStyle(item.status)]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.subText}>
          Qty: {item.quantity} • {amountFormatter(item.price)}
        </Text>
      </View>
    </View>
  )}
  scrollEnabled={false}
/>


        </View>

      
      </ScrollView>
    </>
  );
};

export default SingleOrderTemplate;

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#FEF9C3", color: "#854D0E" };
    case "delivered":
      return { backgroundColor: "#DCFCE7", color: "#166534" };
    case "cancelled":
      return { backgroundColor: "#FEE2E2", color: "#991B1B" };
    case "returned":
      return { backgroundColor: "#E0E7FF", color: "#312E81" };
    default:
      return { backgroundColor: "#E5E7EB", color: "#374151" };
  }
};

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   backgroundColor: theme === "dark" ? "#111" : "#fff",
      //   padding: 16,
    },
    section: {
      //   marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme === "dark" ? "#fff" : "#111",
      marginBottom: 12,
    },
    card: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      backgroundColor: "#fff",
    },
    rowText: {
      fontSize: 14,
      color: theme === "dark" ? "#ccc" : "#333",
      marginBottom: 6,
    },
    label: {
      fontWeight: "600",
      textTransform: "capitalize",
    },
    productCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
    },
    productImage: {
      width: 70,
      height: "100%",
      borderRadius: 8,
      backgroundColor: "#f0f0f0",
    },
    productName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme === "dark" ? "#fff" : "#111",
    },
    subText: {
      fontSize: 13,
      color: "#777",
      marginTop: 2,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    price: {
      fontSize: 15,
      fontWeight: "700",
      color: "#000",
    },
    status: {
      fontSize: 12,
      fontWeight: "600",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      overflow: "hidden",
      textTransform: "capitalize",
    },
    sectionHeader: {
        fontWeight: "600",
        marginBottom: 20,
        fontSize: 18,
        color: "#111",
    },

    rowWithIcon: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
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
  });
