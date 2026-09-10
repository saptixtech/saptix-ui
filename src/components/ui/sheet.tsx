import * as React from "react";
import { cn } from "@/lib/utils";
import { X as IconX } from 'lucide-react';

export function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => onOpenChange(false)}>
      <div className="w-full max-w-md h-full bg-[#121215] border-l border-[#27272a] overflow-y-auto shadow-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end p-4">
          <button onClick={() => onOpenChange(false)} className="text-[#71717a] hover:text-[#fafafa] transition-colors">
            <IconX className="w-4 h-4" stroke={1.75} />
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

export function SheetHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-5", className)}>{children}</div>;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-[15px] font-semibold text-[#fafafa]", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-[#a1a1aa] mt-1", className)} {...props} />;
}

export function SheetFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mt-6 flex items-center justify-end gap-2", className)}>{children}</div>;
}
