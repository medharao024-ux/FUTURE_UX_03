"use client"

import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  SlidersHorizontal,
  Mail,
  Phone,
  MoreHorizontal,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/format"
import type { LeadStatus, Priority } from "@/lib/types"

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
]

const priorities: Priority[] = ["High", "Medium", "Low"]

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  Contacted: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Qualified: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Proposal: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Negotiation: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Won: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Lost: "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

const priorityStyles: Record<Priority, string> = {
  High: "text-rose-400",
  Medium: "text-amber-400",
  Low: "text-muted-foreground",
}

export default function LeadsPage() {
  const { leads } = useCrm()

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [priority, setPriority] = useState("All")

  const filteredLeads = useMemo(() => {
    const query = search.toLowerCase().trim()

    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query)

      const matchesStatus =
        status === "All" || lead.status === status

      const matchesPriority =
        priority === "All" || lead.priority === priority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [leads, search, status, priority])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Leads
          </h2>
          <p className="text-sm text-muted-foreground">
            Track and manage your sales leads through the pipeline.
          </p>
        </div>

        <Button className="gap-2">
          <Plus className="size-4" />
          Add Lead
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Total Leads
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {leads.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Active
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {leads.filter(
                (lead) =>
                  lead.status !== "Won" &&
                  lead.status !== "Lost"
              ).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              High Priority
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {leads.filter(
                (lead) => lead.priority === "High"
              ).length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Pipeline Value
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {formatCurrency(
                leads
                  .filter(
                    (lead) =>
                      lead.status !== "Won" &&
                      lead.status !== "Lost"
                  )
                  .reduce(
                    (sum, lead) => sum + lead.dealValue,
                    0
                  )
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search by name, company or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-[150px]">
                <SlidersHorizontal className="mr-2 size-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">
                  All Statuses
                </SelectItem>

                {statuses.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={priority}
              onValueChange={setPriority}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">
                  All Priority
                </SelectItem>

                {priorities.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lead Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">

              <thead className="border-b bg-muted/30">
                <tr className="text-left text-muted-foreground">
                  <th className="px-5 py-4 font-medium">
                    Lead
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Deal Value
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Priority
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Owner
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Last Contact
                  </th>
                  <th className="px-5 py-4 font-medium">
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">

                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="transition-colors hover:bg-muted/20"
                  >

                    {/* Lead */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                          {lead.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium">
                            {lead.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {lead.company}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className={statusStyles[lead.status]}
                      >
                        {lead.status}
                      </Badge>
                    </td>

                    {/* Deal value */}
                    <td className="px-5 py-4 font-medium tabular-nums">
                      {formatCurrency(lead.dealValue)}
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span
                        className={`font-medium ${priorityStyles[lead.priority]}`}
                      >
                        {lead.priority}
                      </span>
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {lead.owner}
                    </td>

                    {/* Last contact */}
                    <td className="px-5 py-4 text-muted-foreground">
                      {lead.lastContact}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Email"
                        >
                          <Mail className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          title="Call"
                        >
                          <Phone className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          title="More"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <Search className="mb-3 size-8 text-muted-foreground" />
              <h3 className="font-medium">
                No leads found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* Footer */}
          {filteredLeads.length > 0 && (
            <div className="border-t px-5 py-3 text-xs text-muted-foreground">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}