import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Shield, AlertTriangle, Users, Scale } from 'lucide-react';

export default function TermsConditionsPage() {
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
            <FileText className="w-10 h-10 text-blue-300" />
          </div>
          <h1 
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            }}
          >
            Terms & Conditions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please read these terms carefully before using STYO
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
              
              {/* Platform Disclaimer */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Platform Disclaimer
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-red-600/10 border-2 border-red-400/30 rounded-xl p-6">
                    <p className="text-white font-semibold text-lg mb-3">
                      STYO is a digital listing platform and not a real estate broker, agent, or property manager.
                    </p>
                    <p>
                      STYO does not guarantee property condition, legality, availability, pricing accuracy, or transaction completion. All agreements and transactions are solely between the property owner and the seeker.
                    </p>
                  </div>
                  <p>
                    By using STYO, you acknowledge and agree that STYO acts solely as an intermediary platform connecting property seekers with property owners. We do not own, manage, or operate any properties listed on our platform.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Dispute Resolution Clause */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Dispute Resolution
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-orange-600/10 border-2 border-orange-400/30 rounded-xl p-6">
                    <p className="text-white font-semibold text-lg mb-3">
                      Any disputes, damages, fraud, misrepresentation, or conflicts arising after contact unlock shall be solely between the property owner and the seeker. STYO shall not be liable for such disputes.
                    </p>
                  </div>
                  <p>
                    STYO provides a platform for connecting parties but does not mediate, arbitrate, or resolve disputes between users and property owners. Users are responsible for resolving any conflicts directly with the other party or through appropriate legal channels.
                  </p>
                  <p>
                    <strong className="text-white">Limitation of Liability:</strong> STYO shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from disputes, transactions, or interactions between users and property owners.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* User Responsibilities */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    User Responsibilities
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    By using STYO, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and truthful information</li>
                    <li>Conduct your own due diligence before entering any agreements</li>
                    <li>Verify property details, ownership, and legal compliance independently</li>
                    <li>Respect the privacy and rights of other users</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not use the platform for fraudulent or illegal activities</li>
                    <li>Not misrepresent yourself or your intentions</li>
                  </ul>
                  <p>
                    <strong className="text-white">Property Owners:</strong> If you list a property, you warrant that you have the legal right to do so and that all information provided is accurate and up-to-date.
                  </p>
                  <p>
                    <strong className="text-white">Property Seekers:</strong> You are responsible for verifying all property details, conducting inspections, and ensuring any agreements meet your requirements before committing.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Platform Services */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-purple-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Platform Services
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    STYO provides the following services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A digital platform for listing and discovering properties</li>
                    <li>Verification of property owner contact information</li>
                    <li>Facilitation of initial contact between seekers and owners</li>
                    <li>Processing of unlock fees for contact information access</li>
                  </ul>
                  <p>
                    <strong className="text-white">What STYO Does NOT Provide:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Property management or brokerage services</li>
                    <li>Guarantees regarding property condition, availability, or pricing</li>
                    <li>Legal advice or contract mediation</li>
                    <li>Payment processing for bookings, deposits, or rentals</li>
                    <li>Dispute resolution or arbitration services</li>
                    <li>Property inspections or quality assessments</li>
                  </ul>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Intellectual Property */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Intellectual Property
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    All content, trademarks, logos, and intellectual property on the STYO platform are owned by STYO or its licensors. Users may not copy, reproduce, distribute, or create derivative works without explicit permission.
                  </p>
                  <p>
                    By submitting content (such as property listings or reviews), you grant STYO a non-exclusive, worldwide license to use, display, and distribute that content on our platform.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Termination */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Termination
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    STYO reserves the right to suspend or terminate user accounts at any time for violations of these terms, fraudulent activity, or any behavior that compromises the integrity of the platform.
                  </p>
                  <p>
                    Users may terminate their accounts at any time by contacting support. Termination does not entitle users to refunds for previously paid unlock fees.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Changes to Terms */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Changes to Terms
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    STYO reserves the right to modify these Terms & Conditions at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the updated terms.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white/70">
                    Questions about our terms? Contact us at:
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
