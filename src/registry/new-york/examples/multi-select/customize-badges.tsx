import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/experimental/items/multi-select/components/multi-select"

export function CustomizeBadgesMultiSelect() {
  return (
    <MultiSelect>
      <MultiSelectTrigger className="w-full max-w-[400px]">
        <MultiSelectValue placeholder="Select fruit..." clickToRemove={false} />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          <MultiSelectItem value="apple" badgeLabel="🍎">
            Apple
          </MultiSelectItem>
          <MultiSelectItem value="banana" badgeLabel="🍌">
            Banana
          </MultiSelectItem>
          <MultiSelectItem value="cherry" badgeLabel="🍒">
            Cherry
          </MultiSelectItem>
          <MultiSelectItem value="grape" badgeLabel="🍇">
            Grape
          </MultiSelectItem>
          <MultiSelectItem value="kiwi" badgeLabel="🥝">
            Kiwi
          </MultiSelectItem>
          <MultiSelectItem value="orange" badgeLabel="🍊">
            Orange
          </MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  )
}
