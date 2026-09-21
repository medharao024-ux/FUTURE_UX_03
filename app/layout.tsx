import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import "./globals.css"

import { AppShell } from "@/components/app-shell"
import { CrmProvider } from "@/components/crm-provider"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "NOVA CRM — Agency Client Management",
  description:
    "A CRM and client management dashboard for small agencies and B2B service teams — lead tracking, visual pipeline, client profiles, and task follow-ups.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CrmProvider>
          <AppShell>{children}</AppShell>
        </CrmProvider>
        <Toaster position="top-right" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
