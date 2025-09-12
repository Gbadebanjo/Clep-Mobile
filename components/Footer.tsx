// Footer.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "react-native-vector-icons/Ionicons";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <View style={styles.footer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* SHOP */}
        <View style={styles.section}>
          <Text style={styles.title}>SHOP</Text>
          {[
            { label: "New Arrivals", url: "/all-products/new-arrivals" },
            { label: "Best Sellers", url: "/all-products/best-sellers" },
            { label: "Sale", url: "/all-products/sale" },
            { label: "Men's", url: "/product-category/mens-wear" },
            { label: "Dresses", url: "/product-category/dresses" },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => openLink(item.url)}>
              <Text style={styles.link}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CUSTOMER SERVICE */}
        <View style={styles.section}>
          <Text style={styles.title}>CUSTOMER SERVICE</Text>
          {[
            { label: "FAQ", url: "/faq" },
            { label: "Shipping & Returns", url: "/shipping-returns" },
            { label: "Size Guide", url: "/size-guide" },
            { label: "Track Order", url: "/track-order" },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => openLink(item.url)}>
              <Text style={styles.link}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ABOUT VAZZEL */}
        <View style={styles.section}>
          <Text style={styles.title}>ABOUT VAZZEL</Text>
          {[
            { label: "Our Story", url: "/about-us/our-story" },
            { label: "Sustainability", url: "/about-us/sustainability" },
            { label: "Careers", url: "/about-us/careers" },
            { label: "Press", url: "/about-us/press" },
            { label: "Terms of Service", url: "/terms-of-service" },
            { label: "Privacy Policy", url: "/privacy-policy" },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => openLink(item.url)}>
              <Text style={styles.link}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTACT US */}
        <View style={styles.section}>
          <Text style={styles.title}>CONTACT US</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => openLink("https://wa.link/6mkxd6")}
          >
            <Image
              source={require("../assets/message-circle.png")}
              style={styles.icon}
            />
            <Text style={styles.link}>Live Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openLink("mailto:team@vazzel.com")}
          >
            <Text style={styles.link}>Email Us</Text>
          </TouchableOpacity>
        </View>

        {/* NEWSLETTER */}
        <View style={styles.section}>
          <Text style={styles.title}>NEWSLETTER</Text>
          <Text style={styles.text}>Subscribe for exclusive offers and updates</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <TouchableOpacity style={styles.submit}>
              <Ionicons name="checkmark-circle-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Footer */}
      <View style={styles.bottom}>
        <Text style={styles.text}>
          © {currentYear} Vazzel | All Rights Reserved
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => openLink("/privacy-policy")}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink("/terms-of-service")}>
            <Text style={styles.link}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
            <Text style={styles.link}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink("https://twitter.com")}>
            <Text style={styles.link}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink("https://facebook.com")}>
            <Text style={styles.link}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  container: {
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    color: "#ccc",
    marginBottom: 8,
  },
  link: {
    color: "#aaa",
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  text: {
    color: "#aaa",
  },
  form: {
    flexDirection: "row",
    marginTop: 8,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  submit: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 6,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: "#222",
    marginTop: 20,
    paddingTop: 10,
    alignItems: "center",
  },
});

export default Footer;
