import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
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
    { id: 1, name: 'Nutrition', icon: 'N', color: '#FFF7ED' },
    { id: 2, name: 'Personal Growth', icon: 'P', color: '#F3E8FF' },
    { id: 3, name: 'Health', icon: 'H', color: '#FEF2F2' },
    { id: 4, name: 'Fitness', icon: 'F', color: '#EFF6FF' },
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
                <Text style={styles.locationSubtext}>NSW, Aus</Text>
                <Text style={styles.dropdown}>▼</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: category.color }]}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerText}>Best Seller</Text>
              </View>
              <Text style={styles.bannerTitle}>Sports & Fitness</Text>
              <Text style={styles.bannerSubtitle}>Personal training sessions</Text>
            </View>
            <View style={styles.bannerImage} />
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Popular Near Me Section */}
        <View style={styles.providersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Near Me</Text>
            <TouchableOpacity>
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
                
                <Text style={styles.providerName} numberOfLines={1}>
                  {provider.name}
                </Text>
                <Text style={styles.providerService}>{provider.service}</Text>
                
                <View style={styles.ratingContainer}>
                  <View style={styles.starIcon} />
                  <Text style={styles.rating}>{provider.rating}</Text>
                  <Text style={styles.reviews}>({provider.reviews})</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={[styles.quickActionCard, styles.quickActionPrimary]}>
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionTextPrimary}>Book Session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickActionCard, styles.quickActionSecondary]}>
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionTextSecondary}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickActionCard, styles.quickActionTertiary]}>
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionTextTertiary}>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info & Logout (Debug) */}
        <View style={styles.debugSection}>
          <View style={styles.debugCard}>
            <Text style={styles.debugText}>
              Welcome, {user?.email?.split('@')[0]}
            </Text>
            <AppButton
              onPress={handleLogout}
              loading={loading}
              disabled={loading}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>
                {loading ? 'Signing out...' : 'Log Out'}
              </Text>
            </AppButton>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={[styles.bottomNavIcon, styles.bottomNavIconActive]} />
            <Text style={styles.bottomNavTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
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
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationDot: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  locationLabel: {
    color: '#A7F3D0',
    fontSize: 14,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  locationSubtext: {
    color: '#A7F3D0',
    fontSize: 14,
  },
  dropdown: {
    color: '#A7F3D0',
    fontSize: 12,
    marginLeft: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: '#059669',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  categoriesSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  categoriesContent: {
    paddingRight: 24,
  },
  categoryCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIconText: {
    color: '#374151',
    fontWeight: 'bold',
  },
  categoryText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bannerSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  banner: {
    backgroundColor: '#374151',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bestSellerBadge: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  bestSellerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  bannerImage: {
    width: 48,
    height: 48,
    backgroundColor: '#F97316',
    borderRadius: 24,
    marginLeft: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#10B981',
  },
  providersSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    color: '#10B981',
    fontWeight: '500',
  },
  providersContent: {
    paddingRight: 24,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: 16,
    marginRight: 16,
    width: 192,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  providerImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  providerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  providerImagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#E5E7EB',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerImageIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#9CA3AF',
    borderRadius: 16,
  },
  providerName: {
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  providerService: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    marginRight: 4,
  },
  rating: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  reviews: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  quickActionPrimary: {
    backgroundColor: '#ECFDF5',
  },
  quickActionSecondary: {
    backgroundColor: '#EFF6FF',
  },
  quickActionTertiary: {
    backgroundColor: '#F3E8FF',
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#10B981',
    borderRadius: 8,
    marginBottom: 8,
  },
  quickActionTextPrimary: {
    color: '#065F46',
    fontWeight: '500',
    textAlign: 'center',
  },
  quickActionTextSecondary: {
    color: '#1E40AF',
    fontWeight: '500',
    textAlign: 'center',
  },
  quickActionTextTertiary: {
    color: '#7C3AED',
    fontWeight: '500',
    textAlign: 'center',
  },
  debugSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  debugCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  debugText: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
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
    width: 24,
    height: 24,
    backgroundColor: '#9CA3AF',
    borderRadius: 6,
    marginBottom: 4,
  },
  bottomNavIconActive: {
    backgroundColor: '#10B981',
  },
  bottomNavText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  bottomNavTextActive: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
  },
});
