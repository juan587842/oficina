import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fabio Mecânica Diesel — CRM",
  description: "A gente cuida do seu caminhão."
};

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  var p = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', t === 'dark' || (!t && p) ? 'dark' : 'light');
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
