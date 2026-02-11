import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const now = BigInt(Date.now()) * BigInt(1000000);
      await saveProfile.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        isOwner,
        ipAddress: '',
        location: undefined,
        registrationDate: now,
        lastLogin: now,
      });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm p-5 sm:p-6 rounded-xl bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/10 shadow-2xl safe-area-padding"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to STYO!
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-300">
            Please complete your profile to continue
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-200">
              Full Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="h-11 text-base bg-slate-800/60 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-200">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="h-11 text-base bg-slate-800/60 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-200">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              required
              className="h-11 text-base bg-slate-800/60 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center space-x-2.5 py-1">
            <Checkbox
              id="isOwner"
              checked={isOwner}
              onCheckedChange={(checked) => setIsOwner(checked as boolean)}
              className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="isOwner" className="cursor-pointer text-sm sm:text-base text-gray-200 font-medium">
              I am a property owner
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? 'Creating Profile...' : 'Complete Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
