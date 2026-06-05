import React from "react";
import Container from "@/components/Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-15 bg-black border-t border-[#DC0C0C]/30 text-white shadow-[0_0_25px_rgba(220,12,12,0.25)]">
      <Container>
        <FooterTop />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Logo and Description */}
          <div>
            <Logo variant="footer" />
            <SubText className="text-gray-300 mt-2">
              Explore high‑performance motorcycle essentials at CXP Motozone,
              where durability meets design.
            </SubText>
            <div className="flex gap-4 mt-4">
              <Link
                href="https://www.facebook.com/CXPMotozone"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12  hover:bg-gray-100 shadow-md transition-all duration-300 hover:scale-110"
              >
                <Image
                  src="/images/fblog.png"
                  alt="Facebook"
                  width={104}
                  height={104}
                  className="w-55 h-12"
                />
              </Link>
              <Link
                href="https://shopee.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 shadow-md transition-all duration-300 hover:scale-110"
              >
                <Image
                  src="/images/shopeelog.png"
                  alt="Shopee"
                  width={84}
                  height={84}
                  className="w-10 h-10"
                />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-5 rounded-lg border border-transparent bg-gradient-to-b from-black/40 to-black/20 hover:border-[#DC0C0C]/60 hover:shadow-[0_0_20px_rgba(220,12,12,0.5)] transition-all duration-500">
            <SubTitle className="text-white relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-[#DC0C0C] after:to-transparent after:mt-1 after:rounded-full">
              Quick Links
            </SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="relative inline-block hover:text-[#DC0C0C] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#DC0C0C] after:transition-all after:duration-500 hover:after:w-full"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="p-5 rounded-lg border border-transparent bg-gradient-to-b from-black/40 to-black/20 hover:border-[#DC0C0C]/60 hover:shadow-[0_0_20px_rgba(220,12,12,0.5)] transition-all duration-500">
            <SubTitle className="text-white relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-[#DC0C0C] after:to-transparent after:mt-1 after:rounded-full">
              Categories
            </SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="relative inline-block hover:text-[#DC0C0C] transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#DC0C0C] after:transition-all after:duration-500 hover:after:w-full"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="p-5 rounded-lg border border-transparent bg-gradient-to-b from-black/40 to-black/20 hover:border-[#DC0C0C]/60 hover:shadow-[0_0_20px_rgba(220,12,12,0.5)] transition-all duration-500 space-y-4">
            <SubTitle className="text-white relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-[#DC0C0C] after:to-transparent after:mt-1 after:rounded-full">
              Newsletter
            </SubTitle>
            <SubText className="text-gray-300">
              Subscribe to our newsletter for the latest updates and offers.
            </SubText>

            <form className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                required
                className="bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:border-[#DC0C0C] focus:shadow-[0_0_12px_rgba(220,12,12,0.6)] transition-all duration-300"
              />
              <Button className="w-full bg-[#DC0C0C] text-white hover:bg-[#b80a0a] transition-all duration-300 shadow-[0_0_12px_rgba(220,12,12,0.5)] hover:shadow-[0_0_20px_rgba(220,12,12,0.7)]">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-4 border-t border-[#DC0C0C]/20 text-center text-xs text-gray-400">
          <div className="inline-flex items-center justify-center gap-x-1">
            <span>© {new Date().getFullYear()}</span>
            <Logo variant="footer" className="w-25 h-auto" />
            <span>All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
