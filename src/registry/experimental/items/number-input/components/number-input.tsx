import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { type ComponentProps } from "react"

export function NumberInput({
  onChange,
  value,
  ...props
}: Omit<ComponentProps<typeof Input>, "type" | "onChange" | "value"> & {
  onChange: (value: number | null) => void
  value: undefined | null | number
}) {
  return (
    <Input
      {...props}
      onChange={e => {
        const number = e.target.valueAsNumber
        onChange(isNaN(number) ? null : number)
      }}
      value={value ?? ""}
      type="number"
    />
  )
}

export function InputGroupNumberInput({
  className,
  ...props
}: React.ComponentProps<typeof NumberInput>) {
  return (
    <NumberInput
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  )
}
