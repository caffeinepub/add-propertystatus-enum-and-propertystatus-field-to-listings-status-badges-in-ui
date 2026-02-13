import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function RefundPolicyPage() {
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
            <CreditCard className="w-10 h-10 text-blue-300" />
          </div>
          <h1 
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            }}
          >
            Refund Policy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Clear and transparent refund terms for the ₹99 unlock fee
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
              
              {/* Overview */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Overview
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    The <strong className="text-blue-300">₹99 unlock fee</strong> is a one-time platform service charge that grants you access to verified property owner contact details. This policy outlines the specific conditions under which refunds are applicable.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Refund Eligible Cases */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Refund Applicable Only If
                  </h2>
                </div>
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p className="text-white font-semibold text-lg">
                    Refunds for the ₹99 unlock fee are granted ONLY in the following three cases:
                  </p>

                  {/* Case 1 */}
                  <div className="bg-green-600/10 border-2 border-green-400/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-300 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">
                          Property owner is unreachable within 48 hours
                        </h3>
                        <p>
                          If you cannot reach the property owner through any of the provided contact methods (phone, email, WhatsApp) within 48 hours of unlocking the contact details, you may request a refund.
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          <strong>Note:</strong> You must demonstrate reasonable attempts to contact the owner through multiple methods before requesting a refund.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Case 2 */}
                  <div className="bg-green-600/10 border-2 border-green-400/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-300 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">
                          Listing is proven fake after admin verification
                        </h3>
                        <p>
                          If our admin team verifies that the listing was fraudulent, contained false information, or was misrepresented, you will receive a full refund.
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          <strong>Note:</strong> You must report the issue to our support team at <a href="mailto:support@styo.in" className="text-blue-400 hover:text-blue-300">support@styo.in</a> with evidence for admin review.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Case 3 */}
                  <div className="bg-green-600/10 border-2 border-green-400/30 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-300 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">
                          Duplicate unlock payment due to system error
                        </h3>
                        <p>
                          If you were charged twice for unlocking the same listing due to a technical error on our platform, the duplicate charge will be refunded immediately.
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                          <strong>Note:</strong> Contact our support team with your transaction details for prompt resolution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Non-Refundable Cases */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Unlock Fee is Non-Refundable in All Other Cases
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <div className="bg-red-600/10 border-2 border-red-400/30 rounded-xl p-6">
                    <p className="text-white font-semibold text-lg mb-3">
                      The ₹99 unlock fee is NON-REFUNDABLE in all cases not listed above.
                    </p>
                    <p className="mb-3">
                      This includes but is not limited to:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Change of mind after unlocking owner details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Property no longer available after unlocking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Dissatisfaction with property details or condition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Inability to finalize booking with the owner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Price negotiations falling through</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Owner declining your booking request</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Finding a better property elsewhere</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">✗</span>
                        <span>Any other reason not explicitly listed in the refund-eligible cases above</span>
                      </li>
                    </ul>
                  </div>
                  <p>
                    The unlock fee is a <strong className="text-white">platform service charge</strong> for providing verified owner contact information. Once this information is provided to you, the service has been delivered, and the fee is non-refundable.
                  </p>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* How to Request a Refund */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    How to Request a Refund
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    If you believe you qualify for a refund under one of the three eligible cases, please follow these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>
                      <strong className="text-white">Contact Support:</strong> Email us at <a href="mailto:support@styo.in" className="text-blue-400 hover:text-blue-300">support@styo.in</a> with the subject line "Refund Request - [Listing ID]"
                    </li>
                    <li>
                      <strong className="text-white">Provide Details:</strong> Include your transaction ID, listing ID, and a detailed explanation of why you qualify for a refund
                    </li>
                    <li>
                      <strong className="text-white">Submit Evidence:</strong> Provide supporting evidence (screenshots of contact attempts, timestamps, etc.)
                    </li>
                    <li>
                      <strong className="text-white">Admin Review:</strong> Our team will review your request within 2-3 business days
                    </li>
                    <li>
                      <strong className="text-white">Refund Processing:</strong> If approved, refunds are processed within 5-7 business days to your original payment method
                    </li>
                  </ol>
                </div>
              </section>

              <Separator className="bg-white/10" />

              {/* Important Notes */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Important Notes
                  </h2>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Refund requests must be submitted within 7 days of the unlock transaction</li>
                    <li>STYO reserves the right to verify all refund claims and may request additional information</li>
                    <li>Abuse of the refund policy may result in account suspension</li>
                    <li>This refund policy applies only to the ₹99 unlock fee and not to any payments made directly to property owners</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mt-12 pt-8 border-t border-white/10">
                <div className="text-center space-y-4">
                  <p className="text-white/70">
                    Questions about refunds? Contact us at:
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
