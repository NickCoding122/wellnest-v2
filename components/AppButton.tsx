import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';

export type AppButtonProps = ButtonProps;

export function AppButton({ mode = 'contained', ...props }: AppButtonProps) {
  return <Button mode={mode} {...props} />;
}

export default AppButton;
