import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export interface AppInputProps extends TextInputProps {
  label?: string;
  className?: string;
}

export default function AppInput({ label, className, ...props }: AppInputProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      )}
      <TextInput
        className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base shadow-sm focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        placeholderTextColor="#6b7280"
        {...props}
      />
    </View>
  );
}
