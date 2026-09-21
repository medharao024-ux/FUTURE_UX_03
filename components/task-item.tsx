"use client"

import { Building2, Calendar, Trash2, UserRound } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { StatusPill } from "@/components/status-pill"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { initials, priorityTone, taskStatusTone } from "@/lib/format"
import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"

export function TaskItem({
  task,
  compact = false,
  showDelete = false,
}: {
  task: Task
  compact?: boolean
  showDelete?: boolean
}) {
  const { toggleTaskComplete, deleteTask } = useCrm()
  const done = task.status === "Completed"

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-transparent px-2 py-2.5 transition-colors hover:border-border hover:bg-muted/40",
        done && "opacity-60"
      )}
    >
      <Checkbox
        checked={done}
        onCheckedChange={() => toggleTaskComplete(task.id)}
        className="mt-0.5"
        aria-label={done ? "Mark task incomplete" : "Mark task complete"}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm font-medium leading-snug",
              done && "line-through"
            )}
          >
            {task.title}
          </p>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              priorityTone[task.priority]
            )}
          >
            {task.priority}
          </span>
        </div>
        {!compact && task.description ? (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            {task.relatedType === "Client" ? (
              <Building2 className="size-3.5" />
            ) : (
              <UserRound className="size-3.5" />
            )}
            {task.related}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" />
            {task.dueLabel}
          </span>
          {!compact ? (
            <span className="inline-flex items-center gap-1.5">
              <Avatar className="size-4.5">
                <AvatarFallback className="text-[9px]">
                  {initials(task.assignedTo)}
                </AvatarFallback>
              </Avatar>
              {task.assignedTo}
            </span>
          ) : null}
          <StatusPill
            label={task.status}
            tone={taskStatusTone[task.status].className}
            dot={taskStatusTone[task.status].dot}
          />
        </div>
      </div>
      {showDelete ? (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
        >
          <Trash2 className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}
