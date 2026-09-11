'use client';
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ICON_NAMES = [
  'Home', 'Settings', 'User', 'Search', 'Mail', 'Bell', 'Heart', 'Star', 'Check', 'X', 'Plus', 'Minus', 
  'ArrowRight', 'ArrowLeft', 'ChevronDown', 'ChevronUp', 'ChevronRight', 'ChevronLeft', 'Menu', 
  'MoreHorizontal', 'MoreVertical', 'Edit', 'Trash', 'Copy', 'Download', 'Upload', 'Share', 'Link', 
  'ExternalLink', 'Eye', 'EyeOff', 'Lock', 'Unlock', 'Globe', 'Map', 'Phone', 'Calendar', 'Clock', 
  'Bookmark', 'Flag', 'Filter', 'Grid', 'List', 'Layers', 'Layout', 'Monitor', 'Smartphone', 'Tablet', 
  'Wifi', 'Bluetooth', 'Battery', 'Zap', 'Activity', 'TrendingUp', 'BarChart', 'PieChart', 'Database', 
  'Server', 'Cloud', 'Code', 'Terminal', 'GitBranch', 'Github', 'Package', 'Box', 'Folder', 'File', 
  'Image', 'Video', 'Music', 'Mic', 'Volume2', 'Play', 'Pause', 'SkipForward', 'RefreshCw', 'RotateCcw', 
  'Maximize', 'Minimize', 'Move', 'Crosshair', 'Target', 'Award', 'Gift'
];

export default function IconsPage() {
  const [search, setSearch] = useState('');

  const filteredIcons = ICON_NAMES.filter((name) => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (name: string) => {
    const text = `import { ${name} } from 'lucide-react';`;
    navigator.clipboard.writeText(text);
    toast(`Copied import for ${name}`);
  };

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-bold">Icons</h1>
        <div className="w-full md:w-72 relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search icons..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredIcons.map((name) => {
          // @ts-ignore
          const Icon = Icons[name];
          if (!Icon) return null;
          
          return (
            <Card 
              key={name}
              className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors border-border/50"
              onClick={() => copyToClipboard(name)}
              title={`Click to copy import`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs text-muted-foreground truncate w-full text-center">{name}</span>
            </Card>
          );
        })}
      </div>
      
      {filteredIcons.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No icons found matching "{search}"
        </div>
      )}
    </div>
  );
}
