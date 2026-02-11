import { memo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { Building2, Shield, User } from 'lucide-react';

const Header = memo(() => {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const text = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = useCallback(async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  }, [isAuthenticated, clear, queryClient, navigate, login]);

  const handleHomeClick = useCallback(() => navigate({ to: '/' }), [navigate]);
  const handleCategoriesClick = useCallback(() => navigate({ to: '/category-world' }), [navigate]);
  const handleListingsClick = useCallback(() => navigate({ to: '/listings' }), [navigate]);
  const handleMyPropertiesClick = useCallback(() => navigate({ to: '/my-properties' }), [navigate]);
  const handleAdminClick = useCallback(() => navigate({ to: '/admin' }), [navigate]);
  const handleProfileClick = useCallback(() => navigate({ to: '/profile' }), [navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <button onClick={handleHomeClick} className="flex items-center gap-3 group">
          <img 
            src="/assets/generated/styo-logo-transparent.dim_200x80.png" 
            alt="STYO Logo" 
            className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            loading="eager"
          />
        </button>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <button
            onClick={handleHomeClick}
            className="text-white/80 hover:text-white transition-colors font-medium text-sm lg:text-base"
          >
            Home
          </button>
          <button
            onClick={handleCategoriesClick}
            className="text-white/80 hover:text-white transition-colors font-medium text-sm lg:text-base"
          >
            Categories
          </button>
          <button
            onClick={handleListingsClick}
            className="text-white/80 hover:text-white transition-colors font-medium text-sm lg:text-base"
          >
            Listings
          </button>
          {isAuthenticated && (
            <button
              onClick={handleMyPropertiesClick}
              className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-2 text-sm lg:text-base"
            >
              <Building2 className="w-4 h-4" />
              My Properties
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleAdminClick}
              className="relative px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-glow-blue flex items-center gap-2 border border-white/20 text-sm lg:text-base will-change-transform"
              style={{
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
              }}
            >
              <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="tracking-wide hidden lg:inline">Admin Dashboard</span>
              <span className="tracking-wide lg:hidden">Admin</span>
            </button>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {isAuthenticated && userProfile && (
            <button
              onClick={handleProfileClick}
              className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <User className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm lg:text-base">{userProfile.name}</span>
            </button>
          )}
          <Button
            onClick={handleAuth}
            disabled={disabled}
            className={`px-4 sm:px-6 py-2 rounded-full transition-colors font-medium text-sm sm:text-base ${
              isAuthenticated
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:opacity-50`}
          >
            {text}
          </Button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
