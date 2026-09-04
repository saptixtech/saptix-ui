import * as React from "react";
import { cn } from "@/lib/utils";
import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react";

export interface ComboboxOption {
  value: string;
  label: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  className,
}: {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selectedOption = options.find((o) => o.value === value);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl border border-border bg-secondary text-white outline-none focus:border-[var(--primary)] transition-colors"
      >
        <span className={selectedOption ? "text-white" : "text-muted-foreground/80"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IconChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1.5 z-50 w-full rounded-2xl border border-border bg-card p-2 shadow-2xl backdrop-blur-xl animate-scale-in">
            <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border mb-1">
              <IconSearch className="size-3.5 text-muted-foreground/80" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-muted-foreground/80"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5">
              {filtered.length === 0 ? (
                <div className="p-2 text-center text-xs text-muted-foreground/80">No matches found.</div>
              ) : (
                filtered.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange?.(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs cursor-pointer transition-colors",
                      opt.value === value
                        ? "bg-[var(--primary-glow)] text-[var(--primary-light)] font-semibold"
                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <span>{opt.label}</span>
                    {opt.value === value && <IconCheck className="size-3.5 text-[var(--primary)]" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
