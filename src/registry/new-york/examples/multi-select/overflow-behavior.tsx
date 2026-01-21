"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/experimental/items/multi-select/components/multi-select"
import { useState } from "react"

type OverflowBehavior = "wrap-when-open" | "wrap" | "cutoff"

export function OverflowBehaviorMultiSelect() {
  const [overflowBehavior, setOverflowBehavior] =
    useState<OverflowBehavior>("wrap-when-open")

  return (
    <div className="flex w-[400px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label>Overflow Behavior</Label>
        <Select
          value={overflowBehavior}
          onValueChange={v => setOverflowBehavior(v as OverflowBehavior)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wrap-when-open">wrap-when-open</SelectItem>
            <SelectItem value="wrap">wrap</SelectItem>
            <SelectItem value="cutoff">cutoff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Frameworks</Label>
        <MultiSelect
          defaultValues={[
            "next.js",
            "sveltekit",
            "nuxt.js",
            "remix",
            "astro",
            "vue",
          ]}
        >
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue overflowBehavior={overflowBehavior} />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
              <MultiSelectItem value="sveltekit">SvelteKit</MultiSelectItem>
              <MultiSelectItem value="nuxt.js">Nuxt.js</MultiSelectItem>
              <MultiSelectItem value="remix">Remix</MultiSelectItem>
              <MultiSelectItem value="astro">Astro</MultiSelectItem>
              <MultiSelectItem value="vue">Vue.js</MultiSelectItem>
              <MultiSelectItem value="react">React</MultiSelectItem>
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  )
}
