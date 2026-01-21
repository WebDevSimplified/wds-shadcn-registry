"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoadingSwap } from "@/registry/experimental/items/loading-swap/components/loading-swap"
import { useState } from "react"

export function LoadingButton() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => setIsLoading(l => !l)} className="w-fit">
        Toggle Loading
      </Button>
      <Card className="w-96">
        <LoadingSwap isLoading={isLoading}>
          <CardHeader>
            <CardTitle>Larger Component</CardTitle>
            <CardDescription>
              Can be used to wrap any components
            </CardDescription>
          </CardHeader>
        </LoadingSwap>
      </Card>
    </div>
  )
}
