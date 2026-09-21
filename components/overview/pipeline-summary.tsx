"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency, leadStatusTone } from "@/lib/format"
import type { LeadStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

const stages: { label: string; status: LeadStatus }[] = [
  { label: "New", status: "New" },
  { label: "Contacted", status: "Contacted" },
  { label: "Qualified", status: "Qualified" },
  { label: "Proposal", status: "Proposal" },
  { label: "Negotiation", status: "Negotiation" },
]

export function PipelineSummary() {
  const { leads } = useCrm()

  const byStage = stages.map((stage) => {
    const items = leads.filter((lead) => lead.status === stage.status)
    return {
      ...stage,
      count: items.length,
      value: items.reduce((sum, lead) => sum + lead.dealValue, 0),
    }
  })
  const maxCount = Math.max(...byStage.map((stage) => stage.count), 1)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Lead Pipeline</CardTitle>
            <CardDescription>Active deals by stage</CardDescription>
          </div>
          <Link
            href="/pipeline"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View board
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {byStage.map((stage) => {
          const tone = leadStatusTone[stage.status]
          return (
            <div key={stage.status} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", tone.dot)} />
                  <span className="font-medium">{stage.label}</span>
                  <span className="text-muted-foreground">
                    {stage.count} {stage.count === 1 ? "lead" : "leads"}
                  </span>
                </div>
                <span className="font-medium tabular-nums text-muted-foreground">
                  {formatCurrency(stage.value)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", tone.dot)}
                  style={{ width: `${(stage.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
