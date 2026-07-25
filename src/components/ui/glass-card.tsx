import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, level = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl md:rounded-3xl bg-card border border-border backdrop-blur-md p-6",
          level === 2 && "shadow-[0_0_20px_rgba(99,102,241,0.15)] border-white/10",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
