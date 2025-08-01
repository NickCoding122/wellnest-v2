import React from 'react';
import { View, Text, Button } from 'react-native';
import { signInAnonymously } from 'firebase/auth';

import { auth } from '../lib/firebase';

export default function LoginScreen() {
  const handleLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.warn('Login failed', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

