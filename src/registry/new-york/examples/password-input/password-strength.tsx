import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "@/registry/experimental/items/password-input/components/password-input"

export default function PasswordInputStrength() {
  return (
    <PasswordInput>
      <PasswordInputStrengthChecker />
    </PasswordInput>
  )
}
