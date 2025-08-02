import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
  const [rememberMe, setRememberMe] = useState(false);

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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-4">
          {/* Back Button */}
          <TouchableOpacity 
            className="w-10 h-10 justify-center items-start mb-8"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-2xl text-gray-800 font-light">←</Text>
          </TouchableOpacity>

          <View className="flex-1 justify-center">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome back
              </Text>
              <Text className="text-base text-gray-600">
                Sign in to your account
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-6">
              <View>
                <Text className="text-base font-medium text-gray-900 mb-2">
                  Email
                </Text>
                <AppInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
                />
              </View>
              
              <View>
                <Text className="text-base font-medium text-gray-900 mb-2">
                  Password
                </Text>
                <AppInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
                />
              </View>

              {/* Remember Me & Forgot Password */}
              <View className="flex-row justify-between items-center">
                <TouchableOpacity 
                  className="flex-row items-center"
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View className={`w-5 h-5 rounded border-2 mr-2 ${
                    rememberMe 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'bg-white border-gray-300'
                  }`} />
                  <Text className="text-sm text-gray-600">Remember me</Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Text className="text-sm text-emerald-600 font-medium">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <AppButton
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                className="bg-emerald-500 rounded-xl py-4 items-center mt-6"
              >
                <Text className="text-white text-base font-semibold">
                  {loading ? 'Signing in...' : 'Log in'}
                </Text>
              </AppButton>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-sm text-gray-500">Or continue with</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Social Login Buttons */}
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 justify-center items-center">
                  <Text className="text-xl font-semibold text-blue-600">f</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 justify-center items-center">
                  <Text className="text-xl font-semibold text-red-500">G</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 justify-center items-center">
                  <Text className="text-xl">🍎</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="items-center mt-8 mb-6">
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                disabled={loading}
              >
                <Text className="text-base text-gray-600 text-center">
                  Don't have an account?{' '}
                  <Text className="text-emerald-600 font-semibold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
