import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const imageSize = width;
const imageHeight = width * 0.9;

export const ProductDetailStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 60,
    },
    // Image Slider
    sliderContainer: {
      width: imageSize,
      height: imageHeight,
    },
    slide: {
      width: imageSize,
      height: imageHeight,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    pagination: {
      flexDirection: "row",
      position: "absolute",
      bottom: 15,
      alignSelf: "center",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors[colorScheme].primary200,
      marginHorizontal: 4,
      marginVertical: 8,
    },
    activeDot: {
      backgroundColor: Colors[colorScheme].primary800,
    },
    detailsContainer: {
      padding: 20,

      marginTop: -20,
    },
    productName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    originalPrice: {
      fontSize: 16,
      textDecorationLine: "line-through",
      color: Colors[colorScheme].textMuted,
      marginRight: 8,
    },
    discountedPrice: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors[colorScheme].primary700,
    },
    discountPercentage: {
      fontSize: 11,
      color: "#fff",
      backgroundColor: Colors[colorScheme].primary500,
      marginLeft: 8,
      fontWeight: "bold",
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 4,
    },
    stock: {
      fontSize: 14,
      color: Colors[colorScheme].stockColor,
      marginBottom: 12,
      fontWeight: "500",
    },
    shortDescription: {
      fontSize: 16,
      marginBottom: 16,
      lineHeight: 22,
    },
    // Variations
    variationContainer: {
      marginBottom: 16,
    },
    variationRow: {
      flexDirection: "column",
      marginBottom: 8,
    },
    variationLabel: {
      fontSize: 14,
      fontWeight: "700",
      marginRight: 8,
    },
    variationValue: {
      fontSize: 12,
      color: Colors[colorScheme].textMuted,
    },
    // Size
    sizeContainer: {
      marginBottom: 16,
    },
    sizeLabel: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    sizeOptions: {
      flexDirection: "row",
    },
    sizeOption: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      borderRadius: 8,
      marginRight: 8,
    },
    activeSize: {
      borderColor: Colors[colorScheme].primary700,
      backgroundColor: Colors[colorScheme].primary700,
    },
    sizeText: {
      fontSize: 16,
    },
    // Quantity
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      width: "100%",
      justifyContent: "space-between",
    },
    quantityLabel: {
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 16,
    },
    quantityToggle: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      borderRadius: 8,
    },
    quantityButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    quantityButtonText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    quantity: {
      fontSize: 18,
      fontWeight: "bold",
      paddingHorizontal: 16,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: Colors[colorScheme].border,
    },
    buttonContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    addToCartButton: {
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "center",
      gap: 3,
    },
    buyNowButton: {
      backgroundColor: Colors[colorScheme].background,
      paddingVertical: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors[colorScheme].inputBorder,
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 3,
      marginVertical: 8,
    },
    customOrderButton: {
      backgroundColor: Colors[colorScheme].inputBorder,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: "center",
      flex: 1,
      marginVertical: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "700",
    },
    buttonText2: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors[colorScheme].tabIconDefault,
    },
    tabsContainer: {
      flexDirection: "row",
      marginTop: 24,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme].border,
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: Colors[colorScheme].primary700,
    },
    tabText: {
      fontSize: 16,
      fontWeight: "500",
    },
    tabContent: {
      paddingVertical: 10,
      paddingBottom: 40,
    },
    // Specifications
    specificationsContainer: {
      marginTop: 8,
    },
    specRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme].border,
    },
    specLabel: {
      fontSize: 15,
      color: Colors[colorScheme].textMuted,
      marginVertical: 4,
    },
    specValue: {
      fontSize: 15,
      fontWeight: "500",
    },
    // Reviews
    reviewContainer: {
      alignItems: "center",
      paddingVertical: 24,
    },
    noReviewsText: {
      fontSize: 16,
      color: Colors[colorScheme].textMuted,
      marginBottom: 16,
    },
    writeReviewButton: {
      borderColor: Colors[colorScheme].primary700,
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      backgroundColor: Colors[colorScheme].primary700,
    },
    writeReviewButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors["dark"].text,
    },
  });
