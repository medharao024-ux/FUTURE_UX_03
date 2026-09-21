"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  CheckSquare,
  DollarSign,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

interface Kpi {
  label: string
  value: string
  trend?: number
  hint: string
  icon: LucideIcon
}

export function KpiCards() {
  const { leads, clients, tasks } = useCrm()

  const openValue = leads
    .filter((lead) => lead.status !== "Won" && lead.status !== "Lost")
    .reduce((sum, lead) => sum + lead.dealValue, 0)
  const activeClients = clients.filter(
    (client) => client.engagement === "Active"
  ).length
  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length
  const dueToday = tasks.filter(
    (task) => task.dueLabel === "Today" && task.status !== "Completed"
  ).length

  const items: Kpi[] = [
    {
      label: "Total Leads",
      value: String(leads.length),
      trend: 12.5,
      hint: "vs. last month",
      icon: UserPlus,
    },
    {
      label: "Active Clients",
      value: String(activeClients),
      trend: 8.2,
      hint: "vs. last month",
      icon: Users,
    },
    {
      label: "Open Opportunities",
      value: formatCurrency(openValue),
      trend: 14.6,
      hint: "in active pipeline",
      icon: DollarSign,
    },
    {
      label: "Pending Tasks",
      value: String(pendingTasks),
      hint: `${dueToday} due today`,
      icon: CheckSquare,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const positive = (item.trend ?? 0) >= 0
        return (
          <Card key={item.label}>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4.5" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-semibold tracking-tight">
                  {item.value}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  {item.trend !== undefined ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
                        positive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      )}
                    >
                      {positive ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {Math.abs(item.trend)}%
                    </span>
                  ) : (
                    <TrendingUp className="size-3 text-muted-foreground" />
                  )}
                  <span className="text-muted-foreground">{item.hint}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
