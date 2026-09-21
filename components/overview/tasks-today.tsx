"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { TaskItem } from "@/components/task-item"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function TasksToday() {
  const { tasks } = useCrm()

  const priority = { Overdue: 0, "In Progress": 1, "To Do": 2, Completed: 3 }
  const upcoming = tasks
    .filter((task) => task.status !== "Completed")
    .filter(
      (task) =>
        task.status === "Overdue" ||
        task.dueLabel === "Today" ||
        task.dueLabel === "Tomorrow"
    )
    .sort((a, b) => priority[a.status] - priority[b.status])
    .slice(0, 5)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Follow-ups & Tasks</CardTitle>
            <CardDescription>Due today, tomorrow, or overdue</CardDescription>
          </div>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            All tasks
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {upcoming.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            {upcoming.map((task) => (
              <TaskItem key={task.id} task={task} compact />
            ))}
          </div>
        ) : (
          <Empty className="py-8">
            <EmptyHeader>
              <EmptyTitle>All caught up</EmptyTitle>
              <EmptyDescription>
                No follow-ups due right now. Nice work.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  )
}
