import * as React from "react";
import { cn } from "@/lib/utils";
import { Search as IconSearch } from 'lucide-react';

export function Command({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-card text-foreground/90 border border-border shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandInput({
  className,
  value,
  onValueChange,
  placeholder = "Type a command or search...",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { onValueChange?: (val: string) => void }) {
  return (
    <div className="flex items-center border-b border-border px-4 py-3">
      <IconSearch className="mr-3 size-4 shrink-0 text-muted-foreground/80" />
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange ? onValueChange(e.target.value) : undefined}
        placeholder={placeholder}
        className={cn(
          "flex h-8 w-full rounded-md bg-transparent text-xs text-white placeholder:text-muted-foreground/80 outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-2 space-y-1", className)} {...props}>
      {children}
    </div>
  );
}

export function CommandEmpty({ className, children = "No results found.", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("py-6 text-center text-xs text-muted-foreground/80", className)} {...props}>
      {children}
    </div>
  );
}

export function CommandGroup({
  heading,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div className={cn("overflow-hidden p-1 text-foreground/90", className)} {...props}>
      {heading && (
        <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
          {heading}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function CommandItem({
  className,
  onSelect,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onSelect?: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-xs text-foreground/80 outline-none transition-colors hover:bg-secondary hover:text-foreground aria-selected:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground/80 font-mono bg-secondary/80 px-1.5 py-0.5 rounded border border-border", className)}
      {...props}
    />
  );
}
