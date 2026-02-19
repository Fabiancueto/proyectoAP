import { InjectionKey } from "vue"

export interface ToggleGroupContextProps {
  variant?: string
  size?: string
}

export const toggleGroupKey: InjectionKey<ToggleGroupContextProps> =
  Symbol("ToggleGroup")
