"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  Building2,
  User,
  FileText,
  MessageSquare,
  BriefcaseBusiness,
} from "lucide-react"

import { useCrm } from "@/components/crm-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"

const engagementStyles: Record<string, string> = {
  Active:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Onboarding:
    "bg-sky-500/15 text-sky-400 border-sky-500/20",
  "At Risk":
    "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Completed:
    "bg-muted text-muted-foreground border-border",
}

const projectStyles: Record<string, string> = {
  "On Track":
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "At Risk":
    "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Delayed:
    "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Completed:
    "bg-muted text-muted-foreground border-border",
}

export default function ClientProfilePage() {
  const params = useParams()
  const { clients } = useCrm()

  const client = clients.find(
    (item) => item.id === params.id
  )

  if (!client) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Building2 className="mb-4 size-10 text-muted-foreground" />

        <h2 className="text-xl font-semibold">
          Client not found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          The client profile you are looking for does not exist.
        </p>

        <Link href="/clients" className="mt-5">
          <Button variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Clients
          </Button>
        </Link>
      </div>
    )
  }

  const initials = client.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

      {/* Back */}
      <Link
        href="/clients"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Clients
      </Link>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                {initials}
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {client.name}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  {client.company} · {client.industry}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={engagementStyles[client.engagement]}
                  >
                    {client.engagement}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={projectStyles[client.projectStatus]}
                  >
                    {client.projectStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Mail className="mr-2 size-4" />
                Email
              </Button>

              <Button>
                <MessageSquare className="mr-2 size-4" />
                Add Note
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="size-4" />
              <span className="text-sm">Contract Value</span>
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(client.contractValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BriefcaseBusiness className="size-4" />
              <span className="text-sm">Projects</span>
            </div>

            <p className="mt-2 text-2xl font-semibold">
              {client.projects.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4" />
              <span className="text-sm">Start Date</span>
            </div>

            <p className="mt-2 text-lg font-semibold">
              {client.startDate}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="size-4" />
              <span className="text-sm">Account Owner</span>
            </div>

            <p className="mt-2 text-lg font-semibold">
              {client.owner}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="text-xs text-muted-foreground">
                    Full Name
                  </p>
                  <p className="mt-1 font-medium">
                    {client.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Company
                  </p>
                  <p className="mt-1 font-medium">
                    {client.company}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <p className="font-medium">
                      {client.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="size-4 text-muted-foreground" />
                    <p className="font-medium">
                      {client.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Industry
                  </p>
                  <p className="mt-1 font-medium">
                    {client.industry}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Contract End
                  </p>
                  <p className="mt-1 font-medium">
                    {client.contractEnd}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col divide-y divide-border">

                {client.projects.map((project) => (
                  <div
                    key={project.name}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <BriefcaseBusiness className="size-4 text-primary" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {project.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Client project
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={projectStyles[project.status]}
                    >
                      {project.status}
                    </Badge>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

          {/* Client Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Client Notes</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4">

                {client.notes.length > 0 ? (
                  client.notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-lg border bg-muted/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-medium">
                          {note.author}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {note.createdAt}
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {note.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No notes have been added yet.
                  </p>
                )}

              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">

          {/* Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div>
                <p className="text-xs text-muted-foreground">
                  Current Status
                </p>

                <Badge
                  variant="outline"
                  className={`mt-2 ${engagementStyles[client.engagement]}`}
                >
                  {client.engagement}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Project Status
                </p>

                <Badge
                  variant="outline"
                  className={`mt-2 ${projectStyles[client.projectStatus]}`}
                >
                  {client.projectStatus}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last Activity
                </p>

                <p className="mt-1 font-medium">
                  {client.lastActivity}
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Client Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Client Summary</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {client.summary}
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <a
                href={`mailto:${client.email}`}
                className="flex items-center gap-3 text-sm hover:text-primary"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Mail className="size-4" />
                </div>

                <span className="truncate">
                  {client.email}
                </span>
              </a>

              <a
                href={`tel:${client.phone}`}
                className="flex items-center gap-3 text-sm hover:text-primary"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Phone className="size-4" />
                </div>

                <span>
                  {client.phone}
                </span>
              </a>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}