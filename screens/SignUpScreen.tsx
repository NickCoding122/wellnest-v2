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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create your account</Text>
            </View>

            {/* User Type Selector */}
            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  !isServiceProvider && styles.userTypeButtonActive
                ]}
                onPress={() => setIsServiceProvider(false)}
              >
                <Text style={[
                  styles.userTypeText,
                  !isServiceProvider && styles.userTypeTextActive
                ]}>
                  Join as a User
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  isServiceProvider && styles.userTypeButtonActive
                ]}
                onPress={() => setIsServiceProvider(true)}
              >
                <Text style={[
                  styles.userTypeText,
                  isServiceProvider && styles.userTypeTextActive
                ]}>
                  Offer Services
                </Text>
              </TouchableOpacity>
            </View>

            {/* Cover Photo Section (for service providers) */}
            {isServiceProvider && (
              <View style={styles.coverPhotoContainer}>
                <View style={styles.coverPhotoPlaceholder}>
                  <View style={styles.photoIcon}>
                    <Text style={styles.photoIconText}>📷</Text>
                  </View>
                  <Text style={styles.coverPhotoLabel}>Cover Photo</Text>
                </View>
                <TouchableOpacity style={styles.addPhotoButton}>
                  <Text style={styles.addPhotoText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Form Fields */}
            <View style={styles.form}>
              {!isServiceProvider ? (
                <View>
                  <Text style={styles.label}>Full Name</Text>
                  <AppInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your name"
                    style={styles.input}
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.label}>Business Name</Text>
                  <AppInput
                    value={businessName}
                    onChangeText={setBusinessName}
                    placeholder="Enter your business name"
                    style={styles.input}
                  />
                  
                  <Text style={styles.label}>About Business</Text>
                  <AppInput
                    value={businessDescription}
                    onChangeText={setBusinessDescription}
                    placeholder="Write about your business"
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                  />
                  
                  <Text style={styles.label}>Business Email</Text>
                </View>
              )}

              <AppInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                style={styles.input}
              />

              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.flag}>🇦🇺</Text>
                  <Text style={styles.countryCodeText}>+61</Text>
                  <Text style={styles.dropdown}>▼</Text>
                </View>
                <AppInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="000 000 0000"
                  keyboardType="phone-pad"
                  style={[styles.input, styles.phoneInput]}
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <AppInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
                textContentType="newPassword"
                style={styles.input}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <AppInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter confirm password"
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View style={[styles.checkbox, agreeToTerms && styles.checkboxActive]} />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Sign Up Button */}
            <AppButton
              onPress={handleSignUp}
              loading={loading}
              disabled={loading || !agreeToTerms}
              style={styles.signUpButton}
            >
              Sign Up
            </AppButton>

            {/* Login Link */}
            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              >
                <Text style={styles.linkText}>
                  Already have an account? <Text style={styles.linkHighlight}>Log In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
    fontWeight: '300',
  },
  formContainer: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  userTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#10B981',
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  userTypeTextActive: {
    color: '#FFFFFF',
  },
  coverPhotoContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverPhotoPlaceholder: {
    alignItems: 'center',
    flex: 1,
  },
  photoIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoIconText: {
    fontSize: 20,
  },
  coverPhotoLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  addPhotoButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addPhotoText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
  },
  flag: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  dropdown: {
    fontSize: 12,
    color: '#6B7280',
  },
  phoneInput: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
    gap: 12,
  },
  checkboxContainer: {
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  termsLink: {
    color: '#10B981',
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  linkContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  linkText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#10B981',
    fontWeight: '600',
  },
});
