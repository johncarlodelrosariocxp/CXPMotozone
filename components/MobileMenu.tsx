"use client";

import React, { useState } from "react";
import SideMenu from "./SideMenu";

const MobileMenu: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      {/* Simple Hamburger Icon */}
      <button
        onClick={() => setIsSideMenuOpen(true)}
        className="md:hidden flex flex-col justify-center items-start gap-[5px] p-2"
        aria-label="Open menu"
      >
        <span className="w-6 h-[2px] bg-black" />
        <span className="w-6 h-[2px] bg-black" />
        <span className="w-6 h-[2px] bg-black" />
      </button>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />
    </>
  );
};

export default MobileMenu;
