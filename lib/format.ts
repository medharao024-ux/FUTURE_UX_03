import type {
  ClientStatus,
  LeadStatus,
  Priority,
  TaskStatus,
} from "@/lib/types"

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

type BadgeTone = {
  className: string
  dot: string
}

export const leadStatusTone: Record<LeadStatus, BadgeTone> = {
  New: { className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200", dot: "bg-sky-500" },
  Contacted: {
    className: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  Qualified: {
    className: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    dot: "bg-violet-500",
  },
  Proposal: {
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
  },
  Negotiation: {
    className: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    dot: "bg-orange-500",
  },
  Won: {
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Lost: { className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200", dot: "bg-rose-500" },
}

export const clientStatusTone: Record<ClientStatus, BadgeTone> = {
  Active: {
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Onboarding: {
    className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    dot: "bg-sky-500",
  },
  "At Risk": {
    className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-500",
  },
  Completed: {
    className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    dot: "bg-slate-400",
  },
}

export const taskStatusTone: Record<TaskStatus, BadgeTone> = {
  "To Do": {
    className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    dot: "bg-slate-400",
  },
  "In Progress": {
    className: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    dot: "bg-sky-500",
  },
  Completed: {
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  Overdue: {
    className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-500",
  },
}

export const priorityTone: Record<Priority, string> = {
  High: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  Medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Low: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
}

export const projectStatusTone: Record<string, string> = {
  "On Track": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  "At Risk": "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  Delayed: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Completed: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
}
