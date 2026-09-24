"use client"

import {
  LayoutDashboard,
  Workflow,
  Users,
  CheckSquare,
  Search,
  BarChart3,
  Building2,
  UserCheck,
  ArrowRight,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DesignRationalePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">

      {/* Header */}
      <div>
        <Badge variant="outline" className="mb-3">
          NOVA CRM
        </Badge>

        <h2 className="text-2xl font-semibold tracking-tight">
          Design Rationale
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          NOVA CRM is designed as a centralized client management
          workspace for small agencies and B2B service teams.
          The interface connects lead acquisition, sales pipeline,
          client engagement, projects, and follow-up tasks into
          one workflow.
        </p>
      </div>

      {/* 1 Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="size-5 text-primary" />
            1. Workflow Logic
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid gap-3 md:grid-cols-5">

            <WorkflowStep
              icon={UserCheck}
              title="Lead"
              text="Capture and organize prospects."
            />

            <Arrow />

            <WorkflowStep
              icon={Workflow}
              title="Pipeline"
              text="Move leads through sales stages."
            />

            <Arrow />

            <WorkflowStep
              icon={Users}
              title="Client"
              text="Manage active relationships."
            />

          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">

            <WorkflowStep
              icon={CheckSquare}
              title="Tasks"
              text="Track follow-ups and deadlines."
            />

            <WorkflowStep
              icon={BarChart3}
              title="Activity"
              text="Monitor team actions."
            />

            <WorkflowStep
              icon={LayoutDashboard}
              title="Dashboard"
              text="View overall CRM performance."
            />

          </div>

        </CardContent>
      </Card>

      {/* 2 Usability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="size-5 text-primary" />
            2. Usability Choices
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">

            <Reason
              title="Clear Navigation"
              text="The sidebar separates major CRM functions such as leads, pipeline, clients, tasks, activity, and settings."
            />

            <Reason
              title="Search and Filters"
              text="Search and filtering reduce the time required to find a particular lead, client, project, or task."
            />

            <Reason
              title="Visual Status Indicators"
              text="Colored status badges make engagement, project progress, task priority, and pipeline stages easy to recognize."
            />

            <Reason
              title="Action-Oriented Screens"
              text="Important actions such as adding leads, creating tasks, completing tasks, and opening client profiles are placed directly within the relevant workflow."
            />

            <Reason
              title="Consistent Layout"
              text="Cards, tables, badges, spacing, and typography are used consistently across the dashboard to reduce cognitive load."
            />

            <Reason
              title="Responsive Interface"
              text="The layout adapts to smaller screens while maintaining access to the core CRM information."
            />

          </div>
        </CardContent>
      </Card>

      {/* 3 Real World */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            3. Real-World Agency Use Cases
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">

            <UseCase
              title="Sales Lead Management"
              text="A sales team can record new prospects, assign owners, track contact history, and move opportunities through the pipeline."
            />

            <UseCase
              title="Client Management"
              text="Account managers can view client contact details, contract value, project status, engagement status, and notes from one profile."
            />

            <UseCase
              title="Follow-up Management"
              text="Team members can create tasks for calls, meetings, emails, proposals, and other follow-up activities."
            />

            <UseCase
              title="Project Monitoring"
              text="Agency managers can identify projects that are on track, delayed, completed, or require attention."
            />

          </div>
        </CardContent>
      </Card>

      {/* 4 Assignment Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="size-5 text-primary" />
            4. Assignment Requirement Mapping
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">

              <thead className="border-b">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3">
                    Requirement
                  </th>

                  <th className="px-4 py-3">
                    NOVA CRM Implementation
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Lead tracking
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Leads page with search, filters, ownership,
                    priority, status, and deal value.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Visual lead pipeline
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Kanban-style pipeline with New, Contacted,
                    Qualified, Proposal, and Negotiation stages.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Client profile
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Client details, engagement status, projects,
                    contract information, contact details, and notes.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Task tracker
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Task list with status, priority, due dates,
                    assignees, completion, and deletion.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Follow-up reminders
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Due dates, due labels, overdue indicators,
                    and task reminders.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-4 font-medium">
                    Data visualization
                  </td>

                  <td className="px-4 py-4 text-muted-foreground">
                    Dashboard KPIs, pipeline summary, opportunity
                    trends, and activity information.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">

          <h3 className="font-semibold">
            Design Goal
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The overall design goal is to reduce the number of
            separate tools required by an agency team. NOVA CRM
            provides a single workspace where users can discover
            leads, manage sales opportunities, maintain client
            relationships, monitor projects, and complete follow-up
            activities.
          </p>

        </CardContent>
      </Card>

    </div>
  )
}

function WorkflowStep({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof LayoutDashboard
  title: string
  text: string
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>

      <p className="font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  )
}

function Arrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <ArrowRight className="size-5 text-muted-foreground" />
    </div>
  )
}

function Reason({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="font-medium">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  )
}

function UseCase({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="font-medium">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  )
}