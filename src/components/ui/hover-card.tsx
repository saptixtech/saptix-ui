import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === HoverCardTrigger) {
          return child;
        }
        if (child.type === HoverCardContent && isOpen) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

export function HoverCardTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("cursor-pointer", className)} {...props}>{children}</div>;
}

export function HoverCardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-border bg-card p-4 text-foreground/90 shadow-2xl backdrop-blur-xl animate-fade-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
