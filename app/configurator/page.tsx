import type { Metadata } from "next";
import { ConfiguratorPage } from "@/components/ConfiguratorPage";

export const metadata: Metadata = {
  title: "Конфигуратор ПК"
};

export default function ConfiguratorRoute() {
  return <ConfiguratorPage />;
}
