<script setup>
import { computed } from "vue";
import { DayPicker } from "vue-day-picker";
import "vue-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  className: String,
  classNames: Object,
  showOutsideDays: {
    type: Boolean,
    default: true,
  },
  mode: String,
});

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function buttonVariants({ variant = "default" } = {}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    ghost:
      "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  };
  return cn(
    "inline-flex items-center justify-center rounded-md text-sm transition-all",
    variants[variant]
  );
}

const mergedClassNames = computed(() => ({
  months: "flex flex-col sm:flex-row gap-2",
  month: "flex flex-col gap-4",
  caption: "flex justify-center pt-1 relative items-center w-full",
  caption_label: "text-sm font-medium",
  nav: "flex items-center gap-1",
  nav_button: cn(
    buttonVariants({ variant: "outline" }),
    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
  ),
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-x-1",
  head_row: "flex",
  head_cell:
    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: cn(
    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
    props.mode === "range"
      ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
      : "[&:has([aria-selected])]:rounded-md"
  ),
  day: cn(
    buttonVariants({ variant: "ghost" }),
    "size-8 p-0 font-normal aria-selected:opacity-100"
  ),
  day_selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day_outside: "text-muted-foreground opacity-50",
  day_disabled: "text-muted-foreground opacity-50",
  day_hidden: "invisible",
  ...props.classNames,
}));
</script>

<template>
  <DayPicker
    :showOutsideDays="showOutsideDays"
    :class="cn('p-3', className)"
    :class-names="mergedClassNames"
    v-bind="$attrs"
  >
    <template #icon-left="{ class: c }">
      <ChevronLeft :class="cn('size-4', c)" />
    </template>

    <template #icon-right="{ class: c }">
      <ChevronRight :class="cn('size-4', c)" />
    </template>
  </DayPicker>
</template>
