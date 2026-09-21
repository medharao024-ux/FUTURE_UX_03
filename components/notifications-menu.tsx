"use client"

import { Bell } from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function NotificationsMenu() {
  const { notifications, markNotificationRead, markAllNotificationsRead } =
    useCrm()
  const unread = notifications.filter((item) => !item.read).length

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative" />
        }
      >
        <Bell className="size-4.5" />
        {unread > 0 ? (
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {unread}
          </span>
        ) : null}
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-0 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="text-xs font-medium text-primary hover:underline"
          >
            Mark all read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => markNotificationRead(item.id)}
              className="flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted"
            >
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  item.read ? "bg-transparent" : "bg-primary"
                )}
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.detail}
                </span>
                <span className="text-xs text-muted-foreground/70">
                  {item.timeLabel}
                </span>
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
