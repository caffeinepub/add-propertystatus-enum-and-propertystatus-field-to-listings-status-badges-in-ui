import { useNavigate } from '@tanstack/react-router';
import { Listing, Variant_partiallyAvailable_booked_available, ListingCategory } from '../backend';
import { useGetAverageRating, useGetReviewsForListing } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle2, Star, MessageSquare, Building2, Home, PartyPopper, Phone, Shield, Hotel } from 'lucide-react';
import StarRating from './StarRating';
import PropertyStatusBadge from './PropertyStatusBadge';

interface ListingCard3DProps {
  listing: Listing;
  index: number;
}

export default function ListingCard3D({ listing, index }: ListingCard3DProps) {
  const navigate = useNavigate();
  const { data: averageRating } = useGetAverageRating(listing.id);
  const { data: reviews = [] } = useGetReviewsForListing(listing.id);

  const displayRating = averageRating ?? (listing.featured ? 4 : 0);
  const reviewCount = reviews.length;

  const getAvailabilityColor = () => {
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
  };

  const getAvailabilityText = () => {
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
  };

  const getCategoryIcon = () => {
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
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-2 border-white/30 hover:border-white/50 hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)] transition-all duration-500 animate-float hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 0.1}s`,
        perspective: '1000px',
      }}
    >
      {/* 3D Rotation Effect */}
      <div className="relative transform transition-transform duration-500 group-hover:rotate-y-5">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {listing.images.length > 0 ? (
            <img
              src={listing.images[0].getDirectURL()}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ 
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
          )}
          
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Glossy Overlay - Light */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Availability Badge with Pulse */}
          <div className={`absolute top-4 right-4 ${getAvailabilityColor()} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2`}>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {getAvailabilityText()}
          </div>

          {/* Verified Badge */}
          {listing.verified && (
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </div>
          )}

          {/* Featured Badge */}
          {listing.featured && (
            <div className="absolute bottom-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Featured
            </div>
          )}

          {/* Property Status Badge */}
          <div className="absolute bottom-4 right-4">
            <PropertyStatusBadge status={listing.propertyStatus} className="text-xs shadow-lg" />
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
            animation: 'shine 1.5s infinite',
          }} />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Rating Row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-2 flex-1">
              <div className="text-blue-400 mt-1">
                {getCategoryIcon()}
              </div>
              <h3 className="text-white font-bold text-xl line-clamp-1 flex-1">{listing.title}</h3>
            </div>
            {displayRating > 0 && (
              <div className="flex items-center gap-1 ml-2">
                <StarRating rating={displayRating} size="sm" />
                <span className="text-white/70 text-sm font-semibold ml-1">
                  {displayRating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Listing</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              <span>Number Hidden</span>
            </div>
            <div className="flex items-center gap-1 bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
              <Phone className="w-3 h-3" />
              <span>Secure Call via Platform</span>
            </div>
          </div>

          {/* Review Count */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-1 text-white/60 text-xs mb-2">
              <MessageSquare className="w-3 h-3" />
              <span>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
            </div>
          )}

          <p className="text-white/70 text-sm mb-4 line-clamp-2">{listing.description}</p>
          
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{listing.location.address}</span>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-white/60 text-sm">From</span>
              <div className="text-white font-bold text-2xl">₹{listing.pricePerDay.toString()}</div>
              <span className="text-white/60 text-xs">per day</span>
            </div>

            <Button
              onClick={() => navigate({ to: `/unlock/${listing.id}` })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call to Check Availability</span>
              <span className="sm:hidden">Call Now</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
