"use client";

import { useState } from "react";
import Image from "next/image";

type Photo = { asset: { url: string; _id?: string } };
interface WarehouseData {
  title?: string;
  description?: string;
  photos?: Photo[];
  location?: { latitude?: number; longitude?: number; address?: string };
}

export default function WarehouseClient({
  initialData,
}: {
  initialData?: WarehouseData;
}) {
  const [data] = useState<WarehouseData | undefined>(initialData);

  const fallbackLocation = {
    latitude: 14.8161,
    longitude: 120.8665,
    address: "Balagtas, Bulacan, Philippines",
  };

  const location =
    data?.location &&
    typeof data.location.latitude === "number" &&
    typeof data.location.longitude === "number"
      ? data.location
      : fallbackLocation;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`;

  const heroImage =
    data?.photos?.[0]?.asset?.url ?? "/images/remove text and make.png";

  return (
    <main className="min-h-screen antialiased text-white bg-black">
      {/* Hero Banner */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black z-0"></div>

        <Image
          src={heroImage}
          alt="Warehouse Hero"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {data?.title ?? "The Warehouse"}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] mx-auto mb-8"></div>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
              {data?.description ??
                "Experience our state-of-the-art warehouse facility, designed for seamless logistics, scalable growth, and exceptional product handling."}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        {/* Gallery */}
        {data?.photos?.length ? (
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Facility Gallery
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.photos.map((photo, i) => (
                <div
                  key={photo.asset._id ?? i}
                  className="group relative h-80 overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-[#DC0C0C] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#DC0C0C]/20"
                >
                  <Image
                    src={photo.asset.url}
                    alt={`Warehouse photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white font-semibold text-lg">
                      View {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Contact & Location */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] mx-auto"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Contact our team or visit our state-of-the-art facility
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sales Contact */}
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-[#DC0C0C] transition-all duration-500 hover:shadow-2xl hover:shadow-[#DC0C0C]/10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#DC0C0C]/20 rounded-xl flex items-center justify-center border border-[#DC0C0C]/30">
                      <span className="text-2xl">📞</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      Sales Contact
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                      <div className="relative">
                        <Image
                          src="/images/sale.jpg"
                          alt="John Carlo Del Rosario"
                          width={120}
                          height={120}
                          className="rounded-xl object-cover border-2 border-[#DC0C0C] shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="text-center lg:text-left">
                        <p className="text-2xl font-bold text-white mb-1">
                          John Carlo Del Rosario
                        </p>
                        <p className="text-[#DC0C0C] font-semibold">
                          Logistics Manager
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors border border-gray-700">
                        <div className="w-10 h-10 bg-[#DC0C0C]/20 rounded-lg flex items-center justify-center border border-[#DC0C0C]/30">
                          <span className="text-lg">📧</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <a
                            href="mailto:johncarlodelrosario36@gmail.com"
                            className="text-white hover:text-[#DC0C0C] transition-colors font-medium"
                          >
                            johncarlodelrosario36@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors border border-gray-700">
                        <div className="w-10 h-10 bg-[#DC0C0C]/20 rounded-lg flex items-center justify-center border border-[#DC0C0C]/30">
                          <span className="text-lg">📱</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone</p>
                          <a
                            href="tel:090584279173"
                            className="text-white hover:text-[#DC0C0C] transition-colors font-medium"
                          >
                            +63 905 842 7917
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-[#DC0C0C] transition-all duration-500 hover:shadow-2xl hover:shadow-[#DC0C0C]/10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#DC0C0C]/20 rounded-xl flex items-center justify-center border border-[#DC0C0C]/30">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      Our Location
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="h-[300px] rounded-xl overflow-hidden border border-[#DC0C0C]/30">
                      <iframe
                        src={mapEmbedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Warehouse Location Map"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                      ></iframe>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#DC0C0C] hover:bg-[#b30a0a] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-[#DC0C0C]/25 border border-[#DC0C0C]"
                      >
                        <span>Open in Google Maps</span>
                        <span>→</span>
                      </a>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-xl border border-[#DC0C0C]/20">
                      <p className="text-gray-300 text-lg font-medium text-center">
                        {location.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
