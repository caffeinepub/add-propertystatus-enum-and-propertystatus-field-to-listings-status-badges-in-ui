import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetListings, useCreateListing, useUpdateListing, useUpdatePropertyStatus } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ListingCategory, Variant_partiallyAvailable_booked_available, PropertyStatus } from '../backend';
import { Plus, Edit, Building2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import PropertyStatusBadge from '../components/PropertyStatusBadge';

export default function PropertyManagementPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: allListings, isLoading } = useGetListings();
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();
  const updatePropertyStatus = useUpdatePropertyStatus();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ListingCategory.pgHostel,
    pricePerDay: '',
    contactInfo: '',
    address: '',
    lat: '',
    lon: '',
    availableUnits: '',
    unitType: '',
    status: Variant_partiallyAvailable_booked_available.available,
  });

  const myListings = allListings?.filter(
    (listing) => identity && listing.owner.toString() === identity.getPrincipal().toString()
  ) || [];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: ListingCategory.pgHostel,
      pricePerDay: '',
      contactInfo: '',
      address: '',
      lat: '',
      lon: '',
      availableUnits: '',
      unitType: '',
      status: Variant_partiallyAvailable_booked_available.available,
    });
  };

  const handleCreateListing = async () => {
    if (!formData.title || !formData.description || !formData.pricePerDay || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createListing.mutateAsync({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        pricePerDay: BigInt(formData.pricePerDay),
        images: [],
        location: {
          lat: parseFloat(formData.lat) || 22.5726,
          lon: parseFloat(formData.lon) || 88.3639,
          address: formData.address,
        },
        availability: {
          status: formData.status,
          availableUnits: BigInt(formData.availableUnits || '1'),
          unitType: formData.unitType || 'Units',
          dates: [],
        },
        contactInfo: formData.contactInfo,
      });

      toast.success('Property created successfully!');
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error('Failed to create property');
    }
  };

  const handleEditListing = async () => {
    if (!editingListing) return;

    try {
      await updateListing.mutateAsync({
        id: editingListing.id,
        listing: {
          ...editingListing,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          pricePerDay: BigInt(formData.pricePerDay),
          location: {
            lat: parseFloat(formData.lat),
            lon: parseFloat(formData.lon),
            address: formData.address,
          },
          availability: {
            status: formData.status,
            availableUnits: BigInt(formData.availableUnits),
            unitType: formData.unitType,
            dates: editingListing.availability.dates,
          },
          contactInfo: formData.contactInfo,
        },
      });

      toast.success('Property updated successfully!');
      setIsEditDialogOpen(false);
      setEditingListing(null);
      resetForm();
    } catch (error) {
      console.error('Failed to update listing:', error);
      toast.error('Failed to update property');
    }
  };

  const openEditDialog = (listing: any) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      description: listing.description,
      category: listing.category,
      pricePerDay: listing.pricePerDay.toString(),
      contactInfo: listing.contactInfo,
      address: listing.location.address,
      lat: listing.location.lat.toString(),
      lon: listing.location.lon.toString(),
      availableUnits: listing.availability.availableUnits.toString(),
      unitType: listing.availability.unitType,
      status: listing.availability.status,
    });
    setIsEditDialogOpen(true);
  };

  const handlePropertyStatusTransition = async (listingId: bigint, currentStatus: PropertyStatus) => {
    let nextStatus: PropertyStatus | null = null;

    switch (currentStatus) {
      case PropertyStatus.available:
        nextStatus = PropertyStatus.visitCompleted;
        break;
      case PropertyStatus.visitCompleted:
        nextStatus = PropertyStatus.underConfirmation;
        break;
      case PropertyStatus.underConfirmation:
        nextStatus = PropertyStatus.bookedViaSTYO;
        break;
      default:
        toast.error('No valid transition available');
        return;
    }

    try {
      await updatePropertyStatus.mutateAsync({ listingId, newStatus: nextStatus });
      toast.success(`Property status updated to ${getStatusLabel(nextStatus)}`);
    } catch (error: any) {
      console.error('Failed to update property status:', error);
      toast.error('Failed to update status', {
        description: error.message || 'Please try again',
      });
    }
  };

  const getStatusLabel = (status: PropertyStatus): string => {
    switch (status) {
      case PropertyStatus.available:
        return 'Available';
      case PropertyStatus.visitCompleted:
        return 'Visit Completed';
      case PropertyStatus.underConfirmation:
        return 'Under Confirmation';
      case PropertyStatus.bookedViaSTYO:
        return 'Booked via STYO';
      default:
        return 'Unknown';
    }
  };

  const getNextStatusLabel = (currentStatus: PropertyStatus): string | null => {
    switch (currentStatus) {
      case PropertyStatus.available:
        return 'Mark Visit Completed';
      case PropertyStatus.visitCompleted:
        return 'Move to Under Confirmation';
      case PropertyStatus.underConfirmation:
        return 'Mark as Booked via STYO';
      default:
        return null;
    }
  };

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Please log in to manage properties</h1>
          <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Building2 className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-black text-white">My Properties</h1>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Create New Property</DialogTitle>
                <DialogDescription className="text-white/70">
                  Add a new property listing to the platform
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="e.g., Sunny PG Hostel"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Describe your property..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                  <div>
                    <Label htmlFor="pricePerDay">Price per Day (₹) *</Label>
                    <Input
                      id="pricePerDay"
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => handleInputChange('pricePerDay', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="e.g., Kolkata, India"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude (optional)</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="0.0001"
                      value={formData.lat}
                      onChange={(e) => handleInputChange('lat', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="22.5726"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lon">Longitude (optional)</Label>
                    <Input
                      id="lon"
                      type="number"
                      step="0.0001"
                      value={formData.lon}
                      onChange={(e) => handleInputChange('lon', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="88.3639"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="availableUnits">Available Units</Label>
                    <Input
                      id="availableUnits"
                      type="number"
                      value={formData.availableUnits}
                      onChange={(e) => handleInputChange('availableUnits', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitType">Unit Type</Label>
                    <Input
                      id="unitType"
                      value={formData.unitType}
                      onChange={(e) => handleInputChange('unitType', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="e.g., Rooms, Beds"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Availability Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Variant_partiallyAvailable_booked_available.available}>Available</SelectItem>
                      <SelectItem value={Variant_partiallyAvailable_booked_available.partiallyAvailable}>Partially Available</SelectItem>
                      <SelectItem value={Variant_partiallyAvailable_booked_available.booked}>Booked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Email or phone"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCreateListing}
                    disabled={createListing.isPending}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    {createListing.isPending ? 'Creating...' : 'Create Property'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      resetForm();
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl bg-white/10" />
            ))}
          </div>
        ) : myListings.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-xl border-white/20">
            <CardContent className="py-16 text-center">
              <Building2 className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-xl mb-4">You haven't added any properties yet</p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((listing) => (
              <Card key={listing.id.toString()} className="bg-white/5 backdrop-blur-xl border-white/20 hover:border-white/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">{listing.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {listing.category}
                      </CardDescription>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(listing)}
                      className="text-white hover:bg-white/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Price:</span>
                      <span className="text-white font-bold">₹{listing.pricePerDay.toString()}/day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Location:</span>
                      <span className="text-white text-sm">{listing.location.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Availability:</span>
                      <Badge
                        className={
                          listing.availability.status === 'available'
                            ? 'bg-green-600'
                            : listing.availability.status === 'partiallyAvailable'
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                        }
                      >
                        {listing.availability.status === 'available'
                          ? 'Available'
                          : listing.availability.status === 'partiallyAvailable'
                          ? 'Partial'
                          : 'Booked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Property Status:</span>
                      <PropertyStatusBadge status={listing.propertyStatus} />
                    </div>
                    <div className="flex gap-2 pt-2">
                      {listing.verified && <Badge className="bg-green-600">Verified</Badge>}
                      {listing.featured && <Badge className="bg-yellow-600">Featured</Badge>}
                    </div>
                    {getNextStatusLabel(listing.propertyStatus) && (
                      <Button
                        onClick={() => handlePropertyStatusTransition(listing.id, listing.propertyStatus)}
                        disabled={updatePropertyStatus.isPending}
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="sm"
                      >
                        {updatePropertyStatus.isPending ? (
                          'Updating...'
                        ) : (
                          <>
                            {getNextStatusLabel(listing.propertyStatus)}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Property</DialogTitle>
              <DialogDescription className="text-white/70">
                Update your property listing details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="edit-title">Property Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                <div>
                  <Label htmlFor="edit-pricePerDay">Price per Day (₹) *</Label>
                  <Input
                    id="edit-pricePerDay"
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) => handleInputChange('pricePerDay', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-address">Address *</Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-lat">Latitude</Label>
                  <Input
                    id="edit-lat"
                    type="number"
                    step="0.0001"
                    value={formData.lat}
                    onChange={(e) => handleInputChange('lat', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-lon">Longitude</Label>
                  <Input
                    id="edit-lon"
                    type="number"
                    step="0.0001"
                    value={formData.lon}
                    onChange={(e) => handleInputChange('lon', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-availableUnits">Available Units</Label>
                  <Input
                    id="edit-availableUnits"
                    type="number"
                    value={formData.availableUnits}
                    onChange={(e) => handleInputChange('availableUnits', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-unitType">Unit Type</Label>
                  <Input
                    id="edit-unitType"
                    value={formData.unitType}
                    onChange={(e) => handleInputChange('unitType', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-status">Availability Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Variant_partiallyAvailable_booked_available.available}>Available</SelectItem>
                    <SelectItem value={Variant_partiallyAvailable_booked_available.partiallyAvailable}>Partially Available</SelectItem>
                    <SelectItem value={Variant_partiallyAvailable_booked_available.booked}>Booked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-contactInfo">Contact Information</Label>
                <Input
                  id="edit-contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleEditListing}
                  disabled={updateListing.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {updateListing.isPending ? 'Updating...' : 'Update Property'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingListing(null);
                    resetForm();
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
