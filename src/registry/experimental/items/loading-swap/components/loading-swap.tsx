import { IconPlaceholder } from "@/components/registry-helpers/icon-placeholder"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function LoadingSwap({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 w-full",
          isLoading ? "invisible" : "visible",
          className,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "visible" : "invisible",
          className,
        )}
      >
        <IconPlaceholder
          lucide="Loader2Icon"
          tabler="IconLoader2"
          hugeicons="Loading03Icon"
          phosphor="CircleNotchIcon"
          remixicon="RiLoader4Line"
          className="animate-spin"
        />
      </div>
    </div>
  )
}
