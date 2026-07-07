import { InfoPage } from "@/components/InfoPage";
import { infoPages } from "@/lib/data";

export default function FaqPage() {
  return <InfoPage {...infoPages.faq} />;
}
