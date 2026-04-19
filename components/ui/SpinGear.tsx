import { Settings } from "lucide-react";

export default function SpinGear({ size = 16 }: { size?: number }) {
  return <span className="spin-gear"><Settings size={size} /></span>;
}
