import { Label } from "@/components/ui/label"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/experimental/items/multi-select/components/multi-select"

export function SearchConfigurationMultiSelect() {
  return (
    <div className="flex w-[400px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label>Disabled Search</Label>
        <MultiSelect>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue />
          </MultiSelectTrigger>
          <MultiSelectContent search={false}>
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
      <div className="flex flex-col gap-2">
        <Label>Customized Search</Label>
        <MultiSelect>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue />
          </MultiSelectTrigger>
          <MultiSelectContent
            search={{
              emptyMessage: "No frameworks found",
              placeholder: "Search frameworks...",
            }}
          >
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
