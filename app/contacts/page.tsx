import { InfoPage } from "@/components/InfoPage";
import { infoPages } from "@/lib/data";

export default function ContactsPage() {
  return <InfoPage {...infoPages.contacts} />;
}
