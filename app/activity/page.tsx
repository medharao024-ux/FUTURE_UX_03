"use client"

import { useMemo, useState } from "react"
import {
  Activity as ActivityIcon,
  Search,
  Users,
  UserPlus,
  CheckCircle2,
  MessageSquare,
  Filter,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const activityIcons = {
  Leads: UserPlus,
  Clients: Users,
  Tasks: CheckCircle2,
  Communication: MessageSquare,
}

const activityStyles = {
  Leads: "bg-violet-500/10 text-violet-400",
  Clients: "bg-sky-500/10 text-sky-400",
  Tasks: "bg-emerald-500/10 text-emerald-400",
  Communication: "bg-amber-500/10 text-amber-400",
}

export default function ActivityPage() {
  const { activities } = useCrm()

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")

  const filteredActivities = useMemo(() => {
    const query = search.toLowerCase().trim()

    return activities.filter((activity) => {
      const matchesSearch =
        !query ||
        activity.actor.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query) ||
        activity.entity.toLowerCase().includes(query)

      const matchesType =
        typeFilter === "All" ||
        activity.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [activities, search, typeFilter])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Activity
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor recent activity across leads, clients, tasks, and communication.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Total Activity
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {activities.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Leads
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {activities.filter(
                (item) => item.type === "Leads"
              ).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Clients
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {activities.filter(
                (item) => item.type === "Clients"
              ).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Tasks
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {activities.filter(
                (item) => item.type === "Tasks"
              ).length}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search activity..."
              className="pl-9"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="h-10 rounded-md border border-input bg-background pl-9 pr-8 text-sm"
            >
              <option value="All">
                All Activity
              </option>

              <option value="Leads">
                Leads
              </option>

              <option value="Clients">
                Clients
              </option>

              <option value="Tasks">
                Tasks
              </option>

              <option value="Communication">
                Communication
              </option>
            </select>
          </div>

        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardContent className="p-6">

          <div className="mb-5 flex items-center gap-2">
            <ActivityIcon className="size-5 text-primary" />

            <h3 className="font-semibold">
              Recent Activity
            </h3>
          </div>

          <div className="relative">

            {filteredActivities.length > 0 && (
              <div className="absolute bottom-0 left-5 top-0 w-px bg-border" />
            )}

            <div className="flex flex-col gap-6">

              {filteredActivities.map((activity) => {
                const Icon =
                  activityIcons[activity.type]

                return (
                  <div
                    key={activity.id}
                    className="relative flex gap-4"
                  >

                    <div
                      className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ${activityStyles[activity.type]}`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1 pt-1">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm">
                          <span className="font-semibold">
                            {activity.actor}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium">
                            {activity.entity}
                          </span>
                        </p>

                        <span className="text-xs text-muted-foreground">
                          {activity.timeLabel}
                        </span>
                      </div>

                      <Badge
                        variant="outline"
                        className="mt-2"
                      >
                        {activity.type}
                      </Badge>

                    </div>
                  </div>
                )
              })}

            </div>

            {filteredActivities.length === 0 && (
              <div className="py-12 text-center">
                <ActivityIcon className="mx-auto mb-3 size-8 text-muted-foreground" />

                <p className="font-medium">
                  No activity found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filter.
                </p>
              </div>
            )}

          </div>

        </CardContent>
      </Card>

    </div>
  )
}