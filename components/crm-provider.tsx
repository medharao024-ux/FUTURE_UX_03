"use client"

import * as React from "react"

import {
  activities as seedActivities,
  clients as seedClients,
  leads as seedLeads,
  notifications as seedNotifications,
  tasks as seedTasks,
} from "@/lib/data"
import type {
  Activity,
  AppNotification,
  Client,
  ClientNote,
  Lead,
  LeadStatus,
  Task,
} from "@/lib/types"

type NewLeadInput = Omit<Lead, "id" | "lastContact">
type NewTaskInput = Omit<Task, "id" | "dueLabel" | "status"> & {
  status?: Task["status"]
}

interface CrmContextValue {
  leads: Lead[]
  clients: Client[]
  tasks: Task[]
  activities: Activity[]
  notifications: AppNotification[]
  addLead: (input: NewLeadInput) => void
  updateLead: (id: string, patch: Partial<Lead>) => void
  updateLeadStatus: (id: string, status: LeadStatus) => void
  deleteLead: (id: string) => void
  addTask: (input: NewTaskInput) => void
  toggleTaskComplete: (id: string) => void
  deleteTask: (id: string) => void
  addClientNote: (clientId: string, text: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
}

const CrmContext = React.createContext<CrmContextValue | null>(null)

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function formatDueLabel(dueDate: string) {
  const today = "2026-09-21"
  const tomorrow = "2026-09-22"
  if (dueDate === today) return "Today"
  if (dueDate === tomorrow) return "Tomorrow"
  const parsed = new Date(`${dueDate}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return dueDate
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function CrmProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = React.useState<Lead[]>(seedLeads)
  const [clients, setClients] = React.useState<Client[]>(seedClients)
  const [tasks, setTasks] = React.useState<Task[]>(seedTasks)
  const [activities, setActivities] =
    React.useState<Activity[]>(seedActivities)
  const [notifications, setNotifications] =
    React.useState<AppNotification[]>(seedNotifications)

  const pushActivity = React.useCallback((activity: Omit<Activity, "id">) => {
    setActivities((prev) => [{ id: makeId("a"), ...activity }, ...prev])
  }, [])

  const addLead = React.useCallback(
    (input: NewLeadInput) => {
      const lead: Lead = { id: makeId("l"), lastContact: "Just now", ...input }
      setLeads((prev) => [lead, ...prev])
      pushActivity({
        type: "Leads",
        actor: "Alex Morgan",
        action: "added a new lead",
        entity: lead.name,
        time: new Date().toISOString(),
        timeLabel: "Just now",
      })
    },
    [pushActivity]
  )

  const updateLead = React.useCallback((id: string, patch: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead))
    )
  }, [])

  const updateLeadStatus = React.useCallback(
    (id: string, status: LeadStatus) => {
      setLeads((prev) => {
        const target = prev.find((lead) => lead.id === id)
        if (target && target.status !== status) {
          pushActivity({
            type: "Leads",
            actor: target.owner,
            action: `moved to ${status}`,
            entity: target.name,
            time: new Date().toISOString(),
            timeLabel: "Just now",
          })
        }
        return prev.map((lead) =>
          lead.id === id ? { ...lead, status, lastContact: "Just now" } : lead
        )
      })
    },
    [pushActivity]
  )

  const deleteLead = React.useCallback((id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }, [])

  const addTask = React.useCallback(
    (input: NewTaskInput) => {
      const task: Task = {
        id: makeId("t"),
        dueLabel: formatDueLabel(input.dueDate),
        status: input.status ?? "To Do",
        ...input,
      }
      setTasks((prev) => [task, ...prev])
      pushActivity({
        type: "Tasks",
        actor: input.assignedTo,
        action: "created a task for",
        entity: input.related,
        time: new Date().toISOString(),
        timeLabel: "Just now",
      })
    },
    [pushActivity]
  )

  const toggleTaskComplete = React.useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task
          const nextStatus =
            task.status === "Completed" ? "To Do" : "Completed"
          if (nextStatus === "Completed") {
            pushActivity({
              type: "Tasks",
              actor: task.assignedTo,
              action: "completed a task for",
              entity: task.related,
              time: new Date().toISOString(),
              timeLabel: "Just now",
            })
          }
          return { ...task, status: nextStatus }
        })
      )
    },
    [pushActivity]
  )

  const deleteTask = React.useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const addClientNote = React.useCallback(
    (clientId: string, text: string) => {
      const note: ClientNote = {
        id: makeId("n"),
        author: "Alex Morgan",
        text,
        createdAt: "Just now",
      }
      setClients((prev) =>
        prev.map((client) =>
          client.id === clientId
            ? { ...client, notes: [note, ...client.notes] }
            : client
        )
      )
      const client = clients.find((item) => item.id === clientId)
      if (client) {
        pushActivity({
          type: "Clients",
          actor: "Alex Morgan",
          action: "added a note for",
          entity: client.company,
          time: new Date().toISOString(),
          timeLabel: "Just now",
        })
      }
    },
    [clients, pushActivity]
  )

  const markNotificationRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
  }, [])

  const markAllNotificationsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }, [])

  const value = React.useMemo<CrmContextValue>(
    () => ({
      leads,
      clients,
      tasks,
      activities,
      notifications,
      addLead,
      updateLead,
      updateLeadStatus,
      deleteLead,
      addTask,
      toggleTaskComplete,
      deleteTask,
      addClientNote,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      leads,
      clients,
      tasks,
      activities,
      notifications,
      addLead,
      updateLead,
      updateLeadStatus,
      deleteLead,
      addTask,
      toggleTaskComplete,
      deleteTask,
      addClientNote,
      markNotificationRead,
      markAllNotificationsRead,
    ]
  )

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>
}

export function useCrm() {
  const context = React.useContext(CrmContext)
  if (!context) {
    throw new Error("useCrm must be used within a CrmProvider")
  }
  return context
}
