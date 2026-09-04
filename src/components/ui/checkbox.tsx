import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Checkbox({ checked, defaultChecked = false, onCheckedChange, disabled, id, className }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked !== undefined ? checked : defaultChecked);

  React.useEffect(() => {
    if (checked !== undefined) setIsChecked(checked);
  }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setIsChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
        isChecked
          ? "bg-indigo-600 border-indigo-600 text-white"
          : "border-[#262738] bg-[#14141d] text-transparent hover:border-[var(--primary)]/50",
        className
      )}
    >
      <IconCheck className="w-3 h-3" strokeWidth={3} />
    </button>
  );
}
