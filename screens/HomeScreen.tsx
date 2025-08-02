import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { signOut } from '../lib/auth';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Sydney');

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await signOut();
            } catch (e) {
              console.warn('Sign out failed', e);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleCategoryPress = (categoryName: string) => {
    // Navigate to services screen with category filter
    navigation.navigate('Services' as never, { category: categoryName } as never);
  };

  const handleProviderPress = (providerName: string) => {
    Alert.alert('Provider Selected', `You selected ${providerName}`);
  };

  const handleQuickAction = (actionName: string) => {
    if (actionName === 'Book Session') {
      navigation.navigate('Services' as never);
    } else {
      Alert.alert('Quick Action', `You selected ${actionName}`);
    }
  };

  const handleBrowseServices = () => {
    navigation.navigate('Services' as never);
  };

  const categories = [
    { id: 1, name: 'Nutrition', color: '#F4F1EB' },
    { id: 2, name: 'Mental Health', color: '#F4F1EB' },
    { id: 3, name: 'Fitness', color: '#F4F1EB' },
    { id: 4, name: 'Wellness', color: '#F4F1EB' },
  ];

  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      service: 'Nutritionist',
      image: null,
      rating: 4.8,
      reviews: 42,
      price: 120,
    },
    {
      id: 2,
      name: 'Michael Chen',
      service: 'Personal Trainer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 67,
      price: 85,
    },
    {
      id: 3,
      name: 'Dr. Emma Wilson',
      service: 'Therapist',
      image: null,
      rating: 4.7,
      reviews: 31,
      price: 150,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
              <View style={styles.locationDot} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Current Location</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>{currentLocation}</Text>
                <Text style={styles.locationSubtext}>NSW, Australia</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => Alert.alert('Notifications', 'No new notifications')}
          >
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Good morning, {user?.email?.split('@')[0] || 'there'}
          </Text>
          <Text style={styles.welcomeSubtext}>
            How can we help you feel better today?
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse Services</Text>
            <TouchableOpacity onPress={handleBrowseServices}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => handleCategoryPress(category.name)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Banner */}
        <View style={styles.bannerSection}>
          <TouchableOpacity 
            style={styles.banner}
            onPress={handleBrowseServices}
            activeOpacity={0.8}
          >
            <View style={styles.bannerContent}>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Explore</Text>
              </View>
              <Text style={styles.bannerTitle}>Professional Wellness</Text>
              <Text style={styles.bannerSubtitle}>
                Connect with certified health professionals
              </Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Browse Services</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Popular Providers */}
        <View style={styles.providersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity onPress={handleBrowseServices}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.providersContent}
          >
            {providers.map((provider) => (
              <TouchableOpacity 
                key={provider.id} 
                style={styles.providerCard}
                onPress={() => handleProviderPress(provider.name)}
                activeOpacity={0.7}
              >
                <View style={styles.providerImageContainer}>
                  {provider.image ? (
                    <Image 
                      source={{ uri: provider.image }} 
                      style={styles.providerImage}
                    />
                  ) : (
                    <View style={styles.providerImagePlaceholder}>
                      <View style={styles.providerImageIcon} />
                    </View>
                  )}
                </View>
                
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName} numberOfLines={1}>
                    {provider.name}
                  </Text>
                  <Text style={styles.providerService}>{provider.service}</Text>
                  
                  <View style={styles.providerMeta}>
                    <View style={styles.ratingContainer}>
                      <View style={styles.starIcon} />
                      <Text style={styles.rating}>{provider.rating}</Text>
                      <Text style={styles.reviews}>({provider.reviews})</Text>
                    </View>
                    <Text style={styles.price}>${provider.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('Book Session')}
              activeOpacity={0.7}
            >
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>Book Session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('Messages')}
              activeOpacity={0.7}
            >
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('My Health')}
              activeOpacity={0.7}
            >
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>My Health</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Debug Logout */}
        <View style={styles.debugSection}>
          <TouchableOpacity
            onPress={handleLogout}
            disabled={loading}
            style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutButtonText}>
              {loading ? 'Signing out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => Alert.alert('Home', 'You are already on the home screen')}
          >
            <View style={[styles.bottomNavIcon, styles.bottomNavIconActive]} />
            <Text style={styles.bottomNavTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={handleBrowseServices}
          >
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => Alert.alert('Bookings', 'Bookings feature coming soon')}
          >
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => Alert.alert('Messages', 'Messages feature coming soon')}
          >
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bottomNavItem}
            onPress={() => Alert.alert('Profile', 'Profile feature coming soon')}
          >
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#004225',
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationDot: {
    width: 18,
    height: 18,
    backgroundColor: '#FAFAFA',
    borderRadius: 9,
  },
  locationLabel: {
    color: '#FAFAFA',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Canela',
    marginRight: 8,
  },
  locationSubtext: {
    color: '#FAFAFA',
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.8,
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    width: 18,
    height: 18,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtext: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '400',
  },
  categoriesSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    letterSpacing: -0.3,
  },
  viewAllText: {
    color: '#004225',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Canela',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#004225',
    borderRadius: 10,
    marginBottom: 16,
  },
  categoryText: {
    color: '#004225',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Canela',
    textAlign: 'center',
  },
  bannerSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  banner: {
    backgroundColor: '#004225',
    borderRadius: 24,
    padding: 32,
  },
  bannerContent: {
    alignItems: 'flex-start',
  },
  badgeContainer: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  badgeText: {
    color: '#FAFAFA',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Canela',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: '#FAFAFA',
    fontSize: 26,
    fontWeight: '400',
    fontFamily: 'Canela',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 24,
    lineHeight: 24,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  bannerButtonText: {
    color: '#004225',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  providersSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  providersContent: {
    paddingRight: 32,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F4F1EB',
    padding: 20,
    marginRight: 20,
    width: 220,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  providerImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  providerImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  providerImagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: '#F4F1EB',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerImageIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#004225',
    borderRadius: 18,
  },
  providerInfo: {
    alignItems: 'center',
  },
  providerName: {
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 6,
  },
  providerService: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  providerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    backgroundColor: '#F59E0B',
    borderRadius: 3,
    marginRight: 6,
  },
  rating: {
    color: '#004225',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  reviews: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
  },
  price: {
    color: '#004225',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Canela',
  },
  quickActionsSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#F4F1EB',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#F4F1EB',
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#004225',
    borderRadius: 10,
    marginBottom: 16,
  },
  quickActionText: {
    color: '#004225',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Canela',
    textAlign: 'center',
  },
  debugSection: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  logoutButtonText: {
    color: '#FAFAFA',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Canela',
  },
  bottomNav: {
    borderTopWidth: 2,
    borderTopColor: '#F4F1EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  bottomNavContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomNavItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 6,
  },
  bottomNavIconActive: {
    backgroundColor: '#004225',
  },
  bottomNavText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNavTextActive: {
    color: '#004225',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Canela',
  },
});
