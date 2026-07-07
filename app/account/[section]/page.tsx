import { AccountPage } from "@/components/AccountPage";

export function generateStaticParams() {
  return ["orders", "builds", "addresses", "bonus", "referral", "reviews", "trade-in", "payments", "profile", "notifications"].map(
    (section) => ({ section })
  );
}

export default function AccountSectionPage({ params }: { params: { section: string } }) {
  return <AccountPage section={params.section} />;
}
