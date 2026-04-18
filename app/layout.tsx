import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fabio Mecânica Diesel — CRM",
  description: "A gente cuida do seu caminhão."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
