import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { PencilRuler } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuthStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary700,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          href: user?.role === "vendor" ? null : undefined, // Hide tab for vendor role
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cart" color={color} />,
        }}
      />
      {/* )} */}

      <Tabs.Screen
        name="measurement"
        options={{
          title: 'Measurement',
          tabBarIcon: ({ color }) => <PencilRuler size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
