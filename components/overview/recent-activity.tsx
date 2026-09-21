"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ActivityFeed } from "@/components/activity-feed"
import { useCrm } from "@/components/crm-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentActivity() {
  const { activities } = useCrm()

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your team</CardDescription>
          </div>
          <Link
            href="/activity"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ActivityFeed activities={activities.slice(0, 6)} />
      </CardContent>
    </Card>
  )
}
