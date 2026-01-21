"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/registry/experimental/items/multi-select/components/multi-select"

const formSchema = z.object({
  favoriteFrameworks: z.array(z.string()).min(1, "Required"),
})

export function MultiSelectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteFrameworks: [],
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="favoriteFrameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Frameworks</FormLabel>
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select frameworks..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
                    <MultiSelectItem value="sveltekit">
                      SvelteKit
                    </MultiSelectItem>
                    <MultiSelectItem value="nuxt.js">Nuxt.js</MultiSelectItem>
                    <MultiSelectItem value="remix">Remix</MultiSelectItem>
                    <MultiSelectItem value="astro">Astro</MultiSelectItem>
                    <MultiSelectItem value="vue">Vue</MultiSelectItem>
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
