import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

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
  className,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`${bgColor} ${isDisabled ? 'opacity-50' : ''} rounded-xl px-6 py-3 shadow-md flex-row items-center justify-center ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={`${textColor} text-lg font-semibold`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
