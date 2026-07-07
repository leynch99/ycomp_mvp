import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "YComp - интернет-магазин комплектующих",
    template: "%s | YComp"
  },
  description: "MVP интернет-магазина компьютерных комплектующих YComp для рынка Украины."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
