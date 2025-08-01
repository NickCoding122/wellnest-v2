import React from 'react';
import { TextInput } from 'react-native-paper';

export type AppInputProps = React.ComponentProps<typeof TextInput>;

export default function AppInput(props: AppInputProps) {
  return <TextInput mode="outlined" {...props} />;
}
