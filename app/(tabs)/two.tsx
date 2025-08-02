{/* Quick Actions */}
        <View className="mt-8 mb-6">
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-emerald-500 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-white rounded-lg mb-2" />
              <Text className="text-white font-medium text-center">
                Book New Session
              </Text>
            </View>
            
            <View className="flex-1 bg-gray-100 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-gray-500 rounded-lg mb-2" />
              <Text className="text-gray-700 font-medium text-center">
                View Progress
              </Text>
            </View>
          import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 px-6 pt-12 pb-6">
        <Text className="text-white text-2xl font-bold">
          My Bookings
        </Text>
        <Text className="text-blue-100 text-base mt-1">
          Manage your appointments and sessions
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Quick Stats */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-green-50 rounded-2xl p-4 flex-1 mr-2 items-center">
            <View className="w-6 h-6 bg-green-500 rounded-lg mb-1" />
            <Text className="text-green-700 font-bold text-lg">12</Text>
            <Text className="text-green-600 text-xs text-center">Completed</Text>
          </View>
          
          <View className="bg-orange-50 rounded-2xl p-4 flex-1 mx-1 items-center">
            <View className="w-6 h-6 bg-orange-500 rounded-lg mb-1" />
            <Text className="text-orange-700 font-bold text-lg">3</Text>
            <Text className="text-orange-600 text-xs text-center">Upcoming</Text>
          </View>
          
          <View className="bg-purple-50 rounded-2xl p-4 flex-1 ml-2 items-center">
            <View className="w-6 h-6 bg-purple-500 rounded-lg mb-1" />
            <Text className="text-purple-700 font-bold text-lg">4.8</Text>
            <Text className="text-purple-600 text-xs text-center">Avg Rating</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Upcoming Appointments
        </Text>
        
        <View className="space-y-4 mb-8">
          <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-base">
                  Nutrition Consultation
                </Text>
                <Text className="text-gray-600 text-sm">
                  with Dr. Sarah Johnson
                </Text>
              </View>
              <View className="bg-emerald-100 rounded-full px-3 py-1">
                <Text className="text-emerald-700 text-xs font-medium">
                  Confirmed
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm mr-4">Tomorrow, 2:00 PM</Text>
                <Text className="text-gray-500 text-sm">Online</Text>
              </View>
              <Text className="text-blue-600 font-medium text-sm">Join Call</Text>
            </View>
          </View>
          
          <View className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-base">
                  Personal Training
                </Text>
                <Text className="text-gray-600 text-sm">
                  with Mike Chen
                </Text>
              </View>
              <View className="bg-orange-100 rounded-full px-3 py-1">
                <Text className="text-orange-700 text-xs font-medium">
                  Pending
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm mr-4">Friday, 9:00 AM</Text>
                <Text className="text-gray-500 text-sm">Gym</Text>
              </View>
              <Text className="text-gray-600 font-medium text-sm">Details</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </Text>
        
        <View className="space-y-3">
          <View className="bg-gray-50 rounded-2xl p-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">
                  Session completed
                </Text>
                <Text className="text-gray-600 text-sm">
                  Yoga session with Lisa Park
                </Text>
              </View>
              <Text className="text-gray-500 text-xs">2 days ago</Text>
            </View>
          </View>
          
          <View className="bg-gray-50 rounded-2xl p-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-gray-900 font-medium">
                  Booking confirmed
                </Text>
                <Text className="text-gray-600 text-sm">
                  Nutrition consultation scheduled
                </Text>
              </View>
              <Text className="text-gray-500 text-xs">3 days ago</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mt-8 mb-6">
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-emerald-500 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-white rounded-lg mb-2" />
              <Text className="text-white font-medium text-center">
                Book New Session
              </Text>
            </View>
            
            <View className="flex-1 bg-gray-100 rounded-2xl p-4 items-center">
              <View className="w-8 h-8 bg-gray-500 rounded-lg mb-2" />
              <Text className="text-gray-700 font-medium text-center">
                View Progress
              </Text>
            </View>
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
