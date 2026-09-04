import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({ defaultValue, className, children, ...props }: { defaultValue: string; className?: string; children: React.ReactNode }) {
  const [active, setActive] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn("", className)} {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

const TabsContext = React.createContext<{ active: string; setActive: (v: string) => void }>({ active: "", setActive: () => {} });

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex h-10 items-center gap-1.5 rounded-xl bg-[rgba(15,23,42,0.8)] p-1.5 border border-[rgba(255,255,255,0.08)] backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { active, setActive } = React.useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
        isActive
          ? "bg-gradient-to-r from-[#7c31f6] to-[#6366f1] text-white shadow-[0_2px_10px_rgba(124,49,246,0.35)]"
          : "text-[#94a3b8] hover:text-foreground hover:bg-[rgba(255,255,255,0.06)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { active } = React.useContext(TabsContext);
  if (active !== value) return null;
  return <div className={cn("mt-4 animate-fade-in", className)}>{children}</div>;
}
