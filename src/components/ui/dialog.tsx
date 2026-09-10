import * as React from "react";
import { cn } from "@/lib/utils";
import { X as IconX } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => onOpenChange(false)}>
      <div className="bg-[#121215] border border-[#27272a] rounded-[10px] w-full max-w-[480px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-5 border-b border-[#27272a] flex items-center justify-between", className)}>{children}</div>;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-[15px] font-semibold text-[#fafafa]", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-[#a1a1aa] mt-1", className)} {...props} />;
}

export function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-5 max-h-[75vh] overflow-y-auto", className)}>{children}</div>;
}

export function DialogFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4 border-t border-[#27272a] flex justify-end gap-2 bg-[#0e0e11]", className)}>{children}</div>;
}
