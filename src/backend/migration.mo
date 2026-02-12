import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
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

  type ApprovalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type PropertyStatus = {
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

  type OldListing = {
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

  type OldActor = {
    listings : Map.Map<Nat, OldListing>;
    demoListings : Map.Map<Nat, OldListing>;
    listingCache : Map.Map<Nat, OldListing>;
    caches : Map.Map<Nat, Map.Map<Nat, OldListing>>;
  };

  type NewListing = {
    id : Nat;
    title : Text;
    description : Text;
    category : ListingCategory;
    pricePerDay : Nat;
    images : [Storage.ExternalBlob];
    location : GeoLocation;
    availability : AvailabilityStatus;
    propertyStatus : PropertyStatus;
    statusTimestamp : Time.Time;
    owner : Principal;
    contactInfo : Text;
    verified : Bool;
    featured : Bool;
    createdAt : Time.Time;
    lastUpdated : Time.Time;
    approvalStatus : ApprovalStatus;
  };

  type NewActor = {
    listings : Map.Map<Nat, NewListing>;
    demoListings : Map.Map<Nat, NewListing>;
    listingCache : Map.Map<Nat, NewListing>;
    caches : Map.Map<Nat, Map.Map<Nat, NewListing>>;
  };

  func migrateListing(oldListing : OldListing, timestamp : Time.Time) : NewListing {
    { oldListing with statusTimestamp = timestamp };
  };

  func migrateNestedListingMap(oldMap : Map.Map<Nat, OldListing>, timestamp : Time.Time) : Map.Map<Nat, NewListing> {
    oldMap.map<Nat, OldListing, NewListing>(
      func(_, oldListing) { migrateListing(oldListing, timestamp) }
    );
  };

  func migrateCaches(oldCaches : Map.Map<Nat, Map.Map<Nat, OldListing>>, timestamp : Time.Time) : Map.Map<Nat, Map.Map<Nat, NewListing>> {
    oldCaches.map<Nat, Map.Map<Nat, OldListing>, Map.Map<Nat, NewListing>>(
      func(_, oldMap) { migrateNestedListingMap(oldMap, timestamp) }
    );
  };

  public func run(old : OldActor) : NewActor {
    let timestamp = Time.now();
    {
      listings = migrateNestedListingMap(old.listings, timestamp);
      demoListings = migrateNestedListingMap(old.demoListings, timestamp);
      listingCache = migrateNestedListingMap(old.listingCache, timestamp);
      caches = migrateCaches(old.caches, timestamp);
    };
  };
};
