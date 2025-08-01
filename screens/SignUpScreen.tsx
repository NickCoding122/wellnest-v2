import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { auth } from '../lib/firebase';
import { validateEmail, showToast } from '@/utils';
import { AuthStackParamList } from '../navigation/AuthStack';

export default function SignUpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      showToast('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      showToast(e.message || 'Sign up failed');
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
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        className="mt-2"
      >
        Create Account
      </AppButton>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className="mt-4"
        disabled={loading}
      >
        <Text className="text-center text-blue-600">
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

