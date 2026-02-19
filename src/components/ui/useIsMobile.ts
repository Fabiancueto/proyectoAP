import { ref, onMounted, onUnmounted } from "vue"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const isMobile = ref<boolean>(false)

  const checkScreen = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }

  let mql: MediaQueryList | null = null

  onMounted(() => {
    mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    checkScreen()
    mql.addEventListener("change", checkScreen)
  })

  onUnmounted(() => {
    mql?.removeEventListener("change", checkScreen)
  })

  return isMobile
}
