"use client"

import { useMemo, useState } from "react"
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  Search,
  Trash2,
  AlertCircle,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Priority, TaskStatus } from "@/lib/types"

const priorityStyles: Record<Priority, string> = {
  High: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Low: "bg-sky-500/15 text-sky-400 border-sky-500/20",
}

const statusStyles: Record<TaskStatus, string> = {
  "To Do": "bg-muted text-muted-foreground border-border",
  "In Progress":
    "bg-sky-500/15 text-sky-400 border-sky-500/20",
  Completed:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Overdue:
    "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

export default function TasksPage() {
  const {
    tasks,
    clients,
    leads,
    addTask,
    toggleTaskComplete,
    deleteTask,
  } = useCrm()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [showAddTask, setShowAddTask] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [related, setRelated] = useState("")
  const [relatedType, setRelatedType] =
    useState<"Client" | "Lead">("Client")
  const [dueDate, setDueDate] = useState("")
  const [dueLabel, setDueLabel] = useState("")
  const [priority, setPriority] =
    useState<Priority>("Medium")
  const [assignedTo, setAssignedTo] =
    useState("Alex Morgan")

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase().trim()

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.related.toLowerCase().includes(query) ||
        task.assignedTo.toLowerCase().includes(query)

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      )
    })
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ])

  const todoCount = tasks.filter(
    (task) => task.status === "To Do"
  ).length

  const inProgressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length

  const overdueCount = tasks.filter(
    (task) => task.status === "Overdue"
  ).length

  const handleAddTask = () => {
    if (!title.trim() || !related.trim()) {
      return
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      related: related.trim(),
      relatedType,
      dueDate,
      dueLabel: dueLabel || "Upcoming",
      priority,
      assignedTo: assignedTo as
        | "Alex Morgan"
        | "Emma Davis"
        | "John Smith"
        | "Priya Nair",
    })

    setTitle("")
    setDescription("")
    setRelated("")
    setDueDate("")
    setDueLabel("")
    setPriority("Medium")
    setAssignedTo("Alex Morgan")
    setShowAddTask(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Tasks & Follow-ups
          </h2>

          <p className="text-sm text-muted-foreground">
            Track team tasks, client follow-ups, and upcoming actions.
          </p>
        </div>

        <Button
          className="gap-2"
          onClick={() => setShowAddTask(true)}
        >
          <Plus className="size-4" />
          Add Task
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                To Do
              </p>
              <ListTodo className="size-4 text-primary" />
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {todoCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                In Progress
              </p>
              <Clock3 className="size-4 text-sky-400" />
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {inProgressCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Completed
              </p>
              <CheckCircle2 className="size-4 text-emerald-400" />
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {completedCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Overdue
              </p>
              <AlertCircle className="size-4 text-rose-400" />
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {overdueCount}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search tasks, clients, leads or assignees..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="All">
                All Status
              </option>
              <option value="To Do">
                To Do
              </option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Overdue">
                Overdue
              </option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="All">
                All Priority
              </option>
              <option value="High">
                High
              </option>
              <option value="Medium">
                Medium
              </option>
              <option value="Low">
                Low
              </option>
            </select>

          </div>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">

              <thead className="border-b bg-muted/30">
                <tr className="text-left text-muted-foreground">
                  <th className="px-5 py-4 font-medium">
                    Task
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Related To
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Due
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Priority
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Assigned To
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">

                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="transition-colors hover:bg-muted/20"
                  >

                    <td className="px-5 py-4">
                      <div className="max-w-[300px]">
                        <p
                          className={`font-medium ${
                            task.status === "Completed"
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </p>

                        {task.description && (
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium">
                          {task.related}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {task.relatedType}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">
                        {task.dueLabel}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {task.dueDate}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className={priorityStyles[task.priority]}
                      >
                        {task.priority}
                      </Badge>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {task.assignedTo}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant="outline"
                        className={statusStyles[task.status]}
                      >
                        {task.status}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          title={
                            task.status === "Completed"
                              ? "Mark incomplete"
                              : "Mark completed"
                          }
                          onClick={() =>
                            toggleTaskComplete(task.id)
                          }
                        >
                          <CheckCircle2 className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-rose-400 hover:text-rose-400"
                          title="Delete task"
                          onClick={() =>
                            deleteTask(task.id)
                          }
                        >
                          <Trash2 className="size-4" />
                        </Button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <ListTodo className="mb-3 size-8 text-muted-foreground" />

              <h3 className="font-medium">
                No tasks found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="border-t px-5 py-3 text-xs text-muted-foreground">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          )}

        </CardContent>
      </Card>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl rounded-xl border bg-background shadow-xl">

            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Add New Task
                </h3>

                <p className="text-sm text-muted-foreground">
                  Create a task or follow-up reminder.
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() =>
                  setShowAddTask(false)
                }
              >
                ✕
              </Button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Task Title
                </label>

                <Input
                  className="mt-1"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. Follow up with client"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Add task details..."
                  className="mt-1 min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Related Type
                </label>

                <select
                  value={relatedType}
                  onChange={(event) =>
                    setRelatedType(
                      event.target.value as
                        | "Client"
                        | "Lead"
                    )
                  }
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="Client">
                    Client
                  </option>

                  <option value="Lead">
                    Lead
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Related To
                </label>

                <select
                  value={related}
                  onChange={(event) =>
                    setRelated(event.target.value)
                  }
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">
                    Select...
                  </option>

                  {relatedType === "Client"
                    ? clients.map((client) => (
                        <option
                          key={client.id}
                          value={client.name}
                        >
                          {client.name}
                        </option>
                      ))
                    : leads.map((lead) => (
                        <option
                          key={lead.id}
                          value={lead.name}
                        >
                          {lead.name}
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Due Date
                </label>

                <Input
                  className="mt-1"
                  type="date"
                  value={dueDate}
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Due Label
                </label>

                <Input
                  className="mt-1"
                  value={dueLabel}
                  onChange={(event) =>
                    setDueLabel(event.target.value)
                  }
                  placeholder="e.g. Tomorrow"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as Priority
                    )
                  }
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Assign To
                </label>

                <select
                  value={assignedTo}
                  onChange={(event) =>
                    setAssignedTo(event.target.value)
                  }
                  className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option>
                    Alex Morgan
                  </option>

                  <option>
                    Emma Davis
                  </option>

                  <option>
                    John Smith
                  </option>

                  <option>
                    Priya Nair
                  </option>
                </select>
              </div>

            </div>

            <div className="flex justify-end gap-2 border-t px-6 py-4">

              <Button
                variant="outline"
                onClick={() =>
                  setShowAddTask(false)
                }
              >
                Cancel
              </Button>

              <Button
                onClick={handleAddTask}
                disabled={
                  !title.trim() ||
                  !related.trim()
                }
              >
                Create Task
              </Button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}