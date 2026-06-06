"use client";

import Container from "@/components/Container";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentKobySlide, setCurrentKobySlide] = useState(0);

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

  // Koby x Katagumpay Banner Images
  const kobyBannerImages = [
    "/images/CXP WEBSITE/CXP_ Banner Koby x katagumpay.jpg",
    "/images/CXP WEBSITE/CXP_ Banner Koby x katagumpay Full Mechanics.jpg",
  ];

  // Updated Social Updates iframes
  const socialUpdatesIframes = [
    {
      id: 1,
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02Ssg6P8DjTZpT9fnB9ycvm4Z88uX34BqeUfhgg2KsuDGaWvXpEz1gpu8Ci45x6MuDl&show_text=false&width=500"
          width="500"
          height="498"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Post 1"
        ></iframe>
      ),
    },
    {
      id: 2,
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0crALZsx6Tw9Bxce2d42ZVjYrN1QiHuhidD9RUeEXGxVsCBdcW9Gvp9L12BzgjF3pl&show_text=false&width=500"
          width="500"
          height="498"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Post 2"
        ></iframe>
      ),
    },
    {
      id: 3,
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid02v8pSdMGnPnzSgQfZBakSGNHbd2GCkzYYNymgrwLhsz6PmnnKSu1Hrn1dp7bPRMKJl&show_text=false&width=500"
          width="500"
          height="498"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Post 3"
        ></iframe>
      ),
    },
    {
      id: 4,
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0pHirVHijEknLP29vhRCK9t8THMwofZ6TT9RuBsb7AoitW29gJXWok61busqkAQY7l&show_text=false&width=500"
          width="500"
          height="498"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Facebook Post 4"
        ></iframe>
      ),
    },
  ];

  // Facebook iframes for Latest News section - Made smaller
  const latestNewsIframes = [
    {
      id: 1,
      title: "CXP Motozone Video Reel",
      embedCode: (
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=300&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1379147646713747%2F&show_text=false&width=267&t=0"
          width="267"
          height="300"
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
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0rGpNth6rhaUTRj7WWci5BWNXHZXdvdyK5KvzyhC38dCFkC4G4UkF4y4B1UoymY7l&show_text=true&width=300"
          width="300"
          height="400"
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
          src="https://www.facebook.com/plugins/video.php?height=250&href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fvideos%2F1970176833748221%2F&show_text=false&width=300&t=0"
          width="300"
          height="250"
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
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCXPMotozone%2Fposts%2Fpfbid0zkpbVvHt3TQ2XBQF1DxdNm2GUXQhm2meMthQyXqzJHeE6NBfxNU9QJZJ2xmHp6gil&show_text=true&width=300"
          width="300"
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

  const nextKobySlide = useCallback(() => {
    setCurrentKobySlide((prev) => (prev + 1) % kobyBannerImages.length);
  }, [kobyBannerImages.length]);

  const prevKobySlide = () => {
    setCurrentKobySlide(
      (prev) => (prev - 1 + kobyBannerImages.length) % kobyBannerImages.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextKobySlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextKobySlide]);

  return (
    <div className="min-h-screen bg-white pt-20 mt-10">
      <Container>
        {/* Title Section - Clean & Minimal */}
        <div className="w-full flex flex-col items-center py-12 md:py-16">
          <div className="flex items-center justify-center w-full gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 px-6 font-sans">
              NEWS & EVENTS
            </h1>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <p className="text-gray-500 text-center max-w-2xl font-sans">
            Stay updated with the latest happenings, collaborations, and
            community news from CXP Motozone
          </p>
        </div>

        {/* Navigation Links - Clean Tabs */}
        <div className="relative z-10 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="#koby-banners"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm"
            >
              Koby x Katagumpay
            </Link>
            <Link
              href="#latest-news"
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Latest News
            </Link>
            <Link
              href="#social-updates"
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Social Updates
            </Link>
          </div>
        </div>

        {/* Premium Image Slider Section - Clean Design */}
        <div className="relative z-10 mb-20">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Main Slider Container */}
            <div className="relative h-80 md:h-96 lg:h-[450px] bg-gray-50">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
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
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
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
                    </div>

                    {/* Right Image - 50% width (next image in sequence) */}
                    <div className="w-1/2 relative">
                      <Image
                        src={images[(index + 1) % images.length]}
                        alt={`Event ${((index + 1) % images.length) + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>

                  {/* Slide indicator */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlide
                            ? "bg-red-500 w-6"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Updates Section - Clean Grid */}
        <div id="social-updates" className="relative z-10 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-sans tracking-tight">
              Social Updates
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-sans">
              Stay connected with our latest social media posts and community
              updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialUpdatesIframes.map((iframe) => (
              <div
                key={iframe.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="p-6 flex justify-center">
                  <div className="w-full max-w-[300px] mx-auto">
                    {iframe.embedCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News Section - Clean Cards */}
        <div id="latest-news" className="relative z-10 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-sans tracking-tight">
              Latest News
            </h2>
            <div className="w-16 h-0.5 bg-red-500 mx-auto" />
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto font-sans">
              Latest updates from our Facebook page including videos, posts, and
              announcements
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestNewsIframes.map((iframe) => (
                  <div
                    key={iframe.id}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-4 text-center font-sans">
                        {iframe.title}
                      </h3>
                      <div className="flex justify-center">
                        <div className="w-full max-w-[300px] mx-auto">
                          {iframe.embedCode}
                        </div>
                      </div>
                      <div className="mt-5 text-center">
                        <Link
                          href="https://www.facebook.com/CXPMotozone"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200 font-medium"
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
              <div className="text-center mt-10 pt-4 border-t border-gray-100">
                <Link
                  href="https://www.facebook.com/CXPMotozone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm"
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
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
