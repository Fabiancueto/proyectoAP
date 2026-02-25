<script setup>
import { computed } from "vue";

const props = defineProps({
  className: String,
  variant: {
    type: String,
    default: "default",
  },
  size: {
    type: String,
    default: "default",
  },
  as: {
    type: String,
    default: "button",
  },
});

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
  outline:
    "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost:
    "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md gap-1.5 px-3",
  lg: "h-10 rounded-md px-6",
  icon: "size-9 rounded-md",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px]";

const classes = computed(() =>
  cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.className
  )
);
</script>

<template>
  <component
    :is="as"
    data-slot="button"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
