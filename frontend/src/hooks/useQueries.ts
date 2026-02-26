import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, Listing, ListingCategory, EventMarker, Review, AvailabilityStatus, GeoLocation, QuickPublishResult, AvailabilityCounts, LeadView, AdminNotification, CityChargeSettings, PublicListingInput, PublicListingSubmission, PropertyStatus } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Capture IP and location data
      try {
        const locationData = await captureLocationData();
        console.log('Location captured:', locationData);
      } catch (error) {
        console.warn('Failed to capture location:', error);
      }
      
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getListings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000, // Cache for 30 seconds
  });
}

export function useGetListingsByCategory(category?: ListingCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings', 'category', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getListingsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
    staleTime: 30000, // Cache for 30 seconds
  });
}

export function useGetListing(id?: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Listing | null>({
    queryKey: ['listing', id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getListing(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useGetFeaturedListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings', 'featured'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedListings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useGetVerifiedListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings', 'verified'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVerifiedListings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useGetEventMarkers() {
  const { actor, isFetching } = useActor();

  return useQuery<EventMarker[]>({
    queryKey: ['eventMarkers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEventMarkers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000, // Cache for 1 minute
  });
}

export function useGetReviewsForListing(listingId?: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews', listingId?.toString()],
    queryFn: async () => {
      if (!actor || listingId === undefined) return [];
      return actor.getReviewsForListing(listingId);
    },
    enabled: !!actor && !isFetching && listingId !== undefined,
  });
}

export function useGetAverageRating(listingId?: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<number | null>({
    queryKey: ['averageRating', listingId?.toString()],
    queryFn: async () => {
      if (!actor || listingId === undefined) return null;
      return actor.getAverageRating(listingId);
    },
    enabled: !!actor && !isFetching && listingId !== undefined,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId, rating, comment }: { listingId: bigint; rating: bigint; comment: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addReview(listingId, rating, comment);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.listingId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['averageRating', variables.listingId.toString()] });
    },
  });
}

export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      category,
      pricePerDay,
      images,
      location,
      availability,
      contactInfo,
    }: {
      title: string;
      description: string;
      category: ListingCategory;
      pricePerDay: bigint;
      images: ExternalBlob[];
      location: GeoLocation;
      availability: AvailabilityStatus;
      contactInfo: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createListing(
        title,
        description,
        category,
        pricePerDay,
        images,
        location,
        availability,
        contactInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['availabilityCounts'] });
    },
  });
}

export function useUpdateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, listing }: { id: bigint; listing: Listing }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateListing(id, listing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['availabilityCounts'] });
    },
  });
}

export function useUpdatePropertyStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ listingId, newStatus }: { listingId: bigint; newStatus: PropertyStatus }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePropertyStatus(listingId, newStatus);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', variables.listingId.toString()] });
    },
  });
}

export function useProcessExpiredListings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.processExpiredListings();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}

// Public Property Submission Hook
export function useSubmitPublicListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: PublicListingInput) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitPublicListing(listing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['pendingSubmissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

// Get Pending Public Submissions (Admin only)
export function useGetPendingSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<[bigint, PublicListingSubmission][]>({
    queryKey: ['pendingSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingSubmissions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000,
  });
}

// Availability Counts Hook
export function useGetAvailabilityCounts() {
  const { actor, isFetching } = useActor();

  return useQuery<AvailabilityCounts>({
    queryKey: ['availabilityCounts'],
    queryFn: async () => {
      if (!actor) return { pgRooms: 0n, familyFlats: 0n, hotels: 0n, marriageHalls: 0n };
      return actor.getAvailabilityCounts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000, // Cache for 30 seconds
    refetchInterval: 60000, // Auto-refresh every minute
  });
}

// Lead tracking and unlock
export function useCreateOwnerUnlockRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listingId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createOwnerUnlockRequest(listingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadAnalytics'] });
      queryClient.invalidateQueries({ queryKey: ['adminNotifications'] });
    },
  });
}

// Admin hooks
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
    staleTime: 60000,
  });
}

export function useGetAdminDashboardData() {
  const { actor, isFetching } = useActor();

  return useQuery<{ 
    users: UserProfile[]; 
    listings: Listing[]; 
    leadViews: LeadView[]; 
    notifications: AdminNotification[];
    cityCharges: [string, CityChargeSettings][];
  }>({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      if (!actor) return { users: [], listings: [], leadViews: [], notifications: [], cityCharges: [] };
      return actor.getAdminDashboardData();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000, // Cache for 10 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds for notifications
  });
}

export function useGetLeadAnalytics() {
  const { actor, isFetching } = useActor();

  return useQuery<LeadView[]>({
    queryKey: ['leadAnalytics'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeadAnalytics();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000,
  });
}

export function useGetAdminNotifications() {
  const { actor, isFetching } = useActor();

  return useQuery<AdminNotification[]>({
    queryKey: ['adminNotifications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAdminNotifications();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10000,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}

export function useMarkNotificationAsRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markNotificationAsRead(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useIsFreeTrialMode() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['freeTrialMode'],
    queryFn: async () => {
      if (!actor) return true;
      return actor.isFreeTrialMode();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

export function useSetFreeTrialMode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enable: boolean) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.setFreeTrialMode(enable);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freeTrialMode'] });
    },
  });
}

export function useQuickPublishMode() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.quickPublishMode();
    },
  });
}

// City Charge Settings Hooks
export function useGetCityChargeSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<[string, CityChargeSettings][]>({
    queryKey: ['cityChargeSettings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCityChargeSettings();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useUpdateCityChargeSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ city, settings }: { city: string; settings: CityChargeSettings }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateCityChargeSettings(city, settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cityChargeSettings'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useBulkUpdateCityCharges() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: [string, CityChargeSettings][]) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.bulkUpdateCityCharges(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cityChargeSettings'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useGetChargeStatusForCity(city?: string) {
  const { actor, isFetching } = useActor();

  return useQuery<CityChargeSettings>({
    queryKey: ['cityChargeStatus', city],
    queryFn: async () => {
      if (!actor || !city) return { customerLeadCharge: false, ownerLeadCharge: false, subscription: false };
      return actor.getChargeStatusForCity(city);
    },
    enabled: !!actor && !isFetching && !!city,
    staleTime: 30000,
  });
}

// Helper function to capture location data
async function captureLocationData(): Promise<{ ip: string; location: string }> {
  try {
    // Get IP address from ipify API
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Get approximate location from ip-api.com
    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const locationData = await locationResponse.json();
    
    const location = locationData.status === 'success' 
      ? `${locationData.city}, ${locationData.regionName}, ${locationData.country}`
      : 'Unknown';

    return { ip, location };
  } catch (error) {
    console.error('Failed to capture location data:', error);
    throw error;
  }
}
