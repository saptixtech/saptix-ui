import * as React from "react";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";
