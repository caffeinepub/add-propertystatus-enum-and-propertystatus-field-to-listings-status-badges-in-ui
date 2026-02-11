import { memo } from 'react';
import { MapPin } from 'lucide-react';

interface CityMarker {
  name: string;
  position: { top: string; left: string };
  status: 'active' | 'coming-soon';
  color: string;
  glowColor: string;
}

const cityMarkers: CityMarker[] = [
  {
    name: 'Kolkata',
    position: { top: '52%', left: '72%' },
    status: 'active',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
  },
  {
    name: 'Delhi',
    position: { top: '28%', left: '55%' },
    status: 'coming-soon',
    color: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.3)',
  },
  {
    name: 'Mumbai',
    position: { top: '58%', left: '48%' },
    status: 'coming-soon',
    color: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.3)',
  },
  {
    name: 'Bengaluru',
    position: { top: '72%', left: '56%' },
    status: 'coming-soon',
    color: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.3)',
  },
  {
    name: 'Chennai',
    position: { top: '72%', left: '62%' },
    status: 'coming-soon',
    color: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.3)',
  },
  {
    name: 'Hyderabad',
    position: { top: '62%', left: '58%' },
    status: 'coming-soon',
    color: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.3)',
  },
];

const CityMarkerComponent = memo(({ city }: { city: CityMarker }) => {
  const isActive = city.status === 'active';

  return (
    <div
      className="absolute group cursor-pointer z-10"
      style={{
        top: city.position.top,
        left: city.position.left,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-6 rounded-full ${isActive ? 'animate-pulse-slow' : ''}`}
        style={{
          background: city.glowColor,
          filter: 'blur(20px)',
          opacity: isActive ? 0.8 : 0.4,
        }}
      />

      {/* Ripple animation for active city */}
      {isActive && (
        <>
          <div
            className="absolute inset-0 rounded-full border-2 animate-ping-slow"
            style={{
              borderColor: city.color,
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 animate-ping-slower"
            style={{
              borderColor: city.color,
              opacity: 0.4,
            }}
          />
        </>
      )}

      {/* Map pin icon */}
      <MapPin
        className={`w-8 h-8 sm:w-10 sm:h-10 relative z-10 transition-all duration-300 ${
          isActive ? 'animate-bounce-slow' : 'group-hover:scale-125'
        }`}
        style={{
          color: city.color,
          filter: `drop-shadow(0 0 ${isActive ? '20px' : '10px'} ${city.glowColor})`,
        }}
      />

      {/* City label */}
      <div
        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <div
          className="bg-slate-900/90 rounded-lg px-3 py-1.5 border"
          style={{
            borderColor: city.color,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 4px 15px ${city.glowColor}`,
          }}
        >
          <span
            className="text-white font-bold text-xs sm:text-sm block"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {city.name}
          </span>
          <span
            className={`text-xs font-medium block ${
              isActive ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {isActive ? 'Active / Live' : 'Coming Soon'}
          </span>
        </div>
      </div>
    </div>
  );
});

CityMarkerComponent.displayName = 'CityMarkerComponent';

const IndiaMapSection = memo(() => {
  const kolkataCity = cityMarkers.find((city) => city.name === 'Kolkata');
  const otherCities = cityMarkers.filter((city) => city.name !== 'Kolkata');

  return (
    <div className="relative mb-16 max-w-6xl mx-auto">
      <div
        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 sm:p-12 overflow-hidden"
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow:
            '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(59, 130, 246, 0.2), inset 0 2px 20px rgba(255, 255, 255, 0.05)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0" style={{ opacity: 0.1 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-center relative z-10"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Explore Listings in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Kolkata
          </span>
          {' '}→{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            PAN India
          </span>
        </h2>

        {/* India Map Container */}
        <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '4/3' }}>
          {/* India map background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/assets/generated/india-map-outline-transparent.dim_800x600.png"
              alt="India Map"
              className="w-full h-full object-contain"
              style={{
                filter: 'brightness(0.8) contrast(1.2)',
                opacity: 0.4,
              }}
              loading="lazy"
            />
          </div>

          {/* Animated expansion lines from Kolkata */}
          {kolkataCity && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 5 }}
            >
              {otherCities.map((city, index) => {
                const kolkataX = parseFloat(kolkataCity.position.left);
                const kolkataY = parseFloat(kolkataCity.position.top);
                const cityX = parseFloat(city.position.left);
                const cityY = parseFloat(city.position.top);

                return (
                  <line
                    key={city.name}
                    x1={`${kolkataX}%`}
                    y1={`${kolkataY}%`}
                    x2={`${cityX}%`}
                    y2={`${cityY}%`}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="animate-dash"
                    style={{
                      opacity: 0.5,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  />
                );
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* City markers */}
          {cityMarkers.map((city) => (
            <CityMarkerComponent key={city.name} city={city} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 relative z-10">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full animate-pulse-slow"
              style={{
                backgroundColor: '#ef4444',
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)',
              }}
            />
            <span className="text-white/90 text-sm font-semibold">Active / Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#9ca3af',
                boxShadow: '0 0 8px rgba(156, 163, 175, 0.5)',
              }}
            />
            <span className="text-white/90 text-sm font-semibold">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
});

IndiaMapSection.displayName = 'IndiaMapSection';

export default IndiaMapSection;
