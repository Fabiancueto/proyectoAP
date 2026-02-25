import { inject, type Ref, type ComputedRef } from "vue"

export interface SidebarContextProps {
  state: ComputedRef<string>
  open: ComputedRef<boolean>
  openMobile: Ref<boolean>
  isMobile: boolean
  toggleSidebar: () => void
}

export function useSidebar() {
  const sidebar = inject<SidebarContextProps | null>("sidebarContext")

  if (!sidebar) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return sidebar
}

