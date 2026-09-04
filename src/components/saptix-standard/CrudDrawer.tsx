"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CrudDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void;
  saving?: boolean;
  saveLabel?: string;
  side?: string;
  className?: string;
}

export function CrudDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSave,
  saving = false,
  saveLabel = "Save Changes",
  className,
}: CrudDrawerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className={cn("relative w-full max-w-lg bg-background shadow-xl flex flex-col animate-in slide-in-from-right", className)}>
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
          {onSave && <Button onClick={onSave} disabled={saving}>{saveLabel}</Button>}
        </div>
      </div>
    </div>
  );
}
