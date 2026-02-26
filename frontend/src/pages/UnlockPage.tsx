import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetListing, useGetAverageRating, useCreateOwnerUnlockRequest, useGetCallerUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle2, Phone, Mail, MapPin, Download, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection';
import { Badge } from '@/components/ui/badge';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import PropertyStatusBadge from '../components/PropertyStatusBadge';

export default function UnlockPage() {
  const { listingId } = useParams({ strict: false }) as { listingId: string };
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: listing, isLoading } = useGetListing(BigInt(listingId));
  const { data: averageRating } = useGetAverageRating(BigInt(listingId));
  const { data: userProfile } = useGetCallerUserProfile();
  const createUnlockRequest = useCreateOwnerUnlockRequest();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!identity) {
      toast.error('Please login to view property details');
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  const handleUnlock = async () => {
    if (!listing) return;

    try {
      // Create unlock request - this tracks the lead view in backend
      await createUnlockRequest.mutateAsync(listing.id);
      
      toast.success('Lead Access Unlocked! (Free Trial)', {
        description: 'You can now view owner contact details',
        duration: 4000,
      });
      setIsUnlocked(true);
    } catch (error: any) {
      console.error('Unlock error:', error);
      toast.error('Failed to unlock lead', {
        description: error.message || 'Please try again',
      });
    }
  };

  const handleDownload = () => {
    if (!listing) return;
    
    const contactData = `
STYO Property Contact Details
==============================
Property: ${listing.title}
Owner Contact: ${listing.contactInfo}
Location: ${listing.location.address}
Price: ₹${listing.pricePerDay}/day
Category: ${listing.category}

Downloaded from: https://styo.in
    `.trim();

    const blob = new Blob([contactData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `styo-property-${listing.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Contact details downloaded');
  };

  const handleCall = () => {
    if (!listing) return;
    window.location.href = `tel:${listing.contactInfo}`;
  };

  const handleWhatsApp = () => {
    if (!listing) return;
    const message = encodeURIComponent(`Hi, I'm interested in your property "${listing.title}" listed on STYO (https://styo.in). Can we discuss further?`);
    window.open(`https://wa.me/${listing.contactInfo.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Listing not found</div>
      </div>
    );
  }

  const displayRating = averageRating ?? (listing.featured ? 4 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/20">
          {/* Lock Animation */}
          <div className="text-center mb-8">
            <div className={`inline-block transition-all duration-1000 ${isUnlocked ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
              <Lock className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-pulse" />
            </div>
            <div className={`inline-block transition-all duration-1000 ${isUnlocked ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`}>
              <div className="relative">
                <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-4" />
                <div className="absolute inset-0 animate-ping">
                  <CheckCircle2 className="w-24 h-24 text-green-400 opacity-50" />
                </div>
              </div>
            </div>
          </div>

          {/* Listing Info */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {listing.title}
          </h1>

          {/* Property Status Badge */}
          <div className="flex justify-center mb-4">
            <PropertyStatusBadge status={listing.propertyStatus} className="text-sm px-4 py-2" />
          </div>

          {/* Rating Display */}
          {displayRating > 0 && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarRating rating={displayRating} size="lg" />
              <span className="text-white/80 text-lg font-semibold">
                {displayRating.toFixed(1)} / 5.0
              </span>
            </div>
          )}

          <p className="text-white/70 text-center mb-8">
            <MapPin className="inline-block w-5 h-5 mr-2" />
            {listing.location.address}
          </p>

          {/* Verified Badge */}
          {listing.verified && (
            <div className="flex justify-center mb-8">
              <div className="relative inline-block">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Verified Owner
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute inset-0 animate-shine" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    transform: 'translateX(-100%)',
                  }} />
                </div>
              </div>
            </div>
          )}

          {/* Unlock Section */}
          {!isUnlocked ? (
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-600/40 to-emerald-600/40 backdrop-blur-xl rounded-2xl p-8 mb-6 border-2 border-green-400/30">
                <Badge className="bg-green-600 text-white mb-4 text-lg px-4 py-2">
                  🎉 FREE TRIAL - No Payment Required
                </Badge>
                <h2 className="text-3xl font-bold text-white mb-4">Unlock Owner Contact</h2>
                <p className="text-white/80 mb-6">
                  Get instant access to property owner's contact information during our free trial period
                </p>
                <div className="text-5xl font-black text-green-400 mb-2">FREE</div>
                <p className="text-white/60 text-sm">Limited time free trial offer</p>
              </div>

              <Button
                onClick={handleUnlock}
                disabled={createUnlockRequest.isPending}
                className="px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-full font-bold text-2xl shadow-2xl disabled:opacity-50"
              >
                {createUnlockRequest.isPending ? 'Unlocking...' : 'Unlock Now - FREE'}
              </Button>
              <p className="text-white/50 text-sm mt-4">Free trial - No payment required</p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-600/40 to-emerald-600/40 backdrop-blur-xl rounded-2xl p-8 border-2 border-green-400/30 animate-in fade-in duration-500">
              <div className="flex justify-center mb-6">
                <Badge className="bg-green-600 text-white text-lg px-6 py-2">
                  ✅ Free Trial – Lead Access Unlocked
                </Badge>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Owner Contact Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <Phone className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-white/70 text-sm">Phone</p>
                    <p className="text-white font-bold text-lg">{listing.contactInfo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white/70 text-sm">Email</p>
                    <p className="text-white font-bold text-lg">owner@styo.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <MapPin className="w-6 h-6 text-red-400" />
                  <div>
                    <p className="text-white/70 text-sm">Address</p>
                    <p className="text-white font-bold">{listing.location.address}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </Button>
                <Button
                  onClick={handleCall}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/80 mb-4">Contact the owner directly to book this property</p>
                <Button
                  onClick={() => navigate({ to: '/listings' })}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Back to Listings
                </Button>
              </div>
            </div>
          )}

          {/* Review Section */}
          <ReviewSection listingId={listing.id} />
        </div>
      </div>
    </div>
  );
}
