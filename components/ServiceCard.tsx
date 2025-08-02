import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  imageUrl?: string;
  price?: number;
  duration?: string;
  availability?: string;
}

interface ServiceCardProps {
  service: Service;
  onPress: (service: Service) => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(service)}
      activeOpacity={0.7}
    >
      {/* Service Image */}
      <View style={styles.imageContainer}>
        {service.imageUrl ? (
          <Image 
            source={{ uri: service.imageUrl }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <View style={styles.imagePlaceholderIcon} />
          </View>
        )}
        
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{service.category}</Text>
        </View>
      </View>

      {/* Service Content */}
      <View style={styles.content}>
        <Text style={styles.serviceName} numberOfLines={1}>
          {service.name}
        </Text>
        
        <Text style={styles.serviceDescription} numberOfLines={2}>
          {service.description}
        </Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>
              {service.location}
            </Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.starIcon} />
            <Text style={styles.ratingText}>
              {service.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        
        {/* Price and Duration */}
        <View style={styles.priceRow}>
          {service.price && (
            <Text style={styles.priceText}>
              ${service.price}
            </Text>
          )}
          {service.duration && (
            <Text style={styles.durationText}>
              {service.duration}
            </Text>
          )}
        </View>
        
        {/* Availability */}
        {service.availability && (
          <View style={styles.availabilityContainer}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>
              {service.availability}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F4F1EB',
    marginBottom: 20,
    shadowColor: '#004225',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F1EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#004225',
    borderRadius: 12,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#004225',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    color: '#FAFAFA',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Canela',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Canela',
    color: '#004225',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  locationIcon: {
    width: 14,
    height: 14,
    backgroundColor: '#9CA3AF',
    borderRadius: 7,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
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
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#004225',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Canela',
    color: '#004225',
  },
  durationText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    backgroundColor: '#059669',
    borderRadius: 4,
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
});
