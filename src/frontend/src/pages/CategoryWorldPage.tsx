import { useNavigate } from '@tanstack/react-router';
import { ListingCategory } from '../backend';

export default function CategoryWorldPage() {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'PG Hostel', 
      image: '/assets/generated/pg-hostel-room.dim_400x300.jpg', 
      color: 'from-blue-600/30 to-blue-800/40',
      category: ListingCategory.pgHostel,
      description: 'Affordable paying guest accommodations'
    },
    { 
      name: 'Family Flat', 
      image: '/assets/generated/family-flat-exterior.dim_400x300.jpg', 
      color: 'from-purple-600/30 to-purple-800/40',
      category: ListingCategory.familyFlat,
      description: 'Spacious family apartments'
    },
    { 
      name: 'Hotel', 
      image: '/assets/generated/hotel-exterior.dim_400x300.jpg', 
      color: 'from-indigo-600/30 to-indigo-800/40',
      category: ListingCategory.hotel,
      description: 'Luxury hotel accommodations'
    },
    { 
      name: 'Marriage Hall', 
      image: '/assets/generated/marriage-hall-interior.dim_400x300.jpg', 
      color: 'from-pink-600/30 to-pink-800/40',
      category: ListingCategory.marriageHall,
      description: 'Grand venues for weddings'
    },
    { 
      name: 'Student Stay', 
      image: '/assets/generated/student-room.dim_400x300.jpg', 
      color: 'from-cyan-600/30 to-cyan-800/40',
      category: ListingCategory.studentStay,
      description: 'Student-friendly accommodations'
    },
    { 
      name: 'Travel Stay', 
      image: '/assets/generated/travel-stay-room.dim_400x300.jpg', 
      color: 'from-teal-600/30 to-teal-800/40',
      category: ListingCategory.travelStay,
      description: 'Short-term travel stays'
    },
    { 
      name: 'Event Space', 
      image: '/assets/generated/event-space-hall.dim_400x300.jpg', 
      color: 'from-rose-600/30 to-rose-800/40',
      category: ListingCategory.eventSpace,
      description: 'Versatile event venues'
    },
  ];

  const handleCategoryClick = (category: ListingCategory) => {
    navigate({ to: '/listings', search: { category } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-6 animate-in fade-in">
          Category World
        </h1>
        <p className="text-xl text-white/70 text-center mb-16">
          Explore all accommodation types
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.category)}
              className="group relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500 animate-float"
              style={{
                animationDelay: `${index * 0.1}s`,
                perspective: '1000px',
              }}
            >
              <div className="relative h-80 overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-y-5">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                  style={{ 
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  loading="eager"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-20 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  animation: 'shine 1.5s infinite',
                }} />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="text-white font-bold text-3xl mb-2 drop-shadow-2xl">{category.name}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                  <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                    Tap to explore →
                  </div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 animate-ping-slow" style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
