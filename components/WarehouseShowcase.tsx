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
    <main className="min-h-screen bg-white">
      {/* Hero Banner - Minimal & Elegant */}
      <section className="relative h-[500px] w-full overflow-hidden bg-gray-50">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 z-0"></div>

        {/* Hero Image with soft overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Warehouse Hero"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            {/* Subtle badge */}
            <div className="inline-block mb-6">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                Our Facility
              </span>
            </div>

            <h1 className="text-gray-900 text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {data?.title ?? "The Warehouse"}
            </h1>

            <div className="w-20 h-0.5 bg-gray-300 mx-auto mb-8"></div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {data?.description ??
                "Experience our state-of-the-art warehouse facility, designed for seamless logistics, scalable growth, and exceptional product handling."}
            </p>
          </div>
        </div>

        {/* Scroll indicator - Subtle */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border border-gray-300 rounded-full flex justify-center">
            <div className="w-0.5 h-2 bg-gray-400 rounded-full mt-2 animate-[bounce_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        {/* Gallery Section - Clean Grid */}
        {data?.photos?.length ? (
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Facility Gallery
              </h2>
              <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Explore our modern warehouse facility through these images
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.photos.map((photo, i) => (
                <div
                  key={photo.asset._id ?? i}
                  className="group relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={photo.asset.url}
                    alt={`Warehouse photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <span className="text-white text-sm font-medium">
                      View {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Contact & Location Section - Professional Layout */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Get In Touch
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Contact our team or visit our state-of-the-art facility
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sales Contact Card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Sales Contact
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="relative">
                        <Image
                          src="/images/sale.jpg"
                          alt="John Carlo Del Rosario"
                          width={80}
                          height={80}
                          className="rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xl font-semibold text-gray-900">
                          John Carlo Del Rosario
                        </p>
                        <p className="text-gray-500 text-sm">
                          Logistics Manager
                        </p>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3">
                      <a
                        href="mailto:johncarlodelrosario36@gmail.com"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Email
                          </p>
                          <p className="text-gray-700 font-medium group-hover:text-gray-900">
                            johncarlodelrosario36@gmail.com
                          </p>
                        </div>
                      </a>

                      <a
                        href="tel:090584279173"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Phone
                          </p>
                          <p className="text-gray-700 font-medium group-hover:text-gray-900">
                            +63 905 842 7917
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Our Location
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {/* Map */}
                    <div className="h-[240px] rounded-lg overflow-hidden border border-gray-200">
                      <iframe
                        src={mapEmbedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Warehouse Location Map"
                      ></iframe>
                    </div>

                    {/* Address */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-gray-600 text-center">
                          {location.address}
                        </p>
                      </div>
                    </div>

                    {/* Map Button */}
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200"
                    >
                      <span>Open in Google Maps</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
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
