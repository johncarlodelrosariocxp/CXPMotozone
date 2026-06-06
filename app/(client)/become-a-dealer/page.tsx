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
  ArrowRight,
  Star,
  Briefcase,
  FileCheck,
} from "lucide-react";

export default async function BecomeADealerPage() {
  const data = await getDealerInfo();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean & Minimal */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-50" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
              Partnership Program
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
            {data.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            {data.intro}
          </p>

          {/* Stats - Clean Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-500">Active Dealers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-500">Support Access</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-500">Quality Guarantee</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:dealers@cxpmotozone.com"
              className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your Application
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              Speak with Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {data.benefits?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Partnership Advantages
              </h2>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Unlock exclusive benefits designed to accelerate your business
                growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((item: string, i: number) => (
                <div
                  key={i}
                  className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-gray-200 transition-colors">
                    <CheckCircle className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements Section */}
      {data.requirements?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Key Requirements
              </h2>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                What you need to join our premium dealer network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.requirements.map((item: string, i: number) => (
                <div
                  key={i}
                  className="group p-5 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 font-semibold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Application Process
              </h2>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Simple steps to start your partnership journey
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {data.steps.map((step: string, i: number) => (
                <div key={i} className="flex-1 relative">
                  {/* Connector line (desktop) */}
                  {i < data.steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                  )}

                  <div className="p-6 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5">
                      {i + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>

                  {/* Mobile arrow */}
                  {i < data.steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-3">
                      <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
            <Award className="w-14 h-14 text-gray-700 mx-auto mb-5" />
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Ready to Elevate Your Business?
            </h3>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Join the leading network of motorcycle dealers and unlock your
              true potential with CXP MotoZone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dealers@cxpmotozone.com"
                className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all duration-200 shadow-sm"
              >
                <Mail className="w-5 h-5 mr-2" />
                Apply Now via Email
              </a>
              <a
                href={`tel:${data.contactPhone}`}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {data.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Dealer Relations Team
                  </h3>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our dedicated team is here to guide you through every step of
                  the partnership process and ensure your success.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <User className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {data.contactName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Dealer Relations Lead
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Mail className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${data.contactEmail}`}
                        className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {data.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Phone className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${data.contactPhone}`}
                        className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {data.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Why Choose Us */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <Shield className="w-10 h-10 text-gray-700 mb-5" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose CXP MotoZone?
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600">
                    <TrendingUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    Proven business growth strategies
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Target className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    Exclusive territory protection
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    Quick setup and onboarding
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    National brand recognition
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    Marketing and training support
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
