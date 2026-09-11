'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PRESETS = ['teal', 'cyan', 'mint', 'sky', 'blue', 'indigo', 'violet', 'royal', 'rose', 'amber', 'emerald'];
const TOKENS = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info', 'muted', 'accent'];

export default function ColorsPage() {
  const [theme, setTheme] = useState('light');
  
  const applyPreset = (preset: string) => {
    document.documentElement.style.setProperty('--primary', `var(--${preset})`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Colors & Themes</h1>
        <Button onClick={toggleTheme}>Toggle Dark Mode</Button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Presets</h2>
        <Card className="p-6">
          <div className="flex flex-wrap gap-4">
            {PRESETS.map((p) => (
              <button 
                key={p} 
                className="w-12 h-12 rounded-full border-2 border-transparent hover:border-black dark:hover:border-white transition-all shadow-md capitalize font-medium flex items-center justify-center text-xs text-white mix-blend-difference"
                style={{ backgroundColor: `var(--${p}, var(--primary))` }}
                onClick={() => applyPreset(p)}
                title={p}
              >
                {p.slice(0,2)}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Semantic Tokens</h2>
        <Card className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TOKENS.map((token) => (
            <div key={token} className="space-y-2">
              <div 
                className="w-full h-24 rounded-md shadow-sm border border-border" 
                style={{ backgroundColor: `hsl(var(--${token}))` }} 
              />
              <div>
                <p className="font-semibold capitalize">{token}</p>
                <p className="text-sm text-muted-foreground">--{token}</p>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
