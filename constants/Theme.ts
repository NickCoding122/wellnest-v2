import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
  },
};

export default theme;
