// components/Logo.tsx

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  variant?: "header" | "footer";
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  imgClassName = "",
  variant = "header",
}) => {
  const src =
    variant === "footer"
      ? "/images/LOGO/LOGO_CXP Motozone/LOGO_CXP Motozone-02.png"
      : "/images/LOGO/LOGO_CXP Motozone/LOGO_CXP Motozone-01.png";

  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="CXPMotozone Logo"
        width={460}
        height={370}
        className={cn("object-contain", imgClassName)}
        priority
      />
    </Link>
  );
};

export default Logo;
