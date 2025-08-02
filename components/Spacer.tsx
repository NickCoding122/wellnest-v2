import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  horizontal?: boolean;
  custom?: number;
}

export default function Spacer({ 
  size = 'md', 
  horizontal = false, 
  custom 
}: SpacerProps) {
  const getSpacing = () => {
    if (custom) return custom;
    
    switch (size) {
      case 'xs': return 4;
      case 'sm': return 8;
      case 'md': return 16;
      case 'lg': return 24;
      case 'xl': return 32;
      case 'xxl': return 48;
      default: return 16;
    }
  };

  const spacing = getSpacing();

  return (
    <View 
      style={{
        width: horizontal ? spacing : undefined,
        height: !horizontal ? spacing : undefined,
      }} 
    />
  );
}