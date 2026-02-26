import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryWorldPage from './pages/CategoryWorldPage';
import ListingPage from './pages/ListingPage';
import UnlockPage from './pages/UnlockPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PropertyManagementPage from './pages/PropertyManagementPage';
import AboutUsPage from './pages/AboutUsPage';
import BookingPolicyPage from './pages/BookingPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PublicPropertySubmissionPage from './pages/PublicPropertySubmissionPage';
import { ListingCategory } from './backend';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const categoryWorldRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category-world',
  component: CategoryWorldPage,
});

const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/listings',
  component: ListingPage,
  validateSearch: (search: Record<string, unknown>): { category?: ListingCategory } => {
    return {
      category: search.category as ListingCategory | undefined,
    };
  },
});

const unlockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unlock/$listingId',
  component: UnlockPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const propertyManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-properties',
  component: PropertyManagementPage,
});

const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutUsPage,
});

const bookingPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking-policy',
  component: BookingPolicyPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-conditions',
  component: TermsConditionsPage,
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicyPage,
});

const publicSubmissionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/submit-property',
  component: PublicPropertySubmissionPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryWorldRoute,
  listingRoute,
  unlockRoute,
  profileRoute,
  adminDashboardRoute,
  propertyManagementRoute,
  aboutUsRoute,
  bookingPolicyRoute,
  privacyPolicyRoute,
  termsConditionsRoute,
  refundPolicyRoute,
  publicSubmissionRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
