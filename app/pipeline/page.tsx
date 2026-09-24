"use client"

import { useMemo, useState } from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  X,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/format"
import type { LeadStatus, Priority, Owner } from "@/lib/types"

const stages: {
  status: LeadStatus
  label: string
  color: string
}[] = [
  {
    status: "New",
    label: "New",
    color: "bg-sky-500",
  },
  {
    status: "Contacted",
    label: "Contacted",
    color: "bg-violet-500",
  },
  {
    status: "Qualified",
    label: "Qualified",
    color: "bg-purple-500",
  },
  {
    status: "Proposal",
    label: "Proposal",
    color: "bg-amber-500",
  },
  {
    status: "Negotiation",
    label: "Negotiation",
    color: "bg-orange-500",
  },
]

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

const owners: Owner[] = [
  "Alex Morgan",
  "Emma Davis",
  "John Smith",
  "Priya Nair",
]

const priorityStyles: Record<Priority, string> = {
  High: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Low: "text-muted-foreground bg-muted border-border",
}

export default function PipelinePage() {
  const { leads, addLead } = useCrm()

  const [search, setSearch] = useState("")
  const [showAddLead, setShowAddLead] = useState(false)

  // Form fields
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [source, setSource] = useState("Website")
  const [status, setStatus] = useState<LeadStatus>("New")
  const [dealValue, setDealValue] = useState("")
  const [priority, setPriority] = useState<Priority>("Medium")
  const [owner, setOwner] = useState<Owner>("Alex Morgan")
  const [notes, setNotes] = useState("")

  const activeLeads = useMemo(() => {
    const query = search.toLowerCase().trim()

    return leads.filter((lead) => {
      if (lead.status === "Won" || lead.status === "Lost") {
        return false
      }

      if (!query) {
        return true
      }

      return (
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
      )
    })
  }, [leads, search])

  function resetForm() {
    setName("")
    setCompany("")
    setEmail("")
    setPhone("")
    setSource("Website")
    setStatus("New")
    setDealValue("")
    setPriority("Medium")
    setOwner("Alex Morgan")
    setNotes("")
  }

  function handleAddLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !company.trim() || !email.trim()) {
      return
    }

    addLead({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      source,
      status,
      dealValue: Number(dealValue) || 0,
      owner,
      priority,
      notes: notes.trim() || undefined,
    })

    resetForm()
    setShowAddLead(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Pipeline
          </h2>

          <p className="text-sm text-muted-foreground">
            Visualize and manage leads through each sales stage.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search leads..."
              className="w-[220px] pl-9"
            />
          </div>

          <Button
            className="gap-2"
            onClick={() => setShowAddLead(true)}
          >
            <Plus className="size-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[1250px] grid-cols-5 gap-4">

          {stages.map((stage) => {
            const stageLeads = activeLeads.filter(
              (lead) => lead.status === stage.status
            )

            const totalValue = stageLeads.reduce(
              (sum, lead) => sum + lead.dealValue,
              0
            )

            return (
              <div
                key={stage.status}
                className="flex min-h-[600px] flex-col rounded-xl border border-border bg-muted/20"
              >

                {/* Stage Header */}
                <div className="border-b border-border p-4">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2.5 rounded-full ${stage.color}`}
                      />

                      <h3 className="font-semibold">
                        {stage.label}
                      </h3>

                      <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {stageLeads.length}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>

                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatCurrency(totalValue)} pipeline value
                  </p>

                </div>

                {/* Lead Cards */}
                <div className="flex flex-1 flex-col gap-3 p-3">

                  {stageLeads.map((lead) => (

                    <div
                      key={lead.id}
                      className="group rounded-lg border border-border bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {lead.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {lead.company}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </Button>

                      </div>

                      <div className="mt-4">
                        <p className="text-lg font-semibold tabular-nums">
                          {formatCurrency(lead.dealValue)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Deal value
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <Badge
                          variant="outline"
                          className={priorityStyles[lead.priority]}
                        >
                          {lead.priority}
                        </Badge>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                            {lead.owner
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          {lead.owner.split(" ")[0]}
                        </div>

                      </div>

                      <div className="mt-4 flex items-center gap-2 border-t pt-3">

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          title="Email"
                        >
                          <Mail className="size-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          title="Call"
                        >
                          <Phone className="size-3.5" />
                        </Button>

                        <span className="ml-auto text-[11px] text-muted-foreground">
                          {lead.lastContact}
                        </span>

                      </div>

                    </div>

                  ))}

                  {stageLeads.length === 0 && (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
                      <p className="text-xs text-muted-foreground">
                        No leads in this stage
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )
          })}

        </div>
      </div>

      {/* Won / Lost summary */}
      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-400">
                Won
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {
                  leads.filter(
                    (lead) => lead.status === "Won"
                  ).length
                }
              </p>
            </div>

            <p className="font-semibold text-emerald-400">
              {formatCurrency(
                leads
                  .filter(
                    (lead) => lead.status === "Won"
                  )
                  .reduce(
                    (sum, lead) => sum + lead.dealValue,
                    0
                  )
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-400">
                Lost
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {
                  leads.filter(
                    (lead) => lead.status === "Lost"
                  ).length
                }
              </p>
            </div>

            <p className="font-semibold text-rose-400">
              {formatCurrency(
                leads
                  .filter(
                    (lead) => lead.status === "Lost"
                  )
                  .reduce(
                    (sum, lead) => sum + lead.dealValue,
                    0
                  )
              )}
            </p>
          </div>
        </div>

      </div>

      {/* Add Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5">

              <div>
                <h3 className="text-lg font-semibold">
                  Add New Lead
                </h3>

                <p className="text-sm text-muted-foreground">
                  Add a new prospect to your sales pipeline.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  resetForm()
                  setShowAddLead(false)
                }}
              >
                <X className="size-5" />
              </Button>

            </div>

            {/* Form */}
            <form onSubmit={handleAddLead}>

              <div className="grid max-h-[70vh] gap-4 overflow-y-auto p-5 sm:grid-cols-2">

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Name *
                  </label>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Company *
                  </label>

                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. TechNova"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Email *
                  </label>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@company.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Phone
                  </label>

                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Lead Source
                  </label>

                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option>Website</option>
                    <option>Referral</option>
                    <option>LinkedIn</option>
                    <option>Cold Call</option>
                    <option>Email Campaign</option>
                    <option>Event</option>
                  </select>
                </div>

                {/* Deal Value */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Deal Value
                  </label>

                  <Input
                    type="number"
                    min="0"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    placeholder="25000"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as LeadStatus)
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as Priority)
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {priorities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Owner */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">
                    Assigned Owner
                  </label>

                  <select
                    value={owner}
                    onChange={(e) =>
                      setOwner(e.target.value as Owner)
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {owners.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">
                    Notes
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this lead..."
                    rows={3}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 border-t p-5">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setShowAddLead(false)
                  }}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  <Plus className="mr-2 size-4" />
                  Add Lead
                </Button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}