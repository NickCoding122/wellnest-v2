import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

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
    <View className="flex-1 items-center justify-center px-4">
      <Avatar.Icon size={64} icon="account" className="mb-4" />
      <Text className="text-xl mb-6">Welcome, {user?.email}</Text>
      <AppButton onPress={handleLogout} loading={loading} disabled={loading}>
        Log Out
      </AppButton>
    </View>
  );
}

