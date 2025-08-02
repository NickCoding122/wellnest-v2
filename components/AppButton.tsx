import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';

export interface AppButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  loading?: boolean;
  bgColor?: string;
  textColor?: string;
}

export default function AppButton({
  children,
  loading = false,
  disabled,
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  style,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  
  // Convert bgColor prop to actual color value
  const getBackgroundColor = (bgColor: string) => {
    switch (bgColor) {
      case 'bg-blue-500': return '#3b82f6';
      case 'bg-green-500': return '#22c55e';
      case 'bg-red-500': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  const buttonStyle = [
    styles.button,
    { backgroundColor: getBackgroundColor(bgColor) },
    isDisabled && styles.disabled,
    style
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={buttonStyle}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
