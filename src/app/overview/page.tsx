import { SaptixAppSwitcher } from "@/components/SaptixAppSwitcher";
import { Suspense } from 'react';
import { StandardPageLayout } from '@/components/saptix-standard/StandardPageLayout';
import { KpiMetricGrid } from '@/components/saptix-standard/KpiMetricGrid';
import { EmptyState } from '@/components/saptix-standard/EmptyState';
import { LoadingSkeleton } from '@/components/saptix-standard/LoadingSkeleton';
import postgres from 'postgres';

export const dynamic = 'force-dynamic';

async function getUiStats() {
  try {
    const sql = postgres(process.env.DATABASE_URL!, { max: 2, idle_timeout: 10, connect_timeout: 8 });
    const [u] = await sql`SELECT COUNT(*)::int AS n FROM "User"`;
    const [o] = await sql`SELECT COUNT(*)::int AS n FROM "Organization"`;
    const [ag] = await sql`SELECT COUNT(*)::int AS n FROM "Agent"`;
    const [au] = await sql`SELECT COUNT(*)::int AS n FROM "Automation"`;
    const [ev] = await sql`SELECT COUNT(*)::int AS n FROM "AnalyticsEvent"`;
    const [sc] = await sql`SELECT COUNT(*)::int AS n FROM "SystemConfig"`;
    await sql.end();
    return {
      users: Number(u?.n ?? 0),
      orgs: Number(o?.n ?? 0),
      agents: Number(ag?.n ?? 0),
      automations: Number(au?.n ?? 0),
      events: Number(ev?.n ?? 0),
      configs: Number(sc?.n ?? 0),
    };
  } catch {
    return null;
  }
}

async function UiOverviewContent() {
  const stats = await getUiStats();

  if (!stats) {
    return (
      <EmptyState
        title="Database unavailable"
        description="Could not connect to saptix_main PostgreSQL. Check DATABASE_URL in .env."
      />
    );
  }

  const kpis = [
    { id: 'users',       label: 'Users',        value: stats.users,       change: stats.users },
    { id: 'orgs',        label: 'Organizations', value: stats.orgs,        change: stats.orgs },
    { id: 'agents',      label: 'Agents',        value: stats.agents,      change: stats.agents },
    { id: 'automations', label: 'Automations',   value: stats.automations, change: stats.automations },
    { id: 'events',      label: 'Events',        value: stats.events,      change: stats.events },
    { id: 'configs',     label: 'Configs',       value: stats.configs,     change: stats.configs },
  ];

  const total = stats.users + stats.orgs + stats.agents + stats.automations;

  return (
    <div className="space-y-6">
      <KpiMetricGrid metrics={kpis} />
      {total === 0 && (
        <EmptyState
          title="No data yet"
          description="Connected to saptix_main PostgreSQL. All tables are currently empty — start by creating a user or organization."
        />
      )}
    </div>
  );
}

export default function UiOverviewPage() {
  return (
    <StandardPageLayout
      title="UI Portal Overview"
      description="Live data from saptix_main PostgreSQL"
    >
      <Suspense fallback={<LoadingSkeleton variant="cards" rows={6} />}>
        <UiOverviewContent />
      </Suspense>
    </StandardPageLayout>
  );
}