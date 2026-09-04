import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'teal' | 'gradient' | 'brand' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantStyles: Record<string, string> = {
  default: "bg-[var(--primary)] text-white shadow hover:bg-teal-600 active:scale-[0.98]",
  teal: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md shadow-[var(--primary-glow)] hover:from-teal-400 hover:to-emerald-500 active:scale-[0.98]",
  gradient: "bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500 text-white shadow-md shadow-[var(--primary-glow)] hover:opacity-95 active:scale-[0.98]",
  brand: "bg-gradient-to-r from-[#7c31f6] to-[#23eed6] text-white shadow-md hover:opacity-95 active:scale-[0.98]",
  destructive: "bg-red-500/20 border border-red-500/30 text-red-400 shadow-sm hover:bg-red-500/30",
  outline: "border border-border bg-transparent shadow-sm hover:bg-secondary hover:text-foreground text-foreground/80",
  secondary: "bg-muted border border-border text-foreground/90 shadow-sm hover:bg-slate-700/80",
  ghost: "hover:bg-secondary text-muted-foreground hover:text-foreground",
  link: "text-[var(--primary)] underline-offset-4 hover:underline",
};

const sizeStyles: Record<string, string> = {
  default: "h-9 px-4 py-2 text-xs",
  sm: "h-8 rounded-lg px-3 text-xs",
  lg: "h-11 rounded-xl px-6 text-sm",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'teal', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          variantStyles[variant] || variantStyles.default,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
