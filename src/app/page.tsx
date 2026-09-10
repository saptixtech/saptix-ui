'use client';

import { AppShell } from "@/components/layout/app-shell/AppShell"
import { UI_NAV_SECTIONS } from "@/components/layout/app-shell/saptix-navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { Activity, Cpu, Database, Globe, Key, LayoutDashboard, Settings, Zap, RefreshCw, TrendingUp } from "lucide-react"

const GATEWAY_URL = "https://gate.saptix.tech"
const API_KEY = "sk-saptix-lead-os"

const STAT_CARDS = [
  { title: "Active Models", icon: Cpu, value: "104", sub: "Across 4 combos", color: "text-teal-400", progress: 78 },
  { title: "Provider Connections", icon: Database, value: "141", sub: "API keys & OAuth", color: "text-blue-400", progress: 91 },
  { title: "Gateway Status", icon: Activity, value: "Online", sub: "gate.saptix.tech", color: "text-green-400", progress: 100 },
  { title: "API Requests Today", icon: Zap, value: "—", sub: "Live tracking", color: "text-amber-400", progress: 40 },
]

interface GatewayModel {
  id: string
  object: string
  owned_by: string
}

export default function Dashboard() {
  const [models, setModels] = useState<GatewayModel[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedCombo, setSelectedCombo] = useState("all")

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [darkMode])

  useEffect(() => {
    fetch(`${GATEWAY_URL}/v1/models`, { headers: { Authorization: `Bearer ${API_KEY}` } })
      .then(r => r.json())
      .then(d => { setModels(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const combos = models.filter(m => m.owned_by === "combo")
  const providers = models.filter(m => m.owned_by !== "combo")
  const filteredModels = selectedCombo === "all" ? providers : providers.filter(m => m.id.includes(selectedCombo.replace("openrouter/", "")))

  return (
    <TooltipProvider>
      <AppShell
        appName="Saptix UI Portal"
        appBadge="v3.0 UI"
        subdomain="UI"
        sections={UI_NAV_SECTIONS}
        footerNote="Design System & OKLCH Engine"
      >
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.title} className="group relative overflow-hidden border-border/60 transition-all hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                    <div className="rounded-full bg-muted p-2"><Icon className={`h-4 w-4 ${card.color}`} /></div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
                    <Progress value={card.progress} className="mt-3 h-1" />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="models" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="models"><Cpu className="mr-1.5 h-3.5 w-3.5" />Models ({loading ? "…" : providers.length})</TabsTrigger>
                <TabsTrigger value="combos"><Zap className="mr-1.5 h-3.5 w-3.5" />Combos ({combos.length})</TabsTrigger>
                <TabsTrigger value="overview"><LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />Overview</TabsTrigger>
              </TabsList>
              <Select value={selectedCombo} onValueChange={(val: any) => setSelectedCombo(val || "")}>
                <SelectTrigger className="w-48 h-8 text-xs">
                  <SelectValue placeholder="Filter by combo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {combos.map(c => <SelectItem key={c.id} value={c.id}>{c.id}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Models Tab */}
            <TabsContent value="models">
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle>Model Catalogue</CardTitle>
                  <CardDescription>All AI models served through the Saptix AI Gateway via PostgreSQL</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-2">
                      {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                    </div>
                  ) : (
                    <ScrollArea className="h-[480px]">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Model ID</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Type</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredModels.map(m => (
                            <TableRow key={m.id}>
                              <TableCell className="font-mono text-xs text-foreground">{m.id}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">{m.owned_by || "—"}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="text-xs">LLM</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Combos Tab */}
            <TabsContent value="combos">
              <div className="grid gap-4 md:grid-cols-2">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-xl" />)
                ) : combos.map(combo => (
                  <Card key={combo.id} className="border-border/60 transition-all hover:border-teal-500/40">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{combo.id}</CardTitle>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <CardDescription>AI Model Combo Router</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Activity className="h-4 w-4 text-teal-400" />
                        <span>Round-robin load balancing</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Database className="h-4 w-4 text-teal-400" />PostgreSQL Database</CardTitle>
                    <CardDescription>nine_router database on VPS 72.61.255.19</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[["Provider Connections", "141"], ["Active Combos", "4"], ["Custom Models (kv)", "16"], ["API Keys", "1"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-border/40 pb-2">
                        <span className="text-muted-foreground">{k}</span>
                        <Badge variant="secondary">{v}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Key className="h-4 w-4 text-amber-400" />Gateway API Key</CardTitle>
                    <CardDescription>Active access credentials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="font-mono text-xs text-muted-foreground">sk-saptix-lead-os</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Endpoints</span>
                      <Badge variant="outline">/v1/models, /v1/chat</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </TooltipProvider>
  )
}