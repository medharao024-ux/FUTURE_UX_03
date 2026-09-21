import { cn } from "@/lib/utils"

export function StatusPill({
  label,
  tone,
  dot,
  className,
}: {
  label: string
  tone: string
  dot?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone,
        className
      )}
    >
      {dot ? <span className={cn("size-1.5 rounded-full", dot)} /> : null}
      {label}
    </span>
  )
}
