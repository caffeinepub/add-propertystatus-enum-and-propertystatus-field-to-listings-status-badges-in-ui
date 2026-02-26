import { Building2, Home, Hotel, PartyPopper, Lock, CheckCircle2, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCategory } from '../backend';

interface BookingStepsProps {
  category?: ListingCategory;
}

export default function BookingSteps({ category = ListingCategory.pgHostel }: BookingStepsProps) {
  const getPropertyIcon = () => {
    switch (category) {
      case ListingCategory.pgHostel:
      case ListingCategory.studentStay:
        return <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />;
      case ListingCategory.familyFlat:
      case ListingCategory.travelStay:
        return <Home className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />;
      case ListingCategory.hotel:
        return <Hotel className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />;
      case ListingCategory.marriageHall:
      case ListingCategory.eventSpace:
        return <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />;
      default:
        return <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
      {/* Step 1 - View Info */}
      <div className="relative group">
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
          style={{ filter: 'blur(20px)' }}
        />
        <div 
          className="relative bg-gradient-to-br from-green-600/35 to-emerald-700/35 rounded-3xl p-6 sm:p-8 border-2 border-green-400/50 group-hover:border-green-400/70 transition-all duration-300 hover:scale-105 will-change-transform"
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 197, 94, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="absolute top-4 right-4 w-12 h-12 bg-green-500/25 rounded-full flex items-center justify-center border border-green-400/30" style={{ backdropFilter: 'blur(4px)' }}>
            <span className="text-2xl font-bold text-green-300">1</span>
          </div>
          <div className="text-5xl sm:text-6xl mb-4">📄</div>
          <h3 className="text-white font-bold text-xl sm:text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>View Info</h3>
          <p className="text-green-300 font-bold text-2xl sm:text-3xl mb-2">FREE</p>
          <p className="text-white/80 text-sm font-medium">Browse all property details</p>
        </div>
      </div>

      {/* Step 2 - Unlock Owner */}
      <div className="relative group">
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl opacity-50 group-hover:opacity-70 animate-pulse-slow transition-opacity duration-300"
          style={{ filter: 'blur(20px)' }}
        />
        <div 
          className="relative bg-gradient-to-br from-purple-600/45 to-pink-600/45 rounded-3xl p-6 sm:p-8 border-2 border-purple-400/60 group-hover:border-purple-400/80 transition-all duration-300 hover:scale-105 will-change-transform"
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(147, 51, 234, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.15)',
          }}
        >
          <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/25 rounded-full flex items-center justify-center border border-purple-400/30" style={{ backdropFilter: 'blur(4px)' }}>
            <span className="text-2xl font-bold text-purple-300">2</span>
          </div>
          <div className="text-5xl sm:text-6xl mb-4 relative">
            <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300 mx-auto animate-bounce-slow" style={{ filter: 'drop-shadow(0 0 20px rgba(253,224,71,0.6))' }} />
          </div>
          <h3 className="text-white font-bold text-xl sm:text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Unlock Owner</h3>
          <p className="text-yellow-300 font-bold text-2xl sm:text-3xl mb-2" style={{ filter: 'drop-shadow(0 0 15px rgba(253,224,71,0.5))' }}>FREE TRIAL</p>
          <p className="text-white/80 text-sm font-semibold">Free Trial – Lead Access Unlocked</p>
        </div>
      </div>

      {/* Step 3 - Check Availability (Redesigned with Updated Messaging) */}
      <div className="relative group">
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
          style={{ filter: 'blur(20px)' }}
        />
        <div 
          className="relative rounded-3xl p-6 sm:p-8 border-2 border-blue-400/50 group-hover:border-blue-400/70 transition-all duration-300 hover:scale-105 will-change-transform overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Step Number Badge */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500/25 rounded-full flex items-center justify-center border border-blue-400/30" style={{ backdropFilter: 'blur(4px)' }}>
            <span className="text-2xl font-bold text-blue-300">3</span>
          </div>

          {/* Property Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div 
                className="absolute inset-0 bg-blue-500/30 rounded-full"
                style={{ filter: 'blur(15px)' }}
              />
              <div className="relative bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full p-4 border border-blue-400/40">
                {getPropertyIcon()}
              </div>
            </div>
          </div>

          {/* Title - Bold White */}
          <h3 
            className="text-white font-bold text-2xl sm:text-3xl mb-2 text-center" 
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            Check Availability
          </h3>

          {/* Subtitle - Lighter Blue */}
          <p 
            className="text-blue-300 font-semibold text-lg sm:text-xl mb-4 text-center"
            style={{
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            Final price discussed on call
          </p>

          {/* Three Trust Indicators */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="font-medium">Verified Listing</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Number Hidden</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-purple-400" />
              <span className="font-medium">Secure Call via Platform</span>
            </div>
          </div>

          {/* CTA Button - High Contrast Gradient */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.95rem',
            }}
          >
            Call to Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
}
