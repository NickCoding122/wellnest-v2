import React from 'react';
import { Card } from 'react-native-paper';

export type AppCardProps = React.ComponentProps<typeof Card>;

export function AppCard({ children, ...props }: AppCardProps) {
  return <Card {...props}>{children}</Card>;
}

export default AppCard;
