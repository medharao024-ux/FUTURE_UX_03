"use client"

import { useState } from "react"
import {
  Bell,
  User,
  Palette,
  Shield,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const [name, setName] = useState("Alex Morgan")
  const [email, setEmail] = useState("alex@novacrm.com")

  const [emailNotifications, setEmailNotifications] =
    useState(true)

  const [taskReminders, setTaskReminders] =
    useState(true)

  const [leadNotifications, setLeadNotifications] =
    useState(true)

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Settings
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your CRM profile, notifications, and preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <User className="size-4 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base">
                Profile
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Manage your account information.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="text-sm font-medium">
                Full Name
              </label>

              <Input
                className="mt-1"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                className="mt-1"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="size-4 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base">
                Notifications
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Choose which CRM notifications you receive.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">

          <SettingToggle
            title="Email Notifications"
            description="Receive important CRM updates by email."
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />

          <SettingToggle
            title="Task Reminders"
            description="Get reminders for upcoming and overdue tasks."
            checked={taskReminders}
            onChange={setTaskReminders}
          />

          <SettingToggle
            title="New Lead Notifications"
            description="Receive notifications when a new lead is added."
            checked={leadNotifications}
            onChange={setLeadNotifications}
          />

        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Palette className="size-4 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base">
                Appearance
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Customize the dashboard appearance.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">

            <div>
              <p className="font-medium">
                Dashboard Theme
              </p>

              <p className="text-sm text-muted-foreground">
                Use the default NOVA CRM interface theme.
              </p>
            </div>

            <span className="rounded-md border px-3 py-2 text-sm">
              Light
            </span>

          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="size-4 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base">
                Security
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Account and access information.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border p-4">
            <p className="font-medium">
              Account Protection
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your CRM account is protected with authenticated access.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">

        <Button
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="size-4" />

          {saved ? "Saved!" : "Save Changes"}
        </Button>

      </div>

    </div>
  )
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">

      <div>
        <p className="font-medium">
          {title}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked
            ? "bg-primary"
            : "bg-muted"
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white transition-transform ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  )
}