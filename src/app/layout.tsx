import type { Metadata } from 'next'
import './globals.css'
import { ThemeCustomizer } from '@/components/theme/ThemeCustomizer'

export const metadata: Metadata = {
  title: 'Saptix UI | Design System & Component Library',
  description: 'Enterprise design system, component library & UI tokens.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script src="/saptix-unified-nav.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=localStorage.getItem('saptix-theme-config');var c=r?JSON.parse(r):null;var doc=document.documentElement;var m=(c&&c.mode)||'dark';if(m==='dark'){doc.classList.add('dark');doc.classList.remove('light');doc.setAttribute('data-theme','dark');}else{doc.classList.remove('dark');doc.classList.add('light');doc.setAttribute('data-theme','light');}var cm={cyan:{o:'oklch(0.7 0.14 200)',f:'oklch(0.145 0 0)'},mint:{o:'oklch(0.7 0.15 160)',f:'oklch(0.145 0 0)'},royal:{o:'oklch(0.55 0.22 280)',f:'oklch(0.985 0 0)'},sky:{o:'oklch(0.68 0.16 225)',f:'oklch(0.145 0 0)'},indigo:{o:'oklch(0.6 0.2 275)',f:'oklch(0.985 0 0)'},emerald:{o:'oklch(0.62 0.17 155)',f:'oklch(0.985 0 0)'},rose:{o:'oklch(0.65 0.22 15)',f:'oklch(0.985 0 0)'},violet:{o:'oklch(0.65 0.22 300)',f:'oklch(0.985 0 0)'},amber:{o:'oklch(0.75 0.18 65)',f:'oklch(0.145 0 0)'},teal:{o:'oklch(0.7 0.14 180)',f:'oklch(0.145 0 0)'},blue:{o:'oklch(0.62 0.18 260)',f:'oklch(0.985 0 0)'}};var ck=(c&&c.color)||'teal';var co=cm[ck]||cm.teal;doc.style.setProperty('--primary',co.o);doc.style.setProperty('--primary-foreground',co.f);doc.style.setProperty('--ring',co.o);doc.style.setProperty('--brand',co.o);doc.style.setProperty('--brand-foreground',co.f);doc.style.setProperty('--sidebar-primary',co.o);doc.style.setProperty('--sidebar-primary-foreground',co.f);doc.style.setProperty('--sidebar-ring',co.o);doc.setAttribute('data-color-preset',ck);var fm={inter:"'Inter','Plus Jakarta Sans',sans-serif",geist:"'Geist','Geist Sans',-apple-system,sans-serif",roboto:"'Roboto',sans-serif",outfit:"'Outfit',sans-serif",jakarta:"'Plus Jakarta Sans',sans-serif"};var fk=(c&&c.font)||'inter';doc.style.setProperty('--font-sans',fm[fk]||fm.inter);doc.setAttribute('data-font',fk);var rm={'6px':'0.375rem','10px':'0.625rem','16px':'1.0rem'};var rk=(c&&c.radius)||'10px';doc.style.setProperty('--radius',rm[rk]||'0.625rem');doc.setAttribute('data-radius',rk);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen font-sans">
        {children}
        <ThemeCustomizer />
      </body>
    </html>
  )
}