import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const UploadPhotoStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      alignItems: "center",
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      color: Colors[colorScheme].text,
      marginTop: 80,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      color: "#747778",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 22,
    },
    imageContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 20,
    },
    placeholderImage: {
      width: "60%",
      height: 350,
    },
    uploadButton: {
      marginTop: 80,
      paddingVertical: 14,
      borderRadius: 12,
      width: "90%",
      justifyContent: "center",
      alignItems: "center",

      backgroundColor: Colors[colorScheme].text,
    },
    uploadText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: Colors[colorScheme].background,
    },
    arrowIcon: {
      width: 30,
      height: 30,
      marginLeft: 8,
    },
  });
