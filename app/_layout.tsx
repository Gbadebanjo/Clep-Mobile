import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/hooks/useColorScheme';
import { setAuthToken } from '@/services/api';
import { useAuthStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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

  // Initialize auth token on app start
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/login" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/verification" options={{ headerShown: false }} />
          {/* <Stack.Screen name="vendor/login-success" options={{ headerShown: false }} /> */}
          <Stack.Screen name="vendor/signup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/plan-selection" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/identity-verification" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/store-setup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/wallet-setup" options={{ headerShown: false }} />
          <Stack.Screen name="vendor/account-created" options={{ headerShown: false }} />
          <Stack.Screen name='measurement/height' options={{ headerShown: false }} />
          <Stack.Screen name='measurement/uploadPhoto' options={{ headerShown: false }} />
          <Stack.Screen name='measurement/data' options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
