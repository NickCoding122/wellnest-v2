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
    { id: 1, name: 'Nutrition', emoji: '🥗', color: '#FEF3C7' },
    { id: 2, name: 'Personal Growth', emoji: '🧠', color: '#E0E7FF' },
    { id: 3, name: 'Health', emoji: '❤️', color: '#FECACA' },
  ];

  const providers = [
    {
      id: 1,
      name: 'Georgina Goldstei...',
      service: 'Counselling',
      image: null,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Megane Salgado',
      service: 'Counselling',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Geek C',
      service: 'Nutrition',
      image: null,
      rating: 4.7,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <Text style={styles.locationIconText}>📍</Text>
          </View>
          <View>
            <Text style={styles.locationLabel}>Current Location</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>{currentLocation}</Text>
              <Text style={styles.locationSubtext}>NSW, Aus...</Text>
              <Text style={styles.dropdown}>▼</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryButton, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerText}>Best Seller</Text>
              </View>
              <Text style={styles.bannerTitle}>Big Ballers</Text>
            </View>
            <View style={styles.bannerImage}>
              <Text style={styles.bannerEmoji}>🏀</Text>
            </View>
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Popular Near Me Section */}
        <View style={styles.sectionContainer}>
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
                <View style={styles.providerImage}>
                  {provider.image ? (
                    <Image 
                      source={{ uri: provider.image }} 
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderIcon}>👤</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerService}>{provider.service}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.rating}>{provider.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* User Info & Logout (Debug) */}
        <View style={styles.debugSection}>
          <Text style={styles.debugText}>
            Welcome, {user?.email}
          </Text>
          <AppButton
            onPress={handleLogout}
            loading={loading}
            disabled={loading}
            style={styles.logoutButton}
          >
            Log Out
          </AppButton>
        </View>
      </ScrollView>

      {/* Bottom Navigation */
