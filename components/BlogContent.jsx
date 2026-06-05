"use client";

import Container from "@/components/Container";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/images/news&eventpics/481277417_662579206339973_6592549405098601087_n.jpg",
    "/images/news&eventpics/481433063_662257999705427_708831991926227886_n.jpg",
    "/images/news&eventpics/481468473_662498236348070_6950143735744353867_n.jpg",
    "/images/news&eventpics/481481835_662498203014740_7984799685853494243_n.jpg",
    "/images/news&eventpics/481665313_662566936341200_4571504760440164705_n.jpg",
    "/images/news&eventpics/481709111_662258009705426_4643511121707329653_n.jpg",
    "/images/news&eventpics/481775474_662258366372057_1651492165402331519_n.jpg",
    "/images/news&eventpics/482010051_662258373038723_5838525457539191162_n.jpg",
    "/images/news&eventpics/482087453_662258239705403_5250782223147514331_n.jpg",
    "/images/news&eventpics/482088447_662498489681378_4375726991545015854_n.jpg",
    "/images/news&eventpics/482135724_662567279674499_8061972321946893179_n.jpg",
    "/images/news&eventpics/482323195_662498439681383_4532352081716234602_n.jpg",
    "/images/news&eventpics/488549871_685904577340769_5780102411304713135_n.jpg",
    "/images/news&eventpics/488663442_685904807340746_4596103679344070064_n.jpg",
    "/images/news&eventpics/488750197_685905144007379_174386671441964669_n.jpg",
    "/images/news&eventpics/488934507_685905210674039_978818238690151065_n.jpg",
    "/images/news&eventpics/488953142_685905170674043_1851358025912254055_n.jpg",
    "/images/news&eventpics/489446265_685905017340725_1875562070552229566_n.jpg",
  ];

  const facebookPosts = [
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02L5XVhkwzLmTQXtxPR9J4LCAJH76hV6BPg3a2cCFbbssuctwqaJ2x1BRCX6BCVt6hl&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0RTednyEwDRkmky2rqMwjNo3ZjCg8tnsVKRxmknRVwEeQZMniHUjgmPPgujnmbjTTl&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02L5XVhkwzLmTQXtxPR9J4LCAJH76hV6BPg3a2cCFbbssuctwqaJ2x1BRCX6BCVt6hl&show_text=true&width=500",
    "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02FGiHy7UGNkSQGzPN3HKQZs4seLr9dxdPmGgoZakeTmx8vgeJ1qAAXVJTcDtPYbHtl&show_text=true&width=500",
  ];

  // Facebook iframes for Latest News section
  const facebookIframes = [
    {
      id: 1,
      title: "CXP Motozone Video Reel",
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1379147646713747%2F&show_text=false&width=267&t=0"
          width="267"
          height="476"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="CXP Motozone Video Reel"
        ></iframe>
      ),
    },
    {
      id: 2,
      title: "Latest Facebook Post",
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0rGpNth6rhaUTRj7WWci5BWNXHZXdvdyK5KvzyhC38dCFkC4G4UkF4y4B1UoymY7l&show_text=true&width=500"
          width="500"
          height="786"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Latest Facebook Post"
        ></iframe>
      ),
    },
    {
      id: 3,
      title: "CXP Motozone Video",
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fvideos%2F1970176833748221%2F&show_text=false&width=560&t=0"
          width="560"
          height="314"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="CXP Motozone Video"
        ></iframe>
      ),
    },
    {
      id: 4,
      title: "Facebook Update Post",
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0zkpbVvHt3TQ2XBQF1DxdNm2GUXQhm2meMthQyXqzJHeE6NBfxNU9QJZJ2xmHp6gil&show_text=true&width=500"
          width="500"
          height="250"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Update Post"
        ></iframe>
      ),
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Function to add dark mode and white text parameters to Facebook URLs - FIXED: removed TypeScript syntax
  const getFacebookUrlWithWhiteText = (url) => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}dark_mode=1&text_color=white`;
  };

  return (
    // ✅ Premium background with parallax effect
    <div
      className="relative py-16 md:py-20 min-h-screen text-white bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/blog.jpg')" }}
    >
      {/* ✅ Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-[#DC0C0C]/50 z-0" />

      {/* ✅ Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#DC0C0C]/15 via-transparent to-transparent z-0" />

      <Container>
        {/* Title Section */}
        <div className="w-full flex flex-col items-center mb-3">
          <div className="flex items-center justify-center w-full gap-4 mb-8">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-[#DC0C0C]" />
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-center text-[#DC0C0C] px-8 py-4 border-2 border-[#DC0C0C] shadow-2xl shadow-[#DC0C0C]/20 uppercase font-rajdhani tracking-widest backdrop-blur-sm">
              NEWS AND EVENTS
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-[#DC0C0C]" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="relative z-10 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white rounded-lg font-medium hover:from-[#ff4444] hover:to-[#DC0C0C] transition-all duration-300 transform hover:scale-105 shadow-lg font-rajdhani"
            >
              ← Back to Home
            </Link>
            <Link
              href="#latest-news"
              className="px-6 py-3 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white rounded-lg font-medium hover:from-[#ff4444] hover:to-[#DC0C0C] transition-all duration-300 transform hover:scale-105 shadow-lg font-rajdhani"
            >
              Latest News
            </Link>
            <Link
              href="#social-updates"
              className="px-6 py-3 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white rounded-lg font-medium hover:from-[#ff4444] hover:to-[#DC0C0C] transition-all duration-300 transform hover:scale-105 shadow-lg font-rajdhani"
            >
              Social Updates
            </Link>
          </div>
        </div>

        {/* ✅ Premium Image Slider Section with 2 images side by side - BLACK GLASS */}
        <div className="relative z-10 mb-10">
          <div className="backdrop-blur-2xl bg-black/60 border border-[#DC0C0C] shadow-2xl shadow-[#DC0C0C]/30 p-1">
            {/* Main Slider Container */}
            <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#DC0C0C] hover:border-white transition-all duration-300 group"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-[#DC0C0C] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#DC0C0C] hover:border-white transition-all duration-300 group"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-[#DC0C0C] transition-colors"
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
              </button>

              {/* Combined Two Images Layout */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex h-full">
                    {/* Left Image - 50% width */}
                    <div className="w-1/2 relative">
                      <Image
                        src={image}
                        alt={`Event ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    </div>

                    {/* Right Image - 50% width (next image in sequence) */}
                    <div className="w-1/2 relative">
                      <Image
                        src={images[(index + 1) % images.length]}
                        alt={`Event ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Slide indicator */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === currentSlide
                            ? "bg-[#DC0C0C] scale-125"
                            : "bg-white/70 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Premium Facebook Posts Grid - BLACK GLASS with WHITE TEXT */}
        <div id="social-updates" className="relative z-10 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#DC0C0C] mb-4 font-rajdhani">
              Social Updates
            </h2>
            <div className="w-24 h-0.5 bg-[#DC0C0C] mx-auto" />
            <p className="text-white mt-4 max-w-2xl mx-auto font-rajdhani text-lg">
              Stay connected with our latest social media posts and community
              updates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facebookPosts.map((post, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-black/60 border border-[#DC0C0C] shadow-xl shadow-[#DC0C0C]/20 p-6 hover:bg-black/70 transition-all duration-300 hover:scale-[1.02]"
              >
                <iframe
                  src={getFacebookUrlWithWhiteText(post)}
                  width="100%"
                  height="692"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`Facebook Post ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* ✅ REDESIGNED Facebook Follow Button - WHITE STYLE */}
          <div className="text-center mt-12">
            <div className="backdrop-blur-xl bg-black/60 border border-[#DC0C0C] p-8 max-w-2xl mx-auto shadow-2xl shadow-[#DC0C0C]/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2 font-rajdhani">
                    Join Our Community
                  </h3>
                  <p className="text-white font-rajdhani">
                    Follow us on Facebook for real-time updates, events, and
                    exclusive content
                  </p>
                </div>

                <Link
                  href="https://www.facebook.com/CXPMotozone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-white/25 min-w-[200px] justify-center border border-white"
                >
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="font-rajdhani">Follow on Facebook</span>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-[#DC0C0C]">
                <div className="flex items-center justify-center gap-2 text-white text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1 15v-6h2v6h-2zm0-8V7h2v2h-2z" />
                  </svg>
                  <span className="font-rajdhani">
                    Live updates • Events • Exclusive content
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Latest News Section - Now with Facebook Iframes - BLACK GLASS */}
        <div id="latest-news" className="relative z-10">
          <div className="backdrop-blur-2xl bg-black/60 border border-[#DC0C0C] shadow-2xl shadow-[#DC0C0C]/20 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#DC0C0C] mb-4 font-rajdhani">
                Latest News
              </h2>
              <div className="w-24 h-0.5 bg-[#DC0C0C] mx-auto mb-8" />
              <p className="text-white max-w-2xl mx-auto font-rajdhani text-lg">
                Latest updates from our Facebook page including videos, posts,
                and announcements
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {facebookIframes.map((iframe) => (
                <div
                  key={iframe.id}
                  className="group backdrop-blur-xl bg-black/60 border border-[#DC0C0C] shadow-lg shadow-[#DC0C0C]/10 overflow-hidden hover:bg-black/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#DC0C0C]/20"
                >
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-4 text-center font-rajdhani">
                      {iframe.title}
                    </h3>
                    <div className="flex justify-center">
                      <div
                        className="overflow-hidden"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "100%",
                        }}
                      >
                        {iframe.embedCode}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Link
                        href="https://www.facebook.com/CXPMotozone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#DC0C0C] hover:text-[#ff4444] transition-colors duration-300 font-rajdhani"
                      >
                        <span>View on Facebook</span>
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
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <Link
                href="https://www.facebook.com/CXPMotozone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white font-bold hover:from-[#ff4444] hover:to-[#DC0C0C] transition-all duration-300 transform hover:scale-105 shadow-lg font-rajdhani border border-white/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Follow for More Updates</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Premium Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-3 h-3 bg-[#DC0C0C] rounded-full opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 right-6 w-2 h-2 bg-[#ff4444] rounded-full opacity-50 animate-bounce delay-1000" />
        <div className="absolute top-1/2 left-24 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-ping" />
        <div className="absolute top-3/4 right-16 w-2 h-2 bg-[#DC0C0C] rounded-full opacity-60 animate-pulse delay-500" />
      </Container>
    </div>
  );
};

export default BlogPage;
