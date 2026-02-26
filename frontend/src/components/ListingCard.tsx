import { memo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Listing, Variant_partiallyAvailable_booked_available, ListingCategory } from '../backend';
import { useGetAverageRating, useGetReviewsForListing } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { MapPin, Star, MessageSquare, Building2, Home, PartyPopper, Phone, Shield, Hotel } from 'lucide-react';
import StarRating from './StarRating';
import PropertyStatusBadge from './PropertyStatusBadge';
import TrustBadge from './TrustBadge';

interface ListingCardProps {
  listing: Listing;
  variant?: 'neumorphism' | 'glassmorphism' | 'gradient';
}

const ListingCard = memo(({ listing, variant = 'glassmorphism' }: ListingCardProps) => {
  const navigate = useNavigate();
  const { data: averageRating } = useGetAverageRating(listing.id);
  const { data: reviews = [] } = useGetReviewsForListing(listing.id);

  const displayRating = averageRating ?? (listing.featured ? 4 : 0);
  const reviewCount = reviews.length;

  const getAvailabilityColor = useCallback(() => {
    switch (listing.availability.status) {
      case Variant_partiallyAvailable_booked_available.available:
        return 'bg-green-500';
      case Variant_partiallyAvailable_booked_available.partiallyAvailable:
        return 'bg-yellow-500';
      case Variant_partiallyAvailable_booked_available.booked:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }, [listing.availability.status]);

  const getAvailabilityText = useCallback(() => {
    switch (listing.availability.status) {
      case Variant_partiallyAvailable_booked_available.available:
        return `${listing.availability.availableUnits} ${listing.availability.unitType} Available`;
      case Variant_partiallyAvailable_booked_available.partiallyAvailable:
        return `${listing.availability.availableUnits} ${listing.availability.unitType} Left`;
      case Variant_partiallyAvailable_booked_available.booked:
        return 'Fully Booked';
      default:
        return 'Unknown';
    }
  }, [listing.availability.status, listing.availability.availableUnits, listing.availability.unitType]);

  const getCategoryIcon = useCallback(() => {
    switch (listing.category) {
      case ListingCategory.pgHostel:
      case ListingCategory.studentStay:
        return <Building2 className="w-5 h-5" />;
      case ListingCategory.familyFlat:
      case ListingCategory.travelStay:
        return <Home className="w-5 h-5" />;
      case ListingCategory.hotel:
        return <Hotel className="w-5 h-5" />;
      case ListingCategory.marriageHall:
      case ListingCategory.eventSpace:
        return <PartyPopper className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  }, [listing.category]);

  const handleViewDetails = useCallback(() => {
    navigate({ to: `/unlock/${listing.id}` });
  }, [navigate, listing.id]);

  const getCardStyles = useCallback(() => {
    switch (variant) {
      case 'neumorphism':
        return 'bg-gradient-to-br from-gray-50 to-gray-100 shadow-[8px_8px_20px_rgba(163,177,198,0.6),-8px_-8px_20px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_28px_rgba(163,177,198,0.7),-12px_-12px_28px_rgba(255,255,255,1)]';
      case 'glassmorphism':
        return 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/30 hover:border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)]';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-900/95 to-purple-900/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] border border-white/20';
      default:
        return 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/30 hover:border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)]';
    }
  }, [variant]);

  const getTextColor = useCallback(() => {
    return variant === 'neumorphism' ? 'text-gray-900' : 'text-white';
  }, [variant]);

  const getSecondaryTextColor = useCallback(() => {
    return variant === 'neumorphism' ? 'text-gray-600' : 'text-white/70';
  }, [variant]);

  const getIconColor = useCallback(() => {
    return variant === 'neumorphism' ? 'text-blue-600' : 'text-blue-400';
  }, [variant]);

  return (
    <div className={`group relative rounded-3xl overflow-hidden transition-all duration-300 will-change-transform hover:scale-[1.02] ${getCardStyles()}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {listing.images.length > 0 ? (
          <picture>
            <img
              src={listing.images[0].getDirectURL()}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ 
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'transform',
              }}
              loading="lazy"
              decoding="async"
            />
          </picture>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            {getCategoryIcon()}
          </div>
        )}

        {/* Verified Badge - Top Left */}
        {listing.verified && (
          <div className="absolute top-3 left-3 z-10">
            <TrustBadge variant="verified" size="sm" />
          </div>
        )}

        {/* Availability Badge - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getAvailabilityColor()} backdrop-blur-sm`}>
            {getAvailabilityText()}
          </div>
        </div>

        {/* Featured Badge - Bottom Left (if featured) */}
        {listing.featured && (
          <div className="absolute bottom-3 left-3 z-10">
            <TrustBadge variant="featured" size="sm" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${getTextColor()}`}>
          {listing.title}
        </h3>

        {/* Location */}
        <div className={`flex items-center gap-2 mb-3 ${getSecondaryTextColor()}`}>
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{listing.location.address}</span>
        </div>

        {/* Rating & Reviews */}
        {displayRating > 0 && (
          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={displayRating} size="sm" />
            <div className={`flex items-center gap-1 text-sm ${getSecondaryTextColor()}`}>
              <MessageSquare className="w-4 h-4" />
              <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
            </div>
          </div>
        )}

        {/* Property Status Badge */}
        <div className="mb-3">
          <PropertyStatusBadge status={listing.propertyStatus} />
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div>
            <div className={`text-2xl font-bold ${getTextColor()}`}>
              ₹{Number(listing.pricePerDay).toLocaleString('en-IN')}
            </div>
            <div className={`text-xs ${getSecondaryTextColor()}`}>per day</div>
          </div>
          <Button
            onClick={handleViewDetails}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              variant === 'neumorphism'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-glow-blue'
            }`}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
});

ListingCard.displayName = 'ListingCard';

export default ListingCard;
