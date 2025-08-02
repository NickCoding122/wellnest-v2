import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#004225', // British Racing Green
    secondary: '#F4F1EB', // Soft beige
    tertiary: '#FAFAFA', // Off-white
    surface: '#FFFFFF',
    background: '#FAFAFA',
    onPrimary: '#FAFAFA',
    onSecondary: '#004225',
    onBackground: '#004225',
    onSurface: '#004225',
    outline: '#F4F1EB',
    surfaceVariant: '#F4F1EB',
    onSurfaceVariant: '#6B7280',
  },
  fonts: {
    ...DefaultTheme.fonts,
    headlineLarge: {
      fontFamily: 'Canela',
      fontSize: 32,
      fontWeight: '400' as any,
      letterSpacing: -0.5,
      lineHeight: 40,
    },
    headlineMedium: {
      fontFamily: 'Canela',
      fontSize: 28,
      fontWeight: '400' as any,
      letterSpacing: -0.3,
      lineHeight: 36,
    },
    headlineSmall: {
      fontFamily: 'Canela',
      fontSize: 24,
      fontWeight: '400' as any,
      letterSpacing: -0.3,
      lineHeight: 32,
    },
    titleLarge: {
      fontFamily: 'Canela',
      fontSize: 20,
      fontWeight: '400' as any,
      letterSpacing: -0.2,
      lineHeight: 28,
    },
    bodyLarge: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '400' as any,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400' as any,
      lineHeight: 20,
    },
    labelLarge: {
      fontFamily: 'Canela',
      fontSize: 16,
      fontWeight: '600' as any,
      lineHeight: 20,
    },
  },
};

export default theme;
