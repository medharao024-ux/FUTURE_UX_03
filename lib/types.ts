export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost"

export type Priority = "High" | "Medium" | "Low"

export type ClientStatus = "Active" | "Onboarding" | "At Risk" | "Completed"

export type TaskStatus = "To Do" | "In Progress" | "Completed" | "Overdue"

export type Owner = "Alex Morgan" | "Emma Davis" | "John Smith" | "Priya Nair"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  source: string
  status: LeadStatus
  dealValue: number
  owner: Owner
  lastContact: string
  priority: Priority
  notes?: string
}

export interface ClientProject {
  name: string
  status: "On Track" | "At Risk" | "Delayed" | "Completed"
}

export interface ClientNote {
  id: string
  author: Owner
  text: string
  createdAt: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  industry: string
  engagement: ClientStatus
  projectStatus: "On Track" | "At Risk" | "Delayed" | "Completed"
  owner: Owner
  contractValue: number
  lastActivity: string
  startDate: string
  contractEnd: string
  summary: string
  projects: ClientProject[]
  notes: ClientNote[]
}

export interface Task {
  id: string
  title: string
  description?: string
  related: string
  relatedType: "Client" | "Lead"
  dueDate: string
  dueLabel: string
  priority: Priority
  assignedTo: Owner
  status: TaskStatus
}

export type ActivityType = "Leads" | "Clients" | "Tasks" | "Communication"

export interface Activity {
  id: string
  type: ActivityType
  actor: Owner
  action: string
  entity: string
  time: string
  timeLabel: string
}

export interface AppNotification {
  id: string
  title: string
  detail: string
  timeLabel: string
  read: boolean
}
