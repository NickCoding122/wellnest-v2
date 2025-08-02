import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Service } from '../components/ServiceCard';
import BookingButton from '../components/BookingButton';

export default function BookingSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params as { service: Service };
  
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animate the success icon and content
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackToHome = () => {
    // Navigate back to the main home screen
    navigation.navigate('Home' as never);
  };

  const handleViewServices = () => {
    // Navigate back to services screen
    navigation.navigate('Services' as never);
  };

  const handleViewBooking = () => {
    // This would navigate to a booking details screen
    // For now, just show an alert or navigate back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View 
          style={[
            styles.successIconContainer,
            { transform: [{ scale: scaleValue }] }
          ]}
        >
          <View style={styles.successIcon}>
            <View style={styles.checkmark} />
          </View>
        </Animated.View>

        {/* Success Content */}
        <Animated.View 
          style={[
            styles.textContainer,
            { opacity: fadeValue }
          ]}
        >
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your session has been successfully booked
          </Text>
        </Animated.View>

        {/* Booking Details Card */}
        <Animated.View 
          style={[
            styles.bookingCard,
            { opacity: fadeValue }
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Booking Details</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>
          
          <View style={styles.cardContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service Provider</Text>
              <Text style={styles.detailValue}>{service.name}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service Type</Text>
              <Text style={styles.detailValue}>{service.category}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{service.location}</Text>
            </View>
            
            {service.duration && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{service.duration}</Text>
              </View>
            )}
            
            {service.price && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Session Fee</Text>
                <Text style={styles.detailValue}>${service.price}</Text>
              </View>
            )}
          </View>

          <View style={styles.nextStepsContainer}>
            <Text style={styles.nextStepsTitle}>What's next?</Text>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>
                  You'll receive a confirmation email shortly
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>
                  The provider will contact you within 24 hours
                </Text>
              </View>
              
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>
                  Schedule your preferred time slot
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.buttonContainer,
            { opacity: fadeValue }
          ]}
        >
          <BookingButton
            title="View Booking"
            onPress={handleViewBooking}
            variant="outline"
            style={styles.secondaryButton}
          />
          
          <BookingButton
            title="Back to Home"
            onPress={handleBackToHome}
            style={styles.primaryButton}
          />
        </Animated.View>

        {/* Footer Link */}
        <Animated.View 
          style={[
            styles.footerContainer,
            { opacity: fadeValue }
          ]}
        >
          <TouchableOpacity onPress={handleViewServices}>
            <Text style={styles.footerText}>
              Browse more services
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#059669',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  checkmark: {
    width: 48,
    height: 24,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  successSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#F4F1EB',
    padding: 24,
    marginBottom: 32,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    letterSpacing: -0.2,
  },
  statusBadge: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: '#FAFAFA',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Canela',
    textTransform: 'uppercase',
  },
  cardContent: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F1EB',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  nextStepsContainer: {
    borderTopWidth: 2,
    borderTopColor: '#F4F1EB',
    paddingTop: 24,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 16,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#004225',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FAFAFA',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 24,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '600',
    fontFamily: 'Canela',
    textDecorationLine: 'underline',
  },
});
