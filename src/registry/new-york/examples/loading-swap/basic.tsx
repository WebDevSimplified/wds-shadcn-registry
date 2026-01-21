"use client"

import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/registry/experimental/items/loading-swap/components/loading-swap"
import { useTransition } from "react"

export function LoadingButton() {
  const [isLoading, startTransition] = useTransition()

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          // Simulate loading state
          await new Promise(res => setTimeout(res, 1000))
        })
      }}
    >
      <LoadingSwap isLoading={isLoading}>Click Me</LoadingSwap>
    </Button>
  )
}
