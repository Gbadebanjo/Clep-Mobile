import SettingsComponent from '@/components/Settings';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

export default function UserScreen() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/customer/login');
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.replace('/customer/login');
    }
  }, []);


  return <SettingsComponent />;
}
