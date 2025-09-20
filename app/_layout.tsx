import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-login" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-verification" options={{ headerShown: false }} />
          <Stack.Screen name="login-success" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-signup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-plan-selection" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-identity-verification" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-store-setup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-wallet-setup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor-account-created" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
