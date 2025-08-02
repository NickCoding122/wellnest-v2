import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface AppCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
  touchable?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  activeOpacity?: number;
}

export default function AppCard({
  children,
  variant = 'default',
  padding = 'medium',
  style,
  touchable = false,
  onPress,
  activeOpacity = 0.7,
}: AppCardProps) {
  const getCardStyle = () => {
    const baseStyle = [styles.card];
    
    // Variant styles
    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevated);
        break;
      case 'outlined':
        baseStyle.push(styles.outlined);
        break;
      case 'flat':
        baseStyle.push(styles.flat);
        break;
      default:
        baseStyle.push(styles.default);
    }
    
    // Padding styles
    switch (padding) {
      case 'none':
        baseStyle.push(styles.paddingNone);
        break;
      case 'small':
        baseStyle.push(styles.paddingSmall);
        break;
      case 'large':
        baseStyle.push(styles.paddingLarge);
        break;
      default:
        baseStyle.push(styles.paddingMedium);
    }
    
    return baseStyle;
  };

  const cardContent = (
    <View style={[...getCardStyle(), style]}>
      {children}
    </View>
  );

  if (touchable || onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        style={style}
      >
        <View style={getCardStyle()}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  
  // Variant styles
  default: {
    borderWidth: 1,
    borderColor: '#F4F1EB',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    borderWidth: 1,
    borderColor: '#F4F1EB',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  outlined: {
    borderWidth: 2,
    borderColor: '#004225',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  flat: {
    backgroundColor: '#F4F1EB',
    borderWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Padding styles
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: 12,
  },
  paddingMedium: {
    padding: 20,
  },
  paddingLarge: {
    padding: 32,
  },
});
