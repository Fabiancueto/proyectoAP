<script setup>
import { computed } from "vue";

// props
const props = defineProps({
  variant: {
    type: String,
    default: "default", // default | secondary | destructive | outline
  },
  className: String,
  as: {
    type: String,
    default: "span", // permite cambiar etiqueta si quieres
  },
});

// helper class merge
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// clases base
const base =
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden";

// variantes
const variants = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
  destructive:
    "border-transparent bg-destructive text-white hover:bg-destructive/90",
  outline:
    "text-foreground hover:bg-accent hover:text-accent-foreground",
};

// clases finales
const badgeClass = computed(() =>
  cn(base, variants[props.variant] || variants.default, props.className)
);
</script>

<template>
  <component
    :is="as"
    data-slot="badge"
    :class="badgeClass"
  >
    <slot />
  </component>
</template>
