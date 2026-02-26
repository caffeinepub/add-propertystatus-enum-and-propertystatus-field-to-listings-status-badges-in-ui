import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Lock, Shield, Eye, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.95), rgba(23, 37, 84, 0.90), rgba(2, 6, 23, 0.95))',
          zIndex: 0,
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-blue-400/50 mb-6"
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            <Lock className="w-10 h-10 text-blue-300" />
          </div>
          <h1 
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            }}
          >
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your privacy and data security are our top priorities
          </p>
        </div>

        {/* Main Content Card */}
        <div 
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border-2 border-white/10 overflow-hidden"
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.05)',
          }}
        >
          <ScrollArea className="h-[600px] px-8 py-8">
            <div className="space-y-10">
              
              {/* Data Privacy Statement */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Our Commitment to Your Privacy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-blue-600/10 border-2 border-blue-400/30 rounded-xl p-6">
                    <p className="text-white font-semibold text-lg mb-3">
                      User contact details are shared only after successful unlock payment.
                    </p>
                    <p>
                      STYO does not sell or share personal data with third parties without user consent, except where required by law.
                    </p>
                  </div>
                  <p>
                    We are committed to protecting your privacy and maintaining the confidentiality of your personal information. Your data is used solely for facilitating connections between property seekers and owners on our platform.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Information We Collect */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-purple-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    When you use STYO, we may collect the following information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Account credentials and authentication data</li>
                    <li>Property listing information (for property owners)</li>
                    <li>Search preferences and browsing activity</li>
                    <li>Payment information for unlock fees (processed securely)</li>
                    <li>Communication records between users and our support team</li>
                  </ul>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* How We Use Your Information */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    How We Use Your Information
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    We use your personal information for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To facilitate connections between property seekers and owners</li>
                    <li>To process unlock fee payments securely</li>
                    <li>To verify and authenticate user accounts</li>
                    <li>To improve our platform and user experience</li>
                    <li>To communicate important updates and notifications</li>
                    <li>To prevent fraud and ensure platform security</li>
                    <li>To comply with legal obligations and regulations</li>
                  </ul>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Data Sharing and Disclosure */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Data Sharing and Disclosure
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    <strong className="text-white">Contact Information Sharing:</strong> Property owner contact details are shared with seekers only after successful payment of the ₹99 unlock fee. Similarly, seeker information may be shared with property owners to facilitate communication.
                  </p>
                  <p>
                    <strong className="text-white">Third-Party Sharing:</strong> We do not sell, rent, or share your personal data with third parties for marketing purposes without your explicit consent.
                  </p>
                  <p>
                    <strong className="text-white">Legal Requirements:</strong> We may disclose your information when required by law, court order, or government regulation, or to protect the rights, property, or safety of STYO, our users, or others.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Data Security */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Data Security
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                  <p>
                    We encourage users to maintain the confidentiality of their account credentials and to notify us immediately of any unauthorized access to their accounts.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Your Rights */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Your Rights
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your account and associated data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing (where applicable)</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at <a href="mailto:support@styo.in" className="text-blue-400 hover:text-blue-300">support@styo.in</a>.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white/70">
                    Questions about our privacy practices? Contact us at:
                  </p>
                  <a 
                    href="mailto:support@styo.in" 
                    className="inline-block text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors"
                  >
                    support@styo.in
                  </a>
                  <p className="text-white/50 text-sm">
                    Last updated: February 2026
                  </p>
                </div>
              </section>

            </div>
          </ScrollArea>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 border-2 border-blue-400/50"
            style={{
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
