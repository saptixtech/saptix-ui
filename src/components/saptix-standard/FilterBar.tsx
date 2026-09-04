"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";

export type StatusFilter = "all" | "active" | "pending" | "completed" | "overdue" | "error";

const STATUS_OPTIONS: { value: StatusFilter; label: string; color: string }[] = [
  { value: "all", label: "All", color: "bg-muted text-foreground" },
  { value: "active", label: "Active", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { value: "pending", label: "Pending", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { value: "completed", label: "Completed", color: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  { value: "overdue", label: "Overdue", color: "bg-red-500/15 text-red-700 dark:text-red-400" },
  { value: "error", label: "Error", color: "bg-red-500/15 text-red-700 dark:text-red-400" },
];

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  viewMode?: "table" | "kanban";
  onViewModeChange?: (mode: "table" | "kanban") => void;
  className?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-3 pb-4", className)}>
      <div className="relative flex-1 min-w-0 w-full sm:max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
          aria-label="Search"
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onStatusFilterChange(opt.value)}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
              statusFilter === opt.value
                ? opt.color + " ring-1 ring-current/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
            aria-label={`Filter by ${opt.label}`}
            aria-pressed={statusFilter === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {onViewModeChange && (
        <div className="flex items-center gap-1 ml-auto border rounded-lg p-0.5">
          <button
            onClick={() => onViewModeChange("table")}
            className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors",
              viewMode === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Table view"
          >
            Table
          </button>
          <button
            onClick={() => onViewModeChange("kanban")}
            className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors",
              viewMode === "kanban" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Kanban view"
          >
            Kanban
          </button>
        </div>
      )}
    </div>
  );
}
