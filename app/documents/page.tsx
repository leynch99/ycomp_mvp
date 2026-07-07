import { InfoPage } from "@/components/InfoPage";
import { infoPages } from "@/lib/data";

export default function DocumentsPage() {
  return <InfoPage {...infoPages.documents} />;
}
