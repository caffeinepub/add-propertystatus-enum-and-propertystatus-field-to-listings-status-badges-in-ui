import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Review {
    id: bigint;
    listingId: bigint;
    createdAt: Time;
    comment: string;
    rating: bigint;
    reviewer: Principal;
}
export interface GeoLocation {
    lat: number;
    lon: number;
    address: string;
}
export type Time = bigint;
export interface Listing {
    id: bigint;
    title: string;
    verified: boolean;
    featured: boolean;
    contactInfo: string;
    owner: Principal;
    createdAt: Time;
    lastUpdated: Time;
    description: string;
    approvalStatus: ApprovalStatus;
    pricePerDay: bigint;
    availability: AvailabilityStatus;
    category: ListingCategory;
    propertyStatus: PropertyStatus;
    location: GeoLocation;
    images: Array<ExternalBlob>;
}
export interface CreatePaymentResponse {
    checkoutUrl: string;
    sessionId: string;
}
export interface CityChargeSettings {
    subscription: boolean;
    customerLeadCharge: boolean;
    ownerLeadCharge: boolean;
}
export interface AvailabilityCounts {
    marriageHalls: bigint;
    hotels: bigint;
    pgRooms: bigint;
    familyFlats: bigint;
}
export interface OwnerProfile {
    verified: boolean;
    ownerId: Principal;
    name: string;
    joinedAt: Time;
    email: string;
    contactNumber: string;
}
export interface PaymentSuccessResponse {
    message: string;
    payment: {
        status: string;
        paymentMethod: {
            last4: string;
            brand: string;
        };
        currency: string;
        amount: bigint;
    };
}
export interface QuickPublishResult {
    cacheHits: bigint;
    optimizationCycles: bigint;
    cacheMisses: bigint;
    frontendDeploymentTimeMs: bigint;
    success: boolean;
    backendSyncTimeMs: bigint;
    assetsValidated: bigint;
    assetsCached: bigint;
    buildTimeTotalNs: bigint;
}
export interface PublicListingSubmission {
    ownerId: Principal;
    listingId: bigint;
    ownerProfile: OwnerProfile;
}
export interface AdminNotification {
    id: bigint;
    customerName: string;
    customerPrincipal: Principal;
    read: boolean;
    propertyTitle: string;
    leadId: bigint;
    timestamp: Time;
    category: ListingCategory;
}
export interface PaymentCancelResponse {
    message: string;
    sessionId: string;
}
export interface EventMarker {
    id: bigint;
    createdAt: Time;
    type: string;
    message: string;
    badge: string;
    location: GeoLocation;
}
export interface LeadView {
    id: bigint;
    propertyCategory: ListingCategory;
    propertyArea: string;
    ownerName: string;
    listingId: bigint;
    ownerPrincipal: Principal;
    viewerName: string;
    propertyTitle: string;
    ownerContact: string;
    timestamp: Time;
    viewer: Principal;
}
export interface PublicListingInput {
    ownerEmail: string;
    title: string;
    contactInfo: string;
    ownerName: string;
    description: string;
    pricePerDay: bigint;
    availability: AvailabilityStatus;
    category: ListingCategory;
    location: GeoLocation;
    ownerContactNumber: string;
    images: Array<ExternalBlob>;
}
export interface AvailabilityStatus {
    unitType: string;
    status: Variant_partiallyAvailable_booked_available;
    availableUnits: bigint;
    dates?: Array<{
        date: Time;
        availableUnits: bigint;
    }>;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    registrationDate: Time;
    lastLogin: Time;
    isOwner: boolean;
    location?: GeoLocation;
    ipAddress: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ListingCategory {
    marriageHall = "marriageHall",
    studentStay = "studentStay",
    hotel = "hotel",
    travelStay = "travelStay",
    pgHostel = "pgHostel",
    familyFlat = "familyFlat",
    eventSpace = "eventSpace"
}
export enum PropertyStatus {
    bookedViaSTYO = "bookedViaSTYO",
    available = "available",
    visitCompleted = "visitCompleted",
    underConfirmation = "underConfirmation"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_partiallyAvailable_booked_available {
    partiallyAvailable = "partiallyAvailable",
    booked = "booked",
    available = "available"
}
export interface backendInterface {
    addReview(listingId: bigint, rating: bigint, comment: string): Promise<bigint>;
    adminInitialize(): Promise<void>;
    approveListing(_listingId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkUpdateCityCharges(updates: Array<[string, CityChargeSettings]>): Promise<void>;
    checkoutBookingHold(): Promise<CreatePaymentResponse>;
    checkoutFeaturedListing(): Promise<CreatePaymentResponse>;
    checkoutPropertyListing(): Promise<CreatePaymentResponse>;
    checkoutUnlockOwnerInfo(): Promise<CreatePaymentResponse>;
    createBooking(_listingId: bigint, _checkInDate: Time, _checkOutDate: Time): Promise<bigint>;
    createListing(_title: string, _description: string, _category: ListingCategory, _pricePerDay: bigint, _images: Array<ExternalBlob>, _location: GeoLocation, _availability: AvailabilityStatus, _contactInfo: string): Promise<bigint>;
    createOwnerUnlockRequest(_listingId: bigint): Promise<bigint>;
    getAdminDashboardData(): Promise<{
        leadViews: Array<LeadView>;
        notifications: Array<AdminNotification>;
        listings: Array<Listing>;
        users: Array<UserProfile>;
        cityCharges: Array<[string, CityChargeSettings]>;
    }>;
    getAdminNotifications(): Promise<Array<AdminNotification>>;
    getAvailability(id: bigint): Promise<AvailabilityStatus | null>;
    getAvailabilityCounts(): Promise<AvailabilityCounts>;
    getAvailableListings(): Promise<Array<Listing>>;
    getAverageRating(listingId: bigint): Promise<number | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChargeStatusForCity(city: string): Promise<CityChargeSettings>;
    getCityChargeSettings(): Promise<Array<[string, CityChargeSettings]>>;
    getEventMarkers(): Promise<Array<EventMarker>>;
    getFeaturedListings(): Promise<Array<Listing>>;
    getLeadAnalytics(): Promise<Array<LeadView>>;
    getListing(id: bigint): Promise<Listing | null>;
    getListings(): Promise<Array<Listing>>;
    getListingsByCategory(category: ListingCategory): Promise<Array<Listing>>;
    getListingsByLocation(lat: number, lon: number, radius: number | null): Promise<Array<Listing>>;
    getPendingSubmissions(): Promise<Array<[bigint, PublicListingSubmission]>>;
    getReviewsForListing(listingId: bigint): Promise<Array<Review>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVerifiedListings(): Promise<Array<Listing>>;
    initialize(): Promise<void>;
    initializeDemoData(): Promise<void>;
    initializeStripePrices(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isFreeTrialMode(): Promise<boolean>;
    markNotificationAsRead(notificationId: bigint): Promise<void>;
    paymentCancel(sessionId: string): Promise<PaymentCancelResponse>;
    paymentSuccess(sessionId: string, accountId: string, caffeineCustomerId: string): Promise<PaymentSuccessResponse>;
    quickPublishMode(): Promise<QuickPublishResult>;
    rejectListing(_listingId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setFreeTrialMode(enable: boolean): Promise<void>;
    submitPublicListing(listing: PublicListingInput): Promise<bigint>;
    updateAvailability(_listingId: bigint, _availability: AvailabilityStatus): Promise<void>;
    updateCityChargeSettings(city: string, settings: CityChargeSettings): Promise<void>;
    updateListing(_id: bigint, _listing: Listing): Promise<void>;
    updateOwnerProfile(_profile: OwnerProfile): Promise<void>;
    verifyListing(_listingId: bigint, _verified: boolean): Promise<void>;
}
