import Link from "next/link";
import { contactInfo, horaires } from "@/data/dataContact";

export default function Footer() {
  return (
    <footer className="bg-[#1B1C1E] text-[#D0D0D0] py-10 border-t border-t-[#333]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">

        <div>
          <h3 className="text-white text-lg font-semibold">BSK Barbershop</h3>
          <p className="mt-3 text-sm text-[#A0A0A0]">
            BSK Barbershop vous accueille dans un espace dédié au style,
            à la précision et au soin du cheveu. Coupes, barbes, locks et
            tresses : chaque prestation est réalisée avec expertise.
          </p>
        </div>


        <div>
          <h4 className="text-white font-semibold mb-3">Liens</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/prestations" className="hover:text-[#C6A667] transition">Prestations & Tarifs</Link></li>
            <li><Link href="/locks-tresses" className="hover:text-[#C6A667] transition">Locks & Tresses</Link></li>
            <li><Link href="/galerie" className="hover:text-[#C6A667] transition">Galerie</Link></li>
            <li><Link href="/a-propos" className="hover:text-[#C6A667] transition">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-[#C6A667] transition">Contact</Link></li>
          </ul>
        </div>


        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={contactInfo.phoneLink} className="hover:text-[#C6A667] transition">
                {contactInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-[#C6A667] transition">
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.googleMapsLink}
                target="_blank"
                className="hover:text-[#C6A667] transition"
              >
                {contactInfo.address}<br />{contactInfo.city}
              </a>
            </li>
            <li className="pt-2">
              <a
                href={contactInfo.instagram}
                target="_blank"
                className="inline-flex items-center gap-2 text-[#D0D0D0] hover:text-[#C6A667] transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @bsk.barbershop
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Horaires</h4>
          <ul className="space-y-1 text-sm text-[#A0A0A0]">
            {horaires.map((item, index) => (
              <li key={index} className="flex justify-between gap-4">
                <span>{item.jour}</span>
                <span className="text-[#D0D0D0]">{item.horaire}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-[#777] mt-10">
        © {new Date().getFullYear()} BSK Barbershop. Tous droits réservés.
      </div>
      <div className="text-center text-xs text-[#777] mt-2">
        Designed and developed by <a href="https://vibewebagency.fr" target="_blank" rel="noopener noreferrer" className="text-[#C6A667] hover:text-[#D0D0D0] transition">Vibe Web Agency</a>
      </div>
    </footer>
  );
}
