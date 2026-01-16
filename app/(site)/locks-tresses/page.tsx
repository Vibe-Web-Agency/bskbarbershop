import LocksHero from "@/components/site/locksTresses/LocksHero";
import LocksIntro from "@/components/site/locksTresses/LocksIntro";
import LocksRetwist from "@/components/site/locksTresses/LocksRetwist";
import LocksCrochet from "@/components/site/locksTresses/LocksCrochet";
import TressesSection from "@/components/site/locksTresses/TressesSection";
import BtnRDVLocksTresses from "@/components/site/locksTresses/BtnRDVLocksTresses";
import LocksFormRDV from "@/components/site/locksTresses/LocksFormRDV";

export default function LocksTressesPage() {
  return (
    <div className="bg-[#1B1C1E] text-white">
      <LocksHero />
      <LocksIntro />
      <LocksRetwist />
      <BtnRDVLocksTresses />
      <LocksCrochet />
      <TressesSection />
      <LocksFormRDV />
      <div className="pb-16"></div>
    </div>
  );
}

