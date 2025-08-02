import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import AppButton from '../components/AppButton';
import { signOut } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.warn('Sign out failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-1 items-center justify-center p-6">
        <View className="w-20 h-20 rounded-full bg-gray-200 mb-6" />
        <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-8">
          Welcome, {user?.email}
        </Text>
      <AppButton
        onPress={handleLogout}
        loading={loading}
        disabled={loading}
        bgColor="bg-red-500"
      >
        Log Out
      </AppButton>
      </View>
      <View className="absolute bottom-0 inset-x-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" />
    </SafeAreaView>
  );
}

