import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const MeasurementRootStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      paddingTop: 40,
      fontSize: 32,
      fontWeight: "bold",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    iconWrapper: {
      marginTop: 30,
      alignItems: "flex-start",
    },
    timerText: {
      fontSize: 18,
      fontWeight: "700",
      color: Colors[colorScheme].text,
      paddingVertical: 20,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      marginBottom: 8,
    },
    
    description: {
      color: "#666",
      fontSize: 16,
      fontWeight: "300",
      marginBottom: 24,
      paddingLeft: 8,
    },
    startButton: {
      flexDirection: "row",
      backgroundColor: Colors[colorScheme].text,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 999,
      width: "50%",
      marginTop: 8,
    },
    startButtonText: {
      color: Colors[colorScheme].background,
      fontSize: 20,
      fontWeight: "600",
      marginRight: 10,
    },
    button: {
        marginTop: 12,
        borderRadius: 12, 
        paddingVertical: 16, 
        // paddingHorizontal: 24,
        backgroundColor: Colors[colorScheme].text,
        width: '30%',
    }
  });
