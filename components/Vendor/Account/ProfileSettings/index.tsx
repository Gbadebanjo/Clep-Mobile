"use client";

import { ThemedLoader } from "@/components/ThemedLoader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api } from "@/services/api";
import { useAuthStore } from "@/store";
import { UpdateProfilePayload, VendorProfile } from "@/types/vendor";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { UserCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as Yup from "yup";
import { ProfileSettingStyles } from "./style";

interface ProfileSettingsScreenProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export default function ProfileSettingsScreen({
  onSuccess,
  onError,
}: ProfileSettingsScreenProps) {
  const nigeriaStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = ProfileSettingStyles(colorScheme);
  const { user } = useAuthStore();
  const vendorId = user?.vendorProfile?.id;
  // Fetch vendor profile
  const fetchVendorProfile = useQuery<VendorProfile>({
    queryKey: ["vendorProfileSettings"],
    queryFn: async () => {
      if (!vendorId) throw new Error("Vendor ID not found");
      const response = await fetch(`${api.getBaseURL()}/vendors/${vendorId}`);
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch vendor profile");
      return data.data as VendorProfile;
    },

    enabled: !!vendorId,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    businessDetails: Yup.object({
      businessName: Yup.string().required("Business name is required"),
      businessPhone: Yup.string().required("Business phone is required"),
      businessAddress: Yup.string().required("Business address is required"),
      businessCity: Yup.string().required("City is required"),
      businessState: Yup.string().required("State is required"),
      businessPostalCode: Yup.string().required("Postal code is required"),
    }),
  });

  const { values, errors, setFieldValue, setValues, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      businessDetails: {
        businessName: "",
        businessPhone: "",
        businessAddress: "",
        businessPostalCode: "",
        businessCity: "",
        businessState: "",
      },
    },
    validationSchema,
    onSubmit: (formValues) => {
      updateProfileMutation.mutate(formValues);
    },
  });

  // Load profile data into form
  useEffect(() => {
    if (fetchVendorProfile.isSuccess && fetchVendorProfile.data) {
      const vendorData = fetchVendorProfile.data;
      const userData = vendorData.user || vendorData;
      setValues({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: userData.phoneNumber || "",
        businessDetails: vendorData.businessDetails || {
          businessName: "",
          businessPhone: "",
          businessAddress: "",
          businessPostalCode: "",
          businessCity: "",
          businessState: "",
        },
      });

      if (userData.profilePicture) {
        setPreviewUrl(userData.profilePicture);
      }
    }
  }, [fetchVendorProfile.data, fetchVendorProfile.isSuccess]);

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      if (!vendorId) throw new Error("Vendor ID not found");
  
      const url = `${api.getBaseURL()}/vendors/${vendorId}`;
   
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await response.text();
        if (!response.ok) {
          throw new Error(
            `Failed to update profile: ${response.status} ${response.statusText}\nResponse: ${text}`
          );
        }
  
        try {
          return JSON.parse(text);
        } catch (parseErr) {
          console.warn("[v0] Failed to parse JSON:", parseErr);
          throw new Error("Invalid JSON response from server");
        }
      } catch (err) {
        console.error("[v0] Update profile error:", err);
        throw err;
      }
    },
  
    onSuccess: (data) => {
      const successMsg = data.message;
      onSuccess?.(successMsg);
      fetchVendorProfile.refetch();
    },
  
    onError: (error: any) => {
      const errorMsg = error.message || "Failed to update profile";
      onError?.(errorMsg);
    },
  });
  

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setPreviewUrl(asset.uri);
        uploadProfilePicture(asset);
      }
    } catch (error) {
      onError?.("Failed to pick image");
    }
  };

  const uploadProfilePicture = async (asset: any) => {
    try {
      uploadPictureMutation.mutate(asset);
    } catch (error) {
      onError?.("Failed to upload picture");
    }
  };

  const uploadPictureMutation = useMutation({
    mutationFn: async (asset: any) => {
      if (!vendorId) throw new Error("Vendor ID not found");
  
      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri,
        name: asset.fileName || "profile.jpg",
        type: asset.mimeType || "image/jpeg",
      } as any);
  
      const uploadUrl = `https://sandbox.vazzel.com/api/upload-media`;
      const updateProfileUrl = `${api.getBaseURL()}/vendors/${vendorId}`;
  
      try {
        console.log("Uploading file to:", uploadUrl);
        console.log("File data:", asset);
  
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          const text = await uploadResponse.text();
          console.error("[v0] Upload failed:", uploadResponse.status, text);
          throw new Error(`Upload failed with status ${uploadResponse.status}`);
        }
  
        const uploadData = await uploadResponse.json();
        console.log("Upload success:", uploadData);
  
        const mediaUrl = uploadData?.data?.doc?.url;
        const mediaId = uploadData?.data?.doc?.id;
  
        if (!mediaId) throw new Error("No media ID returned from upload");
  
        const profileUpdateResponse = await fetch(updateProfileUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture: mediaId }),
        });
  
        if (!profileUpdateResponse.ok) {
          throw new Error("Profile update failed");
        }
  
        return { url: mediaUrl };
      } catch (err) {
        console.error("[v0] Upload error:", err);
        throw err;
      }
    },
    onSuccess: () => {
      onSuccess?.("Profile picture updated successfully");
    },
    onError: (error: any) => {
      onError?.(error.message || "Failed to upload profile picture");
    },
  });
  

  

  if (fetchVendorProfile.isLoading) {
    return <ThemedLoader />;
  }
  const getFieldError = (fieldName: string) => {
    const keys = fieldName.split(".");
    let error: any = errors;
    for (const key of keys) {
      error = error?.[key];
    }
    return error;
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Profile Picture Section */}
        <ThemedView style={styles.profileSection}>
          {previewUrl ? (
            <Image source={{ uri: previewUrl }} style={styles.profileImage} />
          ) : (
            <ThemedView style={styles.profileImagePlaceholder}>
              <MaterialCommunityIcons
                name="account-circle"
                size={60}
                color="#999"
              />
            </ThemedView>
          )}
          <Pressable
            style={styles.uploadButton}
            onPress={pickImage}
            disabled={uploadPictureMutation.isPending}
          >
            {uploadPictureMutation.isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Feather name="upload-cloud" size={16} color="#fff" />
            )}
            <ThemedText style={styles.uploadButtonText}>
              {uploadPictureMutation.isPending
                ? "Uploading..."
                : "Change Picture"}
            </ThemedText>
          </Pressable>
          <ThemedText style={styles.uploadHint}>
            PNG, JPG, GIF up to 1MB
          </ThemedText>
        </ThemedView>

        {/* Personal Information */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <UserCircle size={32} color="#9f0e42" />
            <ThemedText style={styles.sectionTitle}>
              Personal Information
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              value={values.name}
              onChangeText={(text) => setFieldValue("name", text)}
              editable={!updateProfileMutation.isPending}
            />
            {getFieldError("name") && (
              <ThemedText style={styles.errorText}>
                {getFieldError("name")}
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView style={{backgroundColor:"#fce6f3", padding:5, borderRadius:6, marginBottom:10}}>
          <ThemedText style={{fontSize:10, color:"#a61f4f"}}>• Your first name and surname as it appears on your NIN</ThemedText>
          <ThemedText style={{fontSize:10, color:"#a61f4f"}}>• Your middle name is not required</ThemedText>

          </ThemedView>
       
          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Email Address </ThemedText>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="your.email@example.com"
              value={values.email}
              editable={false}
            />
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.button,
              updateProfileMutation.isPending && styles.buttonDisabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending && (
              <ActivityIndicator size="small" color="#fff" />
            )}
            <ThemedText style={styles.buttonText}>
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Business Information */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <Feather name="briefcase" size={20} color="#9f0e42" />
            <ThemedText style={styles.sectionTitle}>
              Business Information
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Business Name </ThemedText>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Your business name"
              value={values.businessDetails.businessName}
              editable={false}
            />
          </ThemedView>

          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Business Email </ThemedText>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="your.email@example.com"
              value={values.email}
              editable={false}
            />
          </ThemedView>
       
          <ThemedView style={styles.formGroup}>
            <ThemedText style={styles.label}>Business Address </ThemedText>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Business address"
              value={values.businessDetails.businessAddress}
              onChangeText={(text) =>
                setFieldValue("businessDetails.businessAddress", text)
              }
              multiline
              numberOfLines={3}
            />
            {getFieldError("businessDetails.businessAddress") && (
              <ThemedText style={styles.errorText}>
                {getFieldError("businessDetails.businessAddress")}
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedView style={[styles.formGroup, styles.flex1]}>
              <ThemedText style={styles.label}>Postal Code </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="E.g 100001"
                value={values.businessDetails.businessPostalCode}
                onChangeText={(text) =>
                  setFieldValue("businessDetails.businessPostalCode", text)
                }
                keyboardType="number-pad"
              />
              {getFieldError("businessDetails.businessPostalCode") && (
                <ThemedText style={styles.errorText}>
                  {getFieldError("businessDetails.businessPostalCode")}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={[styles.formGroup, styles.flex1]}>
              <ThemedText style={styles.label}>Phone </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Business phone"
                value={values.businessDetails.businessPhone}
                onChangeText={(text) =>
                  setFieldValue("businessDetails.businessPhone", text)
                }
                keyboardType="phone-pad"
              />
              {getFieldError("businessDetails.businessPhone") && (
                <ThemedText style={styles.errorText}>
                  {getFieldError("businessDetails.businessPhone")}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.row}>
            <ThemedView style={[styles.formGroup, styles.flex1]}>
              <ThemedText style={styles.label}>City </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Business city"
                value={values.businessDetails.businessCity}
                onChangeText={(text) =>
                  setFieldValue("businessDetails.businessCity", text)
                }
              />
              {getFieldError("businessDetails.businessCity") && (
                <ThemedText style={styles.errorText}>
                  {getFieldError("businessDetails.businessCity")}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={[styles.formGroup, styles.flex1]}>
              <ThemedText style={styles.label}>State </ThemedText>

              <ThemedView style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={values.businessDetails.businessState}
                  onValueChange={(itemValue) =>
                    setFieldValue("businessDetails.businessState", itemValue)
                  }
                  itemStyle={{ textAlign: "center" }} // centers text on iOS
                >
                  <Picker.Item label="Select state" value="" />
                  {nigeriaStates.map((state) => (
                    <Picker.Item key={state} label={state} value={state} />
                  ))}
                </Picker>
              </ThemedView>

              {getFieldError("businessDetails.businessState") && (
                <ThemedText style={styles.errorText}>
                  {getFieldError("businessDetails.businessState")}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.button,
              updateProfileMutation.isPending && styles.buttonDisabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending && (
              <ActivityIndicator size="small" color="#fff" />
            )}
            <ThemedText style={styles.buttonText}>
              {updateProfileMutation.isPending
                ? "Saving..."
                : "Save Profile Changes"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}
