import HeaderReserver from "@/components/site/reserver/HeaderReserver";
import FormulaireReservation from "@/components/site/reserver/FormulaireReservation";
import InfosReservation from "@/components/site/reserver/InfosReservation";

export default function ReserverPage() {
  return (
    <div className="bg-[#1B1C1E]">
      <HeaderReserver />
      <FormulaireReservation />
      <InfosReservation />
    </div>
  );
}