import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { useAuthStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, useColorScheme, View } from 'react-native';
import { settingsStyles } from './style';

const SettingsItem = ({
  label,
  icon,
  onPress,
  isSwitch,
  switchValue,
  onSwitchChange,
}: {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = settingsStyles(colorScheme);
  const iconColor = colorScheme === 'light' ? '#333' : '#ccc';

  return (
    <ThemedTouchableOpacity onPress={onPress} style={styles.row} disabled={isSwitch}>
      <View style={styles.rowLabelContainer}>
        <Ionicons name={icon} size={22} color={iconColor} style={styles.icon} />
        <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      </View>
      {isSwitch ? (
        <Switch value={switchValue} onValueChange={onSwitchChange} />
      ) : (
        <Ionicons name="chevron-forward" size={22} color={iconColor} />
      )}
    </ThemedTouchableOpacity>
  );
};

export default function SettingsComponent() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = settingsStyles(colorScheme);
  const { setUser } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    // Clear user from store
    setUser(null);
    // Navigate to login screen
    router.replace('/customer/login' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.title}>Settings</ThemedText>

        <View style={styles.section}>
          <SettingsItem
            label="Edit Profile"
            icon="person-outline"
            onPress={() => router.push('/customer/edit-profile' as any)}
          />
          <SettingsItem
            label="Change Password"
            icon="lock-closed-outline"
            onPress={() => router.push('/customer/change-password' as any)}
          />
        </View>

        <View style={styles.section}>
          <SettingsItem
            label="Notifications"
            icon="notifications-outline"
            isSwitch
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />
          <SettingsItem label="Privacy Policy" icon="shield-checkmark-outline" onPress={() => {}} />
        </View>

        <ThemedTouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </ThemedTouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}
