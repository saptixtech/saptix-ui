import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: 'default' | 'sm' | 'lg';
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed = false, onPressedChange, size = 'default', onClick, children, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(pressed);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = !isPressed;
      setIsPressed(next);
      onPressedChange?.(next);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        aria-pressed={isPressed}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          isPressed
            ? "bg-[var(--primary-glow)] border border-[var(--primary)]/40 text-[var(--primary)] shadow-sm"
            : "border border-border bg-secondary text-muted-foreground hover:bg-secondary hover:text-foreground",
          size === 'sm' && "h-8 px-2.5",
          size === 'default' && "h-9 px-3",
          size === 'lg' && "h-10 px-4 text-sm",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Toggle.displayName = "Toggle";
