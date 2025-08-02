import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-8"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-full bg-blue-500 mb-4" />
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to Wellnest
          </Text>
        </View>
        <View className="space-y-4">
          <AppInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
        <AppButton
          onPress={handleSignUp}
          loading={loading}
          disabled={loading}
          className="mt-6"
        >
          Create Account
        </AppButton>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="mt-4"
          disabled={loading}
        >
          <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

