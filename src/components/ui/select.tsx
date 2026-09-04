import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { value?: string; onValueChange?: (v: string) => void }) {
  const { onValueChange, ...rest } = props as any;
  return (
    <select
      className={cn(
        "flex w-full h-9 rounded-md border border-input bg-background px-3 text-[13px] text-foreground outline-none transition-colors focus:border-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none",
        className
      )}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...rest}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm", className)} {...props}>{children}</div>;
}

export function SelectContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md", className)} {...props}>{children}</div>;
}

export function SelectItem({ children, value, className, ...props }: React.HTMLAttributes<HTMLOptionElement> & { value: string }) {
  return <option value={value} className={cn("relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none", className)} {...props}>{children}</option>;
}

export function SelectValue({ placeholder, ...props }: { placeholder?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return <span className="block truncate" {...props}>{placeholder}</span>;
}

export function SelectGroup({ children, ...props }: React.HTMLAttributes<HTMLOptGroupElement>) {
  return <optgroup {...props}>{children}</optgroup>;
}

export function SelectLabel({ children, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  return <label className="py-1.5 pl-8 pr-2 text-sm font-semibold" {...props}>{children}</label>;
}

export function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />;
}
