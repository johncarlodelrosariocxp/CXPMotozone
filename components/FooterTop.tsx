import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Balagtas, Bulacan",
    icon: (
      <MapPin className="h-6 w-6 text-white group-hover:text-[#DC0C0C] transition-colors duration-300" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "09059429173",
    icon: (
      <Phone className="h-6 w-6 text-white group-hover:text-[#DC0C0C] transition-colors duration-300" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 08:00 AM - 05:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-white group-hover:text-[#DC0C0C] transition-colors duration-300" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "johncarlodelrosaio36@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-white group-hover:text-[#DC0C0C] transition-colors duration-300" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="bg-black text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-gray-700 py-6 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      {data?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 group p-3 sm:p-4 transition-all duration-300 hover:bg-gray-800 hover:shadow-[0_0_16px_rgba(220,12,12,0.4)] border border-transparent hover:border-[#DC0C0C0C] w-full min-w-0"
        >
          {item?.icon}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white group-hover:text-[#DC0C0C] transition-colors duration-300 text-sm sm:text-base truncate">
              {item?.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 group-hover:text-white transition-colors duration-300 truncate">
              {item?.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
