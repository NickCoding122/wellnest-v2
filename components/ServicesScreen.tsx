import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ServiceCard, { Service } from '../components/ServiceCard';
import AppHeader from '../components/AppHeader';

// Mock data for services
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    description: 'Certified nutritionist specializing in plant-based diets and weight management. Over 10 years of experience helping clients achieve their health goals.',
    category: 'Nutrition',
    location: 'Sydney CBD, NSW',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&crop=face',
    price: 120,
    duration: '60 min',
    availability: 'Available today',
  },
  {
    id: '2',
    name: 'Michael Chen',
    description: 'Personal trainer with expertise in strength training, HIIT, and rehabilitation. Helping clients build strength and confidence.',
    category: 'Fitness',
    location: 'Bondi Beach, NSW',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=face',
    price: 85,
    duration: '45 min',
    availability: 'Available tomorrow',
  },
  {
    id: '3',
    name: 'Dr. Emma Wilson',
    description: 'Licensed psychologist specializing in anxiety, depression, and stress management using cognitive behavioral therapy.',
    category: 'Mental Health',
    location: 'Neutral Bay, NSW',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1594824407221-43c5a71aa0e5?w=400&h=300&fit=crop&crop=face',
    price: 150,
    duration: '50 min',
    availability: 'Available this week',
  },
  {
    id: '4',
    name: 'Lisa Park',
    description: 'Certified yoga instructor and wellness coach. Specializing in restorative yoga, meditation, and mindfulness practices.',
    category: 'Wellness',
    location: 'Manly, NSW',
    rating: 4.6,
    price: 70,
    duration: '60 min',
    availability: 'Available today',
  },
  {
    id: '5',
    name: 'James Roberts',
    description: 'Remedial massage therapist with expertise in sports massage, deep tissue therapy, and injury rehabilitation.',
    category: 'Wellness',
    location: 'Surry Hills, NSW',
    rating: 4.8,
    price: 95,
    duration: '75 min',
    availability: 'Available this week',
  },
  {
    id: '6',
    name: 'Dr. Priya Sharma',
    description: 'Holistic health practitioner combining traditional medicine with modern wellness approaches for optimal health.',
    category: 'Nutrition',
    location: 'Chatswood, NSW',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=face',
    price: 110,
    duration: '55 min',
    availability: 'Available tomorrow',
  },
];

const categories = ['All', 'Nutrition', 'Fitness', 'Mental Health', 'Wellness'];

export default function ServicesScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(mockServices);

  React.useEffect(() => {
    let filtered = mockServices;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory]);

  const handleServicePress = (service: Service) => {
    // Navigate to ServiceDetailScreen with the selected service
    navigation.navigate('ServiceDetail' as never, { service } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Browse Services"
        subtitle="Find the perfect wellness professional"
        showBackButton={true}
        backgroundColor="#004225"
        textColor="#FAFAFA"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services, providers, locations..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {selectedCategory === 'All' ? 'All Services' : selectedCategory}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
          </Text>
        </View>

        {/* Services List */}
        <View style={styles.servicesSection}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={handleServicePress}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No services found</Text>
              <Text style={styles.emptyDescription}>
                Try adjusting your search or category filter
              </Text>
              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                <Text style={styles.clearFiltersText}>Clear filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchSection: {
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#9CA3AF',
    borderRadius: 10,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#004225',
    fontWeight: '400',
  },
  clearButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  categorySection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 16,
    paddingHorizontal: 32,
    letterSpacing: -0.2,
  },
  categoryScrollContent: {
    paddingHorizontal: 32,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#F4F1EB',
    borderWidth: 2,
    borderColor: '#F4F1EB',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#004225',
    borderColor: '#004225',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FAFAFA',
    fontFamily: 'Canela',
  },
  resultsHeader: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    letterSpacing: -0.3,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  servicesSection: {
    paddingHorizontal: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#F4F1EB',
    borderRadius: 32,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  clearFiltersButton: {
    backgroundColor: '#004225',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  clearFiltersText: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Canela',
  },
});
