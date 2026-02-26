import { useState, useEffect, lazy, Suspense, memo, useCallback } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useGetListings, useGetListingsByCategory } from '../hooks/useQueries';
import { ListingCategory } from '../backend';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

// Lazy load heavy components
const ListingCard3D = lazy(() => import('../components/ListingCard3D'));
const MapSection = lazy(() => import('../components/MapSection'));

// Memoized loading skeleton
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} className="h-96 rounded-2xl bg-white/10" />
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default function ListingPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { category?: ListingCategory };
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'all'>(search.category || 'all');

  useEffect(() => {
    if (search.category && search.category !== selectedCategory) {
      setSelectedCategory(search.category);
    }
  }, [search.category]);

  const { data: allListings, isLoading: allLoading, isError: allError } = useGetListings();
  const { data: categoryListings, isLoading: categoryLoading, isError: categoryError } = useGetListingsByCategory(
    selectedCategory !== 'all' ? selectedCategory : undefined
  );

  const listings = selectedCategory === 'all' ? allListings : categoryListings;
  const isLoading = selectedCategory === 'all' ? allLoading : categoryLoading;
  const isError = selectedCategory === 'all' ? allError : categoryError;

  const handleCategoryChange = useCallback((value: string) => {
    const category = value === 'all' ? 'all' : value as ListingCategory;
    setSelectedCategory(category);
    if (category !== 'all') {
      navigate({ to: '/listings', search: { category } });
    } else {
      navigate({ to: '/listings' });
    }
  }, [navigate]);

  const handleViewAll = useCallback(() => {
    handleCategoryChange('all');
  }, [handleCategoryChange]);

  const getCategoryLabel = useCallback((category: ListingCategory | 'all'): string => {
    if (category === 'all') return 'All Categories';
    const labels: Record<ListingCategory, string> = {
      [ListingCategory.pgHostel]: 'PG Hostel',
      [ListingCategory.familyFlat]: 'Family Flat',
      [ListingCategory.hotel]: 'Hotel',
      [ListingCategory.marriageHall]: 'Marriage Hall',
      [ListingCategory.studentStay]: 'Student Stay',
      [ListingCategory.travelStay]: 'Travel Stay',
      [ListingCategory.eventSpace]: 'Event Space',
    };
    return labels[category] || category;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-24 sm:pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white text-center mb-6 animate-in fade-in">
          {selectedCategory !== 'all' ? getCategoryLabel(selectedCategory) : 'Browse Listings'}
        </h1>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-64 bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value={ListingCategory.pgHostel}>PG Hostel</SelectItem>
              <SelectItem value={ListingCategory.familyFlat}>Family Flat</SelectItem>
              <SelectItem value={ListingCategory.hotel}>Hotel</SelectItem>
              <SelectItem value={ListingCategory.marriageHall}>Marriage Hall</SelectItem>
              <SelectItem value={ListingCategory.studentStay}>Student Stay</SelectItem>
              <SelectItem value={ListingCategory.travelStay}>Travel Stay</SelectItem>
              <SelectItem value={ListingCategory.eventSpace}>Event Space</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Map Section - Lazy Loaded */}
        <Suspense fallback={<div className="h-96 bg-white/5 rounded-3xl animate-pulse mb-16" />}>
          <MapSection />
        </Suspense>

        {/* Listings Grid */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
            {selectedCategory !== 'all' 
              ? `${getCategoryLabel(selectedCategory)} Properties` 
              : 'Available Properties'}
          </h2>
          
          {isLoading ? (
            <LoadingSkeleton />
          ) : isError ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-6 py-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <p className="text-red-400 text-base sm:text-lg font-medium">
                  Failed to load listings. Please try again later.
                </p>
              </div>
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {listings.map((listing, index) => (
                <Suspense key={listing.id.toString()} fallback={<Skeleton className="h-96 rounded-2xl bg-white/10" />}>
                  <ListingCard3D listing={listing} index={index} />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg sm:text-xl">
                No listings found in {selectedCategory !== 'all' ? getCategoryLabel(selectedCategory) : 'this category'}
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={handleViewAll}
                  className="mt-4 text-blue-400 hover:text-blue-300 underline text-sm sm:text-base"
                >
                  View all categories
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
