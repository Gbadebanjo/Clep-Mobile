import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserScreen() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/customer/login');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      router.replace('/customer/login');
    }
  }, []);

  if (user) {
    return null;
  }

  return (
    <SafeAreaView>
      <ThemedTouchableOpacity
        style={{ padding: 10, marginHorizontal: 30, borderRadius: 40 }}
        onPress={() => router.push('/user')}
      >
        <ThemedText lightColor="#fff" darkColor="#000">
          Let&apos;s Start
        </ThemedText>
      </ThemedTouchableOpacity>
    </SafeAreaView>
  );
}
