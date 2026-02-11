import { memo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Listing, Variant_partiallyAvailable_booked_available, ListingCategory } from '../backend';
import { useGetAverageRating, useGetReviewsForListing } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle2, Star, MessageSquare, Building2, Home, PartyPopper, Phone, Shield, Hotel } from 'lucide-react';
import StarRating from './StarRating';
import PropertyStatusBadge from './PropertyStatusBadge';

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
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
        )}
        
        {/* Soft gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 ${getAvailabilityColor()} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2`}>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          {getAvailabilityText()}
        </div>

        {/* Verified Badge */}
        {listing.verified && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </div>
        )}

        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute bottom-4 left-4 bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </div>
        )}

        {/* Property Status Badge */}
        <div className="absolute bottom-4 right-4">
          <PropertyStatusBadge status={listing.propertyStatus} className="text-xs shadow-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title and Rating Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2 flex-1">
            <div className={`${getIconColor()} mt-1`}>
              {getCategoryIcon()}
            </div>
            <h3 className={`${getTextColor()} font-bold text-lg sm:text-xl line-clamp-1 flex-1`}>
              {listing.title}
            </h3>
          </div>
          {displayRating > 0 && (
            <div className="flex items-center gap-1 ml-2">
              <StarRating rating={displayRating} size="sm" />
              <span className={`${getSecondaryTextColor()} text-xs sm:text-sm font-semibold ml-1`}>
                {displayRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className={`flex items-center gap-1 ${variant === 'neumorphism' ? 'bg-green-100 text-green-700' : 'bg-green-600/20 text-green-400'} px-2 py-1 rounded-full text-xs font-medium`}>
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified Listing</span>
          </div>
          <div className={`flex items-center gap-1 ${variant === 'neumorphism' ? 'bg-blue-100 text-blue-700' : 'bg-blue-600/20 text-blue-400'} px-2 py-1 rounded-full text-xs font-medium`}>
            <Shield className="w-3 h-3" />
            <span>Number Hidden</span>
          </div>
          <div className={`flex items-center gap-1 ${variant === 'neumorphism' ? 'bg-purple-100 text-purple-700' : 'bg-purple-600/20 text-purple-400'} px-2 py-1 rounded-full text-xs font-medium`}>
            <Phone className="w-3 h-3" />
            <span>Secure Call via Platform</span>
          </div>
        </div>

        {/* Review Count */}
        {reviewCount > 0 && (
          <div className={`flex items-center gap-1 ${getSecondaryTextColor()} text-xs mb-2`}>
            <MessageSquare className="w-3 h-3" />
            <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
          </div>
        )}

        <p className={`${getSecondaryTextColor()} text-sm mb-4 line-clamp-2`}>
          {listing.description}
        </p>
        
        <div className={`flex items-center gap-2 ${getSecondaryTextColor()} text-sm mb-4`}>
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{listing.location.address}</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className={`${getSecondaryTextColor()} text-xs sm:text-sm`}>From</span>
            <div className={`${getTextColor()} font-bold text-xl sm:text-2xl`}>
              ₹{listing.pricePerDay.toString()}
            </div>
            <span className={`${getSecondaryTextColor()} text-xs`}>per day</span>
          </div>

          <Button
            onClick={handleViewDetails}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call to Check Availability</span>
            <span className="sm:hidden">Call Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
});

ListingCard.displayName = 'ListingCard';

export default ListingCard;
