import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function user() {
  return (
    <SafeAreaView>
      <ThemedTouchableOpacity
        style={{ padding: 10, marginHorizontal: 30, borderRadius: 40 }}
        onPress={() => router.push('/vendor-login')}
      >
        <ThemedText lightColor=" #fff" darkColor="#000">
          Let&apos;s Start
        </ThemedText>
      </ThemedTouchableOpacity>
    </SafeAreaView>
  );
}
