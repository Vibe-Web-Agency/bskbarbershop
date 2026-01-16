import HeaderReserver from "@/components/site/reserver/HeaderReserver";
import ReservationChoice from "@/components/site/reserver/ReservationChoice";
import FormulaireReservation from "@/components/site/reserver/FormulaireReservation";
import InfosReservation from "@/components/site/reserver/InfosReservation";

export default function ReserverPage() {
  return (
    <div className="bg-[#1B1C1E]">
      <HeaderReserver />
      <ReservationChoice />
      <div id="formulaire" className="pt-8 scroll-mt-24">
        <FormulaireReservation />
      </div>
      <InfosReservation />
    </div>
  );
}