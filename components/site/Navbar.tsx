"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarData } from "@/data/dataNavbar";
import Image from "next/image";

export default function Navbar() {
  const { brand, links, cta } = navbarData;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-[#1B1C1E] px-6 md:px-10 border-b border-b-[#333]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between py-[18px]">

          {/* BRAND */}
          <Link href={brand.href}>
            <div className="flex items-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto mr-4"
              />
              <span className="hidden sm:inline text-[22px] font-bold text-[#F5F5F5]">
                {brand.name}
              </span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-7 list-none">
            {links.map((item, i) => {
              const isActive = pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`font-medium transition ${isActive
                      ? "text-[#C6A667]"
                      : "text-[#F5F5F5] hover:text-[#9B8452]"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* DESKTOP CTA */}
          <Link
            href={cta.href}
            className="hidden md:inline-block px-5 py-2.5 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition"
          >
            {cta.label}
          </Link>

          {/* BURGER BUTTON (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-[#1B1C1E] transition-all duration-300 md:hidden ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((item, i) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={i}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-semibold transition ${isActive
                  ? "text-[#C6A667]"
                  : "text-[#F5F5F5] hover:text-[#C6A667]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* CTA BUTTON */}
          <Link
            href={cta.href}
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-4 rounded-lg bg-[#C6A667] text-black font-bold text-lg hover:bg-[#9B8452] transition"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </>
  );
}
