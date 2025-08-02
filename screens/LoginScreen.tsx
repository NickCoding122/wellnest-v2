import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
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
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerClassName="flex-grow justify-center items-center px-6 py-12"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md items-center">
          <Image
            source={require('../assets/images/icon.png')}
            className="w-24 h-24 mb-6"
          />
          <Text className="text-3xl font-bold text-center">
            Welcome to Wellnest
          </Text>
          <Text className="mt-2 mb-8 text-xl font-semibold text-center">
            Welcome Back
          </Text>

          <View className="w-full space-y-4">
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="w-full"
            />
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              className="w-full"
            />
          </View>

          <AppButton
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            className="w-full mt-6"
          >
            Log In
          </AppButton>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            disabled={loading}
            className="mt-6"
          >
            <Text className="text-center text-base text-blue-600">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

