import { AuthAPI } from "@/apis/auth-api";
import { showError, showSuccess } from "@/services/api";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import ProfileImageComp from "../ProfileImageComp";
import { EditProfileStyles } from "./style";
interface ProfileUpdatePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
const EditProfileDetailsForm: React.FC = () => {
  const { user } = useAuthStore((store) => store);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = EditProfileStyles(colorScheme);
  const [formData, setFormData] = useState<ProfileUpdatePayload>({
    first_name: user?.name?.split(" ")[0] || "",
    last_name: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone_number: user.phoneNumber || "",
  });

  const auth = new AuthAPI();

  const updateProfile = useMutation({
    mutationFn: (values: { email: string; name: string; user_id: string }) =>
      auth.updateUser(values.user_id, {
        email: values.email,
        name: values.name,
      }),
    onSuccess: (response) => {
      //   set_user(response.data.doc);
      showSuccess("Account updated successfully!");
    },
    onError: () => {
      showError("Failed to update account.");
    },
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const fullName = `${formData.first_name} ${formData.last_name}`.trim();

    updateProfile.mutate({
      email: formData.email, // only for display, not updated
      name: fullName,
      user_id: user?.id!,
    });
  };

  return (
    <>
      <ProfileImageComp
        firstName=""
        lastName=""
        profileImageUrl="https://example.com/john.jpg"
      />
      <View style={styles.container}>
        {/* First Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g John"
            value={formData.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g Doe"
            value={formData.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+234567890123"
            value={formData.phone_number}
            onChangeText={(text) => handleChange("phone_number", text)}
          />
        </View>

        {/* Email (readonly) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="E.g oyedr@gmail.com"
            value={formData.email}
            editable={false}
          />
        </View>
        {/* Email (readonly) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Role</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="E.g oyedr@gmail.com"
            value={user?.role}
            editable={false}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.button,
            updateProfile.status === "pending" && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={updateProfile.status === "pending"}
        >
          {updateProfile.status === "pending" ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditProfileDetailsForm;
