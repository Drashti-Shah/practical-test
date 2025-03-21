import React from "react";
import Image from "next/image";
import { LocationCardProps } from "@/utils/types";
import { openSans } from "@/utils/font";

export default function LocationCard({
  locations,
}: Readonly<LocationCardProps>) {
  return (
    <div
      className={` ${openSans.className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-[#887C68]`}
    >
      {locations.map((item) => (
        <div
          key={item.ID}
          className="bg-white overflow-hidden shadow-[17px_12px_60px_0px_rgba(0,0,0,0.25)] max-w-xl mx-auto flex flex-col h-full"
        >
          <div className="relative h-50 md:h-60 lg:h-80">
            <Image
              src={item.image_url}
              alt={item.post_title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex-grow p-6">
            <p className="text-[16px] leading-[24px] tracking-[0%] font-normal overflow-hidden mb-4 text-[#887C68]">
              {item.post_excerpt}
            </p>
          </div>

          <div className="bg-[#F8F8F8]">
            <h3 className="p-6 font-normal text-[22px] leading-[30px]">
              {item.post_title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
