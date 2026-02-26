import { Building2, Home, Hotel, PartyPopper } from 'lucide-react';
import { useGetAvailabilityCounts } from '../hooks/useQueries';

export default function AvailabilityCounter() {
  const { data: counts, isLoading } = useGetAvailabilityCounts();

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div 
          className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border-2 border-white/20 animate-pulse"
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.2)',
          }}
        >
          <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-white/10 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const countsData = [
    {
      label: 'PG Rooms',
      count: counts?.pgRooms ? Number(counts.pgRooms) : 0,
      icon: Building2,
      gradient: 'from-blue-600/30 to-indigo-700/30',
      iconColor: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      label: 'Family Flats',
      count: counts?.familyFlats ? Number(counts.familyFlats) : 0,
      icon: Home,
      gradient: 'from-purple-600/30 to-pink-600/30',
      iconColor: 'text-purple-400',
      glowColor: 'rgba(147, 51, 234, 0.3)',
    },
    {
      label: 'Hotels',
      count: counts?.hotels ? Number(counts.hotels) : 0,
      icon: Hotel,
      gradient: 'from-cyan-600/30 to-blue-700/30',
      iconColor: 'text-cyan-400',
      glowColor: 'rgba(6, 182, 212, 0.3)',
    },
    {
      label: 'Marriage Halls',
      count: counts?.marriageHalls ? Number(counts.marriageHalls) : 0,
      icon: PartyPopper,
      gradient: 'from-pink-600/30 to-rose-700/30',
      iconColor: 'text-pink-400',
      glowColor: 'rgba(236, 72, 153, 0.3)',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-1000">
      <div 
        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border-2 border-white/20 hover:border-white/30 transition-all duration-500"
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.2)',
        }}
      >
        {/* Subtle glow effect */}
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl opacity-50"
          style={{ filter: 'blur(20px)', zIndex: -1 }}
        />

        {/* Title */}
        <h2 
          className="text-2xl md:text-3xl font-bold text-white text-center mb-6"
          style={{
            fontFamily: 'Poppins, sans-serif',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Live Availability
          </span>
        </h2>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {countsData.map((item, index) => (
            <div
              key={item.label}
              className="group relative"
              style={{
                animation: `fadeIn 0.8s ease-out ${0.1 + index * 0.1}s both`,
              }}
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: item.glowColor,
                  filter: 'blur(15px)',
                }}
              />

              {/* Counter Card */}
              <div 
                className={`relative bg-gradient-to-br ${item.gradient} rounded-2xl p-4 md:p-6 border border-white/20 group-hover:border-white/40 transition-all duration-500 hover:scale-105`}
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${item.glowColor}`,
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <item.icon 
                    className={`w-8 h-8 md:w-10 md:h-10 ${item.iconColor} group-hover:scale-110 transition-transform duration-500`}
                    style={{ filter: `drop-shadow(0 0 10px ${item.glowColor})` }}
                  />
                </div>

                {/* Count */}
                <div 
                  className="text-3xl md:text-4xl font-bold text-white text-center mb-2 group-hover:scale-110 transition-transform duration-500"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: '0 2px 15px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {item.count}
                </div>

                {/* Label */}
                <div 
                  className="text-xs md:text-sm font-semibold text-white/90 text-center"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: '0 1px 10px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div 
            className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
            style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}
          />
          <span className="text-white/70 text-sm font-medium">
            Live Updates
          </span>
        </div>
      </div>
    </div>
  );
}
