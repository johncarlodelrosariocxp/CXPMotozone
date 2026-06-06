// components/LatestBlog.tsx
"use client";

import React from "react";
import Title from "./Title";
import Link from "next/link";

const LatestBlog = () => {
  const facebookPosts = [
    {
      id: 1,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0rTXjjpchN1aNNYFpjdVwrUV1kWVHe4VZqSna4BqhPsR2umSTUh8EA7ZKiqGPu7xcl&show_text=true&width=500&dark=0" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Join us for our latest motorcycle event featuring new models and exclusive offers.",
      date: "March 15, 2026",
      readTime: "3 min read",
    },
    {
      id: 2,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02t1X3hbcpuSMDarBwpnDSQJurEDuFSZQfQoeppcZAXnhroi263TNpmwDjYssv1W8wl&show_text=true&width=500&dark=0" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Check out our latest motorcycle models and accessories now available in store.",
      date: "March 10, 2026",
      readTime: "2 min read",
    },
    {
      id: 3,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02syfPdPRkxkmtgXhUbmw9Mvsy1cmjUN7ggE6Rr9jabcyEAQQb6FhgVBef1BV37bbHl&show_text=true&width=500&dark=0" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Get 20% off on all motorcycle services this month. Book your appointment now!",
      date: "March 5, 2026",
      readTime: "4 min read",
    },
    {
      id: 4,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0TZ6ijofEWqGcA1dtZPY5TkWy36j89wD3uKgsGygUipEHmh2dkjw3Mo8jyxVkSckql&show_text=true&width=500&dark=0" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Monthly community ride event. All riders welcome! Safety gear required.",
      date: "February 28, 2026",
      readTime: "3 min read",
    },
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 " />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Title Section with Consistent Design */}
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
              <span className="w-8 h-px bg-[#DC0C0C]" />
              <span>Stay Updated</span>
              <span className="w-8 h-px bg-[#DC0C0C]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] bg-clip-text text-transparent">
            News & Events
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4 font-light">
            Stay updated with the latest news, events, and promotions from CXP
            Motozone
          </p>
        </div>

        {/* Facebook Posts Container */}
        <div className="w-full">
          {/* Mobile - Horizontal Scroll */}
          <div className="block md:hidden">
            <div className="flex overflow-x-auto scrollbar-hide gap-5 pb-4 px-2 snap-x snap-mandatory">
              {facebookPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-none w-80 snap-center bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-200 hover:-translate-y-1 border border-gray-200"
                >
                  {/* Facebook Embed */}
                  <div className="h-64 bg-gray-50">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: post.embed }}
                    />
                  </div>

                  {/* Content Below */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <p className="text-gray-700 text-sm font-light leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 mt-4 text-[#DC0C0C] text-sm font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Read More
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator for Mobile */}
            <div className="flex justify-center mt-6 gap-2">
              {facebookPosts.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                />
              ))}
            </div>
          </div>

          {/* Tablet - 2 Columns */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-4xl mx-auto">
            {facebookPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-200 hover:-translate-y-2 border border-gray-200"
              >
                {/* Facebook Embed */}
                <div className="h-72 bg-gray-50">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: post.embed }}
                  />
                </div>

                {/* Content Below */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-gray-700 text-sm font-light leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 mt-4 text-[#DC0C0C] text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Read More
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop - 4 Columns */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {facebookPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-200 hover:-translate-y-2 border border-gray-200"
              >
                {/* Facebook Embed */}
                <div className="h-80 bg-gray-50 overflow-hidden">
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: post.embed }}
                  />
                </div>

                {/* Content Below */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-gray-700 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[#DC0C0C] text-sm font-semibold hover:gap-3 transition-all duration-300 group/link"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button - Professional Style */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/blog"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] hover:from-[#b30a0a] hover:to-[#dc0c0c] text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/30 text-sm md:text-base uppercase tracking-wider overflow-hidden"
          >
            <span className="relative z-10">View All News & Events</span>
            <svg
              className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
          </Link>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LatestBlog;
