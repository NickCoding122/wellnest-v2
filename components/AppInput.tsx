import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

export type AppInputProps = TextInputProps;

export function AppInput(props: AppInputProps) {
  return <TextInput mode="outlined" {...props} />;
}

export default AppInput;
