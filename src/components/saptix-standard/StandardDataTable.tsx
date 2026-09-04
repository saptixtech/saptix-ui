"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { FilterBar, type StatusFilter } from "./FilterBar";
import { TableSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface StandardDataTableProps<T extends { id: string; status?: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onCreate?: () => void;
  searchableKeys?: (keyof T)[];
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function StandardDataTable<T extends { id: string; status?: string }>({
  data,
  columns,
  loading = false,
  error,
  onRetry,
  onEdit,
  onDelete,
  onCreate,
  searchableKeys = [],
  pageSize = 10,
  emptyTitle,
  emptyDescription,
  className,
}: StandardDataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...data];

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (item) => item.status?.toLowerCase() === statusFilter
      );
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        searchableKeys.some((key) =>
          String((item as any)[key] ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }

    // Sort
    if (sortCol) {
      const col = columns.find((c) => c.id === sortCol);
      if (col?.accessorKey) {
        const key = col.accessorKey;
        result.sort((a, b) => {
          const av = String((a as any)[key] ?? "");
          const bv = String((b as any)[key] ?? "");
          return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
        });
      }
    }

    return result;
  }, [data, search, statusFilter, sortCol, sortDir, columns, searchableKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  if (loading) {
    return (
      <div className={cn("rounded-xl border bg-card p-6", className)}>
        <TableSkeleton rows={pageSize} cols={columns.length} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("rounded-xl border bg-card", className)}>
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border bg-card", className)}>
      <div className="p-4 pb-0">
        <FilterBar
          searchValue={search}
          onSearchChange={(v) => { setSearch(v); setPage(0); }}
          statusFilter={statusFilter}
          onStatusFilterChange={(s) => { setStatusFilter(s); setPage(0); }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          onAction={onCreate}
        />
      ) : (
        <>
          {/* Horizontal scroll only for wide tables on mobile */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="sticky top-12 z-20 bg-background/95 backdrop-blur border-b">
                  {columns.map((col) => (
                    <th
                      key={col.id}
                      className={cn(
                        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground",
                        col.sortable && "cursor-pointer select-none hover:text-foreground",
                        col.className
                      )}
                      onClick={() => {
                        if (!col.sortable) return;
                        if (sortCol === col.id) {
                          setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                        } else {
                          setSortCol(col.id);
                          setSortDir("asc");
                        }
                      }}
                      aria-sort={
                        sortCol === col.id
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                    >
                      <span className="flex items-center gap-1">
                        {col.header}
                        {sortCol === col.id && (
                          <span className="text-foreground">{sortDir === "asc" ? "↑" : "↓"}</span>
                        )}
                      </span>
                    </th>
                  ))}
                  {(onEdit || onDelete) && (
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground w-24">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {paged.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.id} className={cn("px-4 py-3", col.className)}>
                        {col.cell
                          ? col.cell(row)
                          : col.accessorKey
                          ? String((row as any)[col.accessorKey] ?? "")
                          : ""}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Edit"
                            >
                              <EditIcon className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Delete"
                            >
                              <TrashIcon className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-xs text-muted-foreground">
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of{" "}
              {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage(0)} disabled={page === 0} aria-label="First page">
                <ChevronsLeftIcon className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage((p) => p - 1)} disabled={page === 0} aria-label="Previous page">
                <ChevronLeftIcon className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs px-2">
                {page + 1} / {totalPages}
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1} aria-label="Next page">
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} aria-label="Last page">
                <ChevronsRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
