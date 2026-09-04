import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export function Carousel({
  items,
  className,
}: {
  items: React.ReactNode[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const next = () => setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-card", className)}>
      <div className="p-6">{items[currentIndex]}</div>

      <div className="flex items-center justify-between p-3 border-t border-border bg-secondary/40">
        <button
          onClick={prev}
          className="size-8 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <IconChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-2 rounded-full transition-all",
                i === currentIndex ? "bg-teal-400 w-4" : "bg-slate-700"
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="size-8 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <IconChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
