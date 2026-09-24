"use client"

import { KpiCards } from "@/components/overview/kpi-cards"
import { OpportunityChart } from "@/components/overview/opportunity-chart"
import { PipelineSummary } from "@/components/overview/pipeline-summary"
import { RecentActivity } from "@/components/overview/recent-activity"
import { TasksToday } from "@/components/overview/tasks-today"

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      {/* Page heading */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Track your leads, clients, pipeline, and follow-ups in one place.
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Pipeline + Opportunity Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PipelineSummary />
        <OpportunityChart />
      </div>

      {/* Tasks + Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TasksToday />
        <RecentActivity />
      </div>
    </div>
  )
}