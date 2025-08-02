import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface StyledTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'white';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export function StyledText({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  style,
  ...props
}: StyledTextProps) {
  const getTextStyle = () => {
    const baseStyle = [styles.base];
    
    // Variant styles
    switch (variant) {
      case 'h1':
        baseStyle.push(styles.h1);
        break;
      case 'h2':
        baseStyle.push(styles.h2);
        break;
      case 'h3':
        baseStyle.push(styles.h3);
        break;
      case 'h4':
        baseStyle.push(styles.h4);
        break;
      case 'bodySmall':
        baseStyle.push(styles.bodySmall);
        break;
      case 'caption':
        baseStyle.push(styles.caption);
        break;
      case 'button':
        baseStyle.push(styles.button);
        break;
      default:
        baseStyle.push(styles.body);
    }
    
    // Color styles
    switch (color) {
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'tertiary':
        baseStyle.push(styles.tertiary);
        break;
      case 'success':
        baseStyle.push(styles.success);
        break;
      case 'danger':
        baseStyle.push(styles.danger);
        break;
      case 'white':
        baseStyle.push(styles.white);
        break;
      default:
        baseStyle.push(styles.primary);
    }
    
    // Weight styles
    switch (weight) {
      case 'light':
        baseStyle.push(styles.light);
        break;
      case 'medium':
        baseStyle.push(styles.medium);
        break;
      case 'semibold':
        baseStyle.push(styles.semibold);
        break;
      case 'bold':
        baseStyle.push(styles.bold);
        break;
      default:
        baseStyle.push(styles.normal);
    }
    
    // Alignment styles
    switch (align) {
      case 'center':
        baseStyle.push(styles.center);
        break;
      case 'right':
        baseStyle.push(styles.right);
        break;
      default:
        baseStyle.push(styles.left);
    }
    
    return baseStyle;
  };

  return <Text style={[...getTextStyle(), style]} {...props} />;
}

// Legacy component for backward compatibility
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

// Convenient shorthand components
export function Heading1(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="h1" {...props} />;
}

export function Heading2(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="h2" {...props} />;
}

export function Heading3(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="h3" {...props} />;
}

export function Heading4(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="h4" {...props} />;
}

export function BodyText(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="body" {...props} />;
}

export function Caption(props: Omit<StyledTextProps, 'variant'>) {
  return <StyledText variant="caption" {...props} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  
  // Variant styles
  h1: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Canela',
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Canela',
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Canela',
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Canela',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Canela',
    lineHeight: 20,
  },
  
  // Color styles
  primary: {
    color: '#004225',
  },
  secondary: {
    color: '#6B7280',
  },
  tertiary: {
    color: '#9CA3AF',
  },
  success: {
    color: '#059669',
  },
  danger: {
    color: '#DC2626',
  },
  white: {
    color: '#FAFAFA',
  },
  
  // Weight styles
  light: {
    fontWeight: '300',
  },
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  
  // Alignment styles
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});
