import type { PasswordStrength, PasswordStrengthConfig } from "./types"

export const defaultConfig: Required<PasswordStrengthConfig> = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true,
  specialChars: '!@#$%^&*(),.?":{}|<>',
  thresholds: {
    weak: 2,
    good: 3,
    strong: 4,
  },
  segments: 3,
}

export const getStrengthColor = (label: PasswordStrength["label"]) => {
  const strengthColors = {
    Strong: "bg-green-500",
    Good: "bg-yellow-500",
    Weak: "bg-red-500",
  } as const

  return strengthColors[label] ?? "bg-gray-300"
}

const UPPERCASE_REGEX = /[A-Z]/
const LOWERCASE_REGEX = /[a-z]/
const NUMBERS_REGEX = /\d/

const getLabel = (score: number, config: Required<PasswordStrengthConfig>) => {
  if (score >= config.thresholds.strong) return "Strong"
  if (score >= config.thresholds.good) return "Good"
  return "Weak"
}

export const calculatePasswordStrength = (
  password: string,
  config: Required<PasswordStrengthConfig>,
): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      label: "Weak",
      checks: {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        special: false,
      },
    }
  }

  const specialRegex = config.requireSpecial
    ? new RegExp(
        `[${config.specialChars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
      )
    : null

  const checks = {
    length: password.length >= config.minLength,
    uppercase: config.requireUppercase ? UPPERCASE_REGEX.test(password) : true,
    lowercase: config.requireLowercase ? LOWERCASE_REGEX.test(password) : true,
    numbers: config.requireNumbers ? NUMBERS_REGEX.test(password) : true,
    special:
      config.requireSpecial && specialRegex
        ? specialRegex.test(password)
        : true,
  }

  const totalScore = Object.values(checks).filter(Boolean).length

  const label = getLabel(totalScore, config)

  return {
    score: totalScore,
    label,
    checks,
  }
}
