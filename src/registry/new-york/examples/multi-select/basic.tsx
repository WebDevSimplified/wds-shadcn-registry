import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/experimental/items/multi-select/components/multi-select"

export function BasicMultiSelect() {
  return (
    <MultiSelect>
      <MultiSelectTrigger className="w-full max-w-[400px]">
        <MultiSelectValue placeholder="Select frameworks..." />
      </MultiSelectTrigger>
      <MultiSelectContent>
        {/* Items must be wrapped in a group for proper styling */}
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
  )
}
