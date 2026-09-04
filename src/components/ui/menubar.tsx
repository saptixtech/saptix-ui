import * as React from "react";
import { cn } from "@/lib/utils";

export interface MenubarMenuProps {
  trigger: string;
  items: { label: string; shortcut?: string; onClick?: () => void }[];
}

export function Menubar({ menus, className }: { menus: MenubarMenuProps[]; className?: string }) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  return (
    <div className={cn("flex items-center gap-1 rounded-2xl border border-border bg-card p-1 shadow-md text-xs", className)}>
      {menus.map((menu, idx) => (
        <div key={menu.trigger} className="relative">
          <button
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            className={cn(
              "px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer",
              activeIdx === idx ? "bg-white/10 text-white" : "text-foreground/80 hover:text-foreground hover:bg-secondary"
            )}
          >
            {menu.trigger}
          </button>

          {activeIdx === idx && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setActiveIdx(null)} />
              <div className="absolute left-0 top-full mt-1 z-50 min-w-[180px] rounded-2xl border border-border bg-card p-1.5 shadow-2xl backdrop-blur-xl animate-scale-in">
                {menu.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      item.onClick?.();
                      setActiveIdx(null);
                    }}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-foreground/80 hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-[10px] font-mono text-muted-foreground/80">{item.shortcut}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
