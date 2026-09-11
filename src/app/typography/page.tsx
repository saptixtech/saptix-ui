'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const FONTS = [
  { name: 'Inter', className: 'font-inter' },
  { name: 'Geist', className: 'font-geist' },
  { name: 'Roboto', className: 'font-roboto' },
  { name: 'Outfit', className: 'font-outfit' },
  { name: 'Plus Jakarta Sans', className: 'font-jakarta' },
];

const SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
const WEIGHTS = [300, 400, 500, 600, 700];

export default function TypographyPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold">Typography</h1>

      {FONTS.map((font) => (
        <section key={font.name} className="space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-2">{font.name}</h2>
          
          <Card className={`p-6 ${font.className}`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Scale</h3>
                <div className="space-y-4">
                  {SIZES.map((size) => (
                    <div key={size} className="flex items-baseline gap-4">
                      <span className="w-12 text-sm text-muted-foreground">{size}</span>
                      <span className={`text-${size}`}>The quick brown fox jumps over the lazy dog</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Weights</h3>
                <div className="flex flex-wrap gap-8">
                  {WEIGHTS.map((weight) => (
                    <div key={weight} className="space-y-1">
                      <div className="text-sm text-muted-foreground">{weight}</div>
                      <div style={{ fontWeight: weight }} className="text-2xl">Aa</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Readability Test</h3>
                <p className="max-w-prose leading-relaxed">
                  Design systems enable teams to build better products faster by making design reusable—reusability makes scaling possible. 
                  This is the heart and primary value of design systems. A design system is a collection of reusable components, 
                  guided by clear standards, that can be assembled together to build any number of applications.
                </p>
              </div>
            </div>
          </Card>
        </section>
      ))}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Monospace</h2>
        <Card className="p-6 font-mono">
          <div className="space-y-4">
            <h3 className="text-sm text-muted-foreground uppercase tracking-widest mb-4">JetBrains Mono</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>
{`function calculateScale(base, ratio, steps) {
  return Array.from({ length: steps }).map((_, i) => {
    return base * Math.pow(ratio, i);
  });
}`}
              </code>
            </pre>
          </div>
        </Card>
      </section>
    </div>
  );
}
