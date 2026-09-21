"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CircleDot } from "lucide-react"

import { navItems, secondaryNav } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CircleDot className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none text-sidebar-foreground">
            NOVA CRM
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            Agency Workspace
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Workspace
        </p>
        {navItems.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}

        <p className="px-3 pt-5 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Resources
        </p>
        {secondaryNav.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              Alex Morgan
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Account Manager
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
