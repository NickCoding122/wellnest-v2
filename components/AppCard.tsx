import React from 'react';
import { Card } from 'react-native-paper';

export type AppCardProps = React.ComponentProps<typeof Card>;

export default function AppCard({ style, children, ...props }: AppCardProps) {
  return (
    <Card style={[{ margin: 8 }, style]} {...props}>
      {children}
    </Card>
  );
}
