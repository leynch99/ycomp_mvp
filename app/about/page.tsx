import { InfoPage } from "@/components/InfoPage";
import { infoPages } from "@/lib/data";

export default function AboutPage() {
  return <InfoPage {...infoPages.about} />;
}
