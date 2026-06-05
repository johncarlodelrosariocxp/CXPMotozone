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
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0rTXjjpchN1aNNYFpjdVwrUV1kWVHe4VZqSna4BqhPsR2umSTUh8EA7ZKiqGPu7xcl&show_text=true&width=500&dark=1" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Join us for our latest motorcycle event featuring new models and exclusive offers.",
    },
    {
      id: 2,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02t1X3hbcpuSMDarBwpnDSQJurEDuFSZQfQoeppcZAXnhroi263TNpmwDjYssv1W8wl&show_text=true&width=500&dark=1" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Check out our latest motorcycle models and accessories now available in store.",
    },
    {
      id: 3,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02syfPdPRkxkmtgXhUbmw9Mvsy1cmjUN7ggE6Rr9jabcyEAQQb6FhgVBef1BV37bbHl&show_text=true&width=500&dark=1" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Get 20% off on all motorcycle services this month. Book your appointment now!",
    },
    {
      id: 4,
      embed: `
        <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0TZ6ijofEWqGcA1dtZPY5TkWy36j89wD3uKgsGygUipEHmh2dkjw3Mo8jyxVkSckql&show_text=true&width=500&dark=1" 
                width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" 
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
      `,
      description:
        "Monthly community ride event. All riders welcome! Safety gear required.",
    },
  ];

  return (
    <div
      className="relative w-full text-white bg-black bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('/images/335832-download-black-background-hd-1920x1200.jpg')",
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-30" />

      {/* Content */}
      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Title Section */}
        <div className="w-full flex flex-col items-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center w-full gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent to-[#DC0C0C]" />
            <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-center text-white bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] bg-clip-text text-transparent px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border border-[#DC0C0C] sm:border-2 shadow-lg sm:shadow-xl md:shadow-2xl shadow-red-500/20 uppercase font-rajdhani tracking-widest whitespace-nowrap">
              NEWS AND EVENTS
            </Title>
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent to-[#DC0C0C]" />
          </div>
        </div>

        {/* Facebook Posts Container */}
        <div className="w-full">
          {/* Mobile - Horizontal Scroll */}
          <div className="block md:hidden">
            <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-2 snap-x snap-mandatory">
              {facebookPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-none w-80 snap-center group bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] overflow-hidden transition-all duration-300 border border-[#DC0C0C] hover:border-white active:border-white shadow-lg hover:shadow-red-500/20 active:shadow-red-500/20"
                >
                  {/* Facebook Embed */}
                  <div className="h-64">
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: post.embed }}
                    />
                  </div>

                  {/* Description Below Image */}
                  <div className="p-4 border-t border-[#DC0C0C] bg-gradient-to-r from-transparent to-[#DC0C0C]/5">
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed font-rajdhani line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator for Mobile */}
            <div className="flex justify-center mt-4 gap-1.5">
              {facebookPosts.map((_, index) => (
                <div
                  key={index}
                  className="w-1.5 h-1.5 rounded-full bg-gray-600 opacity-50"
                />
              ))}
            </div>
          </div>

          {/* Tablet - 2 Columns */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {facebookPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] overflow-hidden transition-all duration-500 border border-[#DC0C0C] sm:border-2 hover:border-white hover:shadow-xl hover:shadow-red-500/20 hover:scale-105"
              >
                {/* Facebook Embed */}
                <div className="h-72">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: post.embed }}
                  />
                </div>

                {/* Description Below Image */}
                <div className="p-4 sm:p-5 border-t border-[#DC0C0C] bg-gradient-to-r from-transparent to-[#DC0C0C]/10">
                  <p className="text-gray-300 text-sm font-light leading-relaxed font-rajdhani">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop - 4 Columns */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {facebookPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] overflow-hidden transition-all duration-500 border-2 border-[#DC0C0C] hover:border-white hover:shadow-2xl hover:shadow-red-500/30 hover:scale-105"
              >
                {/* Facebook Embed */}
                <div className="h-80">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: post.embed }}
                  />
                </div>

                {/* Description Below Image */}
                <div className="p-6 border-t border-[#DC0C0C] bg-gradient-to-r from-transparent to-[#DC0C0C]/10">
                  <p className="text-gray-300 text-sm font-light leading-relaxed font-rajdhani">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Updated to match ProductGrid button style */}
        <div className="flex justify-center mt-8 transition-all duration-500 ease-out">
          <Link
            href="/blog"
            className="group relative inline-flex items-center justify-center gap-4 bg-transparent hover:bg-transparent text-[#DC0C0C] font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#DC0C0C] hover:border-[#DC0C0C] hover:shadow-[0_0_40px_rgba(220,12,12,0.6)] backdrop-blur-sm text-lg tracking-widest overflow-hidden font-rajdhani"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DC0C0C]/20 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
            <span className="relative z-10 tracking-widest text-[#DC0C0C]">
              VIEW ALL NEWS & EVENTS
            </span>
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
      `}</style>
    </div>
  );
};

export default LatestBlog;
