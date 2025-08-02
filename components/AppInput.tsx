import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export interface AppInputProps extends TextInputProps {
  label?: string;
  className?: string;
  error?: string;
}

export default function AppInput({ 
  label, 
  className, 
  error,
  ...props 
}: AppInputProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <TextInput
        className={`bg-white dark:bg-gray-800 border ${
          error ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
        } rounded-xl px-4 py-3 text-base shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:text-white w-full`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
}
