import HeaderAPropos from "@/components/site/a-propos/HeaderAPropos";
import Histoire from "@/components/site/a-propos/Histoire";
import Valeurs from "@/components/site/a-propos/Valeurs";
import Engagement from "@/components/site/a-propos/Engagement";
import CTASection from "@/components/site/a-propos/CTASection";

export default function AProposPage() {
  return (
    <>
      <HeaderAPropos />
      <Histoire />
      <Valeurs />
      <Engagement />
      <CTASection />
    </>
  );
}