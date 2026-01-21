import { type ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export function InstallationTabsInternal({
  children,
  cliSteps,
  cliStepsExperimental,
}: {
  children: ReactNode
  cliSteps: ReactNode
  cliStepsExperimental: ReactNode
}) {
  const [selectedTab, setSelectedTab] = useLocalStorage(
    "installation-method",
    "cli",
  )
  return (
    <Tabs
      value={selectedTab}
      onValueChange={setSelectedTab}
      className="not-content"
    >
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="cliExperimental">
          CLI <span className="text-sm">(Icon Support)</span>
        </TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">{cliSteps}</TabsContent>
      <TabsContent value="cliExperimental">{cliStepsExperimental}</TabsContent>
      <TabsContent value="manual">{children}</TabsContent>
    </Tabs>
  )
}
