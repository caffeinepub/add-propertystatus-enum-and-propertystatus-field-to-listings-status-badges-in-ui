import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Shield, AlertCircle, CreditCard, HelpCircle, Lock } from 'lucide-react';

export default function BookingPolicyPage() {
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
            Booking Policy & Terms
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please read our policies carefully before making a booking
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
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Dispute Clause */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Dispute Resolution
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-orange-600/10 border-2 border-orange-400/30 rounded-xl p-6">
                    <p className="text-white font-semibold mb-3">
                      Any disputes, damages, fraud, misrepresentation, or conflicts arising after contact unlock shall be solely between the property owner and the seeker. STYO shall not be liable for such disputes.
                    </p>
                    <p>
                      STYO provides a platform for connecting parties but does not mediate, arbitrate, or resolve disputes between users and property owners.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Refund Policy for ₹99 Unlock Fee */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    ₹99 Unlock Fee Refund Policy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p className="text-white font-semibold">
                    Refund applicable only if:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Property owner is unreachable within 48 hours</strong> – If you cannot reach the owner through any provided contact method within 48 hours of unlocking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Listing is proven fake after admin verification</strong> – If our admin team verifies that the listing was fraudulent or misrepresented</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong className="text-white">Duplicate unlock payment due to system error</strong> – If you were charged twice for the same listing due to a technical error</span>
                    </li>
                  </ul>
                  <div className="bg-yellow-600/10 border-2 border-yellow-400/30 rounded-xl p-6 mt-6">
                    <p className="text-white font-semibold text-lg">
                      Unlock fee is non-refundable in all other cases.
                    </p>
                    <p className="mt-2">
                      This includes but is not limited to: change of mind, property no longer available, dissatisfaction with property details, inability to finalize booking, or any other reason not listed above.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Data Privacy Statement */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Data Privacy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-blue-600/10 border-2 border-blue-400/30 rounded-xl p-6">
                    <p className="mb-3">
                      <strong className="text-white">User contact details are shared only after successful unlock payment.</strong> STYO does not sell or share personal data with third parties without user consent, except where required by law.
                    </p>
                    <p>
                      We are committed to protecting your privacy and maintaining the confidentiality of your personal information. Your data is used solely for facilitating connections between property seekers and owners.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Booking Policy */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Booking Policy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    <strong className="text-white">STYO</strong> is a platform that connects property seekers with property owners. We facilitate the discovery and initial contact between parties but do not directly manage bookings, payments, or property operations.
                  </p>
                  <p>
                    When you pay the <strong className="text-blue-300">₹99 unlock fee</strong>, you gain access to the property owner's verified contact details. All subsequent negotiations, agreements, and payments are made directly between you and the property owner.
                  </p>
                  <p>
                    <strong className="text-white">Important:</strong> STYO does not hold, process, or manage any booking deposits, advance payments, or rental amounts. These transactions occur independently between you and the property owner.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Why do I pay a booking token? */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Why do I pay a booking token?
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    Great question! The <strong className="text-blue-300">₹99 unlock fee</strong> serves multiple important purposes:
                  </p>
                  <div className="bg-blue-600/10 border border-blue-400/30 rounded-xl p-6 space-y-3">
                    <p>
                      <strong className="text-blue-300">1. Serious Inquiries Only:</strong> This small fee ensures that only genuinely interested users contact property owners, saving everyone's time and reducing spam.
                    </p>
                    <p>
                      <strong className="text-blue-300">2. Owner Privacy Protection:</strong> It prevents mass collection of owner contact details by competitors or spammers.
                    </p>
                    <p>
                      <strong className="text-blue-300">3. Platform Maintenance:</strong> The fee helps us maintain and improve STYO, verify listings, and provide quality service.
                    </p>
                    <p>
                      <strong className="text-blue-300">4. Quality Assurance:</strong> It allows us to invest in better verification processes and customer support.
                    </p>
                  </div>
                  <p>
                    Think of it as a <strong className="text-white">commitment fee</strong> – you only pay when you're serious about a property, and in return, you get direct access to verified owner details without any middleman markup on the actual rental price.
                  </p>
                  <p className="text-green-300 font-semibold">
                    💡 Pro Tip: Browse all property details for FREE before deciding to unlock. Only pay the ₹99 when you're ready to contact the owner!
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white/70">
                    Questions about our policies? Contact us at:
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
