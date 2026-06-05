import { getDealerInfo } from "@/sanity/queries";
import {
  CheckCircle,
  Mail,
  Phone,
  User,
  Rocket,
  Shield,
  TrendingUp,
  Users,
  Target,
  Award,
  Clock,
  MapPin,
} from "lucide-react";

export default async function BecomeADealerPage() {
  const data = await getDealerInfo();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent">
            {data.title}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            {data.intro}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-400">Successful Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-gray-400">Quality Guarantee</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:dealers@cxpmotozone.com"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 border border-red-500/50"
            >
              <Rocket className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Start Your Application
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
            >
              <Phone className="w-6 h-6 mr-3" />
              Speak with Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {data.benefits?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-white">
                  Partnership Advantages
                </h2>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Unlock exclusive benefits designed to accelerate your business
                growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.benefits.map((item: string, i: number) => (
                <div
                  key={i}
                  className="group p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements Section */}
      {data.requirements?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-white">
                  Key Requirements
                </h2>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                What you need to join our premium dealer network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.requirements.map((item: string, i: number) => (
                <div
                  key={i}
                  className="group p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-red-500/50 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed pt-1 group-hover:text-white transition-colors">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application Process */}
      {data.steps?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-white">
                  Fast-Track Application
                </h2>
              </div>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simple steps to start your partnership journey
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 to-red-700 hidden md:block" />

              <div className="space-y-12">
                {data.steps.map((step: string, i: number) => (
                  <div
                    key={i}
                    className="relative flex items-start gap-8 group"
                  >
                    <div className="hidden md:flex flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full items-center justify-center text-white font-bold text-lg z-10 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-red-500/30">
                      {i + 1}
                    </div>
                    <div className="flex-1 p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 group-hover:border-red-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                      <p className="text-xl text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/30 rounded-3xl p-12 backdrop-blur-sm">
            <Award className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Business?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the leading network of motorcycle dealers and unlock your
              true potential with CXP MotoZone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dealers@cxpmotozone.com"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 border border-red-500/50"
              >
                <Mail className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Apply Now via Email
              </a>
              <a
                href={`tel:${data.contactPhone}`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm"
              >
                <Phone className="w-6 h-6 mr-3" />
                Call Now: {data.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/60">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    Dealer Relations Team
                  </h3>
                </div>
                <p className="text-lg text-gray-400 mb-8">
                  Our dedicated team is here to guide you through every step of
                  the partnership process and ensure your success.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <User className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="font-bold text-white text-lg">
                        {data.contactName}
                      </p>
                      <p className="text-gray-400">Dealer Relations Lead</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Mail className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-gray-400">Email</p>
                      <a
                        href={`mailto:${data.contactEmail}`}
                        className="font-bold text-white text-lg hover:text-red-400 transition-colors"
                      >
                        {data.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Phone className="w-8 h-8 text-red-400" />
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <a
                        href={`tel:${data.contactPhone}`}
                        className="font-bold text-white text-lg hover:text-red-400 transition-colors"
                      >
                        {data.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600/10 to-red-700/10 rounded-2xl p-8 border border-red-500/30">
                <Shield className="w-12 h-12 text-red-400 mb-6" />
                <h4 className="text-2xl font-bold text-white mb-4">
                  Why Choose CXP MotoZone?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    Proven business growth strategies
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Target className="w-5 h-5 text-red-400" />
                    Exclusive territory protection
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-red-400" />
                    Quick setup and onboarding
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-red-400" />
                    National brand recognition
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
