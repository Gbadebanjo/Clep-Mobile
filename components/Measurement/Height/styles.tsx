import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const HeightStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      marginTop: 80,
      flex: 1,
      paddingHorizontal: 24,
    },
    timerText: {
      fontSize: 20,
      fontWeight: "700",
      color: Colors[colorScheme].text,
      paddingVertical: 20,
    },
    description: {
     color: "#666",
      fontSize: 16,
      fontWeight: "300",
      marginBottom: 24,
      paddingLeft: 8,
    },
    input: {
      borderBottomWidth: 4,
      borderColor: '#D9D9D9',
      marginTop: 60,
      marginBottom: 80,
      
      fontSize: 18,
      textAlign: "center",
      width: "50%",
      alignSelf: "center",
      paddingVertical: 8,
      color: Colors[colorScheme].text,
    },
  });
