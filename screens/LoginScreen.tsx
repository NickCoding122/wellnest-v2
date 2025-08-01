import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { auth } from '../lib/firebase';
import { validateEmail, showToast } from '@/utils';
import { AuthStackParamList } from '../navigation/AuthStack';

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      showToast('Please enter a valid email');
      return;
    }
    if (!password) {
      showToast('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      showToast(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-4">
      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="mb-4"
      />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        className="mb-4"
      />
      <AppButton
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        className="mt-2"
      >
        Log In
      </AppButton>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        className="mt-4"
        disabled={loading}
      >
        <Text className="text-center text-blue-600">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

