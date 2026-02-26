import { memo } from 'react';
import { useGetEventMarkers } from '../hooks/useQueries';
import { CheckCircle2 } from 'lucide-react';

const MapSection = memo(() => {
  const { data: markers } = useGetEventMarkers();

  return (
    <div className="relative max-w-6xl mx-auto mb-12 sm:mb-16">
      <div className="relative h-80 sm:h-96 bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Pins */}
        <div className="absolute top-1/4 left-1/4 animate-bounce-slow group cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full border-4 border-white shadow-2xl" style={{
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
          }} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
            {markers && markers[0] ? markers[0].message : 'Location 1'}
          </div>
        </div>
        
        <div className="absolute top-1/3 right-1/3 animate-bounce-slow group cursor-pointer" style={{ animationDelay: '0.3s' }}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full border-4 border-white shadow-2xl" style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
          }} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
            {markers && markers[1] ? markers[1].message : 'Location 2'}
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/2 animate-bounce-slow group cursor-pointer" style={{ animationDelay: '0.6s' }}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full border-4 border-white shadow-2xl" style={{
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
          }} />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
            Available Property
          </div>
        </div>

        {/* Floating Info Badges */}
        {markers && markers.map((marker, index) => (
          <div 
            key={marker.id.toString()}
            className="absolute bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl font-bold text-xs sm:text-sm animate-float flex items-center gap-2"
            style={{
              top: `${20 + index * 15}%`,
              left: index % 2 === 0 ? '5%' : 'auto',
              right: index % 2 === 1 ? '5%' : 'auto',
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{marker.message}</span>
            <span className="sm:hidden">{marker.badge}</span>
          </div>
        ))}

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-3 sm:py-4 text-center">
          <p className="text-white font-bold text-base sm:text-lg">
            Explore Properties Across India
          </p>
        </div>
      </div>
    </div>
  );
});

MapSection.displayName = 'MapSection';

export default MapSection;
