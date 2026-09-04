import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldSetProps extends React.HTMLAttributes<HTMLFieldSetElement> {}

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      className={cn(
        "flex flex-col gap-5 border border-border rounded-2xl p-5 bg-card border-border shadow-md",
        className
      )}
      {...props}
    />
  )
}

export interface FieldLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  variant?: "legend" | "label"
}

export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return (
    <legend
      className={cn(
        "font-bold text-white tracking-tight px-2",
        variant === "legend" ? "text-sm" : "text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex w-full gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row items-center justify-between",
        className
      )}
      {...props}
    />
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn("text-xs font-semibold text-foreground/80 select-none", className)}
      {...props}
    />
  )
}

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      className={cn("text-[11px] text-muted-foreground leading-normal", className)}
      {...props}
    />
  )
}

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <p
      className={cn("text-[11px] font-medium text-red-400 mt-1 flex items-center gap-1", className)}
      {...props}
    />
  )
}
