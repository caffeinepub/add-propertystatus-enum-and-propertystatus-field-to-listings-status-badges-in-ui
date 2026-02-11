import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Shield, AlertCircle, CreditCard, HelpCircle } from 'lucide-react';

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

              {/* No-Show & Cancellation Policy */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    No-Show & Cancellation Policy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    The <strong className="text-blue-300">₹99 unlock fee</strong> is <strong className="text-white">non-refundable</strong> under any circumstances, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Change of mind after unlocking owner details</li>
                    <li>Property no longer available</li>
                    <li>Inability to reach the owner</li>
                    <li>Dissatisfaction with property details</li>
                    <li>Any other reason</li>
                  </ul>
                  <p>
                    This fee is a <strong className="text-white">platform service charge</strong> for providing verified owner contact information and is separate from any booking or rental agreements you make with the property owner.
                  </p>
                  <p>
                    <strong className="text-white">Cancellation of bookings:</strong> Any cancellation policies, refund terms, or no-show penalties related to your actual booking or stay are determined solely by the property owner. STYO has no involvement in these arrangements.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Owner Unavailability Policy */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Owner Unavailability Policy
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    While we verify owner contact details at the time of listing, we cannot guarantee:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Immediate owner response</li>
                    <li>Owner availability at the time of contact</li>
                    <li>Property availability after unlocking</li>
                    <li>Owner's willingness to proceed with booking</li>
                  </ul>
                  <p>
                    <strong className="text-white">If you cannot reach the owner:</strong> We recommend trying multiple contact methods (phone, email, WhatsApp if provided) at different times. Property owners are independent operators and may have varying response times.
                  </p>
                  <p>
                    The <strong className="text-blue-300">₹99 unlock fee</strong> remains non-refundable even if the owner is temporarily unavailable or the property is no longer available.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Legal & Platform Disclaimer */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-purple-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Legal & Platform Disclaimer
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    <strong className="text-white">STYO acts solely as a listing and discovery platform.</strong> We do not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Own, manage, or operate any listed properties</li>
                    <li>Act as an agent or representative of property owners</li>
                    <li>Guarantee the accuracy of property descriptions or photos</li>
                    <li>Verify property conditions, amenities, or legal compliance</li>
                    <li>Mediate disputes between users and property owners</li>
                    <li>Process or hold booking payments or deposits</li>
                  </ul>
                  <p>
                    <strong className="text-white">User Responsibility:</strong> You are responsible for conducting your own due diligence, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Verifying property details and conditions</li>
                    <li>Negotiating terms directly with the owner</li>
                    <li>Ensuring all agreements are documented</li>
                    <li>Verifying owner identity and property ownership</li>
                    <li>Understanding local rental laws and regulations</li>
                  </ul>
                  <p>
                    <strong className="text-white">Limitation of Liability:</strong> STYO is not liable for any losses, damages, disputes, or issues arising from your interactions with property owners or your use of listed properties. All transactions and agreements are between you and the property owner.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Payment Responsibility Clause */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Payment Responsibility Clause
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    <strong className="text-white">Platform Fee (₹99):</strong> This is the only payment processed by STYO. It is a one-time, non-refundable service charge for unlocking verified owner contact information.
                  </p>
                  <p>
                    <strong className="text-white">All Other Payments:</strong> Any and all other payments including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Booking deposits or advance payments</li>
                    <li>Monthly or daily rental amounts</li>
                    <li>Security deposits</li>
                    <li>Maintenance charges</li>
                    <li>Utility bills</li>
                    <li>Any other fees or charges</li>
                  </ul>
                  <p>
                    ...are made <strong className="text-white">directly to the property owner</strong> and are <strong className="text-white">not processed through STYO</strong>.
                  </p>
                  <p>
                    <strong className="text-white">Payment Disputes:</strong> STYO cannot assist with disputes related to payments made directly to property owners. You must resolve such matters directly with the owner or through appropriate legal channels.
                  </p>
                  <p>
                    <strong className="text-white">Payment Security:</strong> We recommend using secure payment methods, obtaining receipts, and documenting all financial transactions with property owners.
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
                    Last updated: January 2025
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
