import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft as IconChevronLeft, ChevronRight as IconChevronRight, MoreHorizontal as IconDots } from 'lucide-react';

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1.5", className)} {...props} />;
}

export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

export function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: React.ComponentProps<"button"> & { isActive?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex h-8 min-w-[32px] items-center justify-center rounded-xl px-2.5 text-xs font-semibold transition-colors cursor-pointer select-none",
        isActive
          ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-[var(--primary-glow)]"
          : "border border-border bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("gap-1 pl-2.5", className)} {...props}>
      <IconChevronLeft className="size-3.5" />
      <span className="hidden sm:inline">Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("gap-1 pr-2.5", className)} {...props}>
      <span className="hidden sm:inline">Next</span>
      <IconChevronRight className="size-3.5" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden className={cn("flex h-8 w-8 items-center justify-center text-muted-foreground/80", className)} {...props}>
      <IconDots className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
