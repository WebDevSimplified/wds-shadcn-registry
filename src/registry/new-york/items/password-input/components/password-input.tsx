"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, type ComponentProps, type ReactNode } from "react"
import {
  PasswordInputContext,
  usePasswordInput,
} from "./password-input-context"
import type { PasswordStrengthConfig } from "../types"
import {
  calculatePasswordStrength,
  defaultConfig,
  getStrengthColor,
} from "../utils"

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

export function PasswordInputStrengthChecker({
  className,
  config: userConfig,
}: {
  className?: string
  config?: PasswordStrengthConfig
}) {
  const { password } = usePasswordInput()

  const config = { ...defaultConfig, ...userConfig }

  const strength = calculatePasswordStrength(password, config)

  if (!password) return null

  const segmentValue = Math.min(
    Math.ceil(
      (strength.score / Math.max(...Object.values(config.thresholds))) *
        config.segments,
    ),
    config.segments,
  )

  return (
    <div className={cn("space-y-2", className)}>
      <div className="space-y-1">
        <div
          role="progressbar"
          aria-label="Password Strength"
          aria-valuenow={segmentValue}
          aria-valuemin={0}
          aria-valuemax={config.segments}
          aria-valuetext={strength.label}
          className="flex space-x-1"
        >
          {Array.from({ length: config.segments }, (_, i) => i + 1).map(
            segmentIndex => (
              <div
                key={segmentIndex}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-200",
                  segmentValue >= segmentIndex
                    ? getStrengthColor(strength.label)
                    : "bg-gray-200 dark:bg-gray-700",
                )}
              />
            ),
          )}
        </div>
        <div className="flex items-center justify-end text-sm">
          <span className="font-medium text-black dark:text-white">
            {strength.label}
          </span>
        </div>
      </div>
    </div>
  )
}
