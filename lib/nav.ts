import {
  Activity,
  CheckSquare,
  Info,
  LayoutDashboard,
  Settings,
  Users,
  UserPlus,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: UserPlus },
  { label: "Pipeline", href: "/pipeline", icon: Workflow },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Tasks & Follow-ups", href: "/tasks", icon: CheckSquare },
  { label: "Activity", href: "/activity", icon: Activity },
  { label: "Settings", href: "/settings", icon: Settings },
]

export const secondaryNav: NavItem[] = [
  { label: "Design Rationale", href: "/rationale", icon: Info },
]

export function pageTitle(pathname: string): string {
  if (pathname === "/") return "Overview"
  if (pathname.startsWith("/leads")) return "Leads"
  if (pathname.startsWith("/pipeline")) return "Lead Pipeline"
  if (pathname.startsWith("/clients")) return "Clients"
  if (pathname.startsWith("/tasks")) return "Tasks & Follow-ups"
  if (pathname.startsWith("/activity")) return "Activity"
  if (pathname.startsWith("/settings")) return "Settings"
  if (pathname.startsWith("/rationale")) return "Design Rationale"
  return "NOVA CRM"
}
