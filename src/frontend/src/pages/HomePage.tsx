import { lazy, Suspense, memo, useCallback, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Lock, CheckCircle2, Plus, Building2, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCategory } from '../backend';
import { useGetEventMarkers } from '../hooks/useQueries';

// Lazy load heavy components
const AvailabilityCounter = lazy(() => import('../components/AvailabilityCounter'));
const IndiaMapSection = lazy(() => import('../components/IndiaMapSection'));

// Memoized category card component
const CategoryCard = memo(({ category, index, onClick }: {
  category: { name: string; image: string; gradient: string; category: ListingCategory };
  index: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2 will-change-transform"
    style={{
      animation: `fadeIn 0.8s ease-out ${0.7 + index * 0.1}s both`,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.3)',
    }}
  >
    <div className="relative h-56 overflow-hidden">
      <picture>
        <source srcSet={category.image} type="image/jpeg" />
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
        style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        style={{ opacity: 1 }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <div 
        className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/50 transition-colors duration-300"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 
          className="text-white font-bold text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
          }}
        >
          {category.name}
        </h3>
      </div>
    </div>
  </button>
));

CategoryCard.displayName = 'CategoryCard';

// Memoized stay type card component
const StayTypeCard = memo(({ stay, index, onClick }: {
  stay: { name: string; image: string; gradient: string; category: ListingCategory };
  index: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer hover:scale-105 will-change-transform"
    style={{
      animation: `fadeIn 0.8s ease-out ${1.1 + index * 0.1}s both`,
      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 50px rgba(147, 51, 234, 0.25)',
    }}
  >
    <div className="relative h-40 md:h-48 overflow-hidden">
      <picture>
        <source srcSet={stay.image} type="image/jpeg" />
        <img 
          src={stay.image} 
          alt={stay.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${stay.gradient}`}
        style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <div 
        className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 
          className="text-white font-bold text-xl md:text-2xl text-center px-4 group-hover:scale-110 transition-transform duration-300"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
          }}
        >
          {stay.name}
        </h3>
      </div>
    </div>
  </button>
));

StayTypeCard.displayName = 'StayTypeCard';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: eventMarkers = [] } = useGetEventMarkers();

  const topCategories = useMemo(() => [
    { 
      name: 'PG Hostels', 
      image: '/assets/generated/pg-hostel-room.dim_400x300.jpg', 
      gradient: 'from-blue-600/30 via-indigo-700/30 to-blue-900/40',
      category: ListingCategory.pgHostel 
    },
    { 
      name: 'Family Flats', 
      image: '/assets/generated/family-flat-exterior.dim_400x300.jpg', 
      gradient: 'from-purple-600/30 via-pink-600/30 to-purple-900/40',
      category: ListingCategory.familyFlat 
    },
    { 
      name: 'Hotels', 
      image: '/assets/generated/hotel-exterior.dim_400x300.jpg', 
      gradient: 'from-indigo-600/30 via-blue-700/30 to-indigo-900/40',
      category: ListingCategory.hotel 
    },
    { 
      name: 'Marriage Halls', 
      image: '/assets/generated/marriage-hall-interior.dim_400x300.jpg', 
      gradient: 'from-pink-600/30 via-rose-700/30 to-pink-900/40',
      category: ListingCategory.marriageHall 
    },
  ], []);

  const stayTypes = useMemo(() => [
    { 
      name: 'Student Stay', 
      image: '/assets/generated/student-room.dim_400x300.jpg', 
      gradient: 'from-cyan-600/30 via-blue-700/30 to-cyan-900/40',
      category: ListingCategory.studentStay 
    },
    { 
      name: 'Family Flats', 
      image: '/assets/generated/family-flat-exterior.dim_400x300.jpg', 
      gradient: 'from-teal-600/30 via-emerald-700/30 to-teal-900/40',
      category: ListingCategory.familyFlat 
    },
    { 
      name: 'Travel Stay', 
      image: '/assets/generated/travel-stay-room.dim_400x300.jpg', 
      gradient: 'from-emerald-600/30 via-green-700/30 to-emerald-900/40',
      category: ListingCategory.travelStay 
    },
    { 
      name: 'Event Space', 
      image: '/assets/generated/event-space-hall.dim_400x300.jpg', 
      gradient: 'from-rose-600/30 via-pink-700/30 to-rose-900/40',
      category: ListingCategory.eventSpace 
    },
  ], []);

  const handleCategoryClick = useCallback((category: ListingCategory) => {
    navigate({ to: '/listings', search: { category } });
  }, [navigate]);

  const handleExploreClick = useCallback(() => {
    navigate({ to: '/category-world' });
  }, [navigate]);

  const handlePartnerClick = useCallback(() => {
    navigate({ to: '/profile' });
  }, [navigate]);

  const handleListPropertyClick = useCallback(() => {
    navigate({ to: '/submit-property' });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* High-Resolution Cinematic Background - Optimized */}
      <div 
        className="fixed inset-0"
        style={{
          zIndex: 0,
          backgroundImage: 'url(/assets/generated/city-backdrop.dim_1920x1080.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: '-webkit-optimize-contrast',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* India Map Graphic Layer */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            opacity: 0.15,
          }}
        >
          <img 
            src="/assets/generated/india-map-outline-transparent.dim_800x600.png"
            alt="India Map"
            className="w-full h-full object-contain"
            style={{
              maxWidth: '600px',
              maxHeight: '600px',
              filter: 'brightness(1.2)',
              mixBlendMode: 'screen',
            }}
            loading="eager"
          />
        </div>

        {/* Soft Tricolor Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 153, 51, 0.08) 0%, rgba(255, 255, 255, 0.05) 33%, rgba(255, 255, 255, 0.05) 66%, rgba(19, 136, 8, 0.08) 100%)',
            zIndex: 2,
          }}
        />

        {/* Stable gradient overlays */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.40), rgba(23, 37, 84, 0.35), rgba(2, 6, 23, 0.40))',
            zIndex: 3,
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, rgba(88, 28, 135, 0.25), transparent, rgba(109, 40, 217, 0.25))',
            zIndex: 4,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="pt-24">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
            <div className="text-center max-w-7xl mx-auto w-full">
              {/* Enhanced India Patriotic Element */}
              <div className="mb-8 animate-in fade-in duration-1000 delay-100">
                <div className="inline-block relative">
                  <p 
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95 mb-3"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textShadow: '0 2px 25px rgba(0, 0, 0, 0.9), 0 4px 40px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    🇮🇳 MADE IN INDIA 🇮🇳
                  </p>
                  
                  <div className="relative mx-auto" style={{ width: '200px' }}>
                    <div 
                      className="flex h-1 rounded-full overflow-hidden"
                      style={{
                        background: 'linear-gradient(to right, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)',
                        boxShadow: '0 2px 15px rgba(255, 153, 51, 0.4), 0 2px 15px rgba(19, 136, 8, 0.4)',
                      }}
                    />
                    
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: '#000080',
                        opacity: 0.5,
                        boxShadow: '0 0 4px rgba(0, 0, 128, 0.3)',
                      }}
                    />
                    
                    <div 
                      className="absolute -bottom-2 left-0 right-0 h-4 rounded-full"
                      style={{
                        opacity: 0.6,
                        background: 'linear-gradient(to right, rgba(255, 153, 51, 0.3) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.3) 100%)',
                        filter: 'blur(8px)',
                      }}
                    />
                  </div>
                  
                  <div 
                    className="absolute -inset-6 rounded-full"
                    style={{
                      opacity: 0.4,
                      background: 'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(19, 136, 8, 0.15) 100%, transparent 100%)',
                      filter: 'blur(20px)',
                      animation: 'gentlePulse 3s ease-in-out infinite',
                    }}
                  />
                </div>
              </div>

              {/* Main Headline */}
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tighter leading-none animate-in fade-in duration-1000 delay-300"
                style={{
                  textShadow: '0 0 80px rgba(59, 130, 246, 1), 0 0 120px rgba(147, 51, 234, 0.8), 0 15px 40px rgba(0, 0, 0, 1)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 900,
                }}
              >
                ALL STAYS.<br />ONE PLACE.
              </h1>
              
              {/* Sub-headline */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 font-semibold mb-3 animate-in fade-in duration-1000 delay-400">
                Verified Listings. Real Owners. Easy Booking.
              </p>

              {/* Secondary Tagline */}
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 animate-in fade-in duration-1000 delay-500">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Stay Your Way
                </span>
                <span className="text-white mx-3">|</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                  Book in Min
                </span>
              </p>

              {/* List Your Property Button - Prominent CTA */}
              <div className="mb-12 animate-in fade-in duration-1000 delay-550">
                <Button 
                  onClick={handleListPropertyClick}
                  className="group relative px-10 sm:px-14 py-6 sm:py-8 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 hover:scale-110 border-3 border-green-400/70 hover:border-green-300/90 will-change-transform shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 80px rgba(34, 197, 94, 0.6), inset 0 2px 20px rgba(255, 255, 255, 0.2)',
                    fontFamily: 'Poppins, sans-serif',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Plus className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-90 transition-transform duration-300" />
                    List Your Property – Free
                  </span>
                  <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-teal-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ filter: 'blur(25px)' }}
                  />
                </Button>
                <p className="text-white/70 text-sm sm:text-base mt-4 font-medium">
                  ✨ No Login Required • Quick 2-Min Form • Admin Review in 24h
                </p>
              </div>

              {/* Live Availability Counter Widget - Lazy Loaded */}
              <div className="mb-12 animate-in fade-in duration-1000 delay-600">
                <Suspense fallback={<div className="h-20 bg-white/5 rounded-2xl animate-pulse" />}>
                  <AvailabilityCounter />
                </Suspense>
              </div>

              {/* Top Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-7xl mx-auto">
                {topCategories.map((category, index) => (
                  <CategoryCard
                    key={category.name}
                    category={category}
                    index={index}
                    onClick={() => handleCategoryClick(category.category)}
                  />
                ))}
              </div>

              {/* Stay Type Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-6xl mx-auto">
                {stayTypes.map((stay, index) => (
                  <StayTypeCard
                    key={stay.name}
                    stay={stay}
                    index={index}
                    onClick={() => handleCategoryClick(stay.category)}
                  />
                ))}
              </div>

              {/* Redesigned Booking Flow Section with Updated Messaging */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 max-w-6xl mx-auto">
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
                          <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300" />
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

              {/* Interactive India Map Section - Lazy Loaded */}
              <Suspense fallback={<div className="h-96 bg-white/5 rounded-3xl animate-pulse mb-16" />}>
                <IndiaMapSection />
              </Suspense>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
                <div 
                  className="bg-gradient-to-r from-green-600/35 to-emerald-600/35 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-400/50 hover:border-green-400/70 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in will-change-transform" 
                  style={{ 
                    animationDelay: '0ms', 
                    animationFillMode: 'forwards',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-300" />
                    <span className="text-white font-bold text-base sm:text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>PG found in 24h!</span>
                  </div>
                </div>

                <div 
                  className="bg-gradient-to-r from-blue-600/35 to-cyan-600/35 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-400/50 hover:border-blue-400/70 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in will-change-transform" 
                  style={{ 
                    animationDelay: '200ms', 
                    animationFillMode: 'forwards',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
                    <span className="text-white font-bold text-base sm:text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Direct Owner Contact</span>
                  </div>
                </div>

                <div 
                  className="bg-gradient-to-r from-purple-600/35 to-pink-600/35 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-400/50 hover:border-purple-400/70 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in will-change-transform" 
                  style={{ 
                    animationDelay: '400ms', 
                    animationFillMode: 'forwards',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
                    <span className="text-white font-bold text-base sm:text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Verified & Trusted</span>
                  </div>
                </div>
              </div>

              {/* Call-To-Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16">
                <Button 
                  onClick={handleExploreClick}
                  className="group relative px-8 sm:px-12 py-5 sm:py-7 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 hover:scale-105 border-2 border-blue-400/60 hover:border-blue-300/80 will-change-transform"
                  style={{
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(59, 130, 246, 0.5)',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Now
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ filter: 'blur(20px)' }}
                  />
                </Button>
                
                <Button 
                  onClick={handlePartnerClick}
                  className="group relative px-8 sm:px-12 py-5 sm:py-7 bg-gradient-to-r from-pink-600 via-purple-600 to-purple-500 text-white rounded-full font-bold text-xl sm:text-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-400/60 hover:border-purple-300/80 will-change-transform"
                  style={{
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(147, 51, 234, 0.5)',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  <span className="relative z-10">Become an Owner Partner</span>
                  <div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ filter: 'blur(20px)' }}
                  />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
