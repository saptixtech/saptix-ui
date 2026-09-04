'use client';

import { useState } from 'react';
import {
  StandardPageLayout,
  KpiMetricGrid,
  TrendSummarySection,
  StandardDataTable,
  SampleDataManager,
  ResetSampleDataButton,
} from '@/components/saptix-standard';
import type { KpiMetric, ColumnDef } from '@/components/saptix-standard';
import { Badge } from '@/components/ui/badge';

interface ComponentRecord {
  id: string;
  name: string;
  category: string;
  status: string;
  downloads: number;
  version: string;
  lastUpdated: string;
  progress: number;
}

const SEED: ComponentRecord[] = [
  { id: "c1", name: "KpiMetricGrid", category: "Dashboard", status: "active", downloads: 12400, version: "1.0.0", lastUpdated: "Just now", progress: 100 },
  { id: "c2", name: "StandardDataTable", category: "Data Display", status: "active", downloads: 9800, version: "1.0.0", lastUpdated: "1h ago", progress: 95 },
  { id: "c3", name: "CrudDrawer", category: "Forms", status: "active", downloads: 7500, version: "1.0.0", lastUpdated: "2h ago", progress: 90 },
  { id: "c4", name: "FilterBar", category: "Navigation", status: "active", downloads: 11200, version: "1.0.0", lastUpdated: "30m ago", progress: 98 },
  { id: "c5", name: "StandardKanban", category: "Dashboard", status: "active", downloads: 5600, version: "1.0.0", lastUpdated: "3h ago", progress: 85 },
  { id: "c6", name: "EmptyState", category: "Feedback", status: "active", downloads: 8900, version: "1.0.0", lastUpdated: "1d ago", progress: 100 },
  { id: "c7", name: "LoadingSkeleton", category: "Feedback", status: "active", downloads: 10200, version: "1.0.0", lastUpdated: "5h ago", progress: 100 },
  { id: "c8", name: "SampleDataManager", category: "Utilities", status: "pending", downloads: 3200, version: "0.9.0", lastUpdated: "2d ago", progress: 75 },
];

function StatusBadge({ status }: { status: string }) {
  const c: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${c[status] || c.active}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

const COLS: ColumnDef<ComponentRecord>[] = [
  { id: "name", header: "Component", accessorKey: "name", sortable: true, cell: (r: ComponentRecord) => <div><p className="font-medium font-mono text-sm">{r.name}</p><p className="text-xs text-muted-foreground">{r.category}</p></div> },
  { id: "status", header: "Status", accessorKey: "status", cell: (r: ComponentRecord) => <StatusBadge status={r.status} /> },
  { id: "version", header: "Version", accessorKey: "version", cell: (r: ComponentRecord) => <Badge variant="outline">{r.version}</Badge> },
  { id: "downloads", header: "Downloads", accessorKey: "downloads", sortable: true, cell: (r: ComponentRecord) => <span className="font-[tabular-nums]">{r.downloads.toLocaleString()}</span> },
  { id: "progress", header: "Completion", accessorKey: "progress", cell: (r: ComponentRecord) => <div className="flex items-center gap-2 min-w-[100px]"><div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${r.progress}%` }} /></div><span className="text-xs text-muted-foreground font-[tabular-nums] w-8 text-right">{r.progress}%</span></div> },
  { id: "lastUpdated", header: "Updated", accessorKey: "lastUpdated", sortable: true },
];

export default function UIPortalOverview() {
  return (
    <SampleDataManager<ComponentRecord> storageKey="saptix_ui_components" initialData={SEED}>
      {({ data, resetData }) => {
        const metrics: KpiMetric[] = [
          { id: "total", label: "Components", value: data.length, change: 25, progress: 80 },
          { id: "themes", label: "Themes", value: 11, change: 3 },
          { id: "downloads", label: "Downloads", value: "68.8K", change: 42, progress: 72 },
          { id: "active", label: "Active Users", value: 324, change: 18 },
          { id: "bugs", label: "Bug Reports", value: 3, change: -60, progress: 95 },
          { id: "releases", label: "Releases", value: "v1.0.0", change: 100, progress: 100 },
        ];
        return (
          <StandardPageLayout title="UI Portal Overview" description="Saptix Design System component library." actions={<ResetSampleDataButton onReset={resetData} />}>
            <KpiMetricGrid metrics={metrics} />
            <TrendSummarySection title="Adoption" subtitle="Component usage across subdomains">
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm"><p>Adoption chart</p></div>
            </TrendSummarySection>
            <StandardDataTable<ComponentRecord> data={data} columns={COLS} searchableKeys={["name", "category"]} emptyTitle="No components" emptyDescription="Add components to the library." />
          </StandardPageLayout>
        );
      }}
    </SampleDataManager>
  );
}
