import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ToggleButton from "@/components/ToggleBtn";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    useColorScheme,
    View
} from "react-native";
import { NotificationStyles } from "./style";

export default function NotificationSettingsScreen() {
  const [general, setGeneral] = React.useState(false);
  const [sound, setSound] = React.useState(false);
  const [vibrate, setVibrate] = React.useState(false);
  const [appUpdate, setAppUpdate] = React.useState(false);
  const [billReminder, setBillReminder] = React.useState(false);
  const [promotions, setPromotions] = React.useState(false);
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = NotificationStyles(colorScheme);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <ThemedText style={styles.header}>Notification Settings</ThemedText>

        {/* Coming Soon Banner */}
        <View style={styles.banner}>
          <Ionicons name="alert-circle-outline" size={24} color="#F59E0B" />
          <View style={styles.bannerTextWrapper}>
            <ThemedText style={styles.bannerTitle}>Coming Soon</ThemedText>
            <ThemedText style={styles.bannerDesc}>
              Notification settings are not available yet. We’re working on
              implementing this feature and it will be available soon. Check
              back later for updates!
            </ThemedText>
          </View>
        </View>

        {/* Section: Common */}
        <ThemedText style={styles.sectionTitle}>Common</ThemedText>
        <SettingRow label="General Notification" value={general} />
        <SettingRow label="Sounds" value={sound} />
        <SettingRow label="Vibrate" value={vibrate} />

        {/* Section: System & Services */}
        <ThemedText style={styles.sectionTitle}>System & Services Update</ThemedText>
        <SettingRow label="App update" value={appUpdate} />
        <SettingRow label="Bill reminder" value={billReminder} />
        <SettingRow label="Promotions" value={promotions} />
        <SettingRow label="Discount available" value={promotions} />
        <SettingRow label="Payment request" value={promotions} />

        {/* Section: Services */}
        <ThemedText style={styles.sectionTitle}>Services</ThemedText>
        <SettingRow label="New services available" value={promotions} />
        <SettingRow label="New tips available" value={promotions} />
        <SettingRow label="Vibrate" value={promotions} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ label, value }: { label: string; value: boolean }) {
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = NotificationStyles(colorScheme);
  return (
    <ThemedView style={styles.row}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      {/* Disable toggle by passing isEnabled and no onToggle */}
      <ToggleButton isEnabled={value} onToggle={() => {}} disabled />
    </ThemedView>
  );
}
