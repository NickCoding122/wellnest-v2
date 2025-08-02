import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Service } from '../components/ServiceCard';
import BookingButton from '../components/BookingButton';
import AppHeader from '../components/AppHeader';

export default function ServiceDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params as { service: Service };

  const handleBookSession = () => {
    // Navigate to BookingSuccessScreen
    navigation.navigate('BookingSuccess' as never, { service } as never);
  };

  const features = [
    'Professional certification',
    'Flexible scheduling',
    'Online or in-person sessions',
    'Follow-up support included',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title=""
        showBackButton={true}
        backgroundColor="#004225"
        textColor="#FAFAFA"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          {service.imageUrl ? (
            <Image 
              source={{ uri: service.imageUrl }} 
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <View style={styles.heroIcon} />
            </View>
          )}
          
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{service.category}</Text>
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.contentContainer}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.serviceName}>{service.name}</Text>
            
            <View style={styles.metaRow}>
              <View style={styles.locationContainer}>
                <View style={styles.locationIcon} />
                <Text style={styles.locationText}>{service.location}</Text>
              </View>
              
              <View style={styles.ratingContainer}>
                <View style={styles.starIcon} />
                <Text style={styles.ratingText}>{service.rating.toFixed(1)}</Text>
                <Text style={styles.reviewsText}>(48 reviews)</Text>
              </View>
            </View>

            {/* Availability Status */}
            {service.availability && (
              <View style={styles.availabilityContainer}>
                <View style={styles.availabilityDot} />
                <Text style={styles.availabilityText}>{service.availability}</Text>
              </View>
            )}
          </View>

          {/* Price & Duration */}
          <View style={styles.priceSection}>
            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                {service.price && (
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Session fee</Text>
                    <Text style={styles.priceValue}>${service.price}</Text>
                  </View>
                )}
                {service.duration && (
                  <View style={styles.durationContainer}>
                    <Text style={styles.durationLabel}>Duration</Text>
                    <Text style={styles.durationValue}>{service.duration}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{service.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>What's included</Text>
            <View style={styles.featuresList}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIcon} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Preview */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerAvatar} />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>Sarah M.</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <View key={i} style={styles.reviewStar} />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewDate}>2 weeks ago</Text>
              </View>
              <Text style={styles.reviewText}>
                "Excellent service! Very professional and knowledgeable. Helped me achieve my health goals in just a few sessions."
              </Text>
            </View>
          </View>

          {/* Contact Options */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Get in touch</Text>
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.contactButton}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <View style={styles.contactIcon} />
                <Text style={styles.contactText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <BookingButton
          title="Book Session"
          onPress={handleBookSession}
          style={styles.bookingButton}
        />
      </View>
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
    paddingBottom: 120, // Space for fixed button
  },
  heroContainer: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F1EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#004225',
    borderRadius: 20,
  },
  categoryBadge: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: '#004225',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    color: '#FAFAFA',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Canela',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  headerSection: {
    marginBottom: 24,
  },
  serviceName: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 16,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 8,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#F59E0B',
    borderRadius: 4,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '600',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 10,
    height: 10,
    backgroundColor: '#059669',
    borderRadius: 5,
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  priceSection: {
    marginBottom: 32,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F4F1EB',
    padding: 24,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Canela',
    color: '#004225',
  },
  durationContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  durationLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004225',
  },
  descriptionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    fontWeight: '400',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#059669',
    borderRadius: 10,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '500',
    flex: 1,
  },
  reviewsSection: {
    marginBottom: 32,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F4F1EB',
    padding: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#F4F1EB',
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004225',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewStar: {
    width: 12,
    height: 12,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  reviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  contactSection: {
    marginBottom: 32,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#F4F1EB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F4F1EB',
  },
  contactIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#004225',
    borderRadius: 6,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004225',
    fontFamily: 'Canela',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderTopWidth: 2,
    borderTopColor: '#F4F1EB',
  },
  bookingButton: {
    width: '100%',
  },
});
