"use client"

import {
  CheckCircle2,
  MessageSquare,
  UserRound,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { initials } from "@/lib/format"
import type { Activity, ActivityType } from "@/lib/types"
import { cn } from "@/lib/utils"

const typeMeta: Record<
  ActivityType,
  { icon: LucideIcon; className: string }
> = {
  Leads: { icon: UserRound, className: "bg-sky-50 text-sky-600" },
  Clients: { icon: Users, className: "bg-violet-50 text-violet-600" },
  Tasks: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-600" },
  Communication: {
    icon: MessageSquare,
    className: "bg-amber-50 text-amber-600",
  },
}

export function ActivityFeed({
  activities,
  showAvatars = false,
}: {
  activities: Activity[]
  showAvatars?: boolean
}) {
  return (
    <ol className="flex flex-col">
      {activities.map((activity, index) => {
        const meta = typeMeta[activity.type]
        const isLast = index === activities.length - 1
        return (
          <li key={activity.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              {showAvatars ? (
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {initials(activity.actor)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full",
                    meta.className
                  )}
                >
                  <meta.icon className="size-4" />
                </span>
              )}
              {!isLast ? (
                <span className="my-1 w-px flex-1 bg-border" />
              ) : null}
            </div>
            <div className={cn("flex flex-col gap-0.5", !isLast && "pb-5")}>
              <p className="text-sm leading-snug">
                <span className="font-medium">{activity.actor}</span>{" "}
                <span className="text-muted-foreground">
                  {activity.action}
                </span>{" "}
                <span className="font-medium">{activity.entity}</span>
              </p>
              <span className="text-xs text-muted-foreground">
                {activity.timeLabel}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
