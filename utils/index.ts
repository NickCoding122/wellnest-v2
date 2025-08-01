import { Alert, Platform, ToastAndroid } from 'react-native';
import { Timestamp } from 'firebase/firestore';

export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('', message);
  }
};

export const formatDateTime = (timestamp: Timestamp) =>
  timestamp.toDate().toLocaleString();
