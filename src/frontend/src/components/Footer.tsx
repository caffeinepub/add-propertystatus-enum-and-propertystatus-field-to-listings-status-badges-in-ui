import { SiX, SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function Footer() {
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
          {/* Brand */}
          <div>
            <img 
              src="/assets/generated/styo-logo-transparent.dim_200x80.png" 
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
              <li><a href="/booking-policy" className="hover:text-white transition-colors">Booking Policy</a></li>
              <li><a href="/booking-policy" className="hover:text-white transition-colors">Terms & Conditions</a></li>
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
            <p className="text-white/70 text-sm">support@styo.in</p>
          </div>
        </div>

        <div 
          className="border-t pt-8 text-center"
          style={{ borderTopColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <p className="text-white/70 text-sm">
            © 2025. Built with <span className="text-red-500">❤️</span> using{' '}
            <a 
              href="https://caffeine.ai" 
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
