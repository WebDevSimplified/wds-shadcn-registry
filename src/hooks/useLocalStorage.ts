import { useEffect, useState } from "react"

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    // Update with useEffect instead of using the initial value function of useState because of SSR hydration issues
    const item = window.localStorage.getItem(key)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (item) setStoredValue(JSON.parse(item))
  }, [key])

  useEffect(() => {
    const handleStorage = () => {
      const item = window.localStorage.getItem(key)
      if (item) setStoredValue(JSON.parse(item))
    }
    window.addEventListener("storage", handleStorage)
    window.addEventListener("local-storage", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("local-storage", handleStorage)
    }
  }, [key])

  const setValue = (value: T) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
    window.dispatchEvent(new StorageEvent("local-storage", { key }))
  }

  return [storedValue, setValue]
}
