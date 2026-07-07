import { InfoPage } from "@/components/InfoPage";
import { infoPages } from "@/lib/data";

export default function BonusesPage() {
  return <InfoPage {...infoPages.bonuses} />;
}
