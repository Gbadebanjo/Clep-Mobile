import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ContactSupportCard = () => {
  const openWhatsApp = () => {
    const whatsappUrl = "https://wa.me/2347068649001"; // Replace with your WhatsApp business number
    Linking.openURL(whatsappUrl).catch(() =>
      alert("Unable to open WhatsApp")
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Contact Support</Text>

      <View style={styles.supportRow}>
        <Ionicons name="chatbubbles-outline" size={28} color="#000" />

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Product Return</Text>
          <Text style={styles.description}>
            Contact support to initiate product return
          </Text>

          <TouchableOpacity onPress={openWhatsApp}>
            <Text style={styles.link}>WhatsApp Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ContactSupportCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111",
  },
  supportRow: {
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 12,
    padding: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#6B7280", 
  },
  link: {
    color: "#2563EB", 
    fontSize: 13,
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
