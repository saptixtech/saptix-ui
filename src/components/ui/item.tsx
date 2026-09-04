import * as React from "react"
import { cn } from "@/lib/utils"

export interface ItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return (
    <div
      role="list"
      className={cn("flex flex-col space-y-2", className)}
      {...props}
    />
  )
}

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "muted"
  size?: "default" | "sm"
}

export function Item({
  className,
  variant = "default",
  size = "default",
  ...props
}: ItemProps) {
  const variantStyles = {
    default: "bg-card border-border border-border/50 hover:border-[var(--primary)]/30",
    outline: "bg-transparent border-border hover:bg-secondary",
    muted: "bg-secondary border-transparent hover:bg-secondary",
  }

  const sizeStyles = {
    default: "p-4 gap-3.5",
    sm: "px-3 py-2.5 gap-2.5",
  }

  return (
    <div
      role="listitem"
      className={cn(
        "flex items-center justify-between rounded-xl border transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}

export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "icon"
}

export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        variant === "icon" && "size-9 rounded-xl bg-[var(--primary-glow)] border border-[var(--primary)]/20 text-[var(--primary)]",
        className
      )}
      {...props}
    />
  )
}

export interface ItemContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemContent({ className, ...props }: ItemContentProps) {
  return (
    <div
      className={cn("flex flex-col flex-1 min-w-0 pr-2", className)}
      {...props}
    />
  )
}

export interface ItemTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return (
    <h4
      className={cn("text-xs font-bold text-white tracking-tight truncate", className)}
      {...props}
    />
  )
}

export interface ItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return (
    <p
      className={cn("text-[11px] text-muted-foreground truncate mt-0.5", className)}
      {...props}
    />
  )
}

export interface ItemActionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ItemAction({ className, ...props }: ItemActionProps) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}
