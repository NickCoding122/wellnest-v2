import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
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
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center px-6 py-8">
          <View className="w-full max-w-sm space-y-8">
            {/* Logo and Header */}
            <View className="items-center space-y-4">
              <View className="w-20 h-20 bg-green-100 rounded-2xl items-center justify-center shadow-sm">
                <View className="w-12 h-12 bg-green-500 rounded-xl" />
              </View>
              <View className="space-y-2">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Join Wellnest
                </Text>
                <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
                  Create your account to get started
                </Text>
              </View>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <AppInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <View>
                <AppInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password-new"
                  textContentType="newPassword"
                />
                <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 6 characters
                </Text>
              </View>
            </View>

            {/* Sign Up Button */}
            <AppButton
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
              className="w-full"
              bgColor="bg-green-500"
            >
              Create Account
            </AppButton>

            {/* Login Link */}
            <View className="items-center pt-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
                className="py-2"
              >
                <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
                  Already have an account?{' '}
                  <Text className="text-green-600 dark:text-green-400 font-medium">
                    Sign in
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
