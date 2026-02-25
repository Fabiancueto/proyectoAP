<script>
import { ref } from "vue";

export default {
  name: "Accordion",
  props: {
    items: {
      type: Array,
      required: true,
      // [{ title:"", content:"" }]
    },
  },
  setup() {
    const openIndex = ref(null);

    const toggle = (index) => {
      openIndex.value = openIndex.value === index ? null : index;
    };

    return {
      openIndex,
      toggle,
    };
  },
};
</script>

<template>
  <div class="w-full">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="border-b last:border-b-0"
    >
      <!-- Trigger -->
      <button
        @click="toggle(index)"
        class="flex w-full items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all hover:underline"
      >
        {{ item.title }}

        <!-- icon -->
        <svg
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': openIndex === index }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Content -->
      <div
        v-show="openIndex === index"
        class="overflow-hidden text-sm pb-4"
      >
        <div class="pt-0">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
