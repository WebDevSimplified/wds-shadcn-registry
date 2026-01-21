import { ActionButton } from "@/registry/experimental/items/action-button/components/action-button"

const serverAction = async () => {
  // Simulate a server action
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    error: true,
    message: "Something went wrong. Please try again later.",
  }
}

export function ErrorActionButton() {
  return (
    <ActionButton variant="destructive" action={serverAction}>
      Do error action
    </ActionButton>
  )
}
