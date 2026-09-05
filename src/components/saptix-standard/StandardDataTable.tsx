"use client";
import { useState, useMemo } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  PencilIcon,
  Trash2Icon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";

export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

interface StandardDataTableProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  searchableKeys?: (keyof T)[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
  filterOptions?: { value: string; label: string }[];
  filterKey?: keyof T;
}

export function StandardDataTable<T extends { id: string }>({
  data,
  columns,
  searchableKeys = [],
  onEdit,
  onDelete,
  emptyTitle = "No data yet",
  emptyDescription = "Add your first record to get started.",
  pageSize = 10,
  filterOptions,
  filterKey,
}: StandardDataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) =>
        searchableKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "all" && filterKey) {
      rows = rows.filter((r) => String(r[filterKey]) === statusFilter);
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av ?? "").localeCompare(String(bv ?? ""));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, statusFilter, sortKey, sortDir, searchableKeys, filterKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  function toggleSort(key: keyof T) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  function SortIcon({ col }: { col: ColumnDef<T> }) {
    if (!col.sortable) return null;
    if (sortKey !== col.accessorKey)
      return <ChevronsUpDownIcon className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />;
    return sortDir === "asc"
      ? <ChevronUpIcon className="h-3 w-3 text-foreground" />
      : <ChevronDownIcon className="h-3 w-3 text-foreground" />;
  }

  const showActions = !!(onEdit || onDelete);

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Toolbar */}
      <FilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(0); }}
        statusFilter={statusFilter}
        onStatusFilterChange={(v) => { setStatusFilter(v); setPage(0); }}
        filterOptions={filterOptions}
        searchPlaceholder={searchableKeys.length ? `Search by ${String(searchableKeys[0])}…` : "Search…"}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap select-none ${col.sortable ? "cursor-pointer group hover:text-foreground transition-colors" : ""} ${col.className ?? ""}`}
                  onClick={col.sortable ? () => toggleSort(col.accessorKey) : undefined}
                  aria-sort={
                    sortKey === col.accessorKey
                      ? sortDir === "asc" ? "ascending" : "descending"
                      : "none"
                  }
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.header}
                    <SortIcon col={col} />
                  </span>
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide w-20">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (showActions ? 1 : 0)} className="py-12">
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors duration-100 group/row"
                >
                  {columns.map((col) => (
                    <td key={col.id} className={`px-4 py-3 text-sm ${col.className ?? ""}`}>
                      {col.cell ? col.cell(row) : String(row[col.accessorKey] ?? "")}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Edit"
                          >
                            <PencilIcon className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row.id)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20 text-xs text-muted-foreground">
          <span>
            {filtered.length === data.length
              ? `${filtered.length} total`
              : `${filtered.length} of ${data.length} filtered`}
            {totalPages > 1 && ` · Page ${page + 1} of ${totalPages}`}
          </span>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage(0)} disabled={page === 0} aria-label="First page">
                <ChevronsLeftIcon className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage((p) => p - 1)} disabled={page === 0} aria-label="Previous page">
                <ChevronLeftIcon className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1} aria-label="Next page">
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1} aria-label="Last page">
                <ChevronsRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}