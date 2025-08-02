import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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
    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      showToast('Please accept the terms and conditions');
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

          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-semibold text-gray-900 mb-2">
              Create your account
            </Text>
            <Text className="text-base text-gray-600">
              Join our wellness community
            </Text>
          </View>

          {/* User Type Selector */}
          <View className="bg-gray-100 rounded-xl p-1 mb-8">
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg ${
                  !isServiceProvider ? 'bg-emerald-500' : 'bg-transparent'
                }`}
                onPress={() => setIsServiceProvider(false)}
              >
                <Text className={`text-center font-medium ${
                  !isServiceProvider ? 'text-white' : 'text-gray-600'
                }`}>
                  Join as a User
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 px-4 rounded-lg ${
                  isServiceProvider ? 'bg-emerald-500' : 'bg-transparent'
                }`}
                onPress={() => setIsServiceProvider(true)}
              >
                <Text className={`text-center font-medium ${
                  isServiceProvider ? 'text-white' : 'text-gray-600'
                }`}>
                  Offer Services
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cover Photo Section (for service providers) */}
          {isServiceProvider && (
            <View className="bg-gray-50 rounded-2xl p-6 mb-6 flex-row justify-between items-center">
              <View className="flex-1 items-center">
                <View className="w-12 h-12 bg-gray-200 rounded-lg justify-center items-center mb-2">
                  <Text className="text-xl">📷</Text>
                </View>
                <Text className="text-base text-gray-500 font-medium">
                  Cover Photo
                </Text>
              </View>
              <TouchableOpacity className="bg-white px-5 py-2 rounded-full border border-gray-200">
                <Text className="text-sm text-gray-700 font-medium">Add</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Form Fields */}
          <View className="space-y-5">
            {!isServiceProvider ? (
              <View>
                <Text className="text-base font-medium text-gray-900 mb-2">
                  Full Name
                </Text>
                <AppInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your name"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
                />
              </View>
            ) : (
              <>
                <View>
                  <Text className="text-base font-medium text-gray-900 mb-2">
                    Business Name
                  </Text>
                  <AppInput
                    value={businessName}
                    onChangeText={setBusinessName}
                    placeholder="Enter your business name"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
                  />
                </View>
                
                <View>
                  <Text className="text-base font-medium text-gray-900 mb-2">
                    About Business
                  </Text>
                  <AppInput
                    value={businessDescription}
                    onChangeText={setBusinessDescription}
                    placeholder="Write about your business"
                    multiline
                    numberOfLines={4}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900 h-24"
                    style={{ textAlignVertical: 'top' }}
                  />
                </View>
              </>
            )}

            <View>
              <Text className="text-base font-medium text-gray-900 mb-2">
                {isServiceProvider ? 'Business Email' : 'Email'}
              </Text>
              <AppInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
              />
            </View>

            <View>
              <Text className="text-base font-medium text-gray-900 mb-2">
                Phone Number
              </Text>
              <View className="flex-row space-x-3">
                <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-4">
                  <Text className="text-base mr-2">🇦🇺</Text>
                  <Text className="text-base text-gray-900 font-medium mr-2">+61</Text>
                  <Text className="text-xs text-gray-500">▼</Text>
                </View>
                <AppInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="000 000 0000"
                  keyboardType="phone-pad"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
                />
              </View>
            </View>

            <View>
              <Text className="text-base font-medium text-gray-900 mb-2">
                Password
              </Text>
              <AppInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                textContentType="newPassword"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
              />
            </View>

            <View>
              <Text className="text-base font-medium text-gray-900 mb-2">
                Confirm Password
              </Text>
              <AppInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter confirm password"
                secureTextEntry
                autoCapitalize="none"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-900"
              />
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="flex-row items-start mt-6 mb-8">
            <TouchableOpacity 
              className="mt-0.5 mr-3"
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View className={`w-5 h-5 rounded border-2 ${
                agreeToTerms 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'bg-white border-gray-300'
              }`} />
            </TouchableOpacity>
            <Text className="flex-1 text-sm text-gray-600 leading-5">
              I agree to the{' '}
              <Text className="text-emerald-600 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-emerald-600 font-medium">Privacy Policy</Text>.
            </Text>
          </View>

          {/* Sign Up Button */}
          <AppButton
            onPress={handleSignUp}
            loading={loading}
            disabled={loading || !agreeToTerms}
            className={`rounded-xl py-4 items-center mb-6 ${
              loading || !agreeToTerms 
                ? 'bg-gray-300' 
                : 'bg-emerald-500'
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </AppButton>

          {/* Login Link */}
          <View className="items-center mb-8">
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text className="text-base text-gray-600 text-center">
                Already have an account?{' '}
                <Text className="text-emerald-600 font-semibold">Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
