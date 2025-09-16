import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const sliderStyles = StyleSheet.create({
  sliderContainer: {
    width: "100%",
    height: 350,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  slidesContainer: {
    flexDirection: "row",
    width: width * 3,
    height: "100%",

  },
  slideCompContainer: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: "90%",
    height: "60%",
    borderRadius: 20,
    overflow: "hidden",
  },
  navButtonLeft: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 1,
    left: 20,
    top: "50%",
    zIndex: 2,
  },
  navButtonRight: {
    position: "absolute",
    right: 20,
    top: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 1,
    zIndex: 2,
  },
  iconStyle: {
    color: "#ccc",
    borderRadius: 20,
    padding: 4,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDotActive: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
  paginationDotInactive: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000",
    marginHorizontal: 4,
  },
  mobileButtonSection: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
