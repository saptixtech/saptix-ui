import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContextMenuItemProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  destructive?: boolean;
}

export function ContextMenu({
  items,
  children,
  className,
}: {
  items: ContextMenuItemProps[];
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  return (
    <div onContextMenu={handleContextMenu} className={cn("relative", className)}>
      {children}

      {visible && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setVisible(false)} />
          <div
            style={{ top: position.y, left: position.x }}
            className="fixed z-50 min-w-[160px] rounded-2xl border border-border bg-card p-1.5 shadow-2xl backdrop-blur-xl animate-scale-in"
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    item.onClick?.();
                    setVisible(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors",
                    item.destructive
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {Icon && <Icon className="size-3.5" />}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
