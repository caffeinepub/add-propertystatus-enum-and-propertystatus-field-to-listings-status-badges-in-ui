import Map "mo:core/Map";

module {
  type Listing = {
    id : Nat;
    title : Text;
    description : Text;
    category : {
      #pgHostel;
      #familyFlat;
      #hotel;
      #marriageHall;
      #studentStay;
      #travelStay;
      #eventSpace;
    };
    pricePerDay : Nat;
    images : [Blob];
    location : {
      lat : Float;
      lon : Float;
      address : Text;
    };
    availability : {
      status : {
        #available;
        #booked;
        #partiallyAvailable;
      };
      availableUnits : Nat;
      unitType : Text;
      dates : ?[{
        date : Int;
        availableUnits : Nat;
      }];
    };
    owner : Principal;
    contactInfo : Text;
    verified : Bool;
    featured : Bool;
    createdAt : Int;
    lastUpdated : Int;
    approvalStatus : {
      #pending;
      #approved;
      #rejected;
    };
  };

  type OldActor = {
    listings : Map.Map<Nat, Listing>;
    demoListings : Map.Map<Nat, Listing>;
    listingCache : Map.Map<Nat, Listing>;
    caches : Map.Map<Nat, Map.Map<Nat, Listing>>;
  };

  type NewListing = {
    id : Nat;
    title : Text;
    description : Text;
    category : {
      #pgHostel;
      #familyFlat;
      #hotel;
      #marriageHall;
      #studentStay;
      #travelStay;
      #eventSpace;
    };
    pricePerDay : Nat;
    images : [Blob];
    location : {
      lat : Float;
      lon : Float;
      address : Text;
    };
    availability : {
      status : {
        #available;
        #booked;
        #partiallyAvailable;
      };
      availableUnits : Nat;
      unitType : Text;
      dates : ?[{
        date : Int;
        availableUnits : Nat;
      }];
    };
    propertyStatus : {
      #available;
      #visitCompleted;
      #underConfirmation;
      #bookedViaSTYO;
    };
    owner : Principal;
    contactInfo : Text;
    verified : Bool;
    featured : Bool;
    createdAt : Int;
    lastUpdated : Int;
    approvalStatus : {
      #pending;
      #approved;
      #rejected;
    };
  };

  type NewActor = {
    listings : Map.Map<Nat, NewListing>;
    demoListings : Map.Map<Nat, NewListing>;
    listingCache : Map.Map<Nat, NewListing>;
    caches : Map.Map<Nat, Map.Map<Nat, NewListing>>;
  };

  public func run(old : OldActor) : NewActor {
    let newListings = old.listings.map<Nat, Listing, NewListing>(
      func(_id, listing) { { listing with propertyStatus = #available } }
    );

    let newDemoListings = old.demoListings.map<Nat, Listing, NewListing>(
      func(_id, listing) { { listing with propertyStatus = #available } }
    );

    let newListingCache = old.listingCache.map<Nat, Listing, NewListing>(
      func(_id, listing) { { listing with propertyStatus = #available } }
    );

    let newCaches = old.caches.map<Nat, Map.Map<Nat, Listing>, Map.Map<Nat, NewListing>>(
      func(_id, innerMap) {
        innerMap.map<Nat, Listing, NewListing>(func(_id, listing) { { listing with propertyStatus = #available } });
      }
    );

    {
      old with
      listings = newListings;
      demoListings = newDemoListings;
      listingCache = newListingCache;
      caches = newCaches;
    };
  };
};
