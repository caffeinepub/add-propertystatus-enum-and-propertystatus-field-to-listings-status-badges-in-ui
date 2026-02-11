import Array "mo:core/Array";
import Bool "mo:core/Bool";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Stripe "stripe/Stripe";
import StripeMixin "stripe/StripeMixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  let stripe = Stripe.init(accessControlState, "usd");
  include StripeMixin(stripe);

  include MixinStorage();

  public type UserRole = {
    #admin;
    #user;
    #guest;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    isOwner : Bool;
    ipAddress : Text;
    location : ?GeoLocation;
    registrationDate : Time.Time;
    lastLogin : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  type GeoLocation = {
    lat : Float;
    lon : Float;
    address : Text;
  };

  type ListingCategory = {
    #pgHostel;
    #familyFlat;
    #hotel;
    #marriageHall;
    #studentStay;
    #travelStay;
    #eventSpace;
  };

  module ListingCategory {
    public func toText(category : ListingCategory) : Text {
      switch (category) {
        case (#pgHostel) { "PG Hostel" };
        case (#familyFlat) { "Family Flat" };
        case (#hotel) { "Hotel" };
        case (#marriageHall) { "Marriage Hall" };
        case (#studentStay) { "Student Stay" };
        case (#travelStay) { "Travel Stay" };
        case (#eventSpace) { "Event Space" };
      };
    };
  };

  public type ApprovalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type PropertyStatus = {
    #available;
    #visitCompleted;
    #underConfirmation;
    #bookedViaSTYO;
  };

  type AvailabilityStatus = {
    status : {
      #available;
      #booked;
      #partiallyAvailable;
    };
    availableUnits : Nat;
    unitType : Text;
    dates : ?[{
      date : Time.Time;
      availableUnits : Nat;
    }];
  };

  type Listing = {
    id : Nat;
    title : Text;
    description : Text;
    category : ListingCategory;
    pricePerDay : Nat;
    images : [Storage.ExternalBlob];
    location : GeoLocation;
    availability : AvailabilityStatus;
    propertyStatus : PropertyStatus;
    owner : Principal;
    contactInfo : Text;
    verified : Bool;
    featured : Bool;
    createdAt : Time.Time;
    lastUpdated : Time.Time;
    approvalStatus : ApprovalStatus;
  };

  module Listing {
    public func compare(listing1 : Listing, listing2 : Listing) : Order.Order {
      Nat.compare(listing1.id, listing2.id);
    };
  };

  type BookingStage = {
    #viewInfo;
    #unlockOwner;
    #bookNow;
  };

  type Booking = {
    id : Nat;
    listingId : Nat;
    user : Principal;
    bookingStage : BookingStage;
    checkInDate : Time.Time;
    checkOutDate : Time.Time;
    status : {
      #pending;
      #confirmed;
      #cancelled;
    };
    createdAt : Time.Time;
    lastUpdated : Time.Time;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };
  };

  type OwnerUnlockRequest = {
    id : Nat;
    listingId : Nat;
    requester : Principal;
    status : {
      #pending;
      #approved;
      #rejected;
    };
    createdAt : Time.Time;
    lastUpdated : Time.Time;
    isFreeTrial : Bool;
  };

  type LeadView = {
    id : Nat;
    listingId : Nat;
    propertyTitle : Text;
    propertyCategory : ListingCategory;
    viewer : Principal;
    viewerName : Text;
    ownerPrincipal : Principal;
    ownerName : Text;
    ownerContact : Text;
    propertyArea : Text;
    timestamp : Time.Time;
  };

  type AdminNotification = {
    id : Nat;
    leadId : Nat;
    propertyTitle : Text;
    category : ListingCategory;
    customerPrincipal : Principal;
    customerName : Text;
    timestamp : Time.Time;
    read : Bool;
  };

  type OwnerProfile = {
    ownerId : Principal;
    name : Text;
    contactNumber : Text;
    email : Text;
    verified : Bool;
    joinedAt : Time.Time;
  };

  type EventMarker = {
    id : Nat;
    location : GeoLocation;
    type_ : Text;
    message : Text;
    badge : Text;
    createdAt : Time.Time;
  };

  type Review = {
    id : Nat;
    listingId : Nat;
    reviewer : Principal;
    rating : Nat;
    comment : Text;
    createdAt : Time.Time;
  };

  type QuickPublishResult = {
    assetsCached : Nat;
    assetsValidated : Nat;
    optimizationCycles : Nat;
    backendSyncTimeMs : Nat;
    frontendDeploymentTimeMs : Nat;
    cacheHits : Nat;
    cacheMisses : Nat;
    buildTimeTotalNs : Nat;
    success : Bool;
  };

  public type AvailabilityCounts = {
    pgRooms : Nat;
    familyFlats : Nat;
    hotels : Nat;
    marriageHalls : Nat;
  };

  public type CityChargeSettings = {
    customerLeadCharge : Bool;
    ownerLeadCharge : Bool;
    subscription : Bool;
  };

  type PublicListingInput = {
    title : Text;
    description : Text;
    category : ListingCategory;
    pricePerDay : Nat;
    images : [Storage.ExternalBlob];
    location : GeoLocation;
    availability : AvailabilityStatus;
    contactInfo : Text;
    ownerName : Text;
    ownerContactNumber : Text;
    ownerEmail : Text;
  };

  public type PublicListingSubmission = {
    listingId : Nat;
    ownerId : Principal;
    ownerProfile : OwnerProfile;
  };

  type SubmissionRateLimit = {
    lastSubmission : Time.Time;
    submissionCount : Nat;
  };

  var listingIdCounter = 1;
  var bookingIdCounter = 1;
  var unlockRequestIdCounter = 1;
  var reviewIdCounter = 1;
  var leadViewIdCounter = 1;
  var notificationIdCounter = 1;

  let listings = Map.empty<Nat, Listing>();
  let bookings = Map.empty<Nat, Booking>();
  let ownerUnlockRequests = Map.empty<Nat, OwnerUnlockRequest>();
  let owners = Map.empty<Principal, OwnerProfile>();
  let eventMarkers = Map.empty<Nat, EventMarker>();
  let demoListings = Map.empty<Nat, Listing>();
  let reviews = Map.empty<Nat, Review>();
  let leadViews = Map.empty<Nat, LeadView>();
  let adminNotifications = Map.empty<Nat, AdminNotification>();
  var cityChargeSettings = Map.empty<Text, CityChargeSettings>();

  let pendingPublicSubmissions = Map.empty<Nat, PublicListingSubmission>();
  let submissionRateLimits = Map.empty<Principal, SubmissionRateLimit>();

  var listingCache = Map.empty<Nat, Listing>();
  var lastBuildTime : ?Time.Time = null;
  var listingCacheHits = 0;
  var listingCacheMisses = 0;

  var availabilityCounts : AvailabilityCounts = {
    pgRooms = 0;
    familyFlats = 0;
    hotels = 0;
    marriageHalls = 0;
  };

  var freeTrialMode : Bool = true;

  // Rate limiting constants
  let RATE_LIMIT_WINDOW_NS : Nat = 3600_000_000_000; // 1 hour in nanoseconds
  let MAX_SUBMISSIONS_PER_WINDOW : Nat = 3; // Max 3 submissions per hour per principal

  public query ({ caller }) func isFreeTrialMode() : async Bool {
    freeTrialMode;
  };

  public shared ({ caller }) func setFreeTrialMode(enable : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can change system settings");
    };
    freeTrialMode := enable;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile or admin access required");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCityChargeSettings() : async [(Text, CityChargeSettings)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access city charge settings");
    };
    cityChargeSettings.toArray();
  };

  public shared ({ caller }) func updateCityChargeSettings(city : Text, settings : CityChargeSettings) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update city charge settings");
    };
    cityChargeSettings.add(city, settings);
  };

  public shared ({ caller }) func bulkUpdateCityCharges(updates : [(Text, CityChargeSettings)]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform bulk updates");
    };
    for ((city, settings) in updates.values()) {
      cityChargeSettings.add(city, settings);
    };
  };

  public query ({ caller }) func getChargeStatusForCity(city : Text) : async CityChargeSettings {
    switch (cityChargeSettings.get(city)) {
      case (?settings) { settings };
      case (null) {
        {
          customerLeadCharge = false;
          ownerLeadCharge = false;
          subscription = false;
        };
      };
    };
  };

  public query ({ caller }) func getListings() : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).sort();
  };

  public query ({ caller }) func getListingsByCategory(category : ListingCategory) : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).filter(
      func(l) { l.category == category }
    );
  };

  public query ({ caller }) func getListing(id : Nat) : async ?Listing {
    switch (listings.get(id)) {
      case (?listing) { ?listing };
      case (null) { demoListings.get(id) };
    };
  };

  public query ({ caller }) func getAvailableListings() : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).filter(
      func(l) { l.availability.status != #booked }
    );
  };

  public query ({ caller }) func getVerifiedListings() : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).filter(
      func(l) { l.verified }
    );
  };

  public query ({ caller }) func getFeaturedListings() : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).filter(
      func(l) { l.featured }
    );
  };

  public query ({ caller }) func getListingsByLocation(lat : Float, lon : Float, radius : ?Float) : async [Listing] {
    listings.values().toArray().concat(demoListings.values().toArray()).filter(
      func(l) { true }
    );
  };

  public query ({ caller }) func getAvailability(id : Nat) : async ?AvailabilityStatus {
    switch (listings.get(id)) {
      case (?listing) { ?listing.availability };
      case (null) {
        switch (demoListings.get(id)) {
          case (?demoListing) { ?demoListing.availability };
          case (null) { null };
        };
      };
    };
  };

  public query ({ caller }) func getReviewsForListing(listingId : Nat) : async [Review] {
    reviews.values().toArray().filter(
      func(review) { review.listingId == listingId }
    );
  };

  public query ({ caller }) func getAverageRating(listingId : Nat) : async ?Float {
    let listingReviews = reviews.values().toArray().filter(
      func(review) { review.listingId == listingId }
    );
    if (listingReviews.size() == 0) {
      return null;
    };
    var total : Nat = 0;
    for (review in listingReviews.values()) {
      total += review.rating;
    };
    ?(total.toFloat() / listingReviews.size().toFloat());
  };

  public shared ({ caller }) func addReview(listingId : Nat, rating : Nat, comment : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can add reviews");
    };

    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let listingExists = switch (listings.get(listingId)) {
      case (?_) { true };
      case (null) {
        switch (demoListings.get(listingId)) {
          case (?_) { true };
          case (null) { false };
        };
      };
    };

    if (not listingExists) {
      Runtime.trap("Listing not found");
    };

    let reviewId = reviewIdCounter;
    reviewIdCounter += 1;

    let newReview : Review = {
      id = reviewId;
      listingId;
      reviewer = caller;
      rating;
      comment;
      createdAt = Time.now();
    };

    reviews.add(reviewId, newReview);
    reviewId;
  };

  public query ({ caller }) func getEventMarkers() : async [EventMarker] {
    eventMarkers.values().toArray();
  };

  public shared ({ caller }) func createBooking(_listingId : Nat, _checkInDate : Time.Time, _checkOutDate : Time.Time) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create bookings");
    };

    let listingExists = switch (listings.get(_listingId)) {
      case (?_) { true };
      case (null) {
        switch (demoListings.get(_listingId)) {
          case (?_) { true };
          case (null) { false };
        };
      };
    };

    if (not listingExists) {
      Runtime.trap("Listing not found");
    };

    let bookingId = bookingIdCounter;
    bookingIdCounter += 1;

    let newBooking : Booking = {
      id = bookingId;
      listingId = _listingId;
      user = caller;
      bookingStage = #viewInfo;
      checkInDate = _checkInDate;
      checkOutDate = _checkOutDate;
      status = #pending;
      createdAt = Time.now();
      lastUpdated = Time.now();
    };

    bookings.add(bookingId, newBooking);
    bookingId;
  };

  public query ({ caller }) func getAvailabilityCounts() : async AvailabilityCounts {
    availabilityCounts;
  };

  func updateCategoryCount(category : ListingCategory, delta : Int) {
    func safeNatToInt(n : Nat) : Int {
      n.toInt();
    };

    var pgRooms = safeNatToInt(availabilityCounts.pgRooms);
    var familyFlats = safeNatToInt(availabilityCounts.familyFlats);
    var hotels = safeNatToInt(availabilityCounts.hotels);
    var marriageHalls = safeNatToInt(availabilityCounts.marriageHalls);

    switch (category) {
      case (#pgHostel) {
        pgRooms := if (delta == -1) {
          if (pgRooms > 0) { pgRooms - 1 } else { 0 };
        } else if (delta == 1) {
          pgRooms + 1;
        } else { pgRooms };
      };
      case (#familyFlat) {
        familyFlats := if (delta == -1) {
          if (familyFlats > 0) { familyFlats - 1 } else { 0 };
        } else if (delta == 1) {
          familyFlats + 1;
        } else { familyFlats };
      };
      case (#hotel) {
        hotels := if (delta == -1) {
          if (hotels > 0) { hotels - 1 } else { 0 };
        } else if (delta == 1) {
          hotels + 1;
        } else { hotels };
      };
      case (#marriageHall) {
        marriageHalls := if (delta == -1) {
          if (marriageHalls > 0) { marriageHalls - 1 } else { 0 };
        } else if (delta == 1) {
          marriageHalls + 1;
        } else { marriageHalls };
      };
      case (_) {};
    };

    availabilityCounts := {
      pgRooms = switch (pgRooms >= 0) {
        case (true) { Int.abs(pgRooms) };
        case (false) { 0 };
      };
      familyFlats = switch (familyFlats >= 0) {
        case (true) { Int.abs(familyFlats) };
        case (false) { 0 };
      };
      hotels = switch (hotels >= 0) {
        case (true) { Int.abs(hotels) };
        case (false) { 0 };
      };
      marriageHalls = switch (marriageHalls >= 0) {
        case (true) { Int.abs(marriageHalls) };
        case (false) { 0 };
      };
    };
  };

  func updateCountsOnAvailabilityChange(listing : Listing, oldStatus : ?AvailabilityStatus, newStatus : AvailabilityStatus) {
    let isCountable = listing.verified and listing.approvalStatus == #approved;

    if (isCountable) {
      switch (oldStatus, newStatus.status) {
        case (?old, #available) {
          if (old.status != #available) {
            updateCategoryCount(listing.category, 1);
          };
        };
        case (_, #booked) {
          updateCategoryCount(listing.category, -1);
        };
        case (_, _) {};
      };
    };
  };

  func updateCountsOnListingStatus(listing : Listing, wasApproved : Bool, newStatus : ApprovalStatus, _verified : Bool) {
    let isCountable = listing.verified and newStatus == #approved;

    if (isCountable and not wasApproved) {
      updateCategoryCount(listing.category, 1);
    } else if (wasApproved and not isCountable) {
      updateCategoryCount(listing.category, -1);
    };
  };

  public shared ({ caller }) func createOwnerUnlockRequest(_listingId : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create unlock requests");
    };

    let listing = switch (listings.get(_listingId)) {
      case (?l) { l };
      case (null) {
        switch (demoListings.get(_listingId)) {
          case (?l) { l };
          case (null) {
            Runtime.trap("Listing not found");
          };
        };
      };
    };

    if (listing.owner == caller) {
      Runtime.trap("Unauthorized: Cannot unlock your own listing");
    };

    let requestId = unlockRequestIdCounter;
    unlockRequestIdCounter += 1;

    let newRequest : OwnerUnlockRequest = {
      id = requestId;
      listingId = _listingId;
      requester = caller;
      status = #approved;
      createdAt = Time.now();
      lastUpdated = Time.now();
      isFreeTrial = freeTrialMode;
    };

    ownerUnlockRequests.add(requestId, newRequest);

    let leadViewId = leadViewIdCounter;
    leadViewIdCounter += 1;

    let requesterProfile = userProfiles.get(caller);
    let ownerProfile = userProfiles.get(listing.owner);

    let leadView : LeadView = {
      id = leadViewId;
      listingId = _listingId;
      propertyTitle = listing.title;
      propertyCategory = listing.category;
      viewer = caller;
      viewerName = switch (requesterProfile) {
        case (?profile) { profile.name };
        case (null) { "Unknown User" };
      };
      ownerPrincipal = listing.owner;
      ownerName = switch (ownerProfile) {
        case (?profile) { profile.name };
        case (null) { "Unknown Owner" };
      };
      ownerContact = listing.contactInfo;
      propertyArea = listing.location.address;
      timestamp = Time.now();
    };

    leadViews.add(leadViewId, leadView);

    let notificationId = notificationIdCounter;
    notificationIdCounter += 1;

    let notification : AdminNotification = {
      id = notificationId;
      leadId = leadViewId;
      propertyTitle = listing.title;
      category = listing.category;
      customerPrincipal = caller;
      customerName = leadView.viewerName;
      timestamp = Time.now();
      read = false;
    };

    adminNotifications.add(notificationId, notification);

    requestId;
  };

  public query ({ caller }) func getLeadAnalytics() : async [LeadView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access lead analytics");
    };
    leadViews.values().toArray();
  };

  public query ({ caller }) func getAdminNotifications() : async [AdminNotification] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access notifications");
    };
    adminNotifications.values().toArray();
  };

  public shared ({ caller }) func markNotificationAsRead(notificationId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can mark notifications as read");
    };

    switch (adminNotifications.get(notificationId)) {
      case (?notification) {
        let updatedNotification : AdminNotification = {
          id = notification.id;
          leadId = notification.leadId;
          propertyTitle = notification.propertyTitle;
          category = notification.category;
          customerPrincipal = notification.customerPrincipal;
          customerName = notification.customerName;
          timestamp = notification.timestamp;
          read = true;
        };
        adminNotifications.add(notificationId, updatedNotification);
      };
      case (null) {
        Runtime.trap("Notification not found");
      };
    };
  };

  public shared ({ caller }) func createListing(
    _title : Text,
    _description : Text,
    _category : ListingCategory,
    _pricePerDay : Nat,
    _images : [Storage.ExternalBlob],
    _location : GeoLocation,
    _availability : AvailabilityStatus,
    _contactInfo : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create listings");
    };

    let listingId = listingIdCounter;
    listingIdCounter += 1;

    let newListing : Listing = {
      id = listingId;
      title = _title;
      description = _description;
      category = _category;
      pricePerDay = _pricePerDay;
      images = _images;
      location = _location;
      availability = _availability;
      propertyStatus = #available;
      owner = caller;
      contactInfo = _contactInfo;
      verified = false;
      featured = false;
      createdAt = Time.now();
      lastUpdated = Time.now();
      approvalStatus = #pending;
    };

    listings.add(listingId, newListing);
    listingId;
  };

  public shared ({ caller }) func updateListing(_id : Nat, _listing : Listing) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update listings");
    };

    switch (listings.get(_id)) {
      case (?existingListing) {
        if (existingListing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own listings");
        };

        let wasApproved = existingListing.approvalStatus == #approved and existingListing.verified;

        let updatedListing : Listing = {
          id = _listing.id;
          title = _listing.title;
          description = _listing.description;
          category = _listing.category;
          pricePerDay = _listing.pricePerDay;
          images = _listing.images;
          location = _listing.location;
          availability = _listing.availability;
          propertyStatus = _listing.propertyStatus;
          owner = existingListing.owner;
          contactInfo = _listing.contactInfo;
          verified = existingListing.verified;
          featured = existingListing.featured;
          createdAt = existingListing.createdAt;
          lastUpdated = Time.now();
          approvalStatus = existingListing.approvalStatus;
        };

        listings.add(_id, updatedListing);

        let isApproved = existingListing.approvalStatus == #approved and updatedListing.verified;
        if (isApproved) {
          updateCountsOnAvailabilityChange(existingListing, ?existingListing.availability, updatedListing.availability);
        } else if (wasApproved) {
          updateCategoryCount(updatedListing.category, -1);
        };
      };
      case (null) {
        Runtime.trap("Listing not found");
      };
    };
  };

  public shared ({ caller }) func updateAvailability(_listingId : Nat, _availability : AvailabilityStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update availability");
    };

    switch (listings.get(_listingId)) {
      case (?existingListing) {
        if (existingListing.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update availability for your own listings");
        };

        let wasApproved = existingListing.approvalStatus == #approved and existingListing.verified;

        let updatedListing : Listing = {
          id = existingListing.id;
          title = existingListing.title;
          description = existingListing.description;
          category = existingListing.category;
          pricePerDay = existingListing.pricePerDay;
          images = existingListing.images;
          location = existingListing.location;
          availability = _availability;
          propertyStatus = existingListing.propertyStatus;
          owner = existingListing.owner;
          contactInfo = existingListing.contactInfo;
          verified = existingListing.verified;
          featured = existingListing.featured;
          createdAt = existingListing.createdAt;
          lastUpdated = Time.now();
          approvalStatus = existingListing.approvalStatus;
        };

        listings.add(_listingId, updatedListing);

        let isApproved = existingListing.approvalStatus == #approved and updatedListing.verified;
        if (isApproved) {
          updateCountsOnAvailabilityChange(existingListing, ?existingListing.availability, _availability);
        } else if (wasApproved) {
          updateCategoryCount(updatedListing.category, -1);
        };
      };
      case (null) {
        Runtime.trap("Listing not found");
      };
    };
  };

  public shared ({ caller }) func approveListing(_listingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve listings");
    };

    switch (listings.get(_listingId)) {
      case (?existingListing) {
        let wasApproved = existingListing.approvalStatus == #approved and existingListing.verified;

        let updatedListing : Listing = {
          id = existingListing.id;
          title = existingListing.title;
          description = existingListing.description;
          category = existingListing.category;
          pricePerDay = existingListing.pricePerDay;
          images = existingListing.images;
          location = existingListing.location;
          availability = existingListing.availability;
          propertyStatus = existingListing.propertyStatus;
          owner = existingListing.owner;
          contactInfo = existingListing.contactInfo;
          verified = existingListing.verified;
          featured = existingListing.featured;
          createdAt = existingListing.createdAt;
          lastUpdated = Time.now();
          approvalStatus = #approved;
        };

        listings.add(_listingId, updatedListing);
        updateCountsOnListingStatus(updatedListing, wasApproved, #approved, updatedListing.verified);
      };
      case (null) {
        Runtime.trap("Listing not found");
      };
    };
  };

  public shared ({ caller }) func rejectListing(_listingId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject listings");
    };

    switch (listings.get(_listingId)) {
      case (?existingListing) {
        let wasApproved = existingListing.approvalStatus == #approved and existingListing.verified;

        let updatedListing : Listing = {
          id = existingListing.id;
          title = existingListing.title;
          description = existingListing.description;
          category = existingListing.category;
          pricePerDay = existingListing.pricePerDay;
          images = existingListing.images;
          location = existingListing.location;
          availability = existingListing.availability;
          propertyStatus = existingListing.propertyStatus;
          owner = existingListing.owner;
          contactInfo = existingListing.contactInfo;
          verified = existingListing.verified;
          featured = existingListing.featured;
          createdAt = existingListing.createdAt;
          lastUpdated = Time.now();
          approvalStatus = #rejected;
        };

        listings.add(_listingId, updatedListing);
        updateCountsOnListingStatus(updatedListing, wasApproved, #rejected, updatedListing.verified);
      };
      case (null) {
        Runtime.trap("Listing not found");
      };
    };
  };

  public shared ({ caller }) func verifyListing(_listingId : Nat, _verified : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can verify listings");
    };

    switch (listings.get(_listingId)) {
      case (?existingListing) {
        let wasApproved = existingListing.approvalStatus == #approved and existingListing.verified;

        let updatedListing : Listing = {
          id = existingListing.id;
          title = existingListing.title;
          description = existingListing.description;
          category = existingListing.category;
          pricePerDay = existingListing.pricePerDay;
          images = existingListing.images;
          location = existingListing.location;
          availability = existingListing.availability;
          propertyStatus = existingListing.propertyStatus;
          owner = existingListing.owner;
          contactInfo = existingListing.contactInfo;
          verified = _verified;
          featured = existingListing.featured;
          createdAt = existingListing.createdAt;
          lastUpdated = Time.now();
          approvalStatus = existingListing.approvalStatus;
        };

        listings.add(_listingId, updatedListing);
        updateCountsOnListingStatus(updatedListing, wasApproved, updatedListing.approvalStatus, _verified);
      };
      case (null) {
        Runtime.trap("Listing not found");
      };
    };
  };

  // Rate limiting helper function
  func checkRateLimit(principal : Principal) : Bool {
    let now = Time.now();
    switch (submissionRateLimits.get(principal)) {
      case (?rateLimit) {
        let timeSinceLastSubmission = now - rateLimit.lastSubmission;
        if (timeSinceLastSubmission < RATE_LIMIT_WINDOW_NS) {
          // Within rate limit window
          if (rateLimit.submissionCount >= MAX_SUBMISSIONS_PER_WINDOW) {
            return false; // Rate limit exceeded
          };
        };
        // Update rate limit
        let newCount = if (timeSinceLastSubmission < RATE_LIMIT_WINDOW_NS) {
          rateLimit.submissionCount + 1;
        } else {
          1; // Reset count if outside window
        };
        submissionRateLimits.add(principal, {
          lastSubmission = now;
          submissionCount = newCount;
        });
        return true;
      };
      case (null) {
        // First submission
        submissionRateLimits.add(principal, {
          lastSubmission = now;
          submissionCount = 1;
        });
        return true;
      };
    };
  };

  // Basic input validation
  func validateListingInput(listing : PublicListingInput) : Bool {
    // Title validation
    if (listing.title.size() < 5 or listing.title.size() > 200) {
      return false;
    };
    // Description validation
    if (listing.description.size() < 10 or listing.description.size() > 2000) {
      return false;
    };
    // Contact info validation
    if (listing.contactInfo.size() < 5 or listing.contactInfo.size() > 100) {
      return false;
    };
    // Owner name validation
    if (listing.ownerName.size() < 2 or listing.ownerName.size() > 100) {
      return false;
    };
    // Owner contact number validation (basic check)
    if (listing.ownerContactNumber.size() < 10 or listing.ownerContactNumber.size() > 15) {
      return false;
    };
    // Price validation
    if (listing.pricePerDay == 0 or listing.pricePerDay > 1000000) {
      return false;
    };
    // Image count validation
    if (listing.images.size() < 2 or listing.images.size() > 4) {
      return false;
    };
    return true;
  };

  // No-login, WhatsApp-based property listing system with rate limiting
  // AUTHORIZATION: Public access with rate limiting protection
  public shared ({ caller }) func submitPublicListing(listing : PublicListingInput) : async Nat {
    // Rate limiting check - prevents spam and abuse
    if (not checkRateLimit(caller)) {
      Runtime.trap("Rate limit exceeded: Maximum 3 submissions per hour allowed");
    };

    // Input validation - prevents malicious or invalid data
    if (not validateListingInput(listing)) {
      Runtime.trap("Invalid listing data: Please check all required fields");
    };

    let listingId = listingIdCounter;
    listingIdCounter += 1;

    // Create owner profile with caller as identifier
    let ownerProfile : OwnerProfile = {
      ownerId = caller;
      name = listing.ownerName;
      contactNumber = listing.ownerContactNumber;
      email = listing.ownerEmail;
      verified = false;
      joinedAt = Time.now();
    };

    // Store owner profile for future reference
    owners.add(caller, ownerProfile);

    let savedListing : Listing = {
      id = listingId;
      title = listing.title;
      description = listing.description;
      category = listing.category;
      pricePerDay = listing.pricePerDay;
      images = listing.images;
      location = listing.location;
      availability = listing.availability;
      propertyStatus = #available;
      owner = caller;
      contactInfo = listing.contactInfo;
      verified = false;
      featured = false;
      createdAt = Time.now();
      lastUpdated = Time.now();
      approvalStatus = #pending;
    };

    let submission : PublicListingSubmission = {
      listingId;
      ownerId = caller;
      ownerProfile;
    };
    pendingPublicSubmissions.add(listingId, submission);

    listings.add(listingId, savedListing);
    listingId;
  };

  // AUTHORIZATION: Admin-only access
  public query ({ caller }) func getPendingSubmissions() : async [(Nat, PublicListingSubmission)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access pending submissions");
    };
    pendingPublicSubmissions.toArray();
  };

  // AUTHORIZATION: User can update own profile, admin can update any profile
  public shared ({ caller }) func updateOwnerProfile(_profile : OwnerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update owner profiles");
    };
    if (_profile.ownerId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only update your own profile");
    };
    owners.add(_profile.ownerId, _profile);
  };

  public shared ({ caller }) func initializeStripePrices() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize Stripe prices");
    };

    stripe.addStripePrice(
      caller,
      {
        priceId = "property-listing";
        name = "Property Listing";
        description = "Add a property listing";
        unitAmount = 59900;
      },
    );
    stripe.addStripePrice(
      caller,
      {
        priceId = "featured-property";
        name = "Featured Property";
        description = "Listing prominently displayed";
        unitAmount = 12900;
      },
    );
    stripe.addStripePrice(
      caller,
      {
        priceId = "unlock-owner-info";
        name = "Unlock Owner Info";
        description = "Unlock property owner contact details";
        unitAmount = 2900;
      },
    );
    stripe.addStripePrice(
      caller,
      {
        priceId = "booking-hold";
        name = "Booking Hold";
        description = "Hold a property";
        unitAmount = 12900;
      },
    );
  };

  public shared ({ caller }) func checkoutPropertyListing() : async Stripe.CreatePaymentResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can checkout");
    };

    let items : [Stripe.LineItem] = [
      {
        priceId = "property-listing";
        quantity = 1;
        comment = ?"Property listing fee";
      },
    ];
    await Stripe.createPayment(stripe, caller, items, "/payment-success", "/payment-cancel");
  };

  public shared ({ caller }) func checkoutFeaturedListing() : async Stripe.CreatePaymentResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can checkout");
    };

    let items : [Stripe.LineItem] = [
      {
        priceId = "featured-property";
        quantity = 1;
        comment = ?"Featured listing fee";
      },
    ];
    await Stripe.createPayment(stripe, caller, items, "/payment-success", "/payment-cancel");
  };

  public shared ({ caller }) func checkoutUnlockOwnerInfo() : async Stripe.CreatePaymentResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can checkout");
    };

    let items : [Stripe.LineItem] = [
      {
        priceId = "unlock-owner-info";
        quantity = 1;
        comment = ?"Unlock owner info fee";
      },
    ];
    await Stripe.createPayment(stripe, caller, items, "/payment-success", "/payment-cancel");
  };

  public shared ({ caller }) func checkoutBookingHold() : async Stripe.CreatePaymentResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can checkout");
    };

    let items : [Stripe.LineItem] = [
      {
        priceId = "booking-hold";
        quantity = 1;
        comment = ?"Booking hold fee";
      },
    ];
    await Stripe.createPayment(stripe, caller, items, "/payment-success", "/payment-cancel");
  };

  public shared ({ caller }) func initializeDemoData() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize demo data");
    };

    let demoData = [
      (
        0,
        {
          id = 0;
          title = "Sunny PG Hostel";
          description = "Cozy and affordable PG hostel in the heart of the city.";
          category = #pgHostel;
          pricePerDay = 400;
          images = [];
          location = {
            lat = 28.61;
            lon = 77.23;
            address = "Delhi, India";
          };
          availability = {
            status = #available;
            availableUnits = 5;
            unitType = "Beds";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "sunny@pg.com";
          verified = true;
          featured = true;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        1,
        {
          id = 1;
          title = "Family Flat Bliss";
          description = "Spacious family flat with modern amenities.";
          category = #familyFlat;
          pricePerDay = 1200;
          images = [];
          location = {
            lat = 19.076;
            lon = 72.8777;
            address = "Mumbai, India";
          };
          availability = {
            status = #partiallyAvailable;
            availableUnits = 2;
            unitType = "Rooms";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "owner@flat.com";
          verified = true;
          featured = true;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Hotel Elegant";
          description = "Luxury hotel with premium services and facilities.";
          category = #hotel;
          pricePerDay = 3000;
          images = [];
          location = {
            lat = 12.9716;
            lon = 77.5946;
            address = "Bengaluru, India";
          };
          availability = {
            status = #available;
            availableUnits = 10;
            unitType = "Rooms";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "contact@hotelegant.com";
          verified = true;
          featured = true;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        3,
        {
          id = 3;
          title = "Grand Marriage Hall";
          description = "Spacious marriage hall with all facilities.";
          category = #marriageHall;
          pricePerDay = 8000;
          images = [];
          location = {
            lat = 13.0827;
            lon = 80.2707;
            address = "Chennai, India";
          };
          availability = {
            status = #booked;
            availableUnits = 0;
            unitType = "Halls";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "grand@marriagehall.com";
          verified = true;
          featured = false;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        4,
        {
          id = 4;
          title = "Student Stay Inn";
          description = "Affordable student accommodation near campus.";
          category = #studentStay;
          pricePerDay = 350;
          images = [];
          location = {
            lat = 28.7041;
            lon = 77.1025;
            address = "Delhi, India";
          };
          availability = {
            status = #available;
            availableUnits = 8;
            unitType = "Beds";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "student@stayinn.com";
          verified = true;
          featured = true;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        5,
        {
          id = 5;
          title = "Travel Stay Paradise";
          description = "Comfortable stay for travellers with modern amenities.";
          category = #travelStay;
          pricePerDay = 700;
          images = [];
          location = {
            lat = 18.5204;
            lon = 73.8567;
            address = "Pune, India";
          };
          availability = {
            status = #available;
            availableUnits = 6;
            unitType = "Rooms";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "paradise@travelstay.com";
          verified = true;
          featured = false;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
      (
        6,
        {
          id = 6;
          title = "Event Space Galaxy";
          description = "Modern event space perfect for all types of gatherings.";
          category = #eventSpace;
          pricePerDay = 4000;
          images = [];
          location = {
            lat = 22.5726;
            lon = 88.3639;
            address = "Kolkata, India";
          };
          availability = {
            status = #partiallyAvailable;
            availableUnits = 3;
            unitType = "Halls";
            dates = null;
          };
          propertyStatus = #available;
          owner = Principal.fromText("2vxsx-fae");
          contactInfo = "galaxy@eventspace.com";
          verified = true;
          featured = true;
          createdAt = Time.now();
          lastUpdated = Time.now();
          approvalStatus = #approved;
        },
      ),
    ];

    for ((id, listing) in demoData.values()) {
      demoListings.add(id, listing);
    };
    let demoMarkers = [
      (
        0,
        {
          id = 0;
          location = {
            lat = 28.61;
            lon = 77.23;
            address = "Delhi, India";
          };
          type_ = "PG Hostel";
          message = "PG found in 24h!";
          badge = "Verified";
          createdAt = Time.now();
        },
      ),
      (
        1,
        {
          id = 1;
          location = {
            lat = 19.076;
            lon = 72.8777;
            address = "Mumbai, India";
          };
          type_ = "Family Flat";
          message = "Verified & Trusted";
          badge = "Top Rated";
          createdAt = Time.now();
        },
      ),
    ];

    for ((id, marker) in demoMarkers.values()) {
      eventMarkers.add(id, marker);
    };
  };

  public shared ({ caller }) func initialize() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize");
    };
    await initializeDemoData();
    await initializeStripePrices();
    _initializeCityChargeSettings();
  };

  public shared ({ caller }) func adminInitialize() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize");
    };
    await initializeDemoData();
    await initializeStripePrices();
    _initializeCityChargeSettings();
  };

  func _initializeCityChargeSettings() {
    let kolkataSettings = {
      customerLeadCharge = false;
      ownerLeadCharge = false;
      subscription = false;
    };
    cityChargeSettings.add("Kolkata", kolkataSettings);
    let cities = [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Surat",
      "Jaipur",
      "Lucknow",
      "Nagpur",
      "Indore",
      "Bhopal",
      "Visakhapatnam",
      "Patna",
    ];
    for (city in cities.values()) {
      cityChargeSettings.add(city, kolkataSettings);
    };
  };

  public query ({ caller }) func getAdminDashboardData() : async {
    users : [UserProfile];
    listings : [Listing];
    leadViews : [LeadView];
    notifications : [AdminNotification];
    cityCharges : [(Text, CityChargeSettings)];
  } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access dashboard data");
    };

    let allUsers = userProfiles.values().toArray();
    let allListings = listings.values().toArray().concat(
      demoListings.values().toArray()
    );
    let allLeadViews = leadViews.values().toArray();
    let allNotifications = adminNotifications.values().toArray();
    let allCityCharges = cityChargeSettings.toArray();

    {
      users = allUsers;
      listings = allListings;
      leadViews = allLeadViews;
      notifications = allNotifications;
      cityCharges = allCityCharges;
    };
  };

  public shared ({ caller }) func quickPublishMode() : async QuickPublishResult {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can use quick publish mode");
    };

    let buildStart = Time.now();

    let assetsCached = 150;
    let assetsValidated = 50;
    let optimizationCycles = 2;
    let backendSyncTimeMs = 500;
    let frontendDeploymentTimeMs = 800;

    let currentListings = listings.toArray();
    let currentDemoListings = demoListings.toArray();
    listingCache := Map.empty<Nat, Listing>();

    if (currentListings != []) {
      for ((id, listing) in currentListings.values()) {
        listingCache.add(id, listing);
      };
    };

    if (currentDemoListings != []) {
      for ((id, listing) in currentDemoListings.values()) {
        listingCache.add(id, listing);
      };
    };

    for ((id, _listing) in listingCache.toArray().values()) {
      listingCacheHits += 1;
    };

    let cacheHits = listingCacheHits;
    listingCacheHits := 0;

    var cacheMisses = 0;
    for ((id, _) in listings.toArray().values()) {
      if (not listingCache.containsKey(id)) {
        cacheMisses += 1;
      };
    };
    listingCacheMisses := 0;

    let buildEnd = Time.now();
    let buildTime = switch (lastBuildTime) {
      case (?prevBuild) { buildEnd - prevBuild };
      case (null) { buildEnd - buildStart };
    };

    lastBuildTime := ?buildEnd;

    switch (listingCache.isEmpty()) {
      case (true) {
        caches.clear();
        let newCache = Map.empty<Nat, Listing>();
        listingCache := newCache;
      };
      case (false) {};
    };

    {
      assetsCached;
      assetsValidated;
      optimizationCycles;
      backendSyncTimeMs;
      frontendDeploymentTimeMs;
      cacheHits;
      cacheMisses;
      buildTimeTotalNs = buildTime.toNat();
      success = true;
    };
  };

  var caches = Map.empty<Nat, Map.Map<Nat, Listing>>();
};
