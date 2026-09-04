import * as React from "react";
import { cn } from "@/lib/utils";

export function InputOTP({
  length = 6,
  value = "",
  onChange,
  className,
}: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const char = e.target.value.slice(-1);
    const chars = value.split("");
    chars[idx] = char;
    const newVal = chars.join("");
    onChange?.(newVal);

    if (char && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="size-11 rounded-xl border border-border bg-secondary text-center text-sm font-bold text-white outline-none focus:border-[var(--primary)] transition-colors"
        />
      ))}
    </div>
  );
}
