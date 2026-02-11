import { useGetFeaturedListings } from '../hooks/useQueries';
import ListingCard from './ListingCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedListings() {
  const { data: listings, isLoading } = useGetFeaturedListings();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-2xl bg-white/10" />
        ))}
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 text-lg">No featured listings available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing, index) => {
        // Cycle through variants for visual variety
        const variants: Array<'neumorphism' | 'glassmorphism' | 'gradient'> = ['glassmorphism', 'neumorphism', 'gradient'];
        const variant = variants[index % variants.length];
        
        return (
          <ListingCard 
            key={listing.id.toString()} 
            listing={listing} 
            variant={variant}
          />
        );
      })}
    </div>
  );
}
