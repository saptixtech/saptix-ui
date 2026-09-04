import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const RadioGroupContext = React.createContext<{ value?: string; onValueChange?: (v: string) => void } | null>(null);

export function RadioGroup({ value, onValueChange, className, children }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup" className={cn("grid gap-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function RadioGroupItem({ value, id, className }: { value: string; id?: string; className?: string }) {
  const ctx = React.useContext(RadioGroupContext);
  const checked = ctx?.value === value;

  return (
    <button
      type="button"
      id={id}
      role="radio"
      aria-checked={checked}
      onClick={() => ctx?.onValueChange?.(value)}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border flex items-center justify-center transition-all",
        checked ? "border-indigo-600 bg-[#14141d]" : "border-[#262738] bg-[#14141d] hover:border-[var(--primary)]/50",
        className
      )}
    >
      {checked && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
    </button>
  );
}
