<script setup>
import { ChevronRight, MoreHorizontal } from "lucide-vue-next";

// props generales opcionales
defineProps({
  className: String,
  as: {
    type: String,
    default: "nav",
  },
});

// helper clases
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
</script>

<!-- NAV -->
<template>
  <nav aria-label="breadcrumb" data-slot="breadcrumb">
    <slot />
  </nav>
</template>

<!-- LIST -->
<script>
export const BreadcrumbList = {
  props: ["className"],
  template: `
    <ol
      data-slot="breadcrumb-list"
      :class="cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5', className)"
    >
      <slot />
    </ol>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};

export const BreadcrumbItem = {
  props: ["className"],
  template: `
    <li
      data-slot="breadcrumb-item"
      :class="cn('inline-flex items-center gap-1.5', className)"
    >
      <slot />
    </li>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};

export const BreadcrumbLink = {
  props: ["className", "href", "as"],
  template: `
    <component
      :is="as || 'a'"
      :href="href"
      data-slot="breadcrumb-link"
      :class="cn('hover:text-foreground transition-colors', className)"
    >
      <slot />
    </component>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};

export const BreadcrumbPage = {
  props: ["className"],
  template: `
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      :class="cn('text-foreground font-normal', className)"
    >
      <slot />
    </span>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};

export const BreadcrumbSeparator = {
  props: ["className"],
  components: { ChevronRight },
  template: `
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      :class="cn('[&>svg]:size-3.5', className)"
    >
      <slot>
        <ChevronRight />
      </slot>
    </li>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};

export const BreadcrumbEllipsis = {
  props: ["className"],
  components: { MoreHorizontal },
  template: `
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      :class="cn('flex size-9 items-center justify-center', className)"
    >
      <MoreHorizontal class="size-4" />
      <span class="sr-only">More</span>
    </span>
  `,
  methods: { cn: (...c) => c.filter(Boolean).join(" ") },
};
</script>
