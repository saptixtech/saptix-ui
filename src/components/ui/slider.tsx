import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);
  const current = value ?? internalValue;
  const pct = ((current[0] - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = [Number(e.target.value)];
    if (!value) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#262738]">
        <div className="absolute h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current[0]}
        disabled={disabled}
        onChange={handleChange}
        className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
      />
      <div
        className="absolute block h-5 w-5 rounded-full border-2 border-indigo-600 bg-[#14141d] shadow ring-2 ring-indigo-500/20 transition-all"
        style={{ left: `calc(${pct}% - 10px)` }}
      />
    </div>
  );
}
