import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Upload, CheckCircle2, Loader2, MapPin, DollarSign, Phone, Mail, User, Home, MapPinned } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitPublicListing } from '../hooks/useQueries';
import { ListingCategory, Variant_partiallyAvailable_booked_available, PublicListingInput } from '../backend';
import { ExternalBlob } from '../backend';

export default function PublicPropertySubmissionPage() {
  const navigate = useNavigate();
  const submitListing = useSubmitPublicListing();
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ListingCategory | ''>('');
  const [city, setCity] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [area, setArea] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'booked'>('available');
  const [availableUnits, setAvailableUnits] = useState('1');
  const [ownerName, setOwnerName] = useState('');
  const [ownerWhatsApp, setOwnerWhatsApp] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    // Validate file sizes (max 5MB per image)
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error('Each image must be less than 5MB');
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidTypes = files.filter(file => !validTypes.includes(file.type));
    if (invalidTypes.length > 0) {
      toast.error('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error('Please enter a property title');
      return;
    }

    if (!category) {
      toast.error('Please select a property type');
      return;
    }

    if (!city.trim()) {
      toast.error('Please select a city');
      return;
    }

    if (!area.trim()) {
      toast.error('Please enter the area/locality');
      return;
    }

    if (!pricePerDay || Number(pricePerDay) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (!ownerWhatsApp.trim()) {
      toast.error('Please enter your WhatsApp number');
      return;
    }

    // Validate WhatsApp number (basic validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(ownerWhatsApp.replace(/\D/g, '').slice(-10))) {
      toast.error('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    if (images.length < 2) {
      toast.error('Please upload at least 2 images');
      return;
    }

    try {
      // Convert images to ExternalBlob
      const imageBlobs: ExternalBlob[] = await Promise.all(
        images.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          return ExternalBlob.fromBytes(uint8Array);
        })
      );

      // Prepare listing input
      const listingInput: PublicListingInput = {
        title: title.trim(),
        description: description.trim() || `${category} property in ${area}, ${city}`,
        category: category as ListingCategory,
        pricePerDay: BigInt(pricePerDay),
        images: imageBlobs,
        location: {
          lat: 22.5726, // Default coordinates (will be updated by admin)
          lon: 88.3639,
          address: `${area.trim()}, ${city.trim()}`,
        },
        availability: {
          status: availabilityStatus as Variant_partiallyAvailable_booked_available,
          availableUnits: BigInt(availableUnits),
          unitType: category === 'pgHostel' || category === 'studentStay' ? 'Beds' : 'Rooms',
          dates: [],
        },
        contactInfo: ownerWhatsApp.trim(),
        ownerName: ownerName.trim() || 'Property Owner',
        ownerContactNumber: ownerWhatsApp.trim(),
        ownerEmail: ownerEmail.trim() || `owner${Date.now()}@styo.in`,
      };

      // Submit to backend
      await submitListing.mutateAsync(listingInput);

      setIsSuccess(true);
      toast.success('Property Submitted Successfully!', {
        description: 'Your listing is under review and will be live shortly.',
      });

      // Reset form and redirect after 3 seconds
      setTimeout(() => {
        navigate({ to: '/' });
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('Rate limit exceeded')) {
        toast.error('Too Many Submissions', {
          description: 'Maximum 3 submissions per hour allowed. Please try again later.',
        });
      } else if (errorMessage.includes('Invalid listing data')) {
        toast.error('Invalid Data', {
          description: 'Please check all required fields and try again.',
        });
      } else {
        toast.error('Failed to submit property', {
          description: 'Please try again or contact support if the issue persists.',
        });
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4 flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-xl border-white/20 max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your listing is under review and will be live shortly.</h2>
            <p className="text-white/70 text-lg mb-6">
              Thank you for submitting your property to STYO!
            </p>
            <p className="text-white/60 text-sm mb-8">
              Our admin team will review your submission within 24 hours. You'll be notified via WhatsApp once approved.
            </p>
            <Button
              onClick={() => navigate({ to: '/' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-black text-white">List Your Property – Free</h1>
          </div>
          <p className="text-white/70 text-lg">
            No login required • Quick 2-3 minute form • Admin review within 24 hours
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Property Details</CardTitle>
            <CardDescription className="text-white/70">
              Fill in the details below to list your property on STYO
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-400" />
                  Property Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Cozy PG near Metro Station"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  Property Type *
                </Label>
                <Select value={category} onValueChange={(value) => setCategory(value as ListingCategory)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20">
                    <SelectItem value="pgHostel">PG / Hostel</SelectItem>
                    <SelectItem value="familyFlat">Flat</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="marriageHall">Marriage Hall</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* City (Mandatory) */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white flex items-center gap-2">
                  <MapPinned className="w-4 h-4 text-cyan-400" />
                  City *
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/20 max-h-60">
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="Jaipur">Jaipur</SelectItem>
                    <SelectItem value="Lucknow">Lucknow</SelectItem>
                    <SelectItem value="Surat">Surat</SelectItem>
                    <SelectItem value="Nagpur">Nagpur</SelectItem>
                    <SelectItem value="Indore">Indore</SelectItem>
                    <SelectItem value="Bhopal">Bhopal</SelectItem>
                    <SelectItem value="Visakhapatnam">Visakhapatnam</SelectItem>
                    <SelectItem value="Patna">Patna</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Area/Locality */}
              <div className="space-y-2">
                <Label htmlFor="area" className="text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  Area / Locality *
                </Label>
                <Input
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g., Salt Lake, Park Street"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Rent / Price per Day (₹) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  placeholder="e.g., 500"
                  min="0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>

              {/* Availability Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-white">
                    Availability Status *
                  </Label>
                  <Select value={availabilityStatus} onValueChange={(value) => setAvailabilityStatus(value as any)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="booked">Not Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units" className="text-white">
                    Available Units *
                  </Label>
                  <Input
                    id="units"
                    type="number"
                    value={availableUnits}
                    onChange={(e) => setAvailableUnits(e.target.value)}
                    min="0"
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Property Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your property, amenities, nearby facilities, etc."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                />
              </div>

              {/* Owner Details */}
              <div className="border-t border-white/20 pt-6 space-y-4">
                <h3 className="text-white font-semibold text-lg">Owner Contact Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerName" className="text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    Your Name (Optional)
                  </Label>
                  <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-400" />
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={ownerWhatsApp}
                    onChange={(e) => setOwnerWhatsApp(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                  <p className="text-white/60 text-xs">
                    We'll contact you on this number for verification and updates
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="border-t border-white/20 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-yellow-400" />
                    Property Images * (2-4 images)
                  </Label>
                  <span className="text-white/60 text-sm">{images.length}/4</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {images.length < 4 && (
                    <label className="w-full h-32 border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-white/50 hover:bg-white/5 transition-all">
                      <Upload className="w-8 h-8 text-white/50 mb-2" />
                      <span className="text-white/50 text-xs">Upload Image</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <p className="text-white/60 text-xs">
                  Upload 2-4 high-quality images (JPEG, PNG, WebP). Max 5MB per image.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={submitListing.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-lg"
                >
                  {submitListing.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting Property...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-5 h-5 mr-2" />
                      Submit Property for Review
                    </>
                  )}
                </Button>

                <p className="text-white/60 text-center text-sm mt-4">
                  By submitting, you agree to our terms and conditions. Your property will be reviewed by our admin team within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
