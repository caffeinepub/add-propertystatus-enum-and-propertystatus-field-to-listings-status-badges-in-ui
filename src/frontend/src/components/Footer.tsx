import { SiX, SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'styo-app';

  return (
    <footer 
      className="relative py-12 border-t"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(2, 6, 23, 0.95))',
        backdropFilter: 'blur(4px)',
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 20,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand - Logo: /assets/generated/styo-logo-tech-neon-full.dim_1200x400.svg */}
          <div>
            <img 
              src="/assets/generated/styo-logo-tech-neon-full.dim_1200x400.svg" 
              alt="STYO Logo" 
              className="h-12 mb-4"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
            <p className="text-white/70 text-sm">
              Your trusted platform for finding the perfect stay across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/category-world" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="/listings" className="hover:text-white transition-colors">Listings</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/profile" className="hover:text-white transition-colors">Profile</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li>
                <a 
                  href="mailto:support@styo.in" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Contact Email
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiX className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <SiLinkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-white/70 text-sm">
              Email: <a href="mailto:support@styo.in" className="hover:text-white transition-colors">support@styo.in</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm mb-2">
            © {new Date().getFullYear()} STYO. All rights reserved.
          </p>
          <p className="text-white/50 text-xs flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
