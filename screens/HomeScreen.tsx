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
    { id: 1, name: 'Nutrition', color: '#FEF3E2' },
    { id: 2, name: 'Mental Health', color: '#F0F9FF' },
    { id: 3, name: 'Fitness', color: '#F0FDF4' },
    { id: 4, name: 'Wellness', color: '#FAF5FF' },
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
          
          <TouchableOpacity style={styles.notificationButton}>
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
          <Text style={styles.sectionTitle}>Browse Services</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: category.color }]}
              >
                <View style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Premium</Text>
              </View>
              <Text style={styles.bannerTitle}>Professional Wellness</Text>
              <Text style={styles.bannerSubtitle}>
                Connect with certified health professionals
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Popular Providers */}
        <View style={styles.providersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
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
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>Book Session</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={styles.quickActionIcon} />
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
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
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={[styles.bottomNavIcon, styles.bottomNavIconActive]} />
            <Text style={styles.bottomNavTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomNavItem}>
            <View style={styles.bottomNavIcon} />
            <Text style={styles.bottomNavText}>Messages</Text>
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
    backgroundColor: '#FEFEFE',
  },
  header: {
    backgroundColor: '#14532D',
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
    color: '#BBF7D0',
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
    fontWeight: '700',
    marginRight: 8,
  },
  locationSubtext: {
    color: '#BBF7D0',
    fontSize: 14,
    fontWeight: '400',
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: '#166534',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  categoriesSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#14532D',
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bannerSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  banner: {
    backgroundColor: '#14532D',
    borderRadius: 20,
    padding: 24,
  },
  bannerContent: {
    alignItems: 'flex-start',
  },
  badgeContainer: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    color: '#BBF7D0',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
    lineHeight: 22,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bannerButtonText: {
    color: '#14532D',
    fontSize: 16,
    fontWeight: '700',
  },
  providersSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#14532D',
    fontWeight: '600',
    fontSize: 16,
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
    width: 200,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  providerImageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  providerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  providerImagePlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#F3F4F6',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerImageIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#D1D5DB',
    borderRadius: 16,
  },
  providerInfo: {
    alignItems: 'center',
  },
  providerName: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  providerService: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
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
    width: 12,
    height: 12,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    marginRight: 4,
  },
  rating: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 2,
  },
  reviews: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
  },
  price: {
    color: '#14532D',
    fontSize: 16,
    fontWeight: '700',
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  quickActionIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#14532D',
    borderRadius: 8,
    marginBottom: 12,
  },
  quickActionText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  debugSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    marginBottom: 4,
  },
  bottomNavIconActive: {
    backgroundColor: '#14532D',
  },
  bottomNavText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNavTextActive: {
    color: '#14532D',
    fontSize: 12,
    fontWeight: '600',
  },
});
