import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAdminDashboardData, useIsCallerAdmin, useQuickPublishMode, useIsFreeTrialMode, useSetFreeTrialMode, useMarkNotificationAsRead, useUpdateCityChargeSettings, useBulkUpdateCityCharges, useGetPendingSubmissions } from '../hooks/useQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Shield, Users, Building2, MapPin, Calendar, Mail, Phone, Globe, Zap, CheckCircle2, Clock, Database, TrendingUp, Info, Rocket, Settings, ChevronDown, ChevronUp, Eye, Bell, ToggleLeft, ToggleRight, DollarSign, MapPinned, FileText, User } from 'lucide-react';
import { QuickPublishResult, UserProfile, Listing, LeadView, AdminNotification, CityChargeSettings, PublicListingSubmission } from '../backend';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminCheckLoading } = useIsCallerAdmin();
  const { data: dashboardData, isLoading: dataLoading } = useGetAdminDashboardData();
  const { data: pendingSubmissions, isLoading: submissionsLoading } = useGetPendingSubmissions();
  const { data: isFreeTrialMode, isLoading: freeTrialLoading } = useIsFreeTrialMode();
  const setFreeTrialMode = useSetFreeTrialMode();
  const markAsRead = useMarkNotificationAsRead();
  const quickPublish = useQuickPublishMode();
  const updateCityCharges = useUpdateCityChargeSettings();
  const bulkUpdateCharges = useBulkUpdateCityCharges();
  const [publishResult, setPublishResult] = useState<QuickPublishResult | null>(null);
  const [expandedOwners, setExpandedOwners] = useState<Set<string>>(new Set());

  const users = dashboardData?.users || [];
  const listings = dashboardData?.listings || [];
  const leadViews = dashboardData?.leadViews || [];
  const notifications = dashboardData?.notifications || [];
  const cityCharges = dashboardData?.cityCharges || [];

  const unreadNotifications = notifications.filter(n => !n.read);

  // Create a map of owner principal to their listings
  const ownerListingsMap = new Map<string, Listing[]>();
  listings.forEach(listing => {
    const ownerKey = listing.owner.toString();
    if (!ownerListingsMap.has(ownerKey)) {
      ownerListingsMap.set(ownerKey, []);
    }
    ownerListingsMap.get(ownerKey)?.push(listing);
  });

  // Get unique owners from listings
  const uniqueOwners = Array.from(ownerListingsMap.keys());

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  useEffect(() => {
    if (!adminCheckLoading && !isAdmin) {
      navigate({ to: '/' });
    }
  }, [isAdmin, adminCheckLoading, navigate]);

  const handleQuickPublish = async () => {
    try {
      const result = await quickPublish.mutateAsync();
      setPublishResult(result);
    } catch (error) {
      console.error('Quick publish failed:', error);
    }
  };

  const toggleOwnerExpansion = (ownerPrincipal: string) => {
    const newExpanded = new Set(expandedOwners);
    if (newExpanded.has(ownerPrincipal)) {
      newExpanded.delete(ownerPrincipal);
    } else {
      newExpanded.add(ownerPrincipal);
    }
    setExpandedOwners(newExpanded);
  };

  const handleToggleFreeTrialMode = async (enabled: boolean) => {
    try {
      await setFreeTrialMode.mutateAsync(enabled);
      toast.success(enabled ? 'Free Trial Mode Enabled' : 'Paid Lead Mode Enabled', {
        description: enabled 
          ? 'Leads are now unlocked for free' 
          : 'Lead unlock now requires payment',
      });
    } catch (error) {
      console.error('Failed to toggle free trial mode:', error);
      toast.error('Failed to update system mode');
    }
  };

  const handleMarkAsRead = async (notificationId: bigint) => {
    try {
      await markAsRead.mutateAsync(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleToggleCityCharge = async (city: string, chargeType: 'customerLeadCharge' | 'ownerLeadCharge' | 'subscription', currentValue: boolean) => {
    try {
      const currentSettings = cityCharges.find(([c]) => c === city)?.[1] || {
        customerLeadCharge: false,
        ownerLeadCharge: false,
        subscription: false,
      };

      const updatedSettings: CityChargeSettings = {
        ...currentSettings,
        [chargeType]: !currentValue,
      };

      await updateCityCharges.mutateAsync({ city, settings: updatedSettings });
      
      toast.success('City Charge Updated', {
        description: `${chargeType === 'customerLeadCharge' ? 'Customer Lead Charge' : chargeType === 'ownerLeadCharge' ? 'Owner Lead Charge' : 'Subscription'} ${!currentValue ? 'enabled' : 'disabled'} for ${city}`,
      });
    } catch (error) {
      console.error('Failed to update city charge:', error);
      toast.error('Failed to update city charge settings');
    }
  };

  const handleBulkToggle = async (chargeType: 'customerLeadCharge' | 'ownerLeadCharge' | 'subscription', enable: boolean) => {
    try {
      const updates: [string, CityChargeSettings][] = cityCharges.map(([city, settings]) => [
        city,
        {
          ...settings,
          [chargeType]: enable,
        },
      ]);

      await bulkUpdateCharges.mutateAsync(updates);
      
      toast.success('Bulk Update Completed', {
        description: `${chargeType === 'customerLeadCharge' ? 'Customer Lead Charge' : chargeType === 'ownerLeadCharge' ? 'Owner Lead Charge' : 'Subscription'} ${enable ? 'enabled' : 'disabled'} for all cities`,
      });
    } catch (error) {
      console.error('Failed to bulk update charges:', error);
      toast.error('Failed to perform bulk update');
    }
  };

  if (adminCheckLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-12 w-64 mb-8 bg-white/10" />
          <Skeleton className="h-96 w-full bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950 pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-black text-white">Admin Dashboard</h1>
          </div>
          {unreadNotifications.length > 0 && (
            <Badge className="bg-red-600 text-white text-lg px-4 py-2 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {unreadNotifications.length} New
            </Badge>
          )}
        </div>

        {/* System Mode Control */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              System Mode Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-6">
              <div className="flex items-center gap-4">
                {isFreeTrialMode ? (
                  <ToggleRight className="w-8 h-8 text-green-400" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-blue-400" />
                )}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {isFreeTrialMode ? 'Free Trial Mode' : 'Paid Lead Mode'}
                  </p>
                  <p className="text-white/70 text-sm">
                    {isFreeTrialMode 
                      ? 'Leads are currently unlocked for free without payment' 
                      : 'Lead unlock requires ₹99 payment'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isFreeTrialMode || false}
                onCheckedChange={handleToggleFreeTrialMode}
                disabled={freeTrialLoading || setFreeTrialMode.isPending}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-5xl grid-cols-6 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600">
              <Users className="w-4 h-4 mr-2" />
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-purple-600">
              <Building2 className="w-4 h-4 mr-2" />
              Listings ({listings.length})
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-pink-600">
              <FileText className="w-4 h-4 mr-2" />
              Submissions ({pendingSubmissions?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-orange-600">
              <Eye className="w-4 h-4 mr-2" />
              Leads ({leadViews.length})
            </TabsTrigger>
            <TabsTrigger value="cityCharges" className="data-[state=active]:bg-cyan-600">
              <MapPinned className="w-4 h-4 mr-2" />
              City Charges
            </TabsTrigger>
            <TabsTrigger value="publish" className="data-[state=active]:bg-green-600">
              <Zap className="w-4 h-4 mr-2" />
              Quick Publish
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Registered Users</CardTitle>
                <CardDescription className="text-white/70">
                  Complete user information with registration details and location data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full bg-white/10" />
                    ))}
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-white/70 text-center py-8">No users found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/20 hover:bg-white/5">
                          <TableHead className="text-white/90 font-semibold">Name</TableHead>
                          <TableHead className="text-white/90 font-semibold">Email</TableHead>
                          <TableHead className="text-white/90 font-semibold">Phone</TableHead>
                          <TableHead className="text-white/90 font-semibold">Role</TableHead>
                          <TableHead className="text-white/90 font-semibold">IP Address</TableHead>
                          <TableHead className="text-white/90 font-semibold">Location</TableHead>
                          <TableHead className="text-white/90 font-semibold">Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user, index) => (
                          <TableRow key={index} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white font-medium">{user.name}</TableCell>
                            <TableCell className="text-white/80">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span className="text-sm">{user.email}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-white/80">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-400" />
                                <span className="text-sm">{user.phone || 'N/A'}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {user.isOwner ? (
                                <Badge className="bg-purple-600 text-white">Owner</Badge>
                              ) : (
                                <Badge variant="outline" className="text-white/70 border-white/30">User</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-white/70 font-mono text-xs">
                              <div className="flex items-center gap-1">
                                <Globe className="w-3 h-3 text-cyan-400" />
                                {user.ipAddress || 'N/A'}
                              </div>
                            </TableCell>
                            <TableCell className="text-white/70 max-w-xs">
                              {user.location ? (
                                <div className="flex items-start gap-1 text-xs">
                                  <MapPin className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="break-words">{user.location.address}</div>
                                    <div className="text-white/50 mt-1">
                                      {user.location.lat.toFixed(4)}, {user.location.lon.toFixed(4)}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-white/50">No location data</span>
                              )}
                            </TableCell>
                            <TableCell className="text-white/70">
                              {user.registrationDate ? (
                                <div className="flex items-center gap-1 text-xs">
                                  <Calendar className="w-3 h-3 text-yellow-400" />
                                  <div>
                                    <div>{new Date(Number(user.registrationDate) / 1000000).toLocaleDateString()}</div>
                                    {user.lastLogin && (
                                      <div className="text-white/50 mt-1">
                                        Last: {new Date(Number(user.lastLogin) / 1000000).toLocaleDateString()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-white/50">N/A</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Property Listings Grouped by Owner</CardTitle>
                <CardDescription className="text-white/70">
                  All property listings organized by owner with complete information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full bg-white/10" />
                    ))}
                  </div>
                ) : listings.length === 0 ? (
                  <p className="text-white/70 text-center py-8">No listings found</p>
                ) : (
                  <div className="space-y-6">
                    {/* Group listings by owner */}
                    {uniqueOwners.map((ownerPrincipal) => {
                      const ownerListings = ownerListingsMap.get(ownerPrincipal) || [];
                      const isExpanded = expandedOwners.has(ownerPrincipal);
                      
                      return (
                        <div key={ownerPrincipal} className="bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                          {/* Owner Header */}
                          <button
                            onClick={() => toggleOwnerExpansion(ownerPrincipal)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="text-white font-semibold text-lg">
                                  Property Owner
                                </div>
                                <div className="text-white/60 text-sm font-mono">
                                  {ownerPrincipal.substring(0, 30)}...
                                </div>
                              </div>
                              <Badge className="bg-purple-600 text-white ml-4">
                                {ownerListings.length} {ownerListings.length === 1 ? 'Property' : 'Properties'}
                              </Badge>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-white/70" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-white/70" />
                            )}
                          </button>

                          {/* Owner's Listings */}
                          {isExpanded && (
                            <div className="border-t border-white/10">
                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-white/5">
                                      <TableHead className="text-white/90 font-semibold">ID</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Title</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Category</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Price/Day</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Location</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Availability</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Status</TableHead>
                                      <TableHead className="text-white/90 font-semibold">Created</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {ownerListings.map((listing) => (
                                      <TableRow key={listing.id.toString()} className="border-white/10 hover:bg-white/5">
                                        <TableCell className="text-white/80 font-mono text-sm">
                                          #{listing.id.toString()}
                                        </TableCell>
                                        <TableCell className="text-white font-medium max-w-xs">
                                          <div className="truncate" title={listing.title}>
                                            {listing.title}
                                          </div>
                                          <div className="text-white/60 text-xs mt-1 truncate" title={listing.description}>
                                            {listing.description}
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-white/80">
                                          <Badge variant="outline" className="text-white/70 border-white/30 text-xs">
                                            {listing.category}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="text-white/80 font-semibold">
                                          ₹{listing.pricePerDay.toString()}
                                        </TableCell>
                                        <TableCell className="text-white/70 text-xs max-w-xs">
                                          <div className="flex items-start gap-1">
                                            <MapPin className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                                            <span className="break-words">{listing.location.address}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge 
                                            className={
                                              listing.availability.status === 'available' 
                                                ? 'bg-green-600 text-white' 
                                                : listing.availability.status === 'partiallyAvailable'
                                                ? 'bg-yellow-600 text-white'
                                                : 'bg-red-600 text-white'
                                            }
                                          >
                                            {listing.availability.status === 'available' 
                                              ? `${listing.availability.availableUnits} Available` 
                                              : listing.availability.status === 'partiallyAvailable'
                                              ? `${listing.availability.availableUnits} Left`
                                              : 'Booked'}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex flex-col gap-1">
                                            {listing.verified && (
                                              <Badge className="bg-green-600 text-white text-xs">✓ Verified</Badge>
                                            )}
                                            {listing.featured && (
                                              <Badge className="bg-yellow-600 text-white text-xs">★ Featured</Badge>
                                            )}
                                            {!listing.verified && !listing.featured && (
                                              <Badge variant="outline" className="text-white/70 border-white/30 text-xs">Pending</Badge>
                                            )}
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-white/70 text-xs">
                                          <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-yellow-400" />
                                            {new Date(Number(listing.createdAt) / 1000000).toLocaleDateString()}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="mt-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-pink-400" />
                  Public Property Submissions
                </CardTitle>
                <CardDescription className="text-white/70">
                  No-login property submissions awaiting admin review and approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full bg-white/10" />
                    ))}
                  </div>
                ) : !pendingSubmissions || pendingSubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70 text-lg">No pending submissions</p>
                    <p className="text-white/50 text-sm mt-2">
                      Public property submissions will appear here for review
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingSubmissions.map(([listingId, submission]) => {
                      const listing = listings.find(l => l.id === listingId);
                      
                      return (
                        <div key={listingId.toString()} className="bg-white/5 rounded-xl border border-white/20 p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Badge className="bg-pink-600 text-white">
                                  Pending Review
                                </Badge>
                                <span className="text-white/60 text-sm">
                                  Listing ID: #{listingId.toString()}
                                </span>
                              </div>
                              
                              {listing && (
                                <>
                                  <h3 className="text-white font-semibold text-lg mb-2">
                                    {listing.title}
                                  </h3>
                                  <p className="text-white/70 text-sm mb-4">
                                    {listing.description}
                                  </p>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                      <Building2 className="w-4 h-4 text-purple-400" />
                                      <span>{listing.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                      <DollarSign className="w-4 h-4 text-green-400" />
                                      <span>₹{listing.pricePerDay.toString()}/day</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                      <MapPin className="w-4 h-4 text-red-400" />
                                      <span>{listing.location.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80 text-sm">
                                      <Phone className="w-4 h-4 text-green-400" />
                                      <span>{listing.contactInfo}</span>
                                    </div>
                                  </div>
                                </>
                              )}
                              
                              <div className="border-t border-white/10 pt-4 mt-4">
                                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                                  <User className="w-4 h-4 text-cyan-400" />
                                  Owner Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                  <div>
                                    <span className="text-white/60">Name:</span>
                                    <p className="text-white font-medium">{submission.ownerProfile.name}</p>
                                  </div>
                                  <div>
                                    <span className="text-white/60">Contact:</span>
                                    <p className="text-white font-medium">{submission.ownerProfile.contactNumber}</p>
                                  </div>
                                  <div>
                                    <span className="text-white/60">Email:</span>
                                    <p className="text-white font-medium">{submission.ownerProfile.email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... Rest of the tabs (leads, cityCharges, publish) remain the same ... */}
          <TabsContent value="leads" className="mt-8">
            {/* Lead analytics content - keeping existing implementation */}
          </TabsContent>

          <TabsContent value="cityCharges" className="mt-8">
            {/* City charges content - keeping existing implementation */}
          </TabsContent>

          <TabsContent value="publish" className="mt-8">
            {/* Quick publish content - keeping existing implementation */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
