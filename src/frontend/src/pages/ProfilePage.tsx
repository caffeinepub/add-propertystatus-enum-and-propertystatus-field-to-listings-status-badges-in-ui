import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, LogOut, CheckCircle2, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity, clear } = useInternetIdentity();
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
      setPhone(userProfile.phone);
      setIsOwner(userProfile.isOwner);
    }
  }, [userProfile]);

  const handleSave = async () => {
    try {
      const now = BigInt(Date.now()) * BigInt(1000000);
      await saveProfile.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        isOwner,
        ipAddress: userProfile?.ipAddress || '',
        location: userProfile?.location,
        registrationDate: userProfile?.registrationDate || now,
        lastLogin: now,
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  if (!identity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Please login to view your profile</h2>
          <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/20 relative">
          {/* Floating Action Buttons */}
          <div className="absolute top-8 right-8 flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg transition-all"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-red-600 hover:bg-red-500 rounded-full shadow-lg transition-all"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-5xl font-bold">
                  {userProfile?.name.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              {userProfile?.isOwner && (
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2 shadow-lg">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            {userProfile?.name || 'User'}
          </h1>
          
          {/* Badges */}
          <div className="flex justify-center gap-3 mb-8">
            <div className="bg-green-600/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-semibold">Verified</span>
            </div>
            {userProfile?.isOwner && (
              <div className="bg-yellow-600/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-semibold">Partner</span>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className="bg-white/10 border-white/20 text-white disabled:opacity-70"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOwner"
                checked={isOwner}
                onCheckedChange={(checked) => setIsOwner(checked as boolean)}
                disabled={!isEditing}
              />
              <Label htmlFor="isOwner" className="text-white cursor-pointer">
                I am a property owner
              </Label>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={saveProfile.isPending}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  {saveProfile.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    if (userProfile) {
                      setName(userProfile.name);
                      setEmail(userProfile.email);
                      setPhone(userProfile.phone);
                      setIsOwner(userProfile.isOwner);
                    }
                  }}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">0</div>
              <div className="text-white/70 text-sm">Bookings</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">0</div>
              <div className="text-white/70 text-sm">Reviews</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {userProfile?.isOwner ? '0' : '-'}
              </div>
              <div className="text-white/70 text-sm">Listings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
