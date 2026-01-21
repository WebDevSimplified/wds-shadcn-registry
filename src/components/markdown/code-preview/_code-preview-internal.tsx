import { lazy, Suspense, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2Icon, SettingsIcon } from "lucide-react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { SERVER_URL } from "@/data/env"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import {
  ICON_LIBRARIES,
  iconLibraryToLabel,
  type IconLibrary,
} from "@/components/registry-helpers/icon-placeholder"

export type Demo =
  | "action-button/basic"
  | "action-button/default"
  | "action-button/error"
  | "action-button/require-are-you-sure"
  | "loading-swap/basic"
  | "loading-swap/large-component"
  | "multi-select/basic"
  | "multi-select/customize-badges"
  | "multi-select/form"
  | "multi-select/overflow-behavior"
  | "multi-select/search-configuration"
  | "multi-select/selection-mode"
  | "number-input/basic"
  | "number-input/input-group"
  | "number-input/form"
  | "password-input/basic"
  | "password-input/form"
  | "password-input/password-strength"

export function CodePreviewInternal({
  demo,
  children,
}: {
  demo: Demo
  children: ReactNode
}) {
  const componentName = demo.split("/")[0]
  const Component = getComponent(componentName, demo.split("/")[1])
  const [iconLibrary, setIconLibrary] = useLocalStorage<IconLibrary>(
    "preferred-icon-library",
    "lucide",
  )

  return (
    <Tabs defaultValue="preview" className="not-content">
      <TabsList className="w-full">
        <TabsTrigger value="preview" className="flex-grow-0">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-grow-0">
          Code
        </TabsTrigger>
        <div className="ml-auto flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <SettingsIcon className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Preview Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize how components are displayed
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon-library">Icon Library</Label>
                  <Select
                    value={iconLibrary}
                    onValueChange={value =>
                      setIconLibrary(value as IconLibrary)
                    }
                  >
                    <SelectTrigger id="icon-library" className="w-full">
                      <SelectValue placeholder="Select icon library" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_LIBRARIES.map(lib => (
                        <SelectItem key={lib} value={lib}>
                          {iconLibraryToLabel(lib)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <OpenInV0Button url={`${SERVER_URL}/r/${componentName}.json`} />
        </div>
      </TabsList>
      <Card className="no-scrollbar h-[450px] overflow-y-auto rounded-lg bg-transparent p-0">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex h-full items-center justify-center p-4"
          >
            <Suspense
              fallback={<Loader2Icon className="size-16 animate-spin" />}
            >
              {/* eslint-disable-next-line react-hooks/static-components */}
              <Component />
            </Suspense>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            {children}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}

function getComponent(component: string, demo: string) {
  return lazy(async () => {
    const module = await import(
      `../../../registry/new-york/examples/${component}/${demo}.tsx`
    )
    const namedExport = Object.keys(module).find(
      key => typeof module[key] === "function",
    )
    return {
      default:
        module.default ?? (namedExport ? module[namedExport] : undefined),
    }
  })
}
