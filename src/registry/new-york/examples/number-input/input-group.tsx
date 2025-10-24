"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group"
import { InputGroupNumberInput } from "@/registry/new-york/items/number-input/components/number-input"
import { useState } from "react"

export function BasicNumberInput() {
  const [value, setValue] = useState<number | null>(null)
  return (
    <InputGroup className="w-[300px]">
      <InputGroupNumberInput
        placeholder="Favorite number"
        value={value}
        onChange={setValue}
      />
      <InputGroupAddon>
        <InputGroupText>#</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
