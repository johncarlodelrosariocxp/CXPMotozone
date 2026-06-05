"use client";

import React, { FC, useState } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
import { headerData } from "@/constants/data";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-screen w-80 z-50 bg-black text-white border-l border-l-shop_light_green shadow-xl">
      <div ref={sidebarRef} className="h-full p-10 flex flex-col gap-6">
        {/* Logo + Close */}
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" />
          <button
            onClick={onClose}
            className="hover:text-shop_light_green transition-colors"
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        {/* Search Box */}
        <div className="flex items-center border-2 border-white rounded-md overflow-hidden bg-transparent">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 py-[6px] px-3 text-sm text-white placeholder-white bg-transparent focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="text-white hover:text-shop_light_green px-3 text-sm"
          >
            🔍
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => {
            const isActive =
              pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");

            return (
              <Link
                href={item.href}
                key={item.title}
                className={`hover:text-shop_light_green transition-colors ${
                  isActive ? "text-white" : ""
                }`}
                onClick={onClose}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Social Media */}
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
