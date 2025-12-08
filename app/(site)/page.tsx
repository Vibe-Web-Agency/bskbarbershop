import Hero from "@/components/site/home/Hero";
import Pricing from "@/components/site/home/Pricing";
import LocksTressesSection from "@/components/site/home/LocksTressesSection";
import GalerieSection from "@/components/site/home/GalerieSection";
import AProposSection from "@/components/site/home/AProposSection";
import ContactSection from "@/components/site/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <LocksTressesSection />
      <GalerieSection />
      <AProposSection />
      <ContactSection />
    </>
  );
}
