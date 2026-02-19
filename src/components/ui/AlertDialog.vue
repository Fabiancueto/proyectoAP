<script>
import { ref, watch } from "vue";

export default {
  name: "AlertDialog",
  props: {
    modelValue: Boolean, // v-model
    title: String,
    description: String,
    confirmText: {
      type: String,
      default: "Confirmar",
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
  },
  emits: ["update:modelValue", "confirm", "cancel"],
  setup(props, { emit }) {
    const open = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (val) => (open.value = val)
    );

    const close = () => {
      open.value = false;
      emit("update:modelValue", false);
      emit("cancel");
    };

    const confirm = () => {
      emit("confirm");
      close();
    };

    return { open, close, confirm };
  },
};
</script>

<template>
  <div v-if="open">
    <!-- overlay -->
    <div
      class="fixed inset-0 z-50 bg-black/50"
      @click="close"
    ></div>

    <!-- modal -->
    <div
      class="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
    >
      <!-- header -->
      <div class="flex flex-col gap-2 text-center sm:text-left">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p class="text-sm text-gray-500">
          {{ description }}
        </p>
      </div>

      <!-- slot extra content -->
      <div class="mt-4">
        <slot />
      </div>

      <!-- footer -->
      <div
        class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
      >
        <button
          @click="close"
          class="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          {{ cancelText }}
        </button>

        <button
          @click="confirm"
          class="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
