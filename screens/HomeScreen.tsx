import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  Image 
} from 'react-native';

import AppButton from '../components/AppButton';
import { signOut } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Sydney');

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (e) {
      console.warn('Sign out failed', e);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, name: 'Nutrition', icon: 'N', color: 'bg-orange-50' },
    { id: 2, name: 'Personal Growth', icon: 'P', color: 'bg-purple-50' },
    { id: 3, name: 'Health', icon: 'H', color: 'bg-red-50' },
    { id: 4, name: 'Fitness', icon: 'F', color: 'bg-blue-50' },
  ];

  const providers = [
    {
      id: 1,
      name: 'Georgina Goldstein',
      service: 'Counselling',
      image: null,
      rating: 4.8,
      reviews: 42,
    },
    {
      id: 2,
      name: 'Megane Salgado',
      service: 'Counselling',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 67,
    },
    {
      id: 3,
      name: 'Alex Chen',
      service: 'Nutrition',
      image: null,
      rating: 4.7,
      reviews: 31,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-emerald-500 px-6 pt-4 pb-6">
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center">
            <View className="w-8 h-8 justify-center items-center mr-3">
              <View className="w-4 h-4 bg-white rounded-full" />
            </View>
            <View>
              <Text className="text-emerald-100 text-sm font-medium">
                Current Location
              </Text>
              <View className="flex-row items-center">
                <Text className="text-white text-lg font-semibold mr-2">
                  {currentLocation}
                </Text>
                <Text className="text-emerald-200 text-sm">NSW, Aus</Text>
                <Text className="text-emerald-200 text-xs ml-1">▼</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity className="w-10 h-10 bg-emerald-400 rounded-full justify-center items-center">
            <View className="w-4 h-4 bg-white rounded-sm" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View className="px-6 pt-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={category.id} 
                className={`${category.color} rounded-2xl px-4 py-3 mr-3 min-w-[100px] items-center`}
              >
                <View className="w-8 h-8 bg-white rounded-full justify-center items-center mb-1">
                  <Text className="text-gray-700 font-bold">{category.icon}</Text>
                </View>
                <Text className="text-gray-700 text-sm font-medium text-center">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Banner */}
        <View className="px-6 pt-8">
          <View className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-3xl p-6 relative overflow-hidden">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <View className="bg-emerald-500 rounded-full px-3 py-1 self-start mb-3">
                  <Text className="text-white text-xs font-semibold">
                    Best Seller
                  </Text>
                </View>
                <Text className="text-white text-xl font-bold mb-1">
                  Sports & Fitness
                </Text>
                <Text className="text-gray-300 text-sm">
                  Personal training sessions
                </Text>
              </View>
              <View className="ml-4">
                <View className="w-12 h-12 bg-orange-500 rounded-full" />
              </View>
            </View>
          </View>
          
          {/* Pagination Dots */}
          <View className="flex-row justify-center mt-4 space-x-2">
            <View className="w-2 h-2 bg-emerald-500 rounded-full" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
            <View className="w-2 h-2 bg-gray-300 rounded-full" />
          </View>
        </View>

        {/* Popular Near Me Section */}
        <View className="px-6 pt-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              Popular Near Me
            </Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {providers.map((provider) => (
              <TouchableOpacity 
                key={provider.id} 
                className="bg-white rounded-2xl border border-gray-100 p-4 mr-4 w-48 shadow-sm"
              >
                <View className="items-center mb-4">
                  {provider.image ? (
                    <Image 
                      source={{ uri: provider.image }} 
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center">
                      <View className="w-8 h-8 bg-gray-400 rounded-full" />
                    </View>
                  )}
                </View>
                
                <Text className="text-gray-900 font-semibold text-center mb-1" numberOfLines={1}>
                  {provider.name}
                </Text>
                <Text className="text-gray-600 text-sm text-center mb-3">
                  {provider.service}
                </Text>
                
                <View className="flex-row justify-center items-center">
                  <View className="w-3 h-3 bg-yellow-500 rounded-sm mr-1" />
                  <Text className="text-gray-700 text-sm font-medium mr-1">
                    {provider.rating}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    ({provider.reviews})
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="px-6 pt-8">
          <Text className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </Text>
          
          <View className="flex-row space-x-4 mb-8">
            <TouchableOpacity className="flex-1 bg-emerald-50 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-emerald-500 rounded-lg mb-2" />
              <Text className="text-emerald-700 font-medium text-center">
                Book Session
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-blue-50 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-blue-500 rounded-lg mb-2" />
              <Text className="text-blue-700 font-medium text-center">
                Messages
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-purple-50 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-purple-500 rounded-lg mb-2" />
              <Text className="text-purple-700 font-medium text-center">
                Progress
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info & Logout (Debug) */}
        <View className="px-6 pb-8">
          <View className="bg-gray-50 rounded-2xl p-4">
            <Text className="text-gray-600 text-sm mb-3">
              Welcome, {user?.email?.split('@')[0]}
            </Text>
            <AppButton
              onPress={handleLogout}
              loading={loading}
              disabled={loading}
              className="bg-red-500 rounded-xl py-3 items-center"
            >
              <Text className="text-white font-medium">
                {loading ? 'Signing out...' : 'Log Out'}
              </Text>
            </AppButton>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View className="border-t border-gray-200 bg-white px-6 py-3">
        <View className="flex-row justify-between">
          <TouchableOpacity className="items-center py-2">
            <View className="w-6 h-6 bg-emerald-500 rounded-lg mb-1" />
            <Text className="text-emerald-600 text-xs font-medium">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <View className="w-6 h-6 bg-gray-400 rounded-lg mb-1" />
            <Text className="text-gray-500 text-xs">Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <View className="w-6 h-6 bg-gray-400 rounded-lg mb-1" />
            <Text className="text-gray-500 text-xs">Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <View className="w-6 h-6 bg-gray-400 rounded-lg mb-1" />
            <Text className="text-gray-500 text-xs">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <View className="w-6 h-6 bg-gray-400 rounded-lg mb-1" />
            <Text className="text-gray-500 text-xs">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
