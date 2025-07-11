export type PasswordInputContextType = {
  password: string
  showPassword: boolean
}

export type PasswordStrength = {
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

export type PasswordStrengthConfig = {
  // Minimum length requirement
  minLength?: number
  // Whether to require uppercase letters
  requireUppercase?: boolean
  // Whether to require lowercase letters
  requireLowercase?: boolean
  // Whether to require numbers
  requireNumbers?: boolean
  // Whether to require special characters
  requireSpecial?: boolean
  // Custom special characters regex (optional)
  specialChars?: string
  // Score thresholds for strength levels
  thresholds?: {
    weak: number
    good: number
    strong: number
  }
  // Number of segments in the strength bar
  segments?: number
}
