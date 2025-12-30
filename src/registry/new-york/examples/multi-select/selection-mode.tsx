"use client"

import { Label } from "@/components/ui/label"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/new-york/items/multi-select/components/multi-select"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function OverflowBehaviorMultiSelect() {
  const [singleSelect, setSingleSelect] = useState(true)

  return (
    <div className="flex w-[400px] flex-col gap-8">
      <div className="flex gap-2">
        <Switch
          id="checkbox"
          checked={singleSelect}
          onCheckedChange={e => setSingleSelect(e)}
        />
        <Label htmlFor="checkbox">Single Select Mode</Label>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Frameworks</Label>
        <MultiSelect single={singleSelect} defaultValues={["next.js"]}>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue />
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
