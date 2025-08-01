import React from 'react';
import { Button } from 'react-native-paper';

export type AppButtonProps = React.ComponentProps<typeof Button>;

export default function AppButton({ mode = 'contained', ...props }: AppButtonProps) {
  return <Button mode={mode} {...props} />;
}
