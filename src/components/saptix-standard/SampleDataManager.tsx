"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "saptix_sample_data";

interface SampleDataManagerProps<T> {
  storageKey?: string;
  initialData: T[];
  children: (props: {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    addItem: (item: T) => void;
    updateItem: (id: string, updates: Partial<T>) => void;
    deleteItem: (id: string) => void;
    resetData: () => void;
  }) => React.ReactNode;
}

export function SampleDataManager<T extends { id: string }>({
  storageKey = STORAGE_KEY,
  initialData,
  children,
}: SampleDataManagerProps<T>) {
  const [data, setData] = useState<T[]>(() => {
    if (typeof window === "undefined") return initialData;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return initialData;
  });

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch {}
  }, [data, storageKey]);

  const addItem = useCallback((item: T) => { setData((prev) => [item, ...prev]); }, []);
  const updateItem = useCallback((id: string, updates: Partial<T>) => { setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item))); }, []);
  const deleteItem = useCallback((id: string) => { setData((prev) => prev.filter((item) => item.id !== id)); }, []);
  const resetData = useCallback(() => { setData(initialData); try { localStorage.removeItem(storageKey); } catch {} }, [initialData, storageKey]);

  return <>{children({ data, setData, addItem, updateItem, deleteItem, resetData })}</>;
}

export function ResetSampleDataButton({ onReset }: { onReset: () => void }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="destructive" size="sm" onClick={() => { onReset(); setConfirming(false); }}>Confirm Reset</Button>
        <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>Cancel</Button>
      </div>
    );
  }
  return <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>Reset Data</Button>;
}
