"use client";
import { createContext, useContext, useState, useCallback } from "react";

const SidebarCtx = createContext<{ toggle: () => void; close: () => void; open: boolean }>({
  toggle: () => {},
  close: () => {},
  open: false
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(o => !o), []);
  const close = useCallback(() => setOpen(false), []);
  return <SidebarCtx.Provider value={{ open, toggle, close }}>{children}</SidebarCtx.Provider>;
}

export const useSidebar = () => useContext(SidebarCtx);
