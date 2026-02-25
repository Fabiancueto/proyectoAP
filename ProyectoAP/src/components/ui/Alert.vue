<script>
export default {
  name: "Alert",
  props: {
    variant: {
      type: String,
      default: "default", // default | destructive
    },
  },
  computed: {
    variantClasses() {
      return this.variant === "destructive"
        ? "text-red-600 bg-white border-red-300"
        : "bg-white text-gray-900 border-gray-200";
    },
  },
};
</script>

<template>
  <div
    role="alert"
    :class="[
      'relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[0_1fr] gap-y-1 items-start',
      variantClasses
    ]"
  >
    <!-- icon slot opcional -->
    <div v-if="$slots.icon" class="mr-2 mt-0.5">
      <slot name="icon" />
    </div>

    <div>
      <!-- title -->
      <div class="font-medium tracking-tight min-h-4">
        <slot name="title" />
      </div>

      <!-- description -->
      <div class="text-sm text-gray-500 mt-1">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
