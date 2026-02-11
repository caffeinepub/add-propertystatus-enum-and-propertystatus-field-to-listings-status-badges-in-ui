import { Building2, Users, Award, MapPin } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About STYO
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Your trusted platform for finding the perfect stay across India. 
              We connect property owners with guests, making accommodation booking simple, transparent, and reliable.
            </p>
          </div>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Registration Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Company Registration</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white/60 text-sm mb-1">MSME (Udyam) Registration</p>
                  <p className="text-white font-semibold text-lg">UDYAM-WB-10-0149673</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Registered Location</p>
                  <p className="text-white font-semibold">West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Team Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Leadership</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Owner/Proprietor */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    SY
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Syed Yasir Hussain</h3>
                    <p className="text-white/60 text-sm">Owner / Proprietor</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm mt-2">
                    Leading STYO's vision to revolutionize the accommodation booking experience across India.
                  </p>
                </div>
              </div>

              {/* Co-Founder */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    NH
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Nabeel Hussain</h3>
                    <p className="text-white/60 text-sm">Co-Founder</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm mt-2">
                    Driving innovation and growth to create exceptional experiences for property owners and guests.
                  </p>
                </div>
              </div>

              {/* Director */}
              <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    MA
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Mohammad Shafique Ahmed</h3>
                    <p className="text-white/60 text-sm">Director</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm mt-2">
                    Guiding strategic direction and ensuring operational excellence in delivering quality service.
                  </p>
                </div>
              </div>

              {/* Managing Operations Director */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    FH
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Fahim Hossain</h3>
                    <p className="text-white/60 text-sm">Managing Operations Director</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm mt-2">
                    Overseeing day-to-day operations and ensuring seamless service delivery across all platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            At STYO, we're committed to making accommodation booking transparent, reliable, and hassle-free. 
            We verify every listing, connect you directly with property owners, and ensure you find the perfect stay for your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-white font-bold mb-2">Verified Listings</h3>
              <p className="text-white/60 text-sm">Every property is verified for authenticity and quality</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-white font-bold mb-2">Direct Contact</h3>
              <p className="text-white/60 text-sm">Connect directly with property owners for transparency</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-xl p-6 border border-pink-500/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-white font-bold mb-2">Easy Booking</h3>
              <p className="text-white/60 text-sm">Simple, fast booking process with secure payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
