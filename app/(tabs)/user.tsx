import { ThemedView } from '@/components/ThemedView';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import CustomerDashboard from '../dashboard/customer';
import VendorDashboard from '../dashboard/vendor';

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

console.log('user in user screen', user);


  return (
    <>
    <ThemedView style={{flex:1}}>

      {user?.role === 'customer' && <CustomerDashboard />}
      {user?.role === 'vendor' && <VendorDashboard />}
    </ThemedView>

    
    </>

);
}
