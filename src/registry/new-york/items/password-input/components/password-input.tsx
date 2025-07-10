"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

type PasswordInputContextType = {
  password: string
  showPassword: boolean
}

const PasswordInputContext = createContext<
  PasswordInputContextType | undefined
>(undefined)

export const usePasswordInput = () => {
  const context = useContext(PasswordInputContext)
  if (!context) {
    throw new Error("usePasswordInput must be used within a PasswordInput")
  }
  return context
}

export function PasswordInput({
  className,
  children,
  onChange,
  value,
  defaultValue,
  ...props
}: Omit<ComponentProps<typeof Input>, "type"> & {
  children?: ReactNode
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState(String(defaultValue || ""))
  const Icon = showPassword ? EyeOffIcon : EyeIcon

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPassword(newValue)
    onChange?.(e)
  }

  const currentValue = value !== undefined ? value : password
  const passwordValue = String(currentValue)

  return (
    <PasswordInputContext.Provider
      value={{ password: passwordValue, showPassword }}
    >
      <div className="space-y-2">
        <div className="relative">
          <Input
            {...props}
            type={showPassword ? "text" : "password"}
            className={cn("pr-9", className)}
            value={currentValue}
            onChange={handleChange}
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="absolute inset-y-1/2 right-1 size-7 -translate-y-1/2"
            onClick={() => setShowPassword(p => !p)}
          >
            <Icon className="size-5" />
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
        {children}
      </div>
    </PasswordInputContext.Provider>
  )
}

type PasswordStrength = {
  score: number
  label: "Weak" | "Good" | "Strong"
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    special: boolean
  }
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const score = Object.values(checks).filter(Boolean).length

  let label: PasswordStrength["label"] = "Weak"

  if (score >= 4) {
    label = "Strong"
  } else if (score >= 3) {
    label = "Good"
  }

  return { score, label, checks }
}

export function PasswordInputStrengthChecker({
  className,
}: {
  className?: string
}) {
  const { password } = usePasswordInput()
  const [strength, setStrength] = useState<PasswordStrength>(() =>
    calculatePasswordStrength(""),
  )

  useEffect(() => {
    const newStrength = calculatePasswordStrength(password)
    setStrength(newStrength)
  }, [password])

  if (!password) return null

  return (
    <div className={cn("space-y-2", className)}>
      <div className="space-y-1">
        <div className="flex space-x-1">
          {[0, 1, 2].map(index => (
            <div key={index} className="flex-1">
              <Progress
                value={strength.score > index * 2 ? 100 : 0}
                className="h-1"
                color={
                  strength.score > index * 2 ? "bg-green-400" : "bg-red-400"
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end text-sm">
          <span className="font-medium text-black">{strength.label}</span>
        </div>
      </div>
    </div>
  )
}
