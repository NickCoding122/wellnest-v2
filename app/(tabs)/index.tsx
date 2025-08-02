import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-emerald-500 px-6 pt-12 pb-6">
        <Text className="text-white text-2xl font-bold">
          Discover Services
        </Text>
        <Text className="text-emerald-100 text-base mt-1">
          Find wellness professionals near you
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Search Bar */}
        <View className="bg-gray-50 rounded-2xl px-4 py-4 mb-6 flex-row items-center">
          <Text className="text-gray-400 text-lg mr-3">🔍</Text>
          <Text className="text-gray-500 text-base">
            Search for services, providers...
          </Text>
        </View>

        {/* Categories Grid */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Browse Categories
        </Text>
        
        <View className="flex-row flex-wrap justify-between mb-8">
          <View className="bg-orange-50 rounded-2xl p-4 mb-4 w-[48%] items-center">
            <Text className="text-3xl mb-2">🥗</Text>
            <Text className="text-gray-700 font-medium">Nutrition</Text>
          </View>
          
          <View className="bg-purple-50 rounded-2xl p-4 mb-4 w-[48%] items-center">
            <Text className="text-3xl mb-2">🧠</Text>
            <Text className="text-gray-700 font-medium">Mental Health</Text>
          </View>
          
          <View className="bg-blue-50 rounded-2xl p-4 mb-4 w-[48%] items-center">
            <Text className="text-3xl mb-2">💪</Text>
            <Text className="text-gray-700 font-medium">Fitness</Text>
          </View>
          
          <View className="bg-pink-50 rounded-2xl p-4 mb-4 w-[48%] items-center">
            <Text className="text-3xl mb-2">💆</Text>
            <Text className="text-gray-700 font-medium">Beauty</Text>
          </View>
        </View>

        {/* Featured Section */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Featured This Week
        </Text>
        
        <View className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-6 mb-6">
          <Text className="text-white text-lg font-bold mb-2">
            Free Consultation Week
          </Text>
          <Text className="text-emerald-100 text-sm mb-4">
            Book your first session with selected providers at no cost
          </Text>
          <View className="bg-white rounded-xl px-4 py-2 self-start">
            <Text className="text-emerald-600 font-semibold text-sm">
              Learn More
            </Text>
          </View>
        </View>

        {/* Popular Providers Preview */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Trending Providers
        </Text>
        
        <View className="space-y-3">
          <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center">
            <View className="w-12 h-12 bg-gray-200 rounded-full justify-center items-center mr-4">
              <Text className="text-lg">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold">Dr. Sarah Johnson</Text>
              <Text className="text-gray-600 text-sm">Nutritionist • 4.9 ⭐</Text>
            </View>
            <Text className="text-emerald-600 font-medium">View</Text>
          </View>
          
          <View className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center">
            <View className="w-12 h-12 bg-gray-200 rounded-full justify-center items-center mr-4">
              <Text className="text-lg">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold">Mike Chen</Text>
              <Text className="text-gray-600 text-sm">Personal Trainer • 4.8 ⭐</Text>
            </View>
            <Text className="text-emerald-600 font-medium">View</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
