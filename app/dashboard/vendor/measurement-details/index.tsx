"use client";

import { MeasurementAPI } from "@/apis/measurement-api";
import Header from "@/components/Header";
import { ThemedLoader } from "@/components/ThemedLoader";
import { useAuthStore } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function MeasurementDetailsScreen() {
  const { measurementId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const authAPI = new MeasurementAPI(user?.token);

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const response = await authAPI.vendorSharedMeasurement(
        measurementId as string
      );
      setDetails(response?.data);
    } catch (error) {
      console.error("❌ Failed to load measurement details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [measurementId]);

  if (loading) return <ThemedLoader />;

  if (!details)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text>No measurement found</Text>
      </View>
    );

  const customer = details.user;
  const measurement = details.measurements?.value || {};
  const type =
    details.measurements?.relationTo === "measurements" ? "AI" : "Manual";

  const renderField = (label: string, value: any) => (
    <View
      style={{
        backgroundColor: "#fafafa",
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: "#6b7280",
          marginBottom: 4,
          fontWeight: "500",
        }}
      >
        {label}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "600", color: "#111827" }}>
        {value ?? "-"}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: "7%", backgroundColor: "#f9fafb" }}>
      <Header title="Measurement Details" />

      <ScrollView
        style={{ paddingHorizontal: "5%", marginTop: "5%" }}
        showsVerticalScrollIndicator={false}
      >
        {/* CUSTOMER CARD */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 16,
            borderRadius: 16,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
            borderWidth:1,
            borderColor:"#f3f4f6"
          }}
        >
       {/* <Text style={{ fontSize: 12, fontWeight: "700", color: "#722F37" }}>
  Attributes: Body Measurements in Centimeters (cm)
</Text> */}

<Text>
  <Text style={{ fontSize: 16, fontWeight: "700", color: "#722F37" }}>
  Attributes:
  </Text>
  <Text style={{ fontSize: 14, fontWeight: "700", color: "#000" }}>
    {" "}Body Measurements in Centimeters (cm)
  </Text>
</Text>

<Text style={{ marginTop: 10 }}>
  <Text style={{ fontSize: 16, fontWeight: "700", color: "#722F37" }}>
    Customer's Name:
  </Text>
  <Text style={{ fontSize: 16, fontWeight: "700", color: "#000" }}>
    {" "}{customer?.name}
  </Text>
</Text>


       

          <Text
            style={{
              marginTop: 12,
              alignSelf: "flex-start",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              fontWeight: "600",
              backgroundColor: type === "AI" ? "#d1fae5" : "#dbeafe",
              color: type === "AI" ? "#065f46" : "#1e40af",
            }}
          >
            {type} Measurement
          </Text>
        </View>

        {/* AI MEASUREMENTS */}
        {type === "AI" && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 14,
                color: "#111827",
              }}
            >
              Body Measurements (cm)
            </Text>

            {renderField("Height", measurement.height)}
            {renderField("Waist", measurement.waist)}
            {renderField("Belly", measurement.belly)}
            {renderField("Chest", measurement.chest)}
            {renderField("Neck", measurement.neck)}
            {renderField("Wrist", measurement.wrist)}
            {renderField("Arm Length", measurement.arm_length)}
            {renderField("Thigh", measurement.thigh)}
            {renderField("Shoulder Width", measurement.shoulder_width)}
            {renderField("Hips", measurement.hips)}
            {renderField("Ankle", measurement.ankle)}
          </View>
        )}

        {/* MANUAL MEASUREMENTS */}
        {type === "Manual" && (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 14,
                color: "#111827",
              }}
            >
              Manual Measurement Entries
            </Text>

            {measurement?.entries?.map((entry: any, index: number) => (
              <View key={index}>{renderField(entry.name, entry.value)}</View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
