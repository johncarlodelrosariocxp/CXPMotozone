import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

// 📘 Facebook Logo from Local WebP Image
const FacebookIcon = () => (
  <Image
    src="/images/fb.png"
    alt="Facebook Logo"
    width={80}
    height={80}
    className="w-8 h-8 object-contain"
  />
);

// 🛍️ Shopee Logo from Local Image
const ShopeeIcon = () => (
  <Image
    src="/images/shopeelogo.png"
    alt="Shopee Logo"
    width={80}
    height={80}
    className="w-8 h-8 object-contain"
  />
);

const socialLink = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/CXPMotozone",
    icon: <FacebookIcon />,
  },
  {
    title: "Shopee",
    href: "https://shopee.ph/cxpmotozone?entryPoint=ShopBySearch&searchKeyword=cxp",
    icon: <ShopeeIcon />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <Tooltip.Provider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip.Root key={item.title}>
            <Tooltip.Trigger asChild>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content
              className={cn(
                "bg-white text-darkColor font-semibold px-2 py-1 rounded shadow",
                tooltipClassName
              )}
              side="top"
              align="center"
            >
              {item.title}
            </Tooltip.Content>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
};

export default SocialMedia;
