import SpinGear from "@/components/ui/SpinGear";

export default function Loading() {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      height: "60vh", gap: 16
    }}>
      <SpinGear size={40} />
      <span style={{
        fontFamily: "Oswald", fontSize: 13, fontWeight: 600,
        textTransform: "uppercase", letterSpacing: "0.12em",
        color: "var(--graxa)"
      }}>Carregando…</span>
    </div>
  );
}
