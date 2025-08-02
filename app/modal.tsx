import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-purple-500 px-6 pt-12 pb-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">
            Settings
          </Text>
          <TouchableOpacity className="w-8 h-8 bg-purple-400 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-light">×</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-purple-100 text-base mt-1">
          Manage your account and preferences
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Profile Section */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-8">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center mr-4">
              <View className="w-8 h-8 bg-gray-400 rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 font-bold text-lg">John Doe</Text>
              <Text className="text-gray-600 text-sm">john.doe@example.com</Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-purple-600 text-sm font-medium">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="space-y-4 mb-8">
          <TouchableOpacity className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-500 rounded-lg mr-4" />
              <View>
                <Text className="text-gray-900 font-medium">Notifications</Text>
                <Text className="text-gray-600 text-sm">Manage your alerts</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-500 rounded-lg mr-4" />
              <View>
                <Text className="text-gray-900 font-medium">Privacy & Security</Text>
                <Text className="text-gray-600 text-sm">Account protection</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-purple-500 rounded-lg mr-4" />
              <View>
                <Text className="text-gray-900 font-medium">Payment Methods</Text>
                <Text className="text-gray-600 text-sm">Manage cards and billing</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-orange-500 rounded-lg mr-4" />
              <View>
                <Text className="text-gray-900 font-medium">Appearance</Text>
                <Text className="text-gray-600 text-sm">Theme and display</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-red-500 rounded-lg mr-4" />
              <View>
                <Text className="text-gray-900 font-medium">Help & Support</Text>
                <Text className="text-gray-600 text-sm">Get assistance</Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-6">
          <Text className="text-gray-900 font-bold text-base mb-4">
            About Wellnest
          </Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Version</Text>
              <Text className="text-gray-900 text-sm font-medium">1.0.0</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Build</Text>
              <Text className="text-gray-900 text-sm font-medium">2024.01</Text>
            </View>
          </View>
          
          <View className="flex-row justify-center space-x-6 mt-6">
            <TouchableOpacity>
              <Text className="text-purple-600 text-sm font-medium">
                Terms of Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-purple-600 text-sm font-medium">
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity className="bg-red-50 border border-red-100 rounded-2xl p-4 items-center mb-8">
          <Text className="text-red-600 font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
