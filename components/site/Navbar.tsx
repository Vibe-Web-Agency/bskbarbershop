"use client";

import Link from "next/link";
import { navbarData } from "@/data/dataNavbar";

export default function Navbar() {
  const { brand, links, cta } = navbarData;

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#1B1C1E] px-10 border-b border-b-[#333]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-[18px]">

        {/* BRAND */}
        <Link href={brand.href}>
          <div className="flex items-center">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-[22px] font-bold text-[#F5F5F5]">
                {brand.name}
              </span>
            )}
          </div>
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex gap-7 list-none">
          {links.map((item, i) => (
            <li key={i}>
              <Link
                href={item.href}
                className="text-[#F5F5F5] font-medium hover:text-[#9B8452] transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={cta.href}
          className="hidden md:inline-block px-5 py-2.5 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition"
        >
          {cta.label}
        </Link>
      </div>
    </nav>
  );
}
