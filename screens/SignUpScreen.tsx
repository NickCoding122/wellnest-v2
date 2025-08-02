import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
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

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Join our wellness community</Text>
          </View>

          {/* User Type Selector */}
          <View style={styles.userTypeContainer}>
            <View style={styles.userTypeSelector}>
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
          </View>

          {/* Cover Photo Section (for service providers) */}
          {isServiceProvider && (
            <View style={styles.coverPhotoContainer}>
              <View style={styles.coverPhotoContent}>
                <View style={styles.photoIcon}>
                  <View style={styles.photoIconPlaceholder} />
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
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your name"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                />
              </View>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Business Name</Text>
                  <TextInput
                    value={businessName}
                    onChangeText={setBusinessName}
                    placeholder="Enter your business name"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>About Business</Text>
                  <TextInput
                    value={businessDescription}
                    onChangeText={setBusinessDescription}
                    placeholder="Write about your business"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                    textAlignVertical="top"
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {isServiceProvider ? 'Business Email' : 'Email'}
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <View style={styles.countryCode}>
                  <View style={styles.flagPlaceholder} />
                  <Text style={styles.countryCodeText}>+61</Text>
                  <Text style={styles.dropdown}>▼</Text>
                </View>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="000 000 0000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  style={[styles.input, styles.phoneInput]}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  textContentType="newPassword"
                  style={styles.passwordInput}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <View style={[styles.eyeIcon, showPassword && styles.eyeIconOpen]} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Enter confirm password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  style={styles.passwordInput}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <View style={[styles.eyeIcon, showConfirmPassword && styles.eyeIconOpen]} />
                </TouchableOpacity>
              </View>
            </View>
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
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={loading || !agreeToTerms}
            style={[
              styles.signUpButton,
              (loading || !agreeToTerms) && styles.signUpButtonDisabled
            ]}
          >
            <Text style={styles.signUpButtonText}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text style={styles.linkHighlight}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 28,
    color: '#004225',
    fontWeight: '300',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Canela',
    fontWeight: '400',
    color: '#004225',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '400',
    textAlign: 'center',
  },
  userTypeContainer: {
    marginBottom: 32,
  },
  userTypeSelector: {
    backgroundColor: '#F4F1EB',
    borderRadius: 16,
    padding: 6,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#F4F1EB',
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: '#004225',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  userTypeTextActive: {
    color: '#FAFAFA',
    fontFamily: 'Canela',
  },
  coverPhotoContainer: {
    backgroundColor: '#F4F1EB',
    borderRadius: 20,
    padding: 28,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F4F1EB',
  },
  coverPhotoContent: {
    alignItems: 'center',
    flex: 1,
  },
  photoIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoIconPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: '#004225',
    borderRadius: 8,
  },
  coverPhotoLabel: {
    fontSize: 18,
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  addPhotoButton: {
    backgroundColor: '#004225',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#FAFAFA',
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 12,
    fontFamily: 'Canela',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    color: '#004225',
    fontWeight: '400',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 8,
  },
  flagPlaceholder: {
    width: 24,
    height: 16,
    backgroundColor: '#004225',
    borderRadius: 3,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '600',
  },
  dropdown: {
    fontSize: 12,
    color: '#6B7280',
  },
  phoneInput: {
    flex: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingRight: 60,
    fontSize: 16,
    color: '#004225',
    fontWeight: '400',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eyeButton: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 24,
    height: 14,
    backgroundColor: '#9CA3AF',
    borderRadius: 12,
  },
  eyeIconOpen: {
    backgroundColor: '#004225',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    gap: 16,
  },
  checkboxContainer: {
    marginTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#004225',
    borderColor: '#004225',
  },
  termsText: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
    fontWeight: '400',
  },
  termsLink: {
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  signUpButton: {
    backgroundColor: '#004225',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  signUpButtonText: {
    color: '#FAFAFA',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  linkContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  linkText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '400',
  },
  linkHighlight: {
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
  },
});
