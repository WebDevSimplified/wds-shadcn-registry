import { createContext, useContext } from "react"
import type { PasswordInputContextType } from "../types"

export const PasswordInputContext = createContext<
  PasswordInputContextType | undefined
>(undefined)

export const usePasswordInput = () => {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error("usePasswordInput must be used within a PasswordInput")
  }
  return context
}
