'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  size?: number;
  showLabel?: boolean;
}

export default function ThemeToggle({ size = 18, showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('saptix-theme') as ThemeMode | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme('system');
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const applyTheme = (mode: string) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const cycle = () => {
    const next: ThemeMode = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
    localStorage.setItem('saptix-theme', next);
    if (next === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    } else {
      applyTheme(next);
    }
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <button
      onClick={cycle}
      className="flex items-center gap-2 p-2 rounded-lg transition hover:opacity-80"
      style={{ color: 'var(--muted-foreground)' }}
      title={`Theme: ${theme}`}
    >
      <Icon size={size} />
      {showLabel && <span className="text-sm capitalize">{theme}</span>}
    </button>
  );
}
