import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  BookingDetails: { bookingId: string };
  ProviderDetails: { providerId: string };
  Search: { category?: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
        contentStyle: {
          backgroundColor: '#FAFAFA',
        },
        headerStyle: {
          backgroundColor: '#004225',
        },
        headerTintColor: '#FAFAFA',
        headerTitleStyle: {
          fontFamily: 'Canela',
          fontSize: 20,
          fontWeight: '400',
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          gestureEnabled: false, // Disable swipe back on main home
        }}
      />
      {/* Future screens will be added here */}
      {/* 
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{
          headerShown: true,
          title: 'Booking Details',
        }}
      />
      <Stack.Screen
        name="ProviderDetails"
        component={ProviderDetailsScreen}
        options={{
          headerShown: true,
          title: 'Provider',
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          title: 'Search',
        }}
      />
      */}
    </Stack.Navigator>
  );
}
