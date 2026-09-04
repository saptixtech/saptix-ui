import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex rounded-xl p-1 bg-secondary border border-border shadow-inner",
        orientation === "vertical" ? "flex-col space-y-1" : "flex-row space-x-1",
        className
      )}
      {...props}
    />
  )
}
