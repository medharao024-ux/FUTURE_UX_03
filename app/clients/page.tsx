"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  Users,
  MoreHorizontal,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import type { ClientStatus } from "@/lib/types"

const engagementStatuses: ClientStatus[] = [
  "Active",
  "Onboarding",
  "At Risk",
  "Completed",
]

const engagementStyles: Record<ClientStatus, string> = {
  Active:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Onboarding:
    "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "At Risk":
    "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Completed:
    "bg-muted text-muted-foreground border-border",
}

const projectStyles: Record<string, string> = {
  "On Track":
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "At Risk":
    "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Delayed:
    "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Completed:
    "bg-muted text-muted-foreground border-border",
}

export default function ClientsPage() {
  const { clients } = useCrm()

  const [search, setSearch] = useState("")
  const [engagement, setEngagement] = useState("All")
  const [projectStatus, setProjectStatus] = useState("All")

  const filteredClients = useMemo(() => {
    const query = search.toLowerCase().trim()

    return clients.filter((client) => {
      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.industry.toLowerCase().includes(query)

      const matchesEngagement =
        engagement === "All" ||
        client.engagement === engagement

      const matchesProject =
        projectStatus === "All" ||
        client.projectStatus === projectStatus

      return (
        matchesSearch &&
        matchesEngagement &&
        matchesProject
      )
    })
  }, [clients, search, engagement, projectStatus])

  const activeClients = clients.filter(
    (client) => client.engagement === "Active"
  ).length

  const onboardingClients = clients.filter(
    (client) => client.engagement === "Onboarding"
  ).length

  const atRiskClients = clients.filter(
    (client) => client.engagement === "At Risk"
  ).length

  const totalContractValue = clients.reduce(
    (sum, client) => sum + client.contractValue,
    0
  )

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Clients
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage client relationships, projects, and engagement status.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="size-4" />
          Add Client
        </Button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Clients
              </p>

              <Users className="size-4 text-primary" />
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {clients.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Active
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {activeClients}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Onboarding
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {onboardingClients}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Contract Value
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(totalContractValue)}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* At Risk Notice */}
      {atRiskClients > 0 && (
        <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-3">

          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-500" />

            <p className="text-sm">
              <span className="font-semibold">
                {atRiskClients} client
                {atRiskClients !== 1 ? "s" : ""}
              </span>{" "}
              currently require attention.
            </p>
          </div>

        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by client, company, email or industry..."
              className="pl-9"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            <select
              value={engagement}
              onChange={(event) =>
                setEngagement(event.target.value)
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="All">
                All Engagement
              </option>

              {engagementStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={projectStatus}
              onChange={(event) =>
                setProjectStatus(event.target.value)
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="All">
                All Projects
              </option>

              <option value="On Track">
                On Track
              </option>

              <option value="At Risk">
                At Risk
              </option>

              <option value="Delayed">
                Delayed
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

        </CardContent>
      </Card>

      {/* Client Table */}
      <Card className="overflow-hidden">

        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-sm">

              <thead className="border-b bg-muted/30">

                <tr className="text-left text-muted-foreground">

                  <th className="px-5 py-4 font-medium">
                    Client
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Industry
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Engagement
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Project
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Contract Value
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Owner
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Last Activity
                  </th>

                  <th className="px-5 py-4">
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-border">

                {filteredClients.map((client) => (

                  <tr
                    key={client.id}
                    className="transition-colors hover:bg-muted/20"
                  >

                    {/* Client */}
                    <td className="px-5 py-4">

                      <Link
                        href={`/clients/${client.id}`}
                        className="flex items-center gap-3"
                      >

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">

                          {client.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}

                        </div>

                        <div className="min-w-0">

                          <p className="font-medium hover:text-primary">
                            {client.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {client.company}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {client.email}
                          </p>

                        </div>

                      </Link>

                    </td>

                    {/* Industry */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {client.industry}
                    </td>

                    {/* Engagement */}
                    <td className="px-5 py-4">

                      <Badge
                        variant="outline"
                        className={engagementStyles[client.engagement]}
                      >
                        {client.engagement}
                      </Badge>

                    </td>

                    {/* Project */}
                    <td className="px-5 py-4">

                      <Badge
                        variant="outline"
                        className={projectStyles[client.projectStatus]}
                      >
                        {client.projectStatus}
                      </Badge>

                    </td>

                    {/* Contract Value */}
                    <td className="px-5 py-4 font-medium tabular-nums">
                      {formatCurrency(client.contractValue)}
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {client.owner}
                    </td>

                    {/* Last Activity */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {client.lastActivity}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (

            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <Users className="mb-3 size-8 text-muted-foreground" />

              <h3 className="font-medium">
                No clients found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>

            </div>

          )}

          {/* Footer */}
          {filteredClients.length > 0 && (

            <div className="border-t px-5 py-3 text-xs text-muted-foreground">
              Showing {filteredClients.length} of {clients.length} clients
            </div>

          )}

        </CardContent>

      </Card>

    </div>
  )
}