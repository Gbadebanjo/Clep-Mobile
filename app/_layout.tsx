import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { PaystackProvider } from 'react-native-paystack-webview';
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

  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaystackProvider publicKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY!}>
        <QueryClientProvider client={queryClient}>
        
            <View style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="login" />
                <Stack.Screen name="vendor/login" />
                <Stack.Screen name="vendor/verification" />
                <Stack.Screen name="vendor/signup" />
                <Stack.Screen name="vendor/plan-selection" />
                <Stack.Screen name="vendor/identity-verification" />
                <Stack.Screen name="vendor/store-setup" />
                <Stack.Screen name="vendor/wallet-setup" />
                <Stack.Screen name="vendor/account-created" />
                <Stack.Screen name="measurement/height" />
                <Stack.Screen name="measurement/uploadPhoto" />
                <Stack.Screen name="measurement/data" />
                <Stack.Screen name="measurement/share" />
                <Stack.Screen name="store-front/[id]" />
                <Stack.Screen name="+not-found" />
              </Stack>

              <StatusBar style="auto" />
              <Toast />
            </View>
       
        </QueryClientProvider>
      </PaystackProvider>
    </ThemeProvider>
  );
}
