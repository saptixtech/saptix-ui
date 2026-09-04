import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

export interface NavMenuItem {
  title: string;
  description?: string;
  href?: string;
}

export function NavigationMenu({
  items,
  className,
}: {
  items: { label: string; subItems?: NavMenuItem[] }[];
  className?: string;
}) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  return (
    <nav className={cn("relative flex items-center gap-2 text-xs", className)}>
      {items.map((item, idx) => (
        <div key={item.label} className="relative">
          <button
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer",
              activeIdx === idx ? "bg-[var(--primary-glow)] text-[var(--primary-light)]" : "text-foreground/80 hover:text-foreground hover:bg-secondary"
            )}
          >
            <span>{item.label}</span>
            {item.subItems && <IconChevronDown className="size-3 text-muted-foreground" />}
          </button>

          {item.subItems && activeIdx === idx && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setActiveIdx(null)} />
              <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-2xl border border-border bg-card p-3 shadow-2xl backdrop-blur-xl animate-scale-in">
                {item.subItems.map((sub) => (
                  <a
                    key={sub.title}
                    href={sub.href || "#"}
                    onClick={() => setActiveIdx(null)}
                    className="block p-2.5 rounded-xl hover:bg-secondary transition-colors group"
                  >
                    <div className="font-semibold text-white group-hover:text-[var(--primary)]">{sub.title}</div>
                    {sub.description && (
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{sub.description}</div>
                    )}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
