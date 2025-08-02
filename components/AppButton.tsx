import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  children,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  buttonStyle,
  textStyle,
  disabled,
  ...props
}: AppButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.small);
        break;
      case 'large':
        baseStyle.push(styles.large);
        break;
      default:
        baseStyle.push(styles.medium);
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'danger':
        baseStyle.push(styles.danger);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
      default:
        baseStyle.push(styles.primary);
    }
    
    // Full width
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    // Disabled state
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    // Size text styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }
    
    // Variant text styles
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      case 'danger':
        baseStyle.push(styles.dangerText);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }
    
    return baseStyle;
  };

  const getLoadingColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return '#004225';
      case 'secondary':
        return '#6B7280';
      default:
        return '#FAFAFA';
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), buttonStyle]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={getLoadingColor()} 
        />
      ) : (
        <>
          {icon}
          <Text style={[...getTextStyle(), textStyle]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    gap: 8,
  },
  
  // Size styles
  small: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: 60,
  },
  
  // Variant styles
  primary: {
    backgroundColor: '#004225',
    borderWidth: 2,
    borderColor: '#004225',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  secondary: {
    backgroundColor: '#F4F1EB',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#004225',
  },
  danger: {
    backgroundColor: '#DC2626',
    borderWidth: 2,
    borderColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  // Width styles
  fullWidth: {
    width: '100%',
  },
  
  // State styles
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Text base
  text: {
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Canela',
  },
  
  // Text size styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text variant styles
  primaryText: {
    color: '#FAFAFA',
  },
  secondaryText: {
    color: '#004225',
  },
  outlineText: {
    color: '#004225',
  },
  dangerText: {
    color: '#FAFAFA',
  },
  ghostText: {
    color: '#004225',
  },
});
