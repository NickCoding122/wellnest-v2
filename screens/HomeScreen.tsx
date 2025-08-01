import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../lib/firebase';

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out failed', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
}

