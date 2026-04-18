import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        laranja: {
          DEFAULT: "#FF6A1A",
          hover: "#E55A0E",
          soft: "#FFE6D6"
        },
        preto: "#0E0E10",
        aco: "#2A2D33",
        graxa: "#55585F",
        concreto: "#C9C8C3",
        papel: { DEFAULT: "#F5F2EC", alt: "#EDE9E0", pure: "#FFFFFF" },
        amarelo: "#FFC400",
        vermelho: "#D7263D",
        verde: "#4CB944",
        whatsapp: "#25D366",
        "border-soft": "#D9D6CE"
      },
      fontFamily: {
        display: ["Oswald", "Impact", "Arial Narrow", "sans-serif"],
        body: ["Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Consolas", "monospace"]
      },
      boxShadow: {
        hard: "2px 2px 0 0 #0E0E10",
        "hard-md": "4px 4px 0 0 #0E0E10",
        "hard-lg": "6px 6px 0 0 #0E0E10",
        "hard-orange": "4px 4px 0 0 #FF6A1A"
      },
      borderRadius: { sm: "2px", md: "4px", lg: "6px" },
      letterSpacing: { wider2: "0.08em", widest2: "0.12em", widest3: "0.16em" }
    }
  },
  plugins: []
};
export default config;
