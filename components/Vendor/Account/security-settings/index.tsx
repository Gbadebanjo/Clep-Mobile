import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { SecuritySettingStyles } from "./style";

const SecuritySettingsScreen = () => {
  // States to control visibility of each password input
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = SecuritySettingStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.pageTitle}>Security Settings</ThemedText>

      <ThemedView style={styles.cardRow}>
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardHeader}>
            <Ionicons name="lock-closed-outline" size={20} color="#b30059" />
            <ThemedText style={styles.cardTitle}>
              Change Your Password (Coming Soon)
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.cardSubtitle}>
            Ensure your account is using a strong, secure password to protect
            your information.
          </ThemedText>

          {/* Current Password */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Current Password</ThemedText>
            <ThemedView style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your current password"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrent}
                editable={false}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowCurrent(!showCurrent)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showCurrent ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* New Password */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>New Password</ThemedText>
            <ThemedView style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your new password"
                placeholderTextColor="#999"
                secureTextEntry={!showNew}
                editable={false}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowNew(!showNew)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showNew ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* Confirm Password */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
            <ThemedView style={styles.inputWrapper}>
              <TextInput
                placeholder="Confirm your new password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirm}
                editable={false}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirm ? "eye" : "eye-off"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          <TouchableOpacity style={styles.disabledButton} disabled>
            <ThemedText style={styles.disabledButtonText}>
              Change Password
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Right Card - Two Factor Authentication */}
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardHeader}>
          <Ionicons name="shield-outline" size={20} color="#b30059" />
          <ThemedText style={styles.cardTitle}>
            Two-Factor Authentication
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.noticeBox}>
          <Ionicons name="time-outline" size={18} color="#b30059" />
          <ThemedText style={styles.noticeText}>Coming Soon</ThemedText>
        </ThemedView>

        <ThemedText style={styles.cardSubtitle}>
          Two-factor authentication adds an extra layer of security to your
          account by requiring more than just a password to sign in. When
          enabled, you'll need to provide a code from your phone as well as your
          password to log in.
        </ThemedText>

        <TouchableOpacity style={styles.disabled2FAButton} disabled>
          <ThemedText style={styles.disabled2FAButtonText}>
            Enable 2FA
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default SecuritySettingsScreen;
