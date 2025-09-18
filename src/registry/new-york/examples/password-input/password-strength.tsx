import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "../../items/password-input/components/password-input"

export default function PasswordInputStrength() {
  return (
    <PasswordInput>
      <PasswordInputStrengthChecker />
    </PasswordInput>
  )
}
