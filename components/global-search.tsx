"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckSquare, Search, UserPlus, Users } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

type Result = {
  id: string
  label: string
  sub: string
  href: string
  group: "Leads" | "Clients" | "Tasks"
}

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const { leads, clients, tasks } = useCrm()
  const [query, setQuery] = React.useState("")

  const results = React.useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    const leadResults: Result[] = leads.map((lead) => ({
      id: lead.id,
      label: lead.name,
      sub: `${lead.company} · ${lead.status}`,
      href: "/leads",
      group: "Leads",
    }))
    const clientResults: Result[] = clients.map((client) => ({
      id: client.id,
      label: client.company,
      sub: `${client.name} · ${client.engagement}`,
      href: `/clients/${client.id}`,
      group: "Clients",
    }))
    const taskResults: Result[] = tasks.map((task) => ({
      id: task.id,
      label: task.title,
      sub: `${task.related} · ${task.status}`,
      href: "/tasks",
      group: "Tasks",
    }))
    const all = [...leadResults, ...clientResults, ...taskResults]
    if (!q) return all.slice(0, 8)
    return all
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.sub.toLowerCase().includes(q)
      )
      .slice(0, 12)
  }, [query, leads, clients, tasks])

  const groups: Result["group"][] = ["Leads", "Clients", "Tasks"]
  const iconFor = {
    Leads: UserPlus,
    Clients: Users,
    Tasks: CheckSquare,
  } as const

  function go(href: string) {
    onOpenChange(false)
    setQuery("")
    router.push(href)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-24 max-w-lg translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search leads, clients, and tasks
        </DialogDescription>
        <div className="border-b p-3">
          <InputGroup>
            <InputGroupInput
              autoFocus
              placeholder="Search leads, clients, tasks..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            groups.map((group) => {
              const items = results.filter((item) => item.group === group)
              if (items.length === 0) return null
              const Icon = iconFor[group]
              return (
                <div key={group} className="mb-2">
                  <p className="px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {group}
                  </p>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(item.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted"
                      )}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {item.sub}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
